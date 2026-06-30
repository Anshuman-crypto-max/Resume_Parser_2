# API

Base URL: `/api/v1`

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/auth/login` | Issue JWT access token |
| POST | `/uploads/resume` | Validate and queue resume parsing |
| GET | `/candidates` | List parsed candidates |
| POST | `/matching/rank` | Rank candidates against a job description |
| GET | `/analytics` | Dashboard and recruiting analytics |
| GET | `/settings` | Workspace settings |

All production calls should include `Authorization: Bearer <token>`.
