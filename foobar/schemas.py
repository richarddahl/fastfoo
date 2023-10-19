from pydantic import BaseModel


class FooSchema(BaseModel):
    name: str
    text: str | None = None
