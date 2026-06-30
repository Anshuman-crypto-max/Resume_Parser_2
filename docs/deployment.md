# Deployment

## Frontend: Vercel

Set root directory to `apps/web`. Configure:

- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Backend: Render

Use `docker/api.Dockerfile` or a Python 3.12 web service with:

```bash
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

Configure:

- `DATABASE_URL`
- `REDIS_URL`
- `OPENAI_API_KEY`
- `JWT_SECRET`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

## Database: Supabase

Run `database/schema.sql` or Alembic migrations from `apps/api`.
