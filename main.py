import setup_django

from fastapi import FastAPI
from fastapi_pagination import add_pagination

from foobar.routers import foo_router, bar_router, baz_router


app = FastAPI()
add_pagination(app)
app.include_router(foo_router)
app.include_router(bar_router)
app.include_router(baz_router)
