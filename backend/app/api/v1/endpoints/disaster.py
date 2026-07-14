from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from app.services.watsonx import watsonx_service

router = APIRouter()

# Pydantic Schemas for routing contracts
class IncidentReportCreate(BaseModel):
    title: str = Field(..., example="Flash flood at Sector 4")
    description: str = Field(..., example="Water level rising rapidly over 2 meters. Evacuations required.")
    severity: str = Field("HIGH", example="EXTREME")
    latitude: float = Field(..., example=34.0522)
    longitude: float = Field(..., example=-118.2437)
    reported_by: Optional[str] = Field(None, example="user-1234")

class IncidentReport(IncidentReportCreate):
    id: str
    created_at: datetime
    status: str = "reported"

class AIAdviceRequest(BaseModel):
    incident_details: str
    location_coordinates: str
    available_resources: List[str]

class AIAdviceResponse(BaseModel):
    analysis_summary: str
    threat_assessment: str
    tactical_recommendations: List[str]
    confidence_rating: float

@router.get("/", response_model=List[IncidentReport])
def list_incidents():
    """
    Get all reported active incidents. Integrates with the Supabase `disasters` table.
    """
    # Return placeholder structural response
    return []

@router.post("/", response_model=IncidentReport)
def report_incident(report: IncidentReportCreate):
    """
    Report a new active crisis incident. Will trigger RLS checking in Supabase.
    """
    return {
        **report.model_dump(),
        "id": "mock-disaster-id-abc",
        "created_at": datetime.now(),
        "status": "reported"
    }

@router.post("/ai-advice", response_model=AIAdviceResponse)
async def get_tactical_ai_advice(request: AIAdviceRequest):
    """
    Utilizes IBM Granite model on IBM watsonx.ai to generate 
    tactical emergency guidelines based on active incident data.
    """
    try:
        # Calls the watsonx Granite LLM service wrapper
        advice = await watsonx_service.generate_tactical_plan(
            incident_details=request.incident_details,
            coordinates=request.location_coordinates,
            resources=request.available_resources
        )
        return advice
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
