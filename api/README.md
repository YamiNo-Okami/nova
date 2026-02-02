# Nova API

Backend API for the Nova application built with FastAPI and MongoDB.

## Tech Stack

- **FastAPI** - Modern Python web framework
- **MongoDB** - Database with Motor async driver
- **Beanie** - Async Python ODM for MongoDB
- **Pydantic** - Data validation
- **python-jose** - JWT token handling
- **Argon2** - Password hashing

## Setup

### Prerequisites

- Python 3.12+
- MongoDB instance (local or cloud)

### Installation

1. Create a virtual environment:
```bash
python -m venv .venv
```

2. Activate the virtual environment:
```bash
# Windows
.venv\Scripts\activate

# Linux/Mac
source .venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

### Environment Variables

Create a `.env` file in the `api` folder with:

```env
CONN_STRING=mongodb://localhost:27017
# or for MongoDB Atlas:
# CONN_STRING=mongodb+srv://username:password@cluster.mongodb.net/
DB_NAME="db"
SECRET_KEY="some_very_secret_key"
```

## Running the API

```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

## API Documentation

Once running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Data Models

### User
- `id`: Unique identifier
- `username`: User's username
- `email`: User's email address
- `hashed_password`: Securely hashed password
- `grids`: List of Grid IDs

### Grid
- `id`: Unique identifier
- `name`: Grid name
- `active`: Whether the grid is currently active
- `cards`: List of CardData IDs

### CardData
- `id`: Unique identifier
- `title`: Card title
- `content`: Card content
- `x`, `y`: Position coordinates
- `width`, `height`: Card dimensions

## Development

Make sure to install all dependencies from `requirements.txt` before running the application.
