# Architecture

Resume Parser AI is a monorepo with a Next.js web app, FastAPI backend, shared TypeScript packages, PostgreSQL schema, Redis-backed background workers, and deployment-ready Docker assets.

## Request Flow

1. Recruiter uploads a resume from `apps/web`.
2. FastAPI validates file type and size, stores metadata, and queues parsing.
3. Celery extracts text, requests structured JSON from OpenAI, validates it with Pydantic, stores a normalized candidate record, and generates embeddings.
4. Matching endpoints compare job descriptions with candidate skills and embeddings.
5. Dashboard routes aggregate pipeline, analytics, and usage data.

## Security

Authentication is JWT-compatible and designed to sit behind Supabase Auth. API endpoints validate inputs with Pydantic, restrict admin settings by role, enforce upload limits, and centralize secrets in environment variables. Production deployments should enable HTTPS, secure cookies, Supabase row-level security, and provider-level rate limiting.

## Scalability

The API is stateless, parsing is asynchronous, resume files live in Supabase Storage, PostgreSQL stores normalized transactional data, and Redis brokers background work. Candidate and skill indexes support search and filtering; vector search can be moved to `pgvector` or Supabase vector indexes as volume grows.
