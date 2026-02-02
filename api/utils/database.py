import os 
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from utils.models import User, Grid, CardData
from utils.config import Config
config = Config()

CONN_STRING = config.CONN_STRING
DB_NAME = config.DB_NAME

if not CONN_STRING or not DB_NAME:
    raise ValueError("Database connection string or name not found in environment variables.")

async def init_db():
    client = AsyncIOMotorClient(CONN_STRING)
    database = client[DB_NAME]
    await init_beanie(
        database,
        document_models=[User, Grid, CardData]
        )


