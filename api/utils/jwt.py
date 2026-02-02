from datetime import datetime, timedelta
from jose import jwt, JWTError
import os 
from utils.config import Config

config = Config()



SECRET_KEY = config.JWT_SECRET_KEY
ALGORITHM = config.ALGORITHM
ACCESS_TOKEN_EXPIRE_HOURS = config.ACCESS_TOKEN_EXPIRE_HOURS



def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def decode_access_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None
    
if __name__ == "__main__":
    
    sample_data = {"sub": "testuser"}
    token = create_access_token(sample_data)
    print("Generated Token:", token)
    
    decoded = decode_access_token("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ5YW1pbm8tb2thbWkiLCJpZCI6IjY5ODBjMDFkM2Q1YTNlMjE4MzFkMTUxOSIsImV4cCI6MTc3MDE1NjI2NH0.OwkzroFIEuU-YpTUmnjb3u51ODUg05sb4sXMv5L_tw8")
    print("Decoded Payload:", decoded)
