from fastapi import APIRouter, Depends
from app.api.deps import current_user
from app.schemas.candidate import CandidateRead

router = APIRouter(prefix="/candidates", tags=["candidates"])

DEMO_CANDIDATES = [
    CandidateRead(id="11111111-1111-1111-1111-111111111111", name="Aarav Sharma", email="aarav@example.com", title="Senior Backend Engineer", location="Bengaluru", experience_years=7, status="shortlisted", skills=["Python", "FastAPI", "PostgreSQL"], match_score=94, summary="Strong distributed systems and API leadership profile."),
    CandidateRead(id="22222222-2222-2222-2222-222222222222", name="Mia Chen", email="mia@example.com", title="ML Platform Engineer", location="Singapore", experience_years=5, status="interview", skills=["PyTorch", "Kubernetes", "Vector Search"], match_score=91, summary="Excellent MLOps depth with production model deployment."),
    CandidateRead(id="33333333-3333-3333-3333-333333333333", name="Lina Gomez", email="lina@example.com", title="Frontend Architect", location="Remote", experience_years=8, status="new", skills=["React", "Next.js", "Design Systems"], match_score=88, summary="Premium UI engineering and accessibility experience."),
]


@router.get("", response_model=list[CandidateRead])
def list_candidates(_: dict = Depends(current_user)) -> list[CandidateRead]:
    return DEMO_CANDIDATES
