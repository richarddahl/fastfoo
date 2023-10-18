# -*- coding: utf-8 -*-
import warnings

from django.core.management.base import BaseCommand
from django.contrib.contenttypes.models import ContentType
from django.conf import settings

from django_userqueries.models import FilterReference, set_filter_set


class Command(BaseCommand):
    help = "Creates initial FilterSets"

    def handle(self, *args, **options):
        """ """
        FilterReference.objects.all().delete()
        for source_content_type in ContentType.objects.exclude(
            app_label__in=settings.USER_QUERIES.get("EXCLUDE_APP_LABELS", [])
        ):
            source_model = source_content_type.model_class()
            if not source_model:  # Cleans up vestigal ContentType Entries
                source_content_type.delete()
                continue
            try:
                set_filter_set(source_model, create_filter_references=True)
            except AttributeError as e:
                warnings.warn(
                    f"Create User Filter Reference failed for {source_model} with the error {e}"
                )
