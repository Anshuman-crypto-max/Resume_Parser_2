from fastapi import APIRouter, Depends
from app.api.deps import current_user
from app.schemas.analytics import AnalyticsRead

router = APIRouter(prefix="/analytics", tags=["analytics"])


@router.get("", response_model=AnalyticsRead)
def analytics(_: dict = Depends(current_user)) -> AnalyticsRead:
    return AnalyticsRead(
        total_candidates=1284,
        parsed_resumes=1184,
        average_match=82,
        interviews=96,
        funnel=[
            {"stage": "Uploaded", "value": 1280},
            {"stage": "Parsed", "value": 1184},
            {"stage": "Shortlist", "value": 342},
            {"stage": "Interview", "value": 96},
            {"stage": "Offer", "value": 21},
        ],
        skills=[
            {"name": "Python", "value": 420},
            {"name": "React", "value": 390},
            {"name": "PostgreSQL", "value": 280},
        ],
        monthly=[
            {"month": "Jan", "candidates": 92},
            {"month": "Feb", "candidates": 121},
            {"month": "Mar", "candidates": 154},
            {"month": "Apr", "candidates": 187},
            {"month": "May", "candidates": 231},
            {"month": "Jun", "candidates": 268},
        ],
    )
