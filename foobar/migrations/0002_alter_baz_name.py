# Generated by Django 5.0a1 on 2023-10-30 19:04

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("foobar", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="baz",
            name="name",
            field=models.CharField(
                help_text="The name of the Baz.",
                max_length=50,
                unique=True,
                verbose_name="Name",
            ),
        ),
    ]
