from pydantic import BaseModel


class UserFilterSchema(BaseModel):
    multiple: bool | None = None
    element: str = "input"
    children: list
