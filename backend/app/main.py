from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="80s Arcade API",
    description="Backend for retro Tetris and Snake games",
    version="1.0.0"
)

# CORS configuration
origins = os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {
        "message": "80s Arcade API",
        "status": "running",
        "version": "1.0.0"
    }

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "database": "not_connected_yet"
    }

# Import routes here later
# from app.api.routes import auth, tetris, profile, friends
# app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
# app.include_router(tetris.router, prefix="/api/tetris", tags=["tetris"])