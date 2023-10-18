from django.contrib import admin
from django_userqueries.models import UserFilterReference, UserQueryValue, UserQuery

# Register your models here.


admin.site.register(UserFilterReference)
admin.site.register(UserQueryValue)
admin.site.register(UserQuery)
