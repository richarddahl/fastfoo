from uuid import UUID
from pydantic import BaseModel


class BazSchema(BaseModel):
    pass


class FooSchema(BaseModel):
    name: str
    text: str | None = None
    #bar: UUID
    #bazzes: list[BazSchema]

    class Config:
        from_attributes = True
