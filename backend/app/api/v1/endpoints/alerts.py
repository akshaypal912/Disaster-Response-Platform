from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

router = APIRouter()

class AlertBroadcastCreate(BaseModel):
    title: str = Field(..., example="Evacuation Order: Los Angeles Riverfront")
    message: str = Field(..., example="Immediate flooding threat. Please move to higher ground.")
    severity: str = Field("EXTREME", example="EXTREME")
    target_area: str = Field(..., example="Sector 4-B")

class AlertBroadcast(AlertBroadcastCreate):
    id: str
    published_at: datetime
    active: bool = True

@router.get("/", response_model=List[AlertBroadcast])
def list_broadcasts():
    """
    Get all published emergency broadcasts.
    """
    return []

@router.post("/", response_model=AlertBroadcast)
def publish_broadcast(alert: AlertBroadcastCreate):
    """
    Publish a new broadcast warning to the disaster networks.
    """
    return {
        **alert.model_dump(),
        "id": "mock-alert-broadcast-id",
        "published_at": datetime.now(),
        "active": True
    }
