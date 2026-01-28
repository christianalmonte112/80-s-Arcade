from app.config.settings import settings
from sqlalchemy import create_engine, text

print("DATABASE_URL:", settings.DATABASE_URL)
print("\nTesting connection...")

try:
    engine = create_engine(settings.DATABASE_URL)
    with engine.connect() as connection:
        result = connection.execute(text("SELECT 1"))
        print("✅ SUCCESS! Database connected!")
        print(f"Result: {result.fetchone()}")
except Exception as e:
    print(f"❌ FAILED: {e}")
