# Resume Parser AI

Enterprise-grade SaaS for resume upload, AI parsing, candidate ranking, applicant management, and hiring analytics.

## Stack

- Next.js 15, React 19, TypeScript, TailwindCSS, Radix UI, shadcn-style components, Framer Motion, TanStack Query/Table, Recharts, React Dropzone
- FastAPI, Python 3.12, SQLAlchemy 2, Pydantic v2, Alembic, Celery, Redis
- PostgreSQL/Supabase, Supabase Storage/Auth, OpenAI structured output and embeddings
- Docker, GitHub Actions, Vercel frontend, Render backend

## Local Development

```bash
pnpm install
docker compose up -d postgres redis
pnpm dev
```

Run the API:

```bash
cd apps/api
pip install ".[dev]"
uvicorn app.main:app --reload
```

## Validation

```bash
pnpm --filter @resume-parser/web build
pnpm --filter @resume-parser/web test
cd apps/api && pytest
```

## Production Notes

Copy `.env.example` files, configure Supabase, OpenAI, and secrets, then deploy the web app to Vercel and the API to Render. The schema lives in `database/schema.sql`; Alembic migrations live in `apps/api/alembic`.
