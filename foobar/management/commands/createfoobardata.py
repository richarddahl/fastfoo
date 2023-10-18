# -*- coding: utf-8 -*-
# Copyright 2014-2018 cmplid:// Inc. Use Subject to Terms of License.
from django.core.management.base import BaseCommand

from django.contrib.auth.models import Group
from django.contrib.auth.hashers import make_password

from foobar.tests import create_test_data


class Command(BaseCommand):
    help = "Loads initial FooBar Data for manual testing and development"

    def handle(self, *args, **options):
        """ """
        create_test_data()
