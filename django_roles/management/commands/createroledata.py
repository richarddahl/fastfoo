# -*- coding: utf-8 -*-
# Copyright 2014-2018 cmplid:// Inc. Use Subject to Terms of License.
from django.core.management.base import BaseCommand

from django.contrib.auth.models import Group
from django.contrib.auth.hashers import make_password

from django_roles.models import RoleUser, Organization
from django_roles.test_data import (
    USER_DEFINITIONS,
    GROUP_DEFINITIONS,
    ORGANIZATION_DEFINITIONS,
)


class Command(BaseCommand):
    help = "Loads initial Role Data for manual testing and development"

    def handle(self, *args, **options):
        """ """
        for group_def in GROUP_DEFINITIONS:
            Group.objects.get_or_create(name=group_def.get("name"))
        for org_def in ORGANIZATION_DEFINITIONS:
            Organization.objects.get_or_create(name=org_def.get("name"))
        for user_def in USER_DEFINITIONS:
            user, c = RoleUser.objects.get_or_create(email=user_def.get("email"))
            password = make_password("thisisabadtoken")
            user.password = password
            user.organization = Organization.objects.get(name=user_def.get("org_name"))
            if user_def.get("is_superuser", False):
                user.is_superuser = True
                user.is_staff = True
            for g in user_def.get("group_names", []):
                user.groups.add(Group.objects.get(name=g))
            user.save()
