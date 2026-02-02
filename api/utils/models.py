from beanie import Document
from pydantic import EmailStr

class User(Document):
    username : str
    email : EmailStr
    hashed_password : str
    
    class Settings:
        name = "users"
    
class Grid(Document):
    name : str
    user_id : str   
    class Settings:
        name = "grids"
        indexes = ["user_id"]

class CardData(Document):
    title : str
    content : str
    x: int
    y: int
    width: int
    height: int
    grid_id : str
    class Settings:
        name = "cards"
        indexes = ["grid_id"]

    