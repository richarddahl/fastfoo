import sys
import os
import django
from django.core.paginator import Paginator
from asgiref.sync import sync_to_async

from pydantic import BaseModel

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates


sys.dont_write_bytecode = True
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "foo.settings")
django.setup()

from foobar.models import Foo


class FooSchema(BaseModel):
    name: str
    text: str | None = None


class UserFilterSchema(BaseModel):
    multiple: bool | None = None
    element: str = "input"
    children: list[]


app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")


@app.get("/", response_class=HTMLResponse)
async def root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/api/foos")
def list_foos(request: Request) -> list[FooSchema]:
    foos = Foo.objects.all()
    p = Paginator(foos, 25)
    f_list = [FooSchema(name=foo.name, text=foo.text) for foo in p.get_page(1)]
    return f_list


@app.get("/api/filters")
def list_filters(request: Request) -> list[FilterSchema]:
    return []
