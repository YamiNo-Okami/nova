from beanie import Document
from pydantic import EmailStr, Field
from typing import List

class User(Document):
    username : str
    email : EmailStr
    hashed_password : str
    grids : List[str] = Field(default_factory=list) or []  # List of Grid IDs
    
    class Settings:
        name = "users"
    
class Grid(Document):
    name : str
    active : bool
    cards : List[str] = Field(default_factory=list) or []  # List of CardData IDs
    class Settings:
        name = "grids"

class CardData(Document):
    title : str
    content : str
    x: int
    y: int
    width: int
    height: int
    class Settings:
        name = "cards"

    