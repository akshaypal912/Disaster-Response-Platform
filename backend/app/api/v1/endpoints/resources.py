from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

router = APIRouter()

class ResourceRequestCreate(BaseModel):
    category: str = Field(..., example="Medical Supplies")
    quantity: int = Field(..., example=50)
    destination: str = Field(..., example="Base Camp Alpha")
    priority: str = Field("MEDIUM", example="HIGH")

class ResourceRequest(ResourceRequestCreate):
    id: str
    status: str = "pending"
    dispatched_at: Optional[datetime] = None

@router.get("/", response_model=List[ResourceRequest])
def list_resource_requests():
    """
    Get all logistical resource requests.
    """
    return []

@router.post("/", response_model=ResourceRequest)
def create_resource_request(request: ResourceRequestCreate):
    """
    Submit a new resource order to physical caches.
    """
    return {
        **request.model_dump(),
        "id": "mock-resource-request-id",
        "status": "pending",
        "dispatched_at": None
    }
