from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.db import get_db
from app.api.schemas.auth_schemas import UserRegister, UserLogin, Token
from app.api.services.auth_service import register_user, login_user

router = APIRouter()

@router.post("/register", response_model=Token, status_code=201)
def register(user_data: UserRegister, db: Session = Depends(get_db)):
    try:
        result = register_user(db, user_data)
        return result
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/login", response_model=Token)
def login(credentials: UserLogin, db: Session = Depends(get_db)):
    try:
        result = login_user(db, credentials.username, credentials.password)
        return result
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
