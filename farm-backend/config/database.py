from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()
mongodb_url= os.getenv("mongodb_url")
DB_NAME = os.getenv("DB_NAME")

client = AsyncIOMotorClient(
    mongodb_url,
    serverSelectionTimeoutMS=5000,
    )
db = client[DB_NAME]