# -*- coding: utf-8 -*-
import warnings
from django.db import models
from django.db.utils import ProgrammingError
from django.contrib.contenttypes.models import ContentType
from django.utils.translation import gettext as _

from django_roles.models import RoleModel


# Create your models here.


LOOKUP_CHOICES = (
    ("__exact", _("Exact Match")),
    ("__contains", _("Contains")),
    ("__startswith", _("Starts With")),
    ("__endswith", _("Ends With")),
    ("__on", _("On")),
    ("__lt", _("Before")),
    ("__gt", _("After")),
    ("__lt", _("Less Than")),
    ("__gt", _("Greater Than")),
    ("__isnull", _("Blank")),
)


def add_filter_to_filter_set(
    source_model, fltr, field_name, create_filter_references=False
):
    """Adds created filters to the models filter set
    Adds filters that have not been excluded in either the
    settings.USER_QUERY configuration or in the models excluded_filter_fields
    """
    #  Only set allowed filters to the source_model.filter_set
    if (
        (
            hasattr(source_model, "filter_set")
            and hasattr(source_model, "exclude_filter_fields")
            and hasattr(source_model, "filterable_fields")
        )
        and field_name not in source_model.exclude_filter_fields
        and (
            "__all__" in source_model.filterable_fields
            or field_name in source_model.filterable_fields
        )
    ):
        source_model.filter_set[fltr.filter_name] = fltr
    if create_filter_references:
        UserFilterReference.objects.create(
            label=fltr.label,
            source_model=fltr.source_model._meta.verbose_name,
            destination_model=fltr.destination_model._meta.verbose_name
            if fltr.destination_model
            else None,
            filter_string=fltr.filter_string,
            input_type=fltr.html_input_type,
            choices=str(fltr.choices),
            help_text=fltr.help_text,
            children=str(fltr.get_children),
        )


def set_field_filters(source_model, field, parent=None):
    """Creates the filters for a model field"""
    fltr = UserFilter(field, parent=parent)
    if not fltr:
        return None
    return fltr


def set_filter_set(source_model, create_filter_references=False):
    """Creates the models filter set
    Loops through the models fields and creates a filter for each field
    adds the created filter and all of its children, if any, to the
    models filter_set dictionary.
    """
    try:
        for field in source_model._meta._get_fields():
            fltr = set_field_filters(source_model, field)
            if not fltr:
                return
            add_filter_to_filter_set(
                source_model,
                fltr,
                field.name,
                create_filter_references=create_filter_references,
            )
            for child in fltr.children:
                add_filter_to_filter_set(
                    source_model,
                    child,
                    child.field.name,
                    create_filter_references=create_filter_references,
                )
    except ProgrammingError:
        pass


class UserQueryFilterModelMixin:
    @classmethod
    def get_filter_state(cls, query_params):
        filter_state = []
        keys = list(cls.filter_set.keys())
        keys.sort()
        for k in keys:
            fltr = cls.filter_set[k]
            if not fltr.parent:
                filter_state.append(fltr.as_dict(query_params=query_params))
        return filter_state

    @classmethod
    def get_queryset(cls, user, query_params):
        return cls.objects.all()

    @classmethod
    def get_filter_list(cls):
        set_filter_set(cls)
        keys = list(cls.filter_set.keys())
        keys.sort()
        for k in keys:
            fltr = cls.filter_set[k]
            if not fltr.parent:
                cls.filter_list.append(fltr.as_dict())
        return cls.filter_list

    @classmethod
    def get_filter(cls, filter_name):
        fltr = cls.filter_set.get(filter_name)
        return fltr


class UserFilter:
    """Contains the information necessary to construct a filter or exclude statement"""

    def __init__(
        self,
        field,
        parent=None,
    ):
        self.BOOLEAN_LOOKUPS = [
            {"value": "exact", "text": _("Exact Match")},
            {"value": "blank", "text": _("Is Blank")},
        ]

        self.DATETIME_LOOKUPS = [
            {"value": "on", "text": _("On")},
            {"value": "before", "text": _("Before")},
            {"value": "after", "text": _("After")},
            {"value": "blank", "text": _("Is Blank")},
        ]

        self.NUMBER_LOOKUPS = [
            {"value": "exact", "text": _("Exact Match")},
            {"value": "less-than", "text": _("Less Than")},
            {"value": "greater-than", "text": _("Greater Than")},
            {"value": "blank", "text": _("Is Blank")},
        ]

        self.TEXT_LOOKUPS = [
            {"value": "exact", "text": _("Exact Match")},
            {"value": "contains", "text": _("Contains")},
            {"value": "starts-with", "text": _("Starts With")},
            {"value": "ends_with", "text": _("Ends With")},
            {"value": "blank", "text": _("Is Blank")},
        ]

        self.RELATED_LOOKUPS = [
            {"value": "exact", "text": _("Exact Match")},
            {"value": "blank", "text": _("Is Blank")},
        ]
        self.multiple = False  # Default for select elements
        self.element = "input"
        self.children = []
        self.html_input_type = "text"
        self.destination_model = None
        self.field = field
        self.parent = parent
        self.source_model = self.field.model
        self.set_field_attributes()
        self.filter_name = self.field.name.lower().replace(" ", "_")
        self.field_model = self.field.model
        self.help_text = getattr(self.field, "help_text", "")
        self.choices = getattr(self.field, "choices", [])
        self.filter_string = self.field.name
        self.html_label = getattr(self.field, "verbose_name", field.name)
        if self.parent:
            self.source_model = self.parent.source_model
            self.filter_string = f"{self.parent.filter_string}__{self.field.name}"
            self.filter_name = (
                f"{self.parent.filter_name}__{self.field.name}".lower().replace(
                    " ", "_"
                )
            )
            self.html_label = f"{self.parent.html_label}: {getattr(self.field, 'verbose_name', field.name)}".title()
        self.label = self.filter_name.replace("__", " > ")

        if field.is_relation:
            related_model = field.related_model
            for rel_field in related_model._meta.get_fields():
                if 1 == 1:  # try:
                    if not hasattr(related_model, "filter_set"):
                        continue

                    rel_field_related_name = getattr(rel_field, "related_name", None)
                    if not rel_field_related_name:
                        rel_field_related_name = getattr(
                            rel_field, "_related_name", None
                        )

                    if rel_field.remote_field == field:
                        continue
                    related_fltr = set_field_filters(
                        related_model, rel_field, parent=self
                    )
                    if related_fltr:
                        self.children.append(related_fltr)
                else:  # except Exception as e:
                    warnings.warn(f"Error while creating filters for {field}: {e}")

    def __repr__(self) -> str:
        return f"{self.field.name}"

    def set_field_attributes(self):
        if type(self.field) == models.fields.BigAutoField:
            self.lookups = self.NUMBER_LOOKUPS
            self.html_input_type = "number"
            self.value_type = "integer_value"
            if self.parent:
                self.label = f"{self.parent.label}: {self.field.verbose_name}"
            else:
                self.label = self.field.verbose_name
            self.element = "input"
            self.choices = self.field.choices

        elif type(self.field) == models.fields.IntegerField:
            self.lookups = self.NUMBER_LOOKUPS
            self.html_input_type = "number"
            self.value_type = "integer_value"
            if self.parent:
                self.label = f"{self.parent.label}: {self.field.verbose_name}"
            else:
                self.label = self.field.verbose_name
            self.element = "input"
            self.choices = self.field.choices

        elif type(self.field) == models.fields.FloatField:
            self.lookups = self.NUMBER_LOOKUPS
            self.html_input_type = "number"
            self.value_type = "float_value"
            if self.parent:
                self.label = f"{self.parent.label}: {self.field.verbose_name}"
            else:
                self.label = self.field.verbose_name
            self.element = "input"
            self.choices = self.field.choices

        elif type(self.field) == models.fields.DecimalField:
            self.lookups = self.NUMBER_LOOKUPS
            self.html_input_type = "number"
            self.value_type = "decimal_value"
            if self.parent:
                self.label = f"{self.parent.label}: {self.field.verbose_name}"
            else:
                self.label = self.field.verbose_name
            self.element = "input"
            self.choices = self.field.choices

        elif type(self.field) == models.fields.DateField:
            self.lookups = self.DATETIME_LOOKUPS
            self.html_input_type = "date"
            self.value_type = "date_value"
            if self.parent:
                self.label = f"{self.parent.label}: {self.field.verbose_name}"
            else:
                self.label = self.field.verbose_name
            self.element = "input"
            self.choices = self.field.choices

        elif type(self.field) == models.fields.TimeField:
            self.lookups = self.DATETIME_LOOKUPS
            self.html_input_type = "time"
            self.value_type = "time_value"
            if self.parent:
                self.label = f"{self.parent.label}: {self.field.verbose_name}"
            else:
                self.label = self.field.verbose_name
            self.element = "input"
            self.choices = self.field.choices

        elif type(self.field) == models.fields.DateTimeField:
            self.lookups = self.DATETIME_LOOKUPS
            self.html_input_type = "datetime-local"
            self.value_type = "datetime_value"
            if self.parent:
                self.label = f"{self.parent.label}: {self.field.verbose_name}"
            else:
                self.label = self.field.verbose_name
            self.element = "input"
            self.choices = self.field.choices

        elif type(self.field) == models.fields.BooleanField:
            self.lookups = self.BOOLEAN_LOOKUPS
            self.html_input_type = "text"
            self.value_type = "boolean_value"
            if self.parent:
                self.label = f"{self.parent.label}: {self.field.verbose_name}"
            else:
                self.label = self.field.verbose_name
            self.element = "checkbox"
            self.choices = self.field.choices

        elif type(self.field) == models.fields.TextField:
            self.lookups = self.TEXT_LOOKUPS
            self.html_input_type = "textfield"
            self.value_type = "text_value"
            if self.parent:
                self.label = f"{self.parent.label}: {self.field.verbose_name}"
            else:
                self.label = self.field.verbose_name
            self.element = "textarea"
            self.choices = self.field.choices

        elif type(self.field) == models.fields.json.JSONField:
            self.lookups = self.TEXT_LOOKUPS
            self.html_input_type = "textfield"
            self.value_type = "json_value"
            if self.parent:
                self.label = f"{self.parent.label}: {self.field.verbose_name}"
            else:
                self.label = self.field.verbose_name
            self.element = "textarea"
            self.choices = self.field.choices

        elif type(self.field) == models.fields.UUIDField:
            self.lookups = self.TEXT_LOOKUPS
            self.html_input_type = "text"
            self.value_type = "uuid_value"
            if self.parent:
                self.label = f"{self.parent.label}: {self.field.verbose_name}"
            else:
                self.label = self.field.verbose_name
            self.element = "input"
            self.choices = self.field.choices

        elif type(self.field) == models.fields.CharField:
            self.lookups = self.TEXT_LOOKUPS
            self.html_input_type = "text"
            self.value_type = "character_value"
            if self.parent:
                self.label = f"{self.parent.label} {self.field.verbose_name}"
            else:
                self.label = self.field.verbose_name
            self.element = "input"
            self.choices = self.field.choices

        elif type(self.field) == models.fields.GenericIPAddressField:
            self.lookups = self.TEXT_LOOKUPS
            self.html_input_type = "text"
            self.value_type = "ip_value"
            if self.parent:
                self.label = f"{self.parent.label} {self.field.verbose_name}"
            else:
                self.label = self.field.verbose_name
            self.element = "input"
            self.choices = self.field.choices

        elif type(self.field) == models.fields.UUIDField:
            self.lookups = self.TEXT_LOOKUPS
            self.html_input_type = "text"
            self.value_type = "uuid_value"
            if self.parent:
                self.label = f"{self.parent.label} {self.field.verbose_name}"
            else:
                self.label = self.field.verbose_name
            self.element = "input"

        elif type(self.field) == models.fields.EmailField:
            self.lookups = self.TEXT_LOOKUPS
            self.html_input_type = "email"
            self.value_type = "email_value"
            if self.parent:
                self.label = f"{self.parent.label}: {self.field.verbose_name}"
            else:
                self.label = self.field.verbose_name
            self.element = "input"

        elif type(self.field) == models.fields.URLField:
            self.lookups = self.TEXT_LOOKUPS
            self.html_input_type = "url"
            self.value_type = "url_value"
            if self.parent:
                self.label = f"{self.parent.label}: {self.field.verbose_name}"
            else:
                self.label = self.field.verbose_name
            self.element = "input"
            self.choices = self.field.choices

        elif type(self.field) in [
            models.fields.related.ForeignKey,
            models.fields.related.ManyToManyField,
            models.fields.related.OneToOneField,
        ]:
            self.lookups = self.RELATED_LOOKUPS
            self.html_input_type = "select"
            self.value_type = "object_id_value"
            self.destination_model = self.field.related_model
            self.choices = [
                (c.id, c.__str__()) for c in self.field.related_model.objects.all()
            ]
            if self.parent:
                self.label = f"{self.parent.label} > {self.field.verbose_name}"
            else:
                self.label = self.field.verbose_name
            self.multiple = True
            self.element = "select"
            if type(self.field) == models.fields.related.ManyToManyField:
                self.multiple = True
            else:
                self.multiple = False

        elif type(self.field) in [
            models.fields.reverse_related.ManyToManyRel,
            models.fields.reverse_related.ManyToOneRel,
            models.fields.reverse_related.OneToOneRel,
        ]:
            self.lookups = self.RELATED_LOOKUPS
            self.html_input_type = "select"
            self.value_type = "object_id_value"
            self.source_model = self.field.model
            self.destination_model = self.field.related_model
            if self.parent:
                self.label = f"{self.parent.label} > {self.field.name}"
            else:
                self.label = self.field.name
            self.multiple = True
            self.element = "select"
            if type(self.field) == models.fields.reverse_related.ManyToManyRel:
                self.multiple = True
            else:
                self.multiple = False

    @property
    def get_choices(self):
        if self.field.related_model:
            return [
                {"id": c.id, "display": c.__str__()}
                for c in self.field.related_model.objects.all()
            ]

    @property
    def get_lookups(self):
        if getattr(self.field, "blank", False):
            return self.lookups
        return self.lookups[:-1]

    def get_children(self, query_params=None):
        return [c.as_dict(query_params=query_params) for c in self.children]

    def as_dict(self, query_params=None):
        """Returns the fields in a dict sent to the UI to create filter elements"""
        if not query_params:
            query_params = {}
        lookup_initial = query_params.get(
            f"{self.filter_name}__lookup", self.lookups[0].get("value")
        )
        selected = query_params.get(f"{self.filter_name}", None)
        return {
            "label": self.html_label,
            "field": {
                "label": self.html_label,
                "name": self.filter_name,
                "element": self.element,
                "multiple": self.multiple,
                "type": self.html_input_type,
                "clearable": True,
                "help_text": self.help_text,
                "choices": self.get_choices,
                "selected": selected,
                "lookups": self.get_lookups,
                "lookup_initial": lookup_initial,
            },
            "filters": self.get_children(query_params=query_params),
        }

    def get_choice_initial(self, query_params):
        return True

    def get_lookup_initial(self, query_params):
        return self.lookups[0].get("value")

    def as_dict_old(self):
        """Returns the fields in a dict sent to the UI to create filter elements"""
        return {
            "label": self.html_label,
            "field": {
                "label": self.html_label,
                "name": self.filter_name,
                "element": self.element,
                "multiple": self.multiple,
                "type": self.html_input_type,
                "clearable": True,
                "help_text": self.help_text,
                "choices": self.get_choices,
                "lookups": self.get_lookups,
                "lookup_initial": self.lookups[0].get("value"),
            },
            "filters": self.get_children,
        }


class UserFilterReference(models.Model):
    label = models.CharField(
        max_length=250,
        verbose_name=_("Label"),
    )
    source_model = models.CharField(
        max_length=250,
        verbose_name=_("Source Model"),
    )
    destination_model = models.CharField(
        max_length=250,
        blank=True,
        null=True,
        verbose_name=_("Destination Model"),
    )
    filter_string = models.TextField(verbose_name=_("Filter String"))
    input_type = models.CharField(
        max_length=20,
        verbose_name=_("Input Type"),
    )
    children = models.JSONField(
        blank=True,
        null=True,
        verbose_name=_("Children"),
    )
    choices = models.JSONField(
        blank=True,
        null=True,
        verbose_name=_("Choices"),
    )
    help_text = models.CharField(
        max_length=250,
        verbose_name=_("Field Help"),
    )

    class Meta:
        ordering = ["label"]
        verbose_name = "User Filter Reference"
        verbose_name_plural = "User Filter References"

    def __str__(self):
        return self.label


class UserQueryValue(RoleModel):
    content_type = models.ForeignKey(
        ContentType,
        on_delete=models.CASCADE,
        related_name="userqueryvalues",
        verbose_name=_("Content Type"),
        help_text=_("The database content type of the query value."),
    )
    filter_name = models.CharField(
        max_length=250,
        verbose_name=_("Filter Name"),
        help_text=_("The name of the filter"),
    )
    lookup = models.CharField(
        max_length=12,
        choices=LOOKUP_CHOICES,
        verbose_name=_("Lookup"),
        help_text=_("Lookup"),
    )
    negate_filter = models.BooleanField(
        default=False,
        verbose_name=_("Negate Filter"),
        help_text=_("Negate the filter, excluding the value from the queryset"),
    )
    character_value = models.CharField(
        max_length=250,
        blank=True,
        null=True,
        verbose_name=_("Character"),
        help_text=_("Character Value"),
    )
    boolean_value = models.BooleanField(
        blank=True,
        null=True,
        verbose_name=_("Boolean Value"),
        help_text=_("Boolean Value"),
    )
    date_field = models.DateField(
        blank=True,
        null=True,
        verbose_name=_("Date Value"),
        help_text=_("Date Value"),
    )
    datetime_value = models.TimeField(
        blank=True,
        null=True,
        verbose_name=_("DateTime Value"),
        help_text=_("Datetime Value"),
    )
    decimal_value = models.DecimalField(
        decimal_places=10,
        max_digits=19,
        blank=True,
        null=True,
        verbose_name=_("Decimal Value"),
        help_text=_("Decimal Value"),
    )
    email_value = models.EmailField(
        blank=True,
        null=True,
        verbose_name=_("Email Value"),
        help_text=_("Email Value"),
    )
    float_value = models.FloatField(
        blank=True,
        null=True,
        verbose_name=_("Float Value"),
        help_text=_("Float Value"),
    )
    ip_value = models.GenericIPAddressField(
        blank=True,
        null=True,
        verbose_name=_("IP Value"),
        help_text=_("IP Value"),
    )
    integer_value = models.IntegerField(
        blank=True,
        null=True,
        verbose_name=_("Integer Value"),
        help_text=_("Integer Value"),
    )
    json_value = models.JSONField(
        blank=True,
        null=True,
        verbose_name=_("JSON Value"),
        help_text=_("JSON Value"),
    )
    text_value = models.TextField(
        blank=True,
        null=True,
        verbose_name=_("Text Value"),
        help_text=_("Text Value"),
    )
    time_value = models.TimeField(
        blank=True,
        null=True,
        verbose_name=_("Time Value"),
        help_text=_("Time Value"),
    )
    url_value = models.URLField(
        blank=True,
        null=True,
        verbose_name=_("URL Value"),
        help_text=_("URL Value"),
    )
    uuid_value = models.UUIDField(
        blank=True,
        null=True,
        max_length=32,
        verbose_name=_("UUID Value"),
        help_text=_("UUID Value"),
    )
    object_id_value = models.UUIDField(
        blank=True,
        null=True,
        max_length=32,
        verbose_name=_("Object ID Value"),
        help_text=_("Object ID Value"),
    )

    class Meta:
        verbose_name = _("User Query Value")
        verbose_name_plural = _("User Query Values")

    def __str__(self):
        return f"{self.filter_name} {self.lookup}: {self.value}"

    @property
    def value(self):
        fltr = self.content_type.model_class().get_filter(self.filter_name)
        return getattr(self, fltr.value_type, "No Value")

    def get_queryset(self):
        """Queries the db and returns the queryset for the filter"""
        model_class = self.content_type.model_class()
        fltr = model_class.filter_set.get(self.filter_name)
        negate = "~" if self.negate_filter else ""
        return model_class.objects.filter(
            **{f"{negate}{fltr.filter_string}{self.lookup}": self.value}
        )


class UserQuery(RoleModel):
    """User defined queries"""

    name = models.CharField(
        max_length=250,
        verbose_name=_("Name"),
        help_text=_("The name of the Query"),
    )
    content_type = models.ForeignKey(
        ContentType,
        on_delete=models.CASCADE,
        related_name="userqueries",
        # limit_choices_to=get_query_content_types(),
        verbose_name=_("Content Type"),
        help_text=_("The database content type of the query."),
    )
    negate_results = models.BooleanField(
        default=False,
        verbose_name=_("Negate Results"),
        help_text=_("Negate the results, excluding all matches from the queryset"),
    )
    match_all_values = models.BooleanField(
        default=True,
        verbose_name=_("Match All Values"),
        help_text=_("If selected, All values must match, otherwise match any"),
    )
    user_query_values = models.ManyToManyField(
        "UserQueryValue",
        blank=True,
        related_name="userqueries",
        verbose_name=_("User Query Values"),
        help_text=_("User query values matched"),
    )
    match_all_sub_queries = models.BooleanField(
        default=True,
        verbose_name=_("Match All Sub Queries"),
        help_text=_("If selected, All sub-queries must match, otherwise match any"),
    )
    sub_queries = models.ManyToManyField(
        "self",
        blank=True,
        verbose_name=_("Sub Queries"),
        help_text=_("User queries matched"),
    )

    class Meta:
        verbose_name = _("User Query")
        verbose_name_plural = _("User Queries")

    def __str__(self):
        return f"{self.content_type.model_class()._meta.verbose_name}: {self.name}"
