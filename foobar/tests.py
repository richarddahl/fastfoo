import json

from django.test import TestCase
from django.contrib.auth.models import Group

from django_roles.tests import load_test_roles_content
from django_roles.models import RoleUser, Organization

from foobar.models import Foo, Bar, Baz


# Create your tests here.


def create_test_data():
    for i in range(1, 10):
        Bar.objects.create(
            user=RoleUser.objects.get(email="user_one@org_one.com"),
            group=Group.objects.get(name="group one"),
            organization=Organization.objects.get(name="org one"),
            name=f"Bar {i}",
        )
    for i in range(1, 100):
        Baz.objects.create(
            user=RoleUser.objects.get(email="user_two@org_one.com"),
            group=Group.objects.get(name="group two"),
            organization=Organization.objects.get(name="org two"),
            name=f"Baz {i}",
        )
    for i in range(1, 100):
        for user in RoleUser.objects.all():
            Foo.objects.create(
                user=user,
                group=user.groups.first(),
                organization=user.organization,
                name=f"Foo {i} - {user.email}",
                text=f"this is the text of Foo {i} - {user.email}",
                bar=Bar.objects.all().first(),
            )
