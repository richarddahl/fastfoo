from django.shortcuts import render

from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.contrib.contenttypes.models import ContentType
from django.views import View
from django.http import JsonResponse


from .models import UserQuery


# Create your views here.


@method_decorator(login_required, name="dispatch")
class FilterView(View):
    """Provides the filters for a model"""

    def get(self, request, model=None):
        """returns the filters for the model

        """
        model_class = ContentType.objects.get(model=model).model_class()
        return JsonResponse(
            {
                "filters": model_class.filter_list,
                "sorting": model_class.ordering_list,
                "queries": list(UserQuery.objects.filter(content_type__model=model).values_list("id", "name")),
            },
        )
