from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.trustedhost import TrustedHostMiddleware
from app.api.routes import analytics, auth, candidates, matching, settings, uploads
from app.core.config import get_settings

settings_obj = get_settings()

app = FastAPI(title=settings_obj.app_name, version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[str(origin) for origin in settings_obj.cors_origins],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(TrustedHostMiddleware, allowed_hosts=["*"])

for router in [auth.router, uploads.router, candidates.router, matching.router, analytics.router, settings.router]:
    app.include_router(router, prefix=settings_obj.api_v1_prefix)


@app.get("/healthz", tags=["system"])
def healthz() -> dict:
    return {"status": "ok", "service": settings_obj.app_name}
