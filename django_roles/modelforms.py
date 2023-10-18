from django.forms import models as django_forms

from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import (
    Group,
)

from django_roles.models import RoleUser, Organization

# Create your models here.


class RoleModelForm(django_forms.ModelForm):
    """Base Model Form for use with the Zero Knowledge web interface"""

    def __init__(self, *args, **kwargs):
        """Sets up the user, group, and organization fields"""
        self.filters = kwargs.pop("filters", None)
        self.user = kwargs.pop("user", None)
        super().__init__(*args, **kwargs)
        self.configure_fields()
        # This is where model specific field manipulation happens, if needed

        if self.user:
            user_queryset = RoleUser.objects.filter(id=self.user.id)
            self.fields["user"].queryset = user_queryset
            self.initial["user"] = user_queryset.first().id

            group_queryset = Group.objects.filter(users__id=self.user.id)
            self.fields["group"].queryset = group_queryset
            self.initial["group"] = group_queryset.first().id

            organization_queryset = Organization.objects.filter(users__id=self.user.id)
            self.fields["organization"].queryset = organization_queryset
            self.initial["organization"] = organization_queryset.first().id

        self.configure_fields()
        # This is where model specific field manipulation happens, if needed