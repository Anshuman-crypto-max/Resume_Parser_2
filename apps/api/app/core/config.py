from functools import lru_cache
from pydantic import AnyHttpUrl, Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    app_name: str = "Resume Parser AI"
    environment: str = "development"
    api_v1_prefix: str = "/api/v1"
    database_url: str = "postgresql+psycopg://postgres:postgres@localhost:5432/resume_parser"
    redis_url: str = "redis://localhost:6379/0"
    openai_api_key: str = Field(default="", repr=False)
    jwt_secret: str = Field(default="change-me-in-production", repr=False)
    jwt_algorithm: str = "HS256"
    cors_origins: list[AnyHttpUrl] | list[str] = ["http://localhost:3000"]
    rate_limit_per_minute: int = 120
    supabase_url: str = ""
    supabase_service_role_key: str = Field(default="", repr=False)


@lru_cache
def get_settings() -> Settings:
    return Settings()
