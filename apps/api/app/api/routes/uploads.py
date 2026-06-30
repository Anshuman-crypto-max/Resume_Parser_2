from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from app.api.deps import current_user
from app.services.parser import parse_resume_text

router = APIRouter(prefix="/uploads", tags=["uploads"])
ALLOWED_TYPES = {
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
}


@router.post("/resume")
async def upload_resume(file: UploadFile = File(...), _: dict = Depends(current_user)) -> dict:
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(status_code=400, detail="Unsupported file type")
    content = await file.read()
    if len(content) > 50 * 1024 * 1024:
        raise HTTPException(status_code=413, detail="File is larger than 50MB")
    parsed = parse_resume_text(content[:2000].decode(errors="ignore"))
    return {"status": "queued", "candidate_preview": parsed.model_dump()}
