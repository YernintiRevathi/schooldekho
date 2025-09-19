#!/usr/bin/env python3
"""
Script to populate MongoDB with mock school data for development
"""

import asyncio
import os
import sys
from datetime import datetime
from motor.motor_asyncio import AsyncIOMotorClient
import uuid

# Add backend to path to import models
sys.path.append('/app/backend')

MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017/schooldekho")

async def populate_schools():
    client = AsyncIOMotorClient(MONGO_URL)
    db = client.schooldekho
    
    # Clear existing data
    await db.schools.delete_many({})
    await db.users.delete_many({})
    
    schools_data = [
        {
            "id": str(uuid.uuid4()),
            "name": "Delhi Public School, R.K. Puram",
            "type": "Day School",
            "board": "CBSE",
            "location": {
                "city": "Delhi",
                "state": "Delhi",
                "address": "Sector 12, R.K. Puram, New Delhi - 110022"
            },
            "fees": {
                "annual_fee": 150000,
                "admission_fee": 25000
            },
            "facilities": [
                "Smart Classrooms",
                "Computer Lab",
                "Science Labs",
                "Library",
                "Sports Complex",
                "Swimming Pool",
                "Auditorium",
                "Cafeteria"
            ],
            "description": "One of India's premier educational institutions, DPS R.K. Puram has been providing quality education since 1972.",
            "images": [
                "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800",
                "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800"
            ],
            "contact": {
                "phone": "+91-11-26174941",
                "email": "info@dpsrkp.net",
                "website": "https://www.dpsrkp.net"
            },
            "admission_info": {
                "admission_start": "December 2024",
                "admission_end": "February 2025",
                "age_criteria": "As per Delhi Government norms",
                "documents_required": ["Birth Certificate", "Address Proof", "Photos"]
            },
            "rating": 4.5,
            "reviews_count": 324,
            "established_year": 1972,
            "website": "https://www.dpsrkp.net",
            "created_at": datetime.now()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Kendriya Vidyalaya No. 1, Mumbai",
            "type": "Day School",
            "board": "CBSE",
            "location": {
                "city": "Mumbai",
                "state": "Maharashtra",
                "address": "Colaba, Mumbai - 400005"
            },
            "fees": {
                "annual_fee": 25000,
                "admission_fee": 2000
            },
            "facilities": [
                "Computer Lab",
                "Science Labs",
                "Library",
                "Playground",
                "Music Room",
                "Art Room"
            ],
            "description": "A central government school providing quality education with nominal fees.",
            "images": [
                "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
                "https://images.unsplash.com/photo-1562774053-701939374585?w=800"
            ],
            "contact": {
                "phone": "+91-22-22161234",
                "email": "kv1mumbai@kvs.gov.in",
                "website": "https://no1mumbai.kvs.ac.in"
            },
            "admission_info": {
                "admission_start": "March 2025",
                "admission_end": "April 2025",
                "age_criteria": "6 years for Class I",
                "documents_required": ["Birth Certificate", "Transfer Certificate", "Photos"]
            },
            "rating": 4.2,
            "reviews_count": 156,
            "established_year": 1963,
            "website": "https://no1mumbai.kvs.ac.in",
            "created_at": datetime.now()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "The Doon School",
            "type": "Boarding School",
            "board": "CBSE",
            "location": {
                "city": "Dehradun",
                "state": "Uttarakhand",
                "address": "The Mall, Dehradun - 248001"
            },
            "fees": {
                "annual_fee": 800000,
                "admission_fee": 100000
            },
            "facilities": [
                "Boarding Facilities",
                "Sports Complex",
                "Swimming Pool",
                "Library",
                "Labs",
                "Music Room",
                "Art Studio",
                "Infirmary",
                "Dining Hall"
            ],
            "description": "India's most prestigious all-boys boarding school, established in 1935.",
            "images": [
                "https://images.unsplash.com/photo-1562774053-701939374585?w=800",
                "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800"
            ],
            "contact": {
                "phone": "+91-135-2526406",
                "email": "admissions@doonschool.com",
                "website": "https://www.doonschool.com"
            },
            "admission_info": {
                "admission_start": "August 2024",
                "admission_end": "December 2024",
                "age_criteria": "11-13 years for entry",
                "documents_required": ["Birth Certificate", "Medical Certificate", "Previous School Records"]
            },
            "rating": 4.8,
            "reviews_count": 89,
            "established_year": 1935,
            "website": "https://www.doonschool.com",
            "created_at": datetime.now()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Little Angels Preschool",
            "type": "Play School",
            "board": "Play Way Method",
            "location": {
                "city": "Bangalore",
                "state": "Karnataka",
                "address": "Koramangala, Bangalore - 560034"
            },
            "fees": {
                "annual_fee": 45000,
                "admission_fee": 5000
            },
            "facilities": [
                "Play Area",
                "Activity Rooms",
                "Toy Library",
                "Sand Pit",
                "Music Room",
                "Art Corner",
                "Safe Transport"
            ],
            "description": "A nurturing environment for early childhood education with play-based learning.",
            "images": [
                "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800",
                "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800"
            ],
            "contact": {
                "phone": "+91-80-25551234",
                "email": "info@littleangels.edu.in",
                "website": "https://www.littleangels.edu.in"
            },
            "admission_info": {
                "admission_start": "January 2025",
                "admission_end": "March 2025",
                "age_criteria": "2-5 years",
                "documents_required": ["Birth Certificate", "Photos", "Medical Certificate"]
            },
            "rating": 4.4,
            "reviews_count": 78,
            "established_year": 2010,
            "website": "https://www.littleangels.edu.in",
            "created_at": datetime.now()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Christ Junior College",
            "type": "PU College",
            "board": "Karnataka PUC",
            "location": {
                "city": "Bangalore",
                "state": "Karnataka",
                "address": "Hosur Road, Bangalore - 560029"
            },
            "fees": {
                "annual_fee": 85000,
                "admission_fee": 15000
            },
            "facilities": [
                "Well-equipped Labs",
                "Library",
                "Sports Facilities",
                "Auditorium",
                "Computer Center",
                "Cafeteria"
            ],
            "description": "Premier pre-university college offering Science, Commerce, and Arts streams.",
            "images": [
                "https://images.unsplash.com/photo-1562774053-701939374585?w=800",
                "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800"
            ],
            "contact": {
                "phone": "+91-80-40129200",
                "email": "admissions@christjuniorcollege.in",
                "website": "https://www.christjuniorcollege.in"
            },
            "admission_info": {
                "admission_start": "May 2025",
                "admission_end": "July 2025",
                "age_criteria": "Completed 10th standard",
                "documents_required": ["10th Marks Card", "Transfer Certificate", "Caste Certificate"]
            },
            "rating": 4.3,
            "reviews_count": 134,
            "established_year": 1969,
            "website": "https://www.christjuniorcollege.in",
            "created_at": datetime.now()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "DAV Public School",
            "type": "Day School",
            "board": "CBSE",
            "location": {
                "city": "Chennai",
                "state": "Tamil Nadu",
                "address": "Mogappair, Chennai - 600037"
            },
            "fees": {
                "annual_fee": 65000,
                "admission_fee": 10000
            },
            "facilities": [
                "Smart Classrooms",
                "Science Labs",
                "Computer Lab",
                "Library",
                "Sports Ground",
                "Music Room"
            ],
            "description": "Part of the DAV network providing value-based quality education.",
            "images": [
                "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800"
            ],
            "contact": {
                "phone": "+91-44-26561234",
                "email": "davchennai@davschools.edu.in",
                "website": "https://www.davchennai.edu.in"
            },
            "admission_info": {
                "admission_start": "December 2024",
                "admission_end": "February 2025",
                "age_criteria": "As per CBSE norms",
                "documents_required": ["Birth Certificate", "Transfer Certificate", "Photos"]
            },
            "rating": 4.1,
            "reviews_count": 67,
            "established_year": 1995,
            "website": "https://www.davchennai.edu.in",
            "created_at": datetime.now()
        }
    ]
    
    # Insert schools
    result = await db.schools.insert_many(schools_data)
    print(f"Inserted {len(result.inserted_ids)} schools")
    
    # Create some sample users
    users_data = [
        {
            "id": str(uuid.uuid4()),
            "name": "Rajesh Kumar",
            "email": "rajesh@example.com",
            "phone": "+91-9876543210",
            "user_type": "parent",
            "location": {"city": "Delhi", "state": "Delhi"},
            "created_at": datetime.now()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Priya Sharma",
            "email": "priya@example.com",
            "phone": "+91-9876543211",
            "user_type": "parent",
            "location": {"city": "Mumbai", "state": "Maharashtra"},
            "created_at": datetime.now()
        }
    ]
    
    user_result = await db.users.insert_many(users_data)
    print(f"Inserted {len(user_result.inserted_ids)} users")
    
    print("Mock data population completed successfully!")
    client.close()

if __name__ == "__main__":
    asyncio.run(populate_schools())