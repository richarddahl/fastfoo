# Generated by Django 4.2.4 on 2023-08-22 20:06

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("auth", "0012_alter_user_first_name_max_length"),
        ("django_roles", "0001_initial"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("django_userqueries", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="userquery",
            name="group",
            field=models.ForeignKey(
                help_text="The group that owns the %(class)s",
                on_delete=django.db.models.deletion.CASCADE,
                related_name="%(app_label)s_%(class)s",
                related_query_name="%(app_label)s_%(class)ss",
                to="auth.group",
                verbose_name="Group",
            ),
        ),
        migrations.AlterField(
            model_name="userquery",
            name="organization",
            field=models.ForeignKey(
                help_text="The organization that owns the %(class)s",
                on_delete=django.db.models.deletion.CASCADE,
                related_name="%(app_label)s_%(class)s",
                related_query_name="%(app_label)s_%(class)ss",
                to="django_roles.organization",
                verbose_name="Organization",
            ),
        ),
        migrations.AlterField(
            model_name="userquery",
            name="user",
            field=models.ForeignKey(
                help_text="The user that owns the %(class)s",
                on_delete=django.db.models.deletion.CASCADE,
                related_name="%(app_label)s_%(class)s",
                related_query_name="%(app_label)s_%(class)ss",
                to=settings.AUTH_USER_MODEL,
                verbose_name="User",
            ),
        ),
        migrations.AlterField(
            model_name="userqueryvalue",
            name="group",
            field=models.ForeignKey(
                help_text="The group that owns the %(class)s",
                on_delete=django.db.models.deletion.CASCADE,
                related_name="%(app_label)s_%(class)s",
                related_query_name="%(app_label)s_%(class)ss",
                to="auth.group",
                verbose_name="Group",
            ),
        ),
        migrations.AlterField(
            model_name="userqueryvalue",
            name="organization",
            field=models.ForeignKey(
                help_text="The organization that owns the %(class)s",
                on_delete=django.db.models.deletion.CASCADE,
                related_name="%(app_label)s_%(class)s",
                related_query_name="%(app_label)s_%(class)ss",
                to="django_roles.organization",
                verbose_name="Organization",
            ),
        ),
        migrations.AlterField(
            model_name="userqueryvalue",
            name="user",
            field=models.ForeignKey(
                help_text="The user that owns the %(class)s",
                on_delete=django.db.models.deletion.CASCADE,
                related_name="%(app_label)s_%(class)s",
                related_query_name="%(app_label)s_%(class)ss",
                to=settings.AUTH_USER_MODEL,
                verbose_name="User",
            ),
        ),
    ]
