from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_healthz() -> None:
    response = client.get("/healthz")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_matching_rank() -> None:
    response = client.post("/api/v1/matching/rank", json={"job_description": "Senior Python FastAPI PostgreSQL Redis backend engineer with cloud experience"})
    assert response.status_code == 200
    assert response.json()[0]["match_score"] >= 80
