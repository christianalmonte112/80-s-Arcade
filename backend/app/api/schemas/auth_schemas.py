from pydantic import BaseModel, EmailStr, Field

class UserRegister(BaseModel):
    username: str = Field(..., min_length=3, max_length=15, pattern="^[a-zA-Z0-9_]+$")
    email: EmailStr
    password: str = Field(..., min_length=8, max_length=60)

class UserLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    token: str
    user_id: str
    username: str

class UserResponse(BaseModel):
    user_id: str
    username: str
    email: str
    created_at: str
