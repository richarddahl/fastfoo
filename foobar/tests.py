import json

from django.test import TestCase
from django.contrib.auth.models import Group

from foobar.models import Foo, Bar, Baz


# Create your tests here.


def create_test_data():
    for i in range(1, 100):
        Bar.objects.create(
            name=f"Bar {i}",
        )
    for i in range(1, 500):
        Baz.objects.create(
            name=f"Baz {i}",
        )
    for i in range(1, 5000):
        Foo.objects.create(
            name=f"Foo {i}",
            text=f"this is the text of Foo {i}",
            bar=Bar.objects.all().first(),
        )
