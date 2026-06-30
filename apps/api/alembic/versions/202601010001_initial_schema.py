"""initial schema

Revision ID: 202601010001
Revises:
Create Date: 2026-01-01 00:00:01
"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = "202601010001"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.execute("CREATE EXTENSION IF NOT EXISTS pgcrypto")
    role = postgresql.ENUM("admin", "recruiter", "viewer", name="role")
    status = postgresql.ENUM("new", "shortlisted", "interview", "rejected", name="candidatestatus")
    role.create(op.get_bind(), checkfirst=True)
    status.create(op.get_bind(), checkfirst=True)
    op.create_table("users", sa.Column("email", sa.String(320), nullable=False), sa.Column("full_name", sa.String(180), nullable=False), sa.Column("role", role, nullable=False), sa.Column("password_hash", sa.String(255), nullable=False), sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False), sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False), sa.Column("id", sa.Uuid(), nullable=False), sa.PrimaryKeyConstraint("id"))
    op.create_table("resumes", sa.Column("file_name", sa.String(255), nullable=False), sa.Column("file_type", sa.String(40), nullable=False), sa.Column("storage_path", sa.String(512), nullable=False), sa.Column("parse_status", sa.String(40), nullable=False), sa.Column("raw_text", sa.Text(), nullable=True), sa.Column("parsed_json", postgresql.JSONB(astext_type=sa.Text()), nullable=True), sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False), sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False), sa.Column("id", sa.Uuid(), nullable=False), sa.PrimaryKeyConstraint("id"))
    op.create_table("jobs", sa.Column("title", sa.String(180), nullable=False), sa.Column("description", sa.Text(), nullable=False), sa.Column("required_skills", postgresql.ARRAY(sa.String()), nullable=False), sa.Column("embedding", postgresql.JSONB(astext_type=sa.Text()), nullable=True), sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False), sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False), sa.Column("id", sa.Uuid(), nullable=False), sa.PrimaryKeyConstraint("id"))
    op.create_table("candidates", sa.Column("resume_id", sa.Uuid(), nullable=False), sa.Column("name", sa.String(180), nullable=False), sa.Column("email", sa.String(320), nullable=False), sa.Column("phone", sa.String(40), nullable=True), sa.Column("address", sa.String(255), nullable=True), sa.Column("linkedin", sa.String(255), nullable=True), sa.Column("github", sa.String(255), nullable=True), sa.Column("portfolio", sa.String(255), nullable=True), sa.Column("title", sa.String(180), nullable=False), sa.Column("location", sa.String(120), nullable=False), sa.Column("summary", sa.Text(), nullable=False), sa.Column("experience_years", sa.Integer(), nullable=False), sa.Column("skills", postgresql.ARRAY(sa.String()), nullable=False), sa.Column("education", postgresql.JSONB(astext_type=sa.Text()), nullable=False), sa.Column("experience", postgresql.JSONB(astext_type=sa.Text()), nullable=False), sa.Column("projects", postgresql.JSONB(astext_type=sa.Text()), nullable=False), sa.Column("achievements", postgresql.ARRAY(sa.String()), nullable=False), sa.Column("certificates", postgresql.ARRAY(sa.String()), nullable=False), sa.Column("languages", postgresql.ARRAY(sa.String()), nullable=False), sa.Column("status", status, nullable=False), sa.Column("match_score", sa.Numeric(5, 2), nullable=False), sa.Column("embedding", postgresql.JSONB(astext_type=sa.Text()), nullable=True), sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False), sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False), sa.Column("id", sa.Uuid(), nullable=False), sa.ForeignKeyConstraint(["resume_id"], ["resumes.id"], ondelete="CASCADE"), sa.PrimaryKeyConstraint("id"), sa.UniqueConstraint("resume_id"))
    op.create_table("matches", sa.Column("job_id", sa.Uuid(), nullable=False), sa.Column("candidate_id", sa.Uuid(), nullable=False), sa.Column("score", sa.Numeric(5, 2), nullable=False), sa.Column("missing_skills", postgresql.ARRAY(sa.String()), nullable=False), sa.Column("recommendation", sa.Text(), nullable=False), sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False), sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False), sa.Column("id", sa.Uuid(), nullable=False), sa.ForeignKeyConstraint(["candidate_id"], ["candidates.id"], ondelete="CASCADE"), sa.ForeignKeyConstraint(["job_id"], ["jobs.id"], ondelete="CASCADE"), sa.PrimaryKeyConstraint("id"))
    op.create_index("ix_users_email", "users", ["email"], unique=True)
    op.create_index("ix_candidates_email", "candidates", ["email"])
    op.create_index("ix_candidates_name", "candidates", ["name"])
    op.create_index("ix_candidates_status_score", "candidates", ["status", "match_score"])
    op.create_index("ix_candidates_skills", "candidates", ["skills"], postgresql_using="gin")


def downgrade() -> None:
    op.drop_table("matches")
    op.drop_table("candidates")
    op.drop_table("jobs")
    op.drop_table("resumes")
    op.drop_table("users")
    postgresql.ENUM(name="candidatestatus").drop(op.get_bind(), checkfirst=True)
    postgresql.ENUM(name="role").drop(op.get_bind(), checkfirst=True)
