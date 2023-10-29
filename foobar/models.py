from django.db import models
from django.utils.translation import gettext as _


# Create your models here.
class Foo(models.Model):
    """Foo"""

    name = models.CharField(
        max_length=250,
        verbose_name=_("Name"),
        help_text=_("100 characters or less"),
    )
    text = models.TextField(
        verbose_name=_("Text"),
        help_text=_("Text"),
    )
    bar = models.ForeignKey(
        "Bar",
        on_delete=models.CASCADE,
        related_name="foos",
        verbose_name=_("Bar"),
        help_text=_("FK to Bar"),
    )
    bazzes = models.ManyToManyField(
        "Baz",
        blank=True,
        related_name="foos",
        verbose_name=_("Bazzes"),
        help_text=_("Optional list of Bazzes"),
    )
    boolean_field = models.BooleanField(
        blank=True,
        null=True,
        verbose_name=_("Boolean Field"),
        help_text=_("Optional Boolean Value"),
    )
    date_field = models.DateField(
        blank=True,
        null=True,
        verbose_name=_("Date Field"),
        help_text=_("Optional Date Value"),
    )
    datetime_field = models.DateTimeField(
        blank=True,
        null=True,
        verbose_name=_("DateTime Field"),
        help_text=_("Optional Datetime Value"),
    )
    decimal_field = models.DecimalField(
        decimal_places=10,
        max_digits=19,
        blank=True,
        null=True,
        verbose_name=_("Decimal Field"),
        help_text=_("Optional Decimal Value"),
    )
    email_field = models.EmailField(
        blank=True,
        null=True,
        verbose_name=_("Email Field"),
        help_text=_("Optional Email Value"),
    )
    float_field = models.FloatField(
        blank=True,
        null=True,
        verbose_name=_("Float Field"),
        help_text=_("Optional Float Value"),
    )
    ip_field = models.GenericIPAddressField(
        blank=True,
        null=True,
        verbose_name=_("IP Field"),
        help_text=_("Optional IP Value"),
    )
    integer_field = models.IntegerField(
        blank=True,
        null=True,
        verbose_name=_("Integer Field"),
        help_text=_("Optional Integer Value"),
    )
    json_field = models.JSONField(
        blank=True,
        null=True,
        verbose_name=_("JSON Field"),
        help_text=_("Optional JSON Value"),
    )
    text_field = models.TextField(
        blank=True,
        null=True,
        verbose_name=_("Text Field"),
        help_text=_("Optional Text Value"),
    )
    time_field = models.TimeField(
        blank=True,
        null=True,
        verbose_name=_("Time Field"),
        help_text=_("Optional Time Value"),
    )
    url_field = models.URLField(
        blank=True,
        null=True,
        verbose_name=_("URL Field"),
        help_text=_("Optional URL Value"),
    )
    uuid_field = models.UUIDField(
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

    def __str__(self) -> str:
        return self.name

    @property
    def summary(self) -> str:
        """The fields that are displayed in the ZK Interfaces tile subtitle"""
        return self.text

    @property
    def title(self) -> str:
        return self.name

    def add_2_3(self) -> int:
        return 2 + 3


class Bar(models.Model):
    """Bar"""

    BAR_TYPE_CHOICES = (
        ("s", _("Simple")),
        ("x", _("Complex")),
        ("c", _("Compound")),
    )
    name = models.CharField(
        max_length=250,
        verbose_name=_("Name"),
        help_text=_("The name of the Bar."),
    )
    bar_type = models.CharField(
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


class Baz(models.Model):
    """Baz"""

    name = models.CharField(
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
