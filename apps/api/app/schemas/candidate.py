from enum import StrEnum
from uuid import UUID

from pydantic import BaseModel, EmailStr, Field, ConfigDict


class CandidateStatus(StrEnum):
    NEW = "new"
    SHORTLISTED = "shortlisted"
    INTERVIEW = "interview"
    REJECTED = "rejected"


class CandidateBase(BaseModel):
    name: str
    email: EmailStr
    title: str = "Candidate"
    location: str = "Remote"
    experience_years: int = Field(default=0, ge=0)
    status: CandidateStatus = CandidateStatus.NEW
    skills: list[str] = Field(default_factory=list)
    match_score: float = Field(default=0.0, ge=0, le=100)
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


class CandidateUpdate(BaseModel):
    name: str | None = None
    email: EmailStr | None = None
    title: str | None = None
    location: str | None = None
    experience_years: int | None = Field(default=None, ge=0)
    status: CandidateStatus | None = None
    skills: list[str] | None = None
    match_score: float | None = Field(default=None, ge=0, le=100)
    summary: str | None = None

    phone: str | None = None
    address: str | None = None
    linkedin: str | None = None
    github: str | None = None
    portfolio: str | None = None

    education: dict | None = None
    experience: list[dict] | None = None
    projects: list[dict] | None = None

    achievements: list[str] | None = None
    certificates: list[str] | None = None
    languages: list[str] | None = None


class CandidateRead(CandidateBase):
    id: UUID

    model_config = ConfigDict(from_attributes=True)


class MatchRequest(BaseModel):
    job_description: str = Field(..., min_length=40)


class MatchResult(CandidateRead):
    missing_skills: list[str] = Field(default_factory=list)
    recommendation: str