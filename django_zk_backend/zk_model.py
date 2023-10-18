from django.urls import reverse
from django.utils.translation import gettext_lazy as _
from django.db import models as django_models

# Create your models here.


class ZKModel(django_models.Model):

    class Meta:
        abstract = True

    @classmethod
    def tile_fields(cls):
        """Returns a list of the fields that will be displayed on the ZK Interface tile
        Override this on model to change fields.
        """
        return ["title", "summary", "href"]

    @property
    def title(self):
        return self.__str__()

    @property
    def summary(self):
        return _("Show more ...")

    @property
    def href(self):
        return self.get_absolute_url

    def truncate_text(self, text):
        """Truncates text

        if necessary truncates the text to the words in the first 55 characters
        or returns the first line of the text if less than 55 characters
        or returns the original text
        """
        if "\r\n" in text:
            first_line = text.rsplit("\r\n")[0]
            if len(first_line) < 55:
                return first_line
            substring = first_line[:50]
            words = substring.rsplit(" ")
            return f'{" ".join(words)}...'
        elif len(text) < 55:
            return text
        else:
            substring = text[:50]
            words = substring.rsplit(" ")
            return f'{" ".join(words)}...'
