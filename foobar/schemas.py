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

FooFullSchema = create_django_schema(
    Foo,
    schema_name="FooFullSchema",
    # field_configs=[{"bar": {"field_type": "BarSchema"}}],
    base=FooBaseSchema,
)


BarSchema = create_django_schema(
    Bar,
    schema_name="BarSchema",
)


BazSchema = create_django_schema(
    Baz,
    schema_name="BazSchema",
)
