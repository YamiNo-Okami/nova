"""
Database seeding script for Nova application.
Inserts dummy data if the database is empty.
"""
### TODO : there are some nugs in this script that can be cleaned up later 
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from utils.models import User, Grid, CardData
from utils.config import Config
from utils.hash import hash_password

config = Config()

CONN_STRING = config.CONN_STRING
DB_NAME = config.DB_NAME

async def init_db():
    """Initialize the database connection."""
    client = AsyncIOMotorClient(CONN_STRING)
    database = client[DB_NAME]
    await init_beanie(
        database,
        document_models=[User, Grid, CardData]
    )
    return client

async def check_if_empty():
    """Check if the database has any data."""
    user_count = await User.count()
    grid_count = await Grid.count()
    card_count = await CardData.count()
    
    return user_count == 0 and grid_count == 0 and card_count == 0

async def seed_database():
    """Seed the database with dummy data."""
    print("Starting database seeding...")
    
    # Check if database is empty
    if not await check_if_empty():
        print("Database already contains data. Skipping seeding.")
        return
    
    print("Database is empty. Inserting dummy data...")
    
    # Create dummy users
    users_data = [
        {
            "username": "john_doe",
            "email": "john@example.com",
            "password": "password123"
        },
        {
            "username": "jane_smith",
            "email": "jane@example.com",
            "password": "password123"
        },
        {
            "username": "demo_user",
            "email": "demo@example.com",
            "password": "demo123"
        }
    ]
    
    created_users = []
    for user_data in users_data:
        user = User(
            username=user_data["username"],
            email=user_data["email"],
            hashed_password=hash_password(user_data["password"])
        )
        await user.insert()
        created_users.append(user)
        print(f"✓ Created user: {user.username}")
    
    # Create dummy grids for each user
    grids_data = [
        {"name": "Project Dashboard", "user_idx": 0},
        {"name": "Personal Notes", "user_idx": 0},
        {"name": "Work Board", "user_idx": 1},
        {"name": "Ideas & Brainstorming", "user_idx": 1},
        {"name": "Demo Grid", "user_idx": 2},
    ]
    
    created_grids = []
    for grid_data in grids_data:
        user = created_users[grid_data["user_idx"]]
        grid = Grid(
            name=grid_data["name"],
            user_id=str(user.id)
        )
        await grid.insert()
        created_grids.append(grid)
        print(f"✓ Created grid: {grid.name} for user {user.username}")
    
    # Create dummy cards for the grids
    cards_data = [
        # Cards for "Project Dashboard" (Grid 0)
        {
            "title": "Project Setup",
            "content": "Initialize project repository and setup development environment",
            "x": 0,
            "y": 0,
            "width": 250,
            "height": 200,
            "grid_idx": 0
        },
        {
            "title": "API Development",
            "content": "Build RESTful API endpoints for user authentication and data management",
            "x": 300,
            "y": 0,
            "width": 250,
            "height": 200,
            "grid_idx": 0
        },
        {
            "title": "Frontend Components",
            "content": "Create reusable React components for the dashboard",
            "x": 600,
            "y": 0,
            "width": 250,
            "height": 200,
            "grid_idx": 0
        },
        {
            "title": "Testing",
            "content": "Write unit and integration tests for critical features",
            "x": 0,
            "y": 250,
            "width": 250,
            "height": 180,
            "grid_idx": 0
        },
        # Cards for "Personal Notes" (Grid 1)
        {
            "title": "Learning Goals",
            "content": "Master TypeScript, Learn Docker, Explore GraphQL",
            "x": 0,
            "y": 0,
            "width": 300,
            "height": 220,
            "grid_idx": 1
        },
        {
            "title": "Book Recommendations",
            "content": "Clean Code by Robert Martin\nDesign Patterns by Gang of Four",
            "x": 350,
            "y": 0,
            "width": 280,
            "height": 200,
            "grid_idx": 1
        },
        # Cards for "Work Board" (Grid 2)
        {
            "title": "Sprint Planning",
            "content": "Review backlog and prioritize tasks for the upcoming sprint",
            "x": 0,
            "y": 0,
            "width": 270,
            "height": 190,
            "grid_idx": 2
        },
        {
            "title": "Code Review",
            "content": "Review pull requests from team members",
            "x": 320,
            "y": 0,
            "width": 250,
            "height": 190,
            "grid_idx": 2
        },
        {
            "title": "Team Meeting",
            "content": "Daily standup at 10 AM - Discuss progress and blockers",
            "x": 0,
            "y": 240,
            "width": 270,
            "height": 180,
            "grid_idx": 2
        },
        # Cards for "Ideas & Brainstorming" (Grid 3)
        {
            "title": "App Feature Ideas",
            "content": "- Real-time collaboration\n- Mobile app version\n- Dark mode theme",
            "x": 0,
            "y": 0,
            "width": 300,
            "height": 230,
            "grid_idx": 3
        },
        {
            "title": "Marketing Strategy",
            "content": "Focus on developer communities, create tutorial content, engage on social media",
            "x": 350,
            "y": 0,
            "width": 290,
            "height": 200,
            "grid_idx": 3
        },
        # Cards for "Demo Grid" (Grid 4)
        {
            "title": "Welcome!",
            "content": "This is your demo grid. Drag cards around, resize them, and create new ones!",
            "x": 100,
            "y": 100,
            "width": 300,
            "height": 180,
            "grid_idx": 4
        },
        {
            "title": "Getting Started",
            "content": "Click the + button to add new cards. Double-click to edit.",
            "x": 450,
            "y": 100,
            "width": 280,
            "height": 180,
            "grid_idx": 4
        },
    ]
    
    for card_data in cards_data:
        grid = created_grids[card_data["grid_idx"]]
        card = CardData(
            title=card_data["title"],
            content=card_data["content"],
            x=card_data["x"],
            y=card_data["y"],
            width=card_data["width"],
            height=card_data["height"],
            grid_id=str(grid.id)
        )
        await card.insert()
        print(f"✓ Created card: {card.title} in grid {grid.name}")
    
    print("\n✅ Database seeding completed successfully!")
    print(f"   - {len(created_users)} users created")
    print(f"   - {len(created_grids)} grids created")
    print(f"   - {len(cards_data)} cards created")
    print("\nTest credentials:")
    for user_data in users_data:
        print(f"   Username: {user_data['username']}, Password: {user_data['password']}")

async def main():
    """Main function to run the seeding script."""
    try:
        client = await init_db()
        await seed_database()
        client.close()
    except Exception as e:
        print(f"❌ Error during seeding: {str(e)}")
        raise

if __name__ == "__main__":
    asyncio.run(main())
