from sqlalchemy import Column, String, Integer, Boolean, TIMESTAMP, DECIMAL
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime
from app.database.db import Base

class User(Base):
    __tablename__ = "users"
    
    user_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = Column(String(15), unique=True, nullable=False, index=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    created_at = Column(TIMESTAMP, default=datetime.utcnow)
    last_login = Column(TIMESTAMP, nullable=True)
    is_active = Column(Boolean, default=True)
    
    # Profile metadata
    favorite_game = Column(String(20), default='tetris')
    total_games_all = Column(Integer, default=0)
    
    # Tetris stats
    tetris_high_score = Column(Integer, default=0)
    tetris_total_games = Column(Integer, default=0)
    tetris_total_lines = Column(Integer, default=0)
    tetris_total_tetrises = Column(Integer, default=0)
    tetris_rate = Column(DECIMAL(5, 2), default=0.0)
    tetris_best_level = Column(Integer, default=0)
    tetris_survived_29 = Column(Boolean, default=False)
    tetris_last_played = Column(TIMESTAMP, nullable=True)
