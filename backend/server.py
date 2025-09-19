from fastapi import FastAPI, HTTPException, Depends, File, UploadFile, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime, timedelta
import os
import uuid
from bson import ObjectId
import json

app = FastAPI(title="SchoolDekho API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017/schooldekho")
client = AsyncIOMotorClient(MONGO_URL)
db = client.schooldekho

# Security
security = HTTPBearer()

# Pydantic Models
class School(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    type: str  # Day School, Boarding School, Play School, PU College
    board: str  # CBSE, ICSE, IB, State Board
    location: Dict[str, str]  # city, state, address
    fees: Dict[str, int]  # annual_fee, admission_fee
    facilities: List[str]
    description: str
    images: List[str] = []
    contact: Dict[str, str]
    admission_info: Dict[str, Any]
    rating: float = 0.0
    reviews_count: int = 0
    established_year: int
    website: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.now)

class User(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    user_type: str  # parent, student, alumni, admin
    location: Dict[str, str]
    created_at: datetime = Field(default_factory=datetime.now)

class LoanApplication(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    school_id: str
    student_name: str
    student_age: int
    class_applying_for: str
    loan_amount: int
    family_income: int
    documents: List[str] = []
    status: str = "pending"  # pending, approved, rejected
    created_at: datetime = Field(default_factory=datetime.now)

class ScholarshipSearch(BaseModel):
    eligibility_criteria: str
    amount_range: Dict[str, int]
    application_deadline: datetime
    location: Optional[str] = None

# Helper functions
def serialize_doc(doc):
    if doc and "_id" in doc:
        doc["_id"] = str(doc["_id"])
    return doc

# API Routes

@app.get("/")
async def root():
    return {"message": "SchoolDekho API is running!", "version": "1.0.0"}

# Health check
@app.get("/api/health")
async def health_check():
    try:
        # Test database connection
        await db.schools.find_one()
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        return {"status": "unhealthy", "error": str(e)}

# School Routes
@app.get("/api/schools")
async def get_schools(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=50),
    school_type: Optional[str] = None,
    board: Optional[str] = None,
    city: Optional[str] = None,
    min_fee: Optional[int] = None,
    max_fee: Optional[int] = None
):
    skip = (page - 1) * limit
    filter_query = {}
    
    if school_type:
        filter_query["type"] = school_type
    if board:
        filter_query["board"] = board
    if city:
        filter_query["location.city"] = {"$regex": city, "$options": "i"}
    if min_fee or max_fee:
        fee_filter = {}
        if min_fee:
            fee_filter["$gte"] = min_fee
        if max_fee:
            fee_filter["$lte"] = max_fee
        filter_query["fees.annual_fee"] = fee_filter
    
    try:
        cursor = db.schools.find(filter_query).skip(skip).limit(limit)
        schools = await cursor.to_list(length=limit)
        total = await db.schools.count_documents(filter_query)
        
        return {
            "schools": [serialize_doc(school) for school in schools],
            "total": total,
            "page": page,
            "pages": (total + limit - 1) // limit
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/schools/{school_id}")
async def get_school(school_id: str):
    try:
        school = await db.schools.find_one({"id": school_id})
        if not school:
            raise HTTPException(status_code=404, detail="School not found")
        return serialize_doc(school)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/schools/compare")
async def compare_schools(school_ids: List[str]):
    try:
        schools = []
        for school_id in school_ids:
            school = await db.schools.find_one({"id": school_id})
            if school:
                schools.append(serialize_doc(school))
        
        if len(schools) < 2:
            raise HTTPException(status_code=400, detail="At least 2 schools required for comparison")
        
        return {"schools": schools}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Loan Application Routes
@app.post("/api/loans/apply")
async def apply_loan(loan: LoanApplication):
    try:
        loan_dict = loan.dict()
        result = await db.loan_applications.insert_one(loan_dict)
        return {"message": "Loan application submitted successfully", "application_id": loan.id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/loans/{user_id}")
async def get_user_loans(user_id: str):
    try:
        cursor = db.loan_applications.find({"user_id": user_id})
        loans = await cursor.to_list(length=None)
        return [serialize_doc(loan) for loan in loans]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# User Routes
@app.post("/api/users/register")
async def register_user(user: User):
    try:
        # Check if user already exists
        existing_user = await db.users.find_one({"email": user.email})
        if existing_user:
            raise HTTPException(status_code=400, detail="User already exists")
        
        user_dict = user.dict()
        result = await db.users.insert_one(user_dict)
        return {"message": "User registered successfully", "user_id": user.id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Search and Filter Options
@app.get("/api/filters/options")
async def get_filter_options():
    try:
        school_types = await db.schools.distinct("type")
        boards = await db.schools.distinct("board")
        cities = await db.schools.distinct("location.city")
        
        return {
            "school_types": school_types,
            "boards": boards,
            "cities": cities
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Alumni Routes
@app.get("/api/alumni/{school_id}")
async def get_school_alumni(school_id: str):
    try:
        # For now, return mock alumni data
        alumni = await db.users.find({
            "user_type": "alumni",
            "school_id": school_id
        }).to_list(length=None)
        
        return [serialize_doc(alumnus) for alumnus in alumni]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)