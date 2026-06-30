from pydantic import BaseModel


class SeriesPoint(BaseModel):
    name: str | None = None
    month: str | None = None
    stage: str | None = None
    value: int | None = None
    candidates: int | None = None


class AnalyticsRead(BaseModel):
    total_candidates: int
    parsed_resumes: int
    average_match: float
    interviews: int
    funnel: list[SeriesPoint]
    skills: list[SeriesPoint]
    monthly: list[SeriesPoint]
