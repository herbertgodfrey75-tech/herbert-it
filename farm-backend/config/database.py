from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()


MONGODB_URL = os.getenv("MONGODB_URL")
DB_NAME = os.getenv("DB_NAME", "student_db")


client = AsyncIOMotorClient(
    MONGODB_URL,
    serverSelectionTimeoutMS=5000
)


db = client[DB_NAME]