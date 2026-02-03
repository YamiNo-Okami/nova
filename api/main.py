from fastapi import FastAPI
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware

from utils.routes.auth import auth_router
from utils.routes.grids import grids_router
from utils.routes.cards import cards_router

from utils.database import init_db


@asynccontextmanager
async def lifespan(app : FastAPI):
    await init_db()
    yield
    
    print("Shutting down...")

app = FastAPI(title="Nova CRUD API", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth_router)
app.include_router(grids_router)
app.include_router(cards_router)

@app.get("/")
async def root():
    return {"message": "Welcome to the Nova CRUD API"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)