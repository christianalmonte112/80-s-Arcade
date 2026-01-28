from sqlalchemy.orm import Session
from app.api.models.user import User
from app.api.schemas.auth_schemas import UserRegister
from app.utils.security import hash_password, verify_password, create_access_token
from fastapi import HTTPException

def register_user(db: Session, user_data: UserRegister):
    # Check if username exists
    existing_user = db.query(User).filter(User.username == user_data.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already taken")
    
    # Check if email exists
    existing_email = db.query(User).filter(User.email == user_data.email).first()
    if existing_email:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create new user
    new_user = User(
        username=user_data.username,
        email=user_data.email,
        password_hash=hash_password(user_data.password)
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    # Create token
    token = create_access_token({"sub": str(new_user.user_id), "username": new_user.username})
    
    return {
        "user_id": str(new_user.user_id),
        "username": new_user.username,
        "token": token,
        "created_at": str(new_user.created_at)
    }

def login_user(db: Session, username: str, password: str):
    # Find user
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Verify password
    if not verify_password(password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Create token
    token = create_access_token({"sub": str(user.user_id), "username": user.username})
    
    return {
        "user_id": str(user.user_id),
        "username": user.username,
        "token": token
    }
