from fastapi import APIRouter, Depends
from app.api.deps import require_role

router = APIRouter(prefix="/settings", tags=["settings"])


@router.get("")
def settings(_: dict = Depends(require_role("admin", "recruiter"))) -> dict:
    return {
        "theme": "system",
        "notifications": {"parsing_complete": True, "weekly_digest": True},
        "security": {"rate_limiting": True, "secure_cookies": True, "csrf": True},
    }
