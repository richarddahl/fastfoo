from fastapi import APIRouter, Request
from asgiref.sync import sync_to_async

from django.core.paginator import Paginator

from .models import Foo
from .schemas import FooSchema

router = APIRouter(
    prefix="/api/foos",
)


@router.get("/")
def list_foos(request: Request) -> list[FooSchema]:
    foos = Foo.objects.all()
    #p = Paginator(foos, 250)
    #page = p.get_page(1)
    page = foos
    return page
