from collections import OrderedDict

from django.forms import models
from django.forms import fields
from django.db.models.enums import ChoicesMeta


class ZKModelForm(models.ModelForm):
    """Base Model Form for use with the Zero Knowledge web interface"""

    def configure_fields(self):
        pass

    def as_dict(self, *args, **kwargs):
        form_dict = OrderedDict()
        field_list = []
        form_dict["non_field_errors"] = self.non_field_errors()
        form_dict["prefix"] = self.prefix
        form_dict["errors"] = self.errors
        for field_name, field in self.fields.items():
            field_list.append(
                self.get_field_dict(
                    field_name, field, self.initial.get(field_name, None)
                )
            )
        form_dict["fields"] = field_list
        return form_dict

    def get_field_dict(self, field_name, field, field_initial):
        field_dict = {
            "name": field_name,
            "label": field.label,
            "initial": field_initial,
            "help_text": field.help_text,
            "required": field.required,
            "disabled": field.disabled,
        }
        if not field.required:
            field_dict = field_dict | {"clearable": "clearable"}

        if (
            isinstance(field, fields.IntegerField)
            or isinstance(field, fields.FloatField)
            or isinstance(field, fields.DecimalField)
        ):
            return field_dict | {
                "element": "input",
                "type": "number",
                "max_value": field.max_value,
                "min_value": field.min_value,
                "step_size": field.step_size,
            }

        if isinstance(field, fields.DateField):
            return field_dict | {
                "element": "input",
                "type": "date",
            }

        if isinstance(field, fields.TimeField):
            return field_dict | {
                "element": "input",
                "type": "time",
            }

        if isinstance(field, fields.DateTimeField):
            return field_dict | {
                "element": "input",
                "type": "datetime-local",
            }

        if isinstance(field, fields.EmailField):
            return field_dict | {
                "element": "input",
                "type": "email",
                "max_length": field.max_length,
                "min_length": field.min_length,
                "empty_value": field.empty_value,
            }

        #if isinstance(field, fields.FileField):
        #    return field_dict | {
        #        "label": field_name,
        #        "element": "input",
        #        "type": "file",
        #        "max_length": field.max_length,
        #        "allow_empty_file": field.allow_empty_file,
        #        "initial": field_initial,
        #        "help_text": field.help_text,
        #        "required": field.required,
        #    }

        if isinstance(field, fields.ImageField):
            return field_dict | {
                "element": "input",
                "type": "image",
            }

        if isinstance(field, fields.URLField):
            return field_dict | {
                "element": "input",
                "type": "url",
                "empty_value": field.empty_value,
            }

        if isinstance(field, fields.BooleanField):
            return field_dict | {
                "element": "checkbox",
                "checked": True if field.initial is True else False,
            }

        if isinstance(field, models.ModelMultipleChoiceField):
            return field_dict | {
                "element": "select",
                "multiple": "multiple",
                "choices": [
                    {"id": v.id, "display": v.__str__()} for v in field.queryset
                ],
            }
        if isinstance(field, models.ModelChoiceField):
            return field_dict | {
                "element": "select",
                "multiple": False,
                "choices": [
                    {"id": v.id, "display": v.__str__()} for v in field.queryset
                ],
            }

        if isinstance(field, fields.MultipleChoiceField) or isinstance(
            field, fields.TypedMultipleChoiceField
        ):
            if isinstance(field.choices, ChoicesMeta):
                choices = field.choices.choices
            else:
                choices = field._choices()
            return field_dict | {
                "element": "select",
                "mutiple": "mutiple",
                "choices": choices,
            }

        if isinstance(field, fields.ChoiceField) or isinstance(
            field, fields.TypedChoiceField
        ):
            if isinstance(field.choices, ChoicesMeta):
                choices = field.choices.choices
            else:
                choices = field._choices()
            return field_dict | {
                "element": "select",
                "choices": choices,

            }

        if isinstance(field, fields.GenericIPAddressField):
            return field_dict | {
                "element": "input",
                "type": "text",
                "max_length": field.max_length,
                "min_length": field.min_length,
                "empty_value": field.empty_value,
            }

        if isinstance(field, fields.SlugField):
            return field_dict | {
                "element": "input",
                "type": "text",
                "max_length": field.max_length,
                "min_length": field.min_length,
                "empty_value": field.empty_value,
            }

        if isinstance(field, fields.UUIDField):
            return field_dict | {
                "element": "input",
                "type": "text",
                "max_length": 32, # so the zkUI will show an input not textarea
                "empty_value": field.empty_value,
            }

        if isinstance(field, fields.JSONField):
            return field_dict | {
                "element": "textarea",
                "empty_value": field.empty_value,
            }

        if isinstance(field, fields.CharField):
            if field.max_length:
                return field_dict | {
                    "element": "input",
                    "type": "text",
                    "max_length": field.max_length,
                    "min_length": field.min_length,
                    "empty_value": field.empty_value,
                }
            return field_dict | {
                "element": "textarea",
                "empty_value": field.empty_value,
            }
