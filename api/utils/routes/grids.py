from fastapi import APIRouter, Depends, HTTPException
from utils.models import User, Grid
from pydantic import BaseModel
from utils.jwt import decode_access_token
from utils.deps import get_current_user
from beanie import PydanticObjectId

grids_router = APIRouter(
    prefix="/grids",
    tags=["Grids"]
)   
### HELPERS

class GridRequest(BaseModel):
    name : str

class GridResponse:
    id : str
    name : str
    user: str
    
### MAIN


@grids_router.get("")
async def get_grids(current_user: User = Depends(get_current_user)):
    
    grids = await Grid.find(Grid.user_id == str(current_user.id)).to_list()
    response = [{"id": str(grid.id), "name": grid.name} for grid in grids]
    return {
        "username": current_user.username,
        "grids": response
        }


@grids_router.post("")
async def create_grid(grid: GridRequest, current_user: User = Depends(get_current_user)):
    
    new_grid = await Grid(
        name=grid.name,
        user_id=str(current_user.id)
    ).insert()
    
    return {"message": "Grid created successfully", "grid_id": str(new_grid.id)}



#TODO : Make sure all crads associated with the grid are also deleted 
@grids_router.delete("/{grid_id}")
async def delete_grid(grid_id:  PydanticObjectId, current_user: User = Depends(get_current_user)):
    grid = await Grid.get(grid_id)
    if not grid or grid.user_id != str(current_user.id):
        raise HTTPException(status_code=404, detail="Grid not found")
    
    await grid.delete()
    return {"message": "Grid deleted successfully"}


@grids_router.put("/{grid_id}")
async def update_grid(grid_id:  PydanticObjectId, grid_update: GridRequest, current_user: User = Depends(get_current_user)):
    print("Updating grid:", grid_id, "with data:", grid_update)
    grid = await Grid.get(grid_id)
    print(grid)
    if not grid or grid.user_id != str(current_user.id):
        raise HTTPException(status_code=404, detail="Grid not found")
    
    grid.name = grid_update.name
    await grid.save()
    return {"message": "Grid updated successfully"}


