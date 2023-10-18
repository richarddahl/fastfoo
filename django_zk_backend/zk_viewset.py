from rest_framework import viewsets
from rest_framework.response import Response


# Create your views here.


class ZKModelViewSet(viewsets.ModelViewSet):
    """
    Super class for ZKModel serializers that:
        list:
            accepts the display parameter
            filters the queryset
        retrieve:
            accepts the display parameter
            returns either base serializer data (display=None) or
            returns a dict of form fields for the ZK interface (display=form)
    """

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        filters = self.get_filters(request.query_params)
        sorting = self.get_sorting(request.query_params.get("sorting", None))
        queries = self.get_queries(request.user, request.query_params)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(
                page, many=True, display=request.query_params.get("display")
            )
            #return self.get_paginated_response(serializer.data)
            serializer_data = self.get_paginated_response(serializer.data)

        serializer_data.update({"filters": filters})
        serializer_data.update({"sorting": sorting})
        serializer_data.update({"queries": queries})
        return Response(serializer_data) 

        return Response(serializer.data)

    def get_paginated_response(self, data):
        """
        Return a paginated style `Response` object for the given output data.
        """
        assert self.paginator is not None
        return self.paginator.get_paginated_response(data)

    def get_queryset(self):
        return self.model.get_queryset(
            self.request.user, self.request.query_params
        )

    def get_filters(self, query_params):
        return self.model.get_filter_state(query_params)

    def get_sorting(self, query_params):
        return self.model.ordering_list

    def get_queries(self, user, query_params):
        return []

    def get_form(self, instance=None, user=None):
        return self.form(instance=instance, user=user)

    def get_object(self, pk):
        return self.model.objects.get(pk=pk)

    def retrieve(self, request, pk=None, *args, **kwargs):
        """Get the object's form and return the as_dict() method"""
        serializer = self.get_serializer()
        display = request.query_params.get("display")
        if display == "form":
            form = self.get_form(instance=self.get_object(pk), user=request.user)
            return Response(form.as_dict())
        return Response(serializer.data)
