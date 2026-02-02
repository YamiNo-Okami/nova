from dotenv import load_dotenv
import os

load_dotenv()

class Config:
    CONN_STRING: str = os.getenv("CONN_STRING", "mongodb://localhost:27017")
    DB_NAME: str = os.getenv("DB_NAME", "nova_db")
    JWT_SECRET_KEY: str = os.getenv("SECRET_KEY", "CHANGE_THIS_TO_A_LONG_RANDOM_SECRET")
    ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE_HOURS = 30