from rest_framework import serializers

# Create your serializers here.


class ZKModelSerializer(serializers.HyperlinkedModelSerializer):

    def __init__(self, *args, **kwargs):
        # Don't pass the 'display' arg up to the superclass
        display = kwargs.pop('display', None)
        # Instantiate the superclass normally
        super().__init__(*args, **kwargs)
        if display:
            existing = set(self.fields)
            allowed = set(getattr(self.Meta.model, f"{display}_fields")())
            for field_name in existing - allowed:
                self.fields.pop(field_name)
