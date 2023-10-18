import django.db.models as django_models
from django.utils.translation import gettext as _

from django_roles.models import RoleModel
from django_zk_backend.zk_model import ZKModel
from django_userqueries.models import UserQueryFilterModelMixin


# Create your models here.


class Foo(RoleModel, ZKModel, UserQueryFilterModelMixin):
    """Foo"""

    filter_list = []
    filter_set = {}
    filterable_fields = ["__all__"]
    exclude_filter_fields = ["id"]
    ordering_list = [
        {"label": "Name", "value": "name"},
        {"label": "Text", "value": "text"},
        {"label": "Bar", "value": "bar"},
    ]

    name = django_models.CharField(
        max_length=250,
        verbose_name=_("Name"),
        help_text=_("100 characters or less"),
    )
    text = django_models.TextField(
        verbose_name=_("Text"),
        help_text=_("Text"),
    )
    bar = django_models.ForeignKey(
        "Bar",
        on_delete=django_models.CASCADE,
        related_name="foos",
        verbose_name=_("Bar"),
        help_text=_("FK to Bar"),
    )
    bazzes = django_models.ManyToManyField(
        "Baz",
        blank=True,
        related_name="foos",
        verbose_name=_("Bazzes"),
        help_text=_("Optional list of Bazzes"),
    )
    boolean_field = django_models.BooleanField(
        blank=True,
        null=True,
        verbose_name=_("Boolean Field"),
        help_text=_("Optional Boolean Value"),
    )
    date_field = django_models.DateField(
        blank=True,
        null=True,
        verbose_name=_("Date Field"),
        help_text=_("Optional Date Value"),
    )
    datetime_field = django_models.DateTimeField(
        blank=True,
        null=True,
        verbose_name=_("DateTime Field"),
        help_text=_("Optional Datetime Value"),
    )
    decimal_field = django_models.DecimalField(
        decimal_places=10,
        max_digits=19,
        blank=True,
        null=True,
        verbose_name=_("Decimal Field"),
        help_text=_("Optional Decimal Value"),
    )
    email_field = django_models.EmailField(
        blank=True,
        null=True,
        verbose_name=_("Email Field"),
        help_text=_("Optional Email Value"),
    )
    float_field = django_models.FloatField(
        blank=True,
        null=True,
        verbose_name=_("Float Field"),
        help_text=_("Optional Float Value"),
    )
    ip_field = django_models.GenericIPAddressField(
        blank=True,
        null=True,
        verbose_name=_("IP Field"),
        help_text=_("Optional IP Value"),
    )
    integer_field = django_models.IntegerField(
        blank=True,
        null=True,
        verbose_name=_("Integer Field"),
        help_text=_("Optional Integer Value"),
    )
    json_field = django_models.JSONField(
        blank=True,
        null=True,
        verbose_name=_("JSON Field"),
        help_text=_("Optional JSON Value"),
    )
    text_field = django_models.TextField(
        blank=True,
        null=True,
        verbose_name=_("Text Field"),
        help_text=_("Optional Text Value"),
    )
    time_field = django_models.TimeField(
        blank=True,
        null=True,
        verbose_name=_("Time Field"),
        help_text=_("Optional Time Value"),
    )
    url_field = django_models.URLField(
        blank=True,
        null=True,
        verbose_name=_("URL Field"),
        help_text=_("Optional URL Value"),
    )
    uuid_field = django_models.UUIDField(
        blank=True,
        null=True,
        max_length=32,
        verbose_name=_("UUID Field"),
        help_text=_("Optional UUID Value"),
    )

    class Meta:
        ordering = ["name"]
        verbose_name = _("Foo")
        verbose_name_plural = _("Foos")

    def __str__(self):
        return self.name

    @property
    def summary(self):
        """The fields that are displayed in the ZK Interfaces tile subtitle"""
        return self.text

    @property
    def title(self):
        return self.name


class Bar(RoleModel, ZKModel, UserQueryFilterModelMixin):
    """Bar"""

    filter_list = []
    filter_set = {}
    filterable_fields = ["__all__"]
    exclude_filter_fields = ["id"]
    ordering_list = [
        {"label": "Name", "value": "name"},
        {"label": "Bar Type", "value": "bar_type"},
    ]

    BAR_TYPE_CHOICES = (
        ("s", _("Simple")),
        ("x", _("Complex")),
        ("c", _("Compound")),
    )
    name = django_models.CharField(
        max_length=250,
        verbose_name=_("Name"),
        help_text=_("The name of the Bar."),
    )
    bar_type = django_models.CharField(
        max_length=1,
        default="s",
        choices=BAR_TYPE_CHOICES,
        verbose_name=_("Bar Type"),
        help_text=_("The type of Bar."),
    )

    class Meta:
        ordering = ["name"]
        verbose_name = _("Bar")
        verbose_name_plural = _("Bars")

    def __str__(self):
        return self.name

    @property
    def summary(self):
        """The fields that are displayed in the ZK Interfaces tile subtitle"""
        return "Click for more..."

    @property
    def title(self):
        return self.name


class Baz(RoleModel, ZKModel, UserQueryFilterModelMixin):
    """Baz"""

    filter_list = []
    filter_set = {}
    filterable_fields = ["__all__"]
    exclude_filter_fields = ["id"]
    ordering_list = [
        {"label": "Name", "value": "name"},
    ]

    name = django_models.CharField(
        max_length=50,
        verbose_name=_("Name"),
        help_text=_("The name of the Baz."),
    )

    class Meta:
        ordering = ["name"]
        verbose_name = _("Baz")
        verbose_name_plural = _("Bazzes")

    def __str__(self):
        return self.name
