from fastapi import APIRouter, Request, Query

from pydantic import create_model

from fastapi_pagination.ext.django import paginate as django_paginate
from fastapi_pagination import paginate
from fastapi_pagination.links import Page


from .models import Foo, Bar, Baz, FooSchema, BarSchema, BazSchema

foo_router = APIRouter(
    prefix="/api/foos",
)
bar_router = APIRouter(
    prefix="/api/bars",
)
baz_router = APIRouter(
    prefix="/api/bazzes",
)

Page = Page.with_custom_options(
    size=Query(1, ge=1, le=2000000000),
)


@bar_router.get("/")
def list_bars(request: Request) -> Page[BarSchema]:
    bars = Bar.objects.all()
    return django_paginate(bars)


@baz_router.get("/")
def list_bazzes(request: Request) -> Page[BazSchema]:
    bazzes = Baz.objects.all()
    return django_paginate(bazzes)


@foo_router.get("/")
def list_foos(request: Request) -> Page[FooSchema]:
    foos = Foo.objects.all()
    return django_paginate(foos)


"""
@foo_router.get("/sync")
def list_foos(request: Request) -> Page[FooSchema]:
    foos = Foo.objects.all()
    return django_paginate(foos)


@foo_router.get("/async")
async def list_foos(request: Request) -> Page[FooSchema]:
    foos = [f async for f in Foo.objects.all()]
    #page = [f async for f in foos]
    return paginate(foos)
"""
