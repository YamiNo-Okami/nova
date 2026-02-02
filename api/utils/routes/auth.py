from fastapi import APIRouter, HTTPException
from utils.models import User
from utils.hash import hash_password, verify_password
from pydantic import BaseModel
from utils.jwt import create_access_token


auth_router = APIRouter(
    prefix="/auth",
    tags=["Users"]
)
## HELPER FUNCTIONS 
class RegisterRequest(BaseModel):
    username : str
    email : str
    password : str
    grids : list[str] = []  # List of Grid IDs

class RegisterResponse:
    id : str
    username : str
    email : str   
    
class LoginRequest(BaseModel):
    username : str
    password : str
    
class LoginResponse:
    access_token : str
    token_type : str 
    
### MAIN

async def get_user_by_username(username: str):
    user = await User.find_one(User.username == username)
    return user


@auth_router.post("/register")
async def register_user(user: RegisterRequest):
    # Logic to register a new user
    existing_user = await get_user_by_username(user.username)
    
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")
    
    await User(
        username=user.username,
        email=user.email,
        hashed_password=hash_password(user.password),
        grids=user.grids
        ).insert()
    return {"message": "User registered successfully"}

@auth_router.post("/login")
async def login_user(user: LoginRequest):
    # Logic to authenticate user
    existing_user = await get_user_by_username(user.username)
    
    if not existing_user or not verify_password(user.password, existing_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid username or password")
    
    # Here you would normally generate a JWT or session token
    access_token = create_access_token(data={"sub": existing_user.username, "id": str(existing_user.id)})
    
    return {"access_token": access_token, "token_type": "Bearer"}