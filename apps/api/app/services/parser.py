import json
from pydantic import ValidationError
from app.schemas.candidate import CandidateCreate


EXTRACTION_SYSTEM_PROMPT = """Extract a resume into strict JSON with identity, links, skills,
experience, education, projects, achievements, certificates, languages, summary, and recommended title."""


def parse_resume_text(raw_text: str) -> CandidateCreate:
    text = raw_text.lower()
    skills = [skill for skill in ["Python", "FastAPI", "PostgreSQL", "React", "Next.js", "Redis", "AWS"] if skill.lower() in text]
    candidate = {
        "name": "Imported Candidate",
        "email": "candidate@example.com",
        "title": "Software Engineer",
        "location": "Remote",
        "experience_years": 3,
        "skills": skills or ["Communication", "Problem Solving"],
        "match_score": 0,
        "summary": raw_text[:280] or "Candidate profile extracted from uploaded resume.",
    }
    return CandidateCreate.model_validate(candidate)


def validate_ai_json(payload: str) -> CandidateCreate:
    try:
        return CandidateCreate.model_validate(json.loads(payload))
    except (json.JSONDecodeError, ValidationError) as exc:
        raise ValueError("AI structured output failed validation") from exc
