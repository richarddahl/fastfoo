from fastapi import APIRouter, Request

from .models import UserFilter
from .schemas import UserFilterSchema

router = APIRouter(
    prefix="/api/filters",
)


@router.get("/")
def list_filters(request: Request) -> list[UserFilterSchema]:
    return []
