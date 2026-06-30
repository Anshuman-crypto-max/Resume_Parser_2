from enum import StrEnum
from uuid import UUID
from sqlalchemy import Enum, ForeignKey, Index, Integer, Numeric, String, Text
from sqlalchemy.dialects.postgresql import ARRAY, JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base import Base, TimestampMixin, UUIDMixin


class Role(StrEnum):
    admin = "admin"
    recruiter = "recruiter"
    viewer = "viewer"


class CandidateStatus(StrEnum):
    new = "new"
    shortlisted = "shortlisted"
    interview = "interview"
    rejected = "rejected"


class User(UUIDMixin, TimestampMixin, Base):
    __tablename__ = "users"

    email: Mapped[str] = mapped_column(String(320), unique=True, index=True)
    full_name: Mapped[str] = mapped_column(String(180))
    role: Mapped[Role] = mapped_column(Enum(Role), default=Role.recruiter)
    password_hash: Mapped[str] = mapped_column(String(255))


class Resume(UUIDMixin, TimestampMixin, Base):
    __tablename__ = "resumes"

    file_name: Mapped[str] = mapped_column(String(255))
    file_type: Mapped[str] = mapped_column(String(40))
    storage_path: Mapped[str] = mapped_column(String(512))
    parse_status: Mapped[str] = mapped_column(String(40), default="queued")
    raw_text: Mapped[str | None] = mapped_column(Text)
    parsed_json: Mapped[dict | None] = mapped_column(JSONB)
    candidate: Mapped["Candidate"] = relationship(back_populates="resume", uselist=False)


class Candidate(UUIDMixin, TimestampMixin, Base):
    __tablename__ = "candidates"

    resume_id: Mapped[UUID] = mapped_column(ForeignKey("resumes.id", ondelete="CASCADE"), unique=True)
    name: Mapped[str] = mapped_column(String(180), index=True)
    email: Mapped[str] = mapped_column(String(320), index=True)
    phone: Mapped[str | None] = mapped_column(String(40))
    address: Mapped[str | None] = mapped_column(String(255))
    linkedin: Mapped[str | None] = mapped_column(String(255))
    github: Mapped[str | None] = mapped_column(String(255))
    portfolio: Mapped[str | None] = mapped_column(String(255))
    title: Mapped[str] = mapped_column(String(180), default="Candidate")
    location: Mapped[str] = mapped_column(String(120), default="Remote")
    summary: Mapped[str] = mapped_column(Text)
    experience_years: Mapped[int] = mapped_column(Integer, default=0)
    skills: Mapped[list[str]] = mapped_column(ARRAY(String), default=list)
    education: Mapped[dict] = mapped_column(JSONB, default=dict)
    experience: Mapped[list[dict]] = mapped_column(JSONB, default=list)
    projects: Mapped[list[dict]] = mapped_column(JSONB, default=list)
    achievements: Mapped[list[str]] = mapped_column(ARRAY(String), default=list)
    certificates: Mapped[list[str]] = mapped_column(ARRAY(String), default=list)
    languages: Mapped[list[str]] = mapped_column(ARRAY(String), default=list)
    status: Mapped[CandidateStatus] = mapped_column(Enum(CandidateStatus), default=CandidateStatus.new)
    match_score: Mapped[float] = mapped_column(Numeric(5, 2), default=0)
    embedding: Mapped[list[float] | None] = mapped_column(JSONB)

    resume: Mapped[Resume] = relationship(back_populates="candidate")


class Job(UUIDMixin, TimestampMixin, Base):
    __tablename__ = "jobs"

    title: Mapped[str] = mapped_column(String(180))
    description: Mapped[str] = mapped_column(Text)
    required_skills: Mapped[list[str]] = mapped_column(ARRAY(String), default=list)
    embedding: Mapped[list[float] | None] = mapped_column(JSONB)


class Match(UUIDMixin, TimestampMixin, Base):
    __tablename__ = "matches"

    job_id: Mapped[UUID] = mapped_column(ForeignKey("jobs.id", ondelete="CASCADE"))
    candidate_id: Mapped[UUID] = mapped_column(ForeignKey("candidates.id", ondelete="CASCADE"))
    score: Mapped[float] = mapped_column(Numeric(5, 2))
    missing_skills: Mapped[list[str]] = mapped_column(ARRAY(String), default=list)
    recommendation: Mapped[str] = mapped_column(Text)


Index("ix_candidates_skills", Candidate.skills, postgresql_using="gin")
Index("ix_candidates_status_score", Candidate.status, Candidate.match_score)
