from fastapi import APIRouter, Depends, HTTPException
from utils.models import User, Grid, CardData
from pydantic import BaseModel
from utils.jwt import decode_access_token
from utils.deps import get_current_user
from beanie import PydanticObjectId

cards_router = APIRouter(
    prefix="/cards",
    tags=["Cards"]
)

### HELPERS
class CardRequest(BaseModel):
    title : str
    content : str
    x: int
    y: int
    width: int
    height: int
class CardResponse:
    id : str
    title : str
    content : str
    x: int
    y: int
    width: int
    height: int
    grid_id : str   
    

async def verify_grid_ownership(grid_id: str, user: User):
    grid = await Grid.get(PydanticObjectId(grid_id))
    if not grid or grid.user_id != str(user.id):
        raise HTTPException(status_code=404, detail="Grid not found or access denied")
    return grid

### MAIN

@cards_router.get("/grid/{grid_id}")
async def get_cards(grid_id: str, current_user: User = Depends(get_current_user)):
    await verify_grid_ownership(grid_id, current_user)
    
    cards = await CardData.find(CardData.grid_id == grid_id).to_list()
    response = [{
        "id": str(card.id),
        "title": card.title,
        "content": card.content,
        "x": card.x,
        "y": card.y,
        "width": card.width,
        "height": card.height,
        "grid_id": card.grid_id
    } for card in cards]
    
    return {"cards": response}


@cards_router.post("/grid/{grid_id}")
async def create_card(grid_id: str, card: CardRequest, current_user: User = Depends(get_current_user)):
    await verify_grid_ownership(grid_id, current_user)
    
    new_card = await CardData(
        title=card.title,
        content=card.content,
        x=card.x,
        y=card.y,
        width=card.width,
        height=card.height,
        grid_id=grid_id
    ).insert()
    
    return {"message": "Card created successfully", "card_id": str(new_card.id)},201

@cards_router.put("/{card_id}")
async def update_card(card_id: PydanticObjectId, card_update: CardRequest, current_user: User = Depends(get_current_user)):
    card = await CardData.get(card_id)
    if not card:
        raise HTTPException(status_code=404, detail="Card not found")
    
    await verify_grid_ownership(card.grid_id, current_user)
    
    card.title = card_update.title
    card.content = card_update.content
    card.x = card_update.x
    card.y = card_update.y
    card.width = card_update.width
    card.height = card_update.height
    await card.save()
    
    return {"message": "Card updated successfully"}

@cards_router.delete("/{card_id}")
async def delete_card(card_id: PydanticObjectId, current_user: User = Depends(get_current_user)):
    card = await CardData.get(card_id)
    if not card:
        raise HTTPException(status_code=404, detail="Card not found")
    
    await verify_grid_ownership(card.grid_id, current_user)
    
    await card.delete()
    return {"message": "Card deleted successfully"} 

