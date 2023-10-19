from fastapi import APIRouter, Request

from django.core.paginator import Paginator

from .models import Foo
from .schemas import FooSchema

router = APIRouter(
    prefix="/api/foos",
)


@router.get("/")
def list_foos(request: Request) -> list[FooSchema]:
    foos = Foo.objects.all()
    p = Paginator(foos, 25)
    f_list = [FooSchema(name=foo.name, text=foo.text) for foo in p.get_page(1)]
    return f_list
