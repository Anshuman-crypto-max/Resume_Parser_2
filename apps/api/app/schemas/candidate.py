from enum import StrEnum
from uuid import UUID
from pydantic import BaseModel, EmailStr, Field


class CandidateStatus(str, StrEnum):
    new = "new"
    shortlisted = "shortlisted"
    interview = "interview"
    rejected = "rejected"


class CandidateBase(BaseModel):
    name: str
    email: EmailStr
    title: str = "Candidate"
    location: str = "Remote"
    experience_years: int = Field(ge=0, default=0)
    status: CandidateStatus = CandidateStatus.new
    skills: list[str] = Field(default_factory=list)
    match_score: float = Field(ge=0, le=100, default=0)
    summary: str


class CandidateCreate(CandidateBase):
    phone: str | None = None
    address: str | None = None
    linkedin: str | None = None
    github: str | None = None
    portfolio: str | None = None
    education: dict = Field(default_factory=dict)
    experience: list[dict] = Field(default_factory=list)
    projects: list[dict] = Field(default_factory=list)
    achievements: list[str] = Field(default_factory=list)
    certificates: list[str] = Field(default_factory=list)
    languages: list[str] = Field(default_factory=list)


class CandidateRead(CandidateBase):
    id: UUID

    model_config = {"from_attributes": True}


class MatchRequest(BaseModel):
    job_description: str = Field(min_length=40)


class MatchResult(CandidateRead):
    missing_skills: list[str]
    recommendation: str
