import sys
import django.apps

from datetime import date, datetime, time, timedelta
from decimal import Decimal
from enum import Enum
from typing import Any, Dict, List, Union, ForwardRef
from uuid import UUID

from django.utils.functional import Promise

from pydantic import BaseModel, IPvAnyAddress, field_validator, Json, create_model
from pydantic.fields import FieldInfo

from django.db.models import ForeignObjectRel, OneToOneRel, Manager, Model, ManyToManyRel, ManyToOneRel

INT_TYPES = [
    "AutoField",
    "BigAutoField",
    "IntegerField",
    "SmallIntegerField",
    "BigIntegerField",
    "PositiveIntegerField",
    "PositiveSmallIntegerField",
]

STR_TYPES = [
    "CharField",
    "EmailField",
    "URLField",
    "SlugField",
    "TextField",
    "FilePathField",
    "FileField",
]

FIELD_TYPES = {
    "GenericIPAddressField": IPvAnyAddress,
    "BooleanField": bool,
    "BinaryField": bytes,
    "DateField": date,
    "DateTimeField": datetime,
    "DurationField": timedelta,
    "TimeField": time,
    "DecimalField": Decimal,
    "FloatField": float,
    "UUIDField": UUID,
    "JSONField": Union[Json, dict, list],  # TODO: Configure this using default
    "ArrayField": List,
}


class DjBaseModel(BaseModel):

    class Config:
        from_attributes: True

    @field_validator("*", mode="before")
    @classmethod
    def validate_fields(cls, v):
        if issubclass(v.__class__, Model):
            return v
        if issubclass(v.__class__, Manager):
            return v.all()
        return v


def get_field_name(field) -> str:
    if issubclass(field.__class__, ForeignObjectRel) and not issubclass(
            field.__class__, OneToOneRel):
        return getattr(field, "related_name", None) or f"{field.name}_set"
    else:
        return getattr(field, "name", field)


def get_schema_name(model) -> str:
    return f"{model._meta.verbose_name.replace(' ', '')}Schema"


def ModelSchemaField(field: Any, schema_name: str) -> tuple:
    default = False
    default_factory = None
    description = None
    title = None
    max_length = None
    python_type = None

    if field.is_relation:
        if isinstance(field, ManyToOneRel) or isinstance(field, ManyToManyRel):
            return None
        if not field.related_model:
            internal_type = ForwardRef(get_schema_name(field.model))
        else:
            if not getattr(field.related_model, "PYDANTIC_BASE_MODEL", False):
                return None
            internal_type = ForwardRef(get_schema_name(field.related_model))

        if field.one_to_many or field.many_to_many:
            python_type = List[internal_type]
        else:
            python_type = internal_type

        if field.related_model:
            field = field.target_field

    else:
        if field.choices:
            enum_choices = {}
            for k, v in field.choices:
                if Promise in type(v).__mro__:
                    v = str(v)
                enum_choices[v] = k
            if field.blank:
                enum_choices['_blank'] = ''

            enum_prefix = (
                f"{schema_name.replace('_', '')}{field.name.title().replace('_', '')}"
            )
            python_type = Enum(  # type: ignore
                f"{enum_prefix}Enum",
                enum_choices,
                module=__name__,
            )

            if field.has_default() and isinstance(field.default, Enum):
                default = field.default.value
        else:
            internal_type = field.get_internal_type()
            if internal_type in STR_TYPES:
                python_type = str
                if not field.choices:
                    max_length = field.max_length

            elif internal_type in INT_TYPES:
                python_type = int

            elif internal_type in FIELD_TYPES:
                python_type = FIELD_TYPES[internal_type]

            else:  # pragma: nocover
                for field_class in type(field).__mro__:
                    get_internal_type = getattr(field_class,
                                                "get_internal_type", None)
                    if get_internal_type:
                        _internal_type = get_internal_type(field_class())
                        if _internal_type in FIELD_TYPES:
                            python_type = FIELD_TYPES[_internal_type]
                            break

        if python_type is None:
            python_type = str

        deconstructed = field.deconstruct()
        field_options = deconstructed[3] or {}
        blank = field_options.pop("blank", False)
        null = field_options.pop("null", False)

        if field.has_default():
            if callable(field.default):
                default_factory = field.default
                default = None
            else:
                default = field.default
        elif field.primary_key or blank or null:
            default = None

        if default is not None and field.null:
            python_type = Union[python_type, None]

        description = field.help_text
        title = field.verbose_name.title()

    if not description:
        description = field.name

    return (
        python_type | None,
        None
        #FieldInfo(
        #    default_factory=default_factory,
        #    title=title,
        #    description=str(description),
        #    max_length=max_length,
        #),
    )


for model in django.apps.apps.get_models():
    if not getattr(model, "PYDANTIC_BASE_MODEL", None):
        continue
    fields = model._meta.get_fields()
    schema_fields = {}
    schema_name = get_schema_name(model)
    for field in fields:
        field_name = get_field_name(field)
        schema_field = ModelSchemaField(field, schema_name)
        if schema_field:
            schema_fields[field_name] = ModelSchemaField(field, schema_name)
    schema = create_model(
        f"{model._meta.verbose_name.replace(' ', '')}Schema",
        __base__=DjBaseModel,
        __module__=model.__module__,
        **schema_fields,
    )
    setattr(sys.modules[model.__module__], schema_name, schema)
