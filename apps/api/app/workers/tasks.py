from app.services.parser import parse_resume_text
from app.workers.celery_app import celery_app


@celery_app.task(name="app.workers.tasks.parse_resume")
def parse_resume(raw_text: str) -> dict:
    return parse_resume_text(raw_text).model_dump()
