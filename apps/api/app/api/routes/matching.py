from fastapi import APIRouter, Depends
from app.api.deps import current_user
from app.api.routes.candidates import DEMO_CANDIDATES
from app.schemas.candidate import MatchRequest, MatchResult
from app.services.matching import rank_candidates

router = APIRouter(prefix="/matching", tags=["matching"])


@router.post("/rank", response_model=list[MatchResult])
def rank(payload: MatchRequest, _: dict = Depends(current_user)) -> list[MatchResult]:
    return rank_candidates(payload.job_description, DEMO_CANDIDATES)
