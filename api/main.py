from fastapi import FastAPI
from contextlib import asynccontextmanager

from utils.routes.auth import auth_router
from utils.routes.grids import grids_router
from utils.database import init_db


@asynccontextmanager
async def lifespan(app : FastAPI):
    await init_db()
    yield
    
    print("Shutting down...")

app = FastAPI(title="Nova CRUD API", lifespan=lifespan)


app.include_router(auth_router)
app.include_router(grids_router)

@app.get("/")
async def root():
    return {"message": "Welcome to the Nova CRUD API"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)