import uuid
from django.db import models as django_models
from django.forms import models as django_forms

from django.utils import timezone
from django.urls import reverse
from django.utils.translation import gettext_lazy as _
from django.core.mail import send_mail
from django.contrib.auth.models import (
    Group,
    Permission,
    AbstractBaseUser,
    PermissionsMixin,
)
from django.core.validators import EmailValidator
from django.contrib.auth.base_user import BaseUserManager

# Create your models here.


class RoleUserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError("The given email must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_staff", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")

        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self._create_user(email, password, **extra_fields)


class RoleUser(AbstractBaseUser, PermissionsMixin):
    """
    Implements a fully featured user model with admin-compliant
    permissions.  Provides the additional fields: is_superuser and groups
    from the PermissionsMixin
    """
    exclude_filter_fields = ["id", "first_name", "last_name", "email", "user_permissions", "password"]

    USER_TYPE_CHOICES = (
        ("i", _("Individual")),
        ("s", _("Small Business")),
        ("c", _("Corporate")),
        ("e", _("Enterprise")),
    )
    username_validator = EmailValidator()

    username = None
    id = django_models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_type = django_models.CharField(
        max_length=1,
        choices=USER_TYPE_CHOICES,
        default="i",
        verbose_name=_("User Type"),
    )
    email = django_models.EmailField(
        unique=True,
        verbose_name=_("Email"),
    )
    first_name = django_models.CharField(
        max_length=150,
        blank=True,
        verbose_name=_("First Name"),
    )
    last_name = django_models.CharField(
        max_length=150,
        blank=True,
        verbose_name=_("Last Name"),
    )
    organization = django_models.ForeignKey(
        "Organization",
        on_delete=django_models.CASCADE,
        blank=True,
        null=True,
        related_name="users",
        verbose_name=_("Organization"),
        help_text=_("The user's organization"),
    )
    is_staff = django_models.BooleanField(
        default=False,
        verbose_name=_("Is Staff"),
        help_text=_("Designates whether the user can log into the admin site"),
    )
    is_active = django_models.BooleanField(
        default=True,
        verbose_name=_("Is Active"),
        help_text=_(
            "Designates whether this user should be treated as active "
            "Unselect this instead of deleting accounts"
        ),
    )
    date_joined = django_models.DateTimeField(
        default=timezone.now,
        verbose_name=_("Date Joined"),
    )
    groups = django_models.ManyToManyField(
        Group,
        related_name="users",
        verbose_name=_("Groups"),
    )
    user_permissions = django_models.ManyToManyField(
        Permission,
        related_name="RoleUsers",
        verbose_name=_("Permissions"),
    )

    objects = RoleUserManager()

    EMAIL_FIELD = "email"
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = _("Role User")
        verbose_name_plural = _("Role Users")

    def __str__(self):
        return f"{self.email}"

    def get_full_name(self):
        """
        Returns the first_name plus the last_name, with a space in between.
        """
        full_name = f"{self.first_name} {self.last_name}"
        return full_name.strip()

    def get_short_name(self):
        """
        Returns the short name for the user.
        """
        return self.first_name

    def email_user(self, subject, message, from_email=None, **kwargs):
        """
        Sends an email to this User.
        """
        send_mail(subject, message, from_email, [self.email], **kwargs)


class Organization(django_models.Model):#, UserQueryFilterModelMixin):
    """Defines a customer organization

    Args:
        models (_type_): _description_
    """
    exclude_filter_fields = ["id"]

    id = django_models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = django_models.CharField(
        max_length=250,
        verbose_name=_("Name"),
        help_text=_("The name of the organization"),
    )

    class Meta:
        verbose_name = _("Organization")
        verbose_name_plural = _("Organizations")

    def __str__(self):
        return f"{self.name}"


class RoleModel(django_models.Model):
    id = django_models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = django_models.ForeignKey(
        RoleUser,
        on_delete=django_models.CASCADE,
        related_name="%(app_label)s_%(class)s",
        related_query_name="%(app_label)s_%(class)ss",
        verbose_name=_("User"),
        help_text=_("The user that owns the object"),
    )
    group = django_models.ForeignKey(
        Group,
        on_delete=django_models.CASCADE,
        related_name="%(app_label)s_%(class)s",
        related_query_name="%(app_label)s_%(class)ss",
        verbose_name=_("Group"),
        help_text=_("The group that owns the object"),
    )
    organization = django_models.ForeignKey(
        Organization,
        on_delete=django_models.CASCADE,
        related_name="%(app_label)s_%(class)s",
        related_query_name="%(app_label)s_%(class)ss",
        verbose_name=_("Organization"),
        help_text=_("The organization that owns the object"),
    )
    is_active = django_models.BooleanField(
        default=True,
        verbose_name=_("Is Active"),
        help_text=_(
            "Designates whether the object is active "
            "Unselect this instead of deleting objects"
        ),
    )
    created = django_models.DateTimeField(
        auto_now_add=True,
        verbose_name=_("Created"),
        help_text=_("The date and time the object was created."),
    )
    modified = django_models.DateTimeField(
        auto_now=True,
        verbose_name=_("Modified"),
        help_text=_("The date and time the object was last modified."),
    )

    class Meta:
        abstract = True

    @property
    def get_absolute_url(self):
        return None
        return reverse(
            f"{self._meta.verbose_name.lower().replace(' ', '')}-detail",
            kwargs={"pk": self.pk},
        )


class RoleModelForm(django_forms.ModelForm):
    """Base Model Form for providing role base authorization"""

    def __init__(self, *args, **kwargs):
        """Sets up the user, group, and organization fields"""
        super().__init__(*args, **kwargs)

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
