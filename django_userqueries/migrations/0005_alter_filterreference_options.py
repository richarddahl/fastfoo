# Generated by Django 4.2.4 on 2023-09-05 17:57

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("django_userqueries", "0004_alter_userqueryvalue_lookup"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="filterreference",
            options={
                "ordering": ["label"],
                "verbose_name": "UserFilter Reference",
                "verbose_name_plural": "UserFilter References",
            },
        ),
    ]
