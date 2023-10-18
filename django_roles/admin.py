from django.contrib import admin
from django_roles.models import RoleUser, Organization

# Register your models here.


admin.site.register(RoleUser)
admin.site.register(Organization)
