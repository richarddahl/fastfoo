import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "foo.settings")
django.setup()
