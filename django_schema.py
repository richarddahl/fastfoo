from __future__ import annotations

import sys
from datetime import date, datetime, time, timedelta
from decimal import Decimal
from enum import Enum
from typing import Any, List, Union, ForwardRef, Optional

from uuid import UUID

from pydantic_core import PydanticUndefined
from pydantic import (
    BaseModel,
    IPvAnyAddress,
    field_validator,
    Json,
    create_model,
    ConfigDict,
)
from pydantic.errors import PydanticUserError
from pydantic.fields import FieldInfo

from django.db.models import (
    ForeignObjectRel,
    OneToOneRel,
    Manager,
    Model as DjangoModel,
    ManyToManyRel,
    ManyToOneRel,
)

_Unset: Any = PydanticUndefined

FIELD_TYPE_DICT = {
    "AutoField": int,
    "BigAutoField": int,
    "IntegerField": int,
    "SmallIntegerField": int,
    "BigIntegerField": int,
    "PositiveIntegerField": int,
    "PositiveSmallIntegerField": int,
    "CharField": str,
    "EmailField": str,
    "URLField": str,
    "SlugField": str,
    "TextField": str,
    "FilePathField": str,
    "FileField": str,
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
    "JSONField": Union[Json, dict, list],
    "ArrayField": List,
}


class DjangoSchema(BaseModel):
    """Subclass of BaseModel with appropriate Config and validation"""

    class Config:
        from_attributes: True

    @field_validator("*", mode="before")
    @classmethod
    def validate_fields(cls, v):
        """Returns the executed django model/manager function or field value/model property"""
        if issubclass(v.__class__, Manager):
            return v.all()
        return v() if callable(v) else v


def get_field_name(field) -> str:
    """
    The function `get_field_name` returns the name of a BaseModel Field based on the Django model Field.

    """
    if issubclass(field.__class__, ForeignObjectRel) and not issubclass(
        field.__class__, OneToOneRel
    ):
        return getattr(field, "related_name", f"{field.name}_set")
    else:
        return getattr(field, "name", field)


def get_schema_name(model: DjangoModel) -> str:
    """
    The function `get_schema_name` returns the name of a Django model's schema by removing spaces from
    the model's verbose name.

    """
    return f"{model._meta.verbose_name.replace(' ', '')}Schema"


def get_field_type_from_choices(field, schema_name, module):
    """
    The function `get_field_type_from_choices` determines the correct field annotation for fields with
    choices.

    """
    enum_choices = {str(v): k for k, v in field.choices}
    if field.blank:
        enum_choices["_blank"] = ""
    enum_prefix = f"{schema_name.replace('_', '')}{field.name.title().replace('_', '')}"
    return Enum(
        f"{enum_prefix}Enum",
        enum_choices,
        module=module,
    )


def get_related_field_type(field: Any) -> tuple[str, Any]:
    """
    The function `get_related_field_type` determines the correct field type for related fields in Django
    models.

    """
    if not isinstance(field, (ManyToOneRel, ManyToManyRel)) and field.related_model:
        django_type = ForwardRef(get_schema_name(field.related_model))
    else:
        django_type = ForwardRef(get_schema_name(field.model))

    if field.one_to_many or field.many_to_many:
        field_type = List[django_type]
    else:
        field_type = django_type
    if field.related_model:
        field = field.target_field

    return field, field_type


def create_field(field: Any, schema_name: str, module: str = None) -> tuple:
    """
    The `create_field` function creates a Pydantic Field from a given configuration.

    """
    # TODO add support for all of Pydantics options to FieldInfo
    default = None
    default_factory = _Unset
    title = _Unset
    description = _Unset
    max_digits = _Unset
    decimal_places = _Unset
    min_length = _Unset
    max_length = _Unset
    field_type = str | None

    if isinstance(field, (ManyToOneRel, ManyToManyRel)):
        return None

    if type(field) is dict:
        # The field is created from a model_attribute not a model field
        # TODO get full field info for model_attribute fields
        return field.get("type"), field.get(default, None)

    # Assig these now as get_related_field_type may change the field
    allows_blank = bool(field.blank)
    description = description or field.help_text or field.name
    title = field.verbose_name.title()
    if field.has_default():
        if callable(field.default):
            default_factory = field.default
        else:
            default = field.default

    if field.is_relation:
        # Field will be the related_model field when appropriate after this
        field, field_type = get_related_field_type(field)
    elif field.choices:
        field_type = get_field_type_from_choices(field, schema_name, module)
    else:
        django_type = field.get_internal_type()
        field_type = FIELD_TYPE_DICT.get(django_type, "str")

        if field_type == str and not field.choices:
            min_length = getattr(field, "min_length", _Unset)
            max_length = getattr(field, "max_length", _Unset)

        # TODO Figure out why these aren't working
        # It seems like they are passed to string fields not Decimals,
        # according to:
        # https://docs.pydantic.dev/latest/api/fields/#pydantic.fields.Field
        # if field_type == Decimal and not field.choices:
        #    max_digits = getattr(field, "max_digits", _Unset)
        #    decimal_places = getattr(field, "decimal_places", _Unset)

    if allows_blank:
        field_type = Optional[field_type]

    schema_field_info = FieldInfo(
        annotation=field_type,
        default=default,
        default_factory=default_factory,
        title=title,
        description=description,
        max_digits=max_digits,
        decimal_places=decimal_places,
        min_length=min_length,
        max_length=max_length,
    )
    return field_type, schema_field_info


def create_django_schema(
    model: DjangoModel,
    include: list[str] | None = None,
    exclude: list[str] | None = None,
    model_attributes: dict[str:Any] | None = None,
    field_configs: dict[str:Any] | None = None,
    schema_name: str | None = None,
    config: ConfigDict | None = None,
    bases: List[BaseModel] | None = None,
    module: str | None = None,
    validators: dict[str, Any] | None = None,
    cls_kwargs: dict[str, Any] | None = None,
) -> BaseModel:
    """
    The function `create_django_schema` creates a Django schema based on the provided parameters and
    returns a BaseModel.

    """
    bases = list(set(bases + [DjangoSchema])) if bases else [DjangoSchema]
    if config and bases:
        raise PydanticUserError(
            "Providing both 'config' and 'bases' is prohibited.", code="config_and_bases"
        )

    if include and exclude:
        raise PydanticUserError(
            "Providing both 'include' and 'exclude' is prohibited.",
            code="in_and_exclude",
        )

    try:
        fields = model._meta.get_fields()
    except AttributeError as exc:
        raise PydanticUserError(
            f'{exc} (Could not obtain fields from the "django model" provided.)',
            code="not_a_django_model",
        ) from exc

    if not schema_name:
        schema_name = get_schema_name(model)
    module = sys.modules[module] if module else model.__module__
    field_definitions = {}
    base_model_fields = []
    for base in bases:
        for field in base.model_fields:
            if field not in base_model_fields:
                base_model_fields.append(field)

    for field in fields:
        field_name = get_field_name(field)
        if (
            field_name in field_definitions
            or field_name in base_model_fields
            or (include and field_name not in include)
            or (exclude and field_name in exclude)
        ):
            continue
        if schema_field := create_field(field, schema_name, model.__module__):
            field_definitions[field_name] = schema_field

    if model_attributes:
        for model_attribute in model_attributes:
            # Creates the BaseModel Field for the django model functions and
            # properties provided in model_attributes
            if schema_field := create_field(
                model_attribute, schema_name, model.__module__
            ):
                field_definitions[model_attribute.get("name")] = schema_field

    return create_model(
        schema_name,
        __config__=config,
        __base__=base,
        __module__=module,
        __validators__=validators,
        __cls_kwargs__=cls_kwargs,
        **field_definitions,
    )
