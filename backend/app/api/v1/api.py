from fastapi import APIRouter
from app.api.v1.endpoints import disaster, resources, alerts

api_router = APIRouter()

api_router.include_router(disaster.router, prefix="/disasters", tags=["disasters"])
api_router.include_router(resources.router, prefix="/resources", tags=["resources"])
api_router.include_router(alerts.router, prefix="/alerts", tags=["alerts"])
