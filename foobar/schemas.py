from typing import List, Any

from .models import Foo, Bar, Baz
from django_schema import create_django_schema


FooBaseSchema = create_django_schema(
    Foo,
    schema_name="FooBaseSchema",
    include=["id", "name", "text"],
    model_attributes=[
        {
            "name": "title",
            "type": str,
            "title": "Foo Title",
            "description": "The title property of the Foo",
            "default": None,
        },
        {
            "name": "add_2_3",
            "type": int,
            "title": "Add 2 + 3",
            "description": "Just a little addition",
            "default": None,
        },
    ],
)

BarSchema = create_django_schema(
    Bar,
    schema_name="BarSchema",
)


BazSchema = create_django_schema(
    Baz,
    schema_name="BazSchema",
    model_attributes=[
        {
            "name": "related_foos",
            "type": List[dict[str, Any]],
            "title": "Related Foos",
            "description": "All the Foos related to this Baz",
            "default": None,
        },
    ],
)

BazCreateSchema = create_django_schema(
    Baz,
    exclude=["id"],
    schema_name="BazCreateSchema",
)

FooFullSchema = create_django_schema(
    Foo,
    schema_name="FooFullSchema",
    # field_configs=[{"bar": {"field_type": "BarSchema"}}],
    bases=[FooBaseSchema],
)

# called to prevent exception upon uvicorn startup
# about BarSchema not existing yet, due to it's
# use of a typing.ForwardRef
FooFullSchema.model_rebuild()
