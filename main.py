import setup_django

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from fastapi_pagination import add_pagination

from django_schema import *
from foobar.routers import foo_router, bar_router, baz_router
from django_userqueries.routers import router as user_query_routers


app = FastAPI()
add_pagination(app)
templates = Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="static"), name="static")
app.include_router(foo_router)
app.include_router(bar_router)
app.include_router(baz_router)
app.include_router(user_query_routers)


@app.get("/", response_class=HTMLResponse)
async def root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})
