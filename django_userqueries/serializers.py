from rest_framework import serializers
from django_zk_backend.zk_serializer import ZKModelSerializer
from foobar.models import Foo, Bar, Baz

# Create your serializers here.


class FooSerializer(ZKModelSerializer):
    user = serializers.SlugRelatedField(many=False, read_only=True, slug_field="email")
    group = serializers.SlugRelatedField(many=False, read_only=True, slug_field="name")
    organization = serializers.SlugRelatedField(
        many=False, read_only=True, slug_field="name"
    )
    bar = serializers.SlugRelatedField(many=False, read_only=True, slug_field="name")
    bazzes = serializers.SlugRelatedField(many=True, read_only=True, slug_field="name")

    class Meta:
        model = Foo
        fields = [
            "name",
            "text",
            "bar",
            "bazzes",
            "user",
            "group",
            "organization",
            "href",
            "title",
            "summary",
        ]
        read_only_fields = ["href", "title", "summary", "user"]


class BarSerializer(ZKModelSerializer):
    user = serializers.SlugRelatedField(many=False, read_only=True, slug_field="email")
    group = serializers.SlugRelatedField(many=False, read_only=True, slug_field="name")
    organization = serializers.SlugRelatedField(
        many=False, read_only=True, slug_field="name"
    )

    class Meta:
        model = Bar
        fields = [
            "name",
            "user",
            "group",
            "organization",
            "href",
            "title",
            "summary",
        ]
        read_only_fields = ["href", "title", "summary", "user"]


class BazSerializer(ZKModelSerializer):
    user = serializers.SlugRelatedField(many=False, read_only=True, slug_field="email")
    group = serializers.SlugRelatedField(many=False, read_only=True, slug_field="name")
    organization = serializers.SlugRelatedField(
        many=False, read_only=True, slug_field="name"
    )

    class Meta:
        model = Baz
        fields = [
            "name",
            "user",
            "group",
            "organization",
            "href",
            "title",
            "summary",
        ]
        read_only_fields = ["href", "title", "summary", "user"]
