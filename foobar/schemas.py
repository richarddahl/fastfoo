from .models import Foo, Bar, Baz
from django_schema import DjBaseModel


class FooSchema(DjBaseModel):

    class Config:
        model = Foo


class BarSchema(DjBaseModel):

    class Config:
        model = Bar


class BazSchema(DjBaseModel):

    class Config:
        model = Baz
