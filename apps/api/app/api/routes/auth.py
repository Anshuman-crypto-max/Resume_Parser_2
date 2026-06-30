from fastapi import APIRouter
from pydantic import BaseModel, EmailStr
from app.core.security import create_access_token

router = APIRouter(prefix="/auth", tags=["auth"])


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


@router.post("/login")
def login(payload: LoginRequest) -> dict:
    return {"access_token": create_access_token(payload.email, "admin"), "token_type": "bearer"}
