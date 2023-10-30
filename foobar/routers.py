from typing import List
from fastapi import APIRouter, Request, Query, HTTPException

from fastapi_pagination.ext.django import paginate as django_paginate
from fastapi_pagination.links import Page


from .models import Foo, Bar, Baz
from .schemas import FooBaseSchema, FooFullSchema, BarSchema, BazSchema, BazCreateSchema

foo_router = APIRouter(prefix="/api/foos")
bar_router = APIRouter(prefix="/api/bars")
baz_router = APIRouter(prefix="/api/bazzes")

Page = Page.with_custom_options(size=Query(10, ge=1, le=20000000))


@bar_router.get("/")
def list_bars(request: Request) -> Page[BarSchema]:
    bars = Bar.objects.all()
    return django_paginate(bars)


@baz_router.get("/")
def list_bazzes(request: Request) -> Page[BazSchema]:
    bazzes = Baz.objects.all()
    return django_paginate(bazzes)


@baz_router.get("/{baz_id}")
def baz_by_id(baz_id: int) -> BazSchema:
    return Baz.objects.get(id=baz_id)


@baz_router.post("/")
def create_baz(baz: BazCreateSchema) -> BazSchema:
    try:
        baz = Baz.objects.create(**baz.model_dump())
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e
    return baz


@foo_router.get("/")
def list_foos(request: Request) -> Page[FooBaseSchema]:
    foos = Foo.objects.all()
    return django_paginate(foos)


@foo_router.get("/{foo_id}")
def foo_by_id(foo_id: int) -> FooFullSchema:
    return Foo.objects.get(id=foo_id)
