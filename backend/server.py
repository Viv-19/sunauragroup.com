from fastapi import FastAPI, APIRouter, HTTPException, Depends, UploadFile, File, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
from passlib.context import CryptContext
import jwt
import shutil

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Security
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = os.environ.get('JWT_SECRET', 'your-secret-key-change-in-production')
ALGORITHM = "HS256"
security = HTTPBearer()

# Create static directory for uploads
STATIC_DIR = ROOT_DIR / 'static'
STATIC_DIR.mkdir(exist_ok=True)
(STATIC_DIR / 'uploads').mkdir(exist_ok=True)

# Create the main app
app = FastAPI()

# Mount static files
app.mount("/static", StaticFiles(directory=str(STATIC_DIR)), name="static")

# Create API router
api_router = APIRouter(prefix="/api")

# ============= Models =============

class Admin(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    password_hash: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class AdminLogin(BaseModel):
    email: EmailStr
    password: str

class Product(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    features: List[str]
    image_url: str
    brochure_url: Optional[str] = None
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class ProductCreate(BaseModel):
    name: str
    features: List[str]
    image_url: str
    brochure_url: Optional[str] = None

class Project(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    images: List[str]
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class ProjectCreate(BaseModel):
    title: str
    description: str
    images: List[str]

class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    message: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class ContactMessageCreate(BaseModel):
    name: str
    phone: str
    message: str

class Settings(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = "settings"
    dealer_name: str
    phone: str
    email: EmailStr
    address: str
    whatsapp_number: str
    map_embed_url: str
    updated_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class SettingsUpdate(BaseModel):
    dealer_name: str
    phone: str
    email: EmailStr
    address: str
    whatsapp_number: str
    map_embed_url: str

# ============= Helper Functions =============

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: timedelta = timedelta(days=7)):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_admin(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        token = credentials.credentials
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid authentication")
        admin = await db.admins.find_one({"email": email}, {"_id": 0})
        if admin is None:
            raise HTTPException(status_code=401, detail="Admin not found")
        return admin
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid authentication")

# ============= Startup Event =============

@app.on_event("startup")
async def startup_event():
    # Create default admin if not exists
    admin_exists = await db.admins.find_one({"email": "admin@sunaura.com"})
    if not admin_exists:
        admin = Admin(
            email="admin@sunaura.com",
            password_hash=get_password_hash("admin123")
        )
        await db.admins.insert_one(admin.model_dump())
        logger.info("Default admin created: admin@sunaura.com / admin123")
    
    # Create default settings if not exists
    settings_exists = await db.settings.find_one({"id": "settings"})
    if not settings_exists:
        settings = Settings(
            dealer_name="SunAura",
            phone="+91-1234567890",
            email="contact@sunaura.com",
            address="Bokaro, Jharkhand, India",
            whatsapp_number="911234567890",
            map_embed_url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9080207897634!2d86.15116!3d23.78954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ3JzIyLjMiTiA4NsKwMDknMDQuMiJF!5e0!3m2!1sen!2sin!4v1234567890"
        )
        await db.settings.insert_one(settings.model_dump())
    
    # Create default projects if not exists
    projects_count = await db.projects.count_documents({})
    if projects_count == 0:
        project1 = Project(
            title="Bokaro – Hotel Clark Inn",
            description="Installed 48 kW Heat Pump with 5000 litres tank capacity.",
            images=["https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800"]
        )
        project2 = Project(
            title="NIT Jamshedpur Boys Hostel & Girls Hostel",
            description="Installed FPC Solar Water Heater with Heat Exchanger – 12000 LPD.",
            images=["https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800"]
        )
        await db.projects.insert_one(project1.model_dump())
        await db.projects.insert_one(project2.model_dump())
        logger.info("Default projects created")

# ============= Auth Routes =============

@api_router.post("/auth/login")
async def login(credentials: AdminLogin):
    admin = await db.admins.find_one({"email": credentials.email}, {"_id": 0})
    if not admin or not verify_password(credentials.password, admin["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    access_token = create_access_token(data={"sub": admin["email"]})
    return {"access_token": access_token, "token_type": "bearer"}

@api_router.get("/auth/verify")
async def verify_token(admin = Depends(get_current_admin)):
    return {"email": admin["email"]}

# ============= Product Routes =============

@api_router.get("/products", response_model=List[Product])
async def get_products():
    products = await db.products.find({}, {"_id": 0}).to_list(1000)
    return products

@api_router.post("/products", response_model=Product)
async def create_product(product_data: ProductCreate, admin = Depends(get_current_admin)):
    product = Product(**product_data.model_dump())
    await db.products.insert_one(product.model_dump())
    return product

@api_router.put("/products/{product_id}", response_model=Product)
async def update_product(product_id: str, product_data: ProductCreate, admin = Depends(get_current_admin)):
    existing = await db.products.find_one({"id": product_id}, {"_id": 0})
    if not existing:
        raise HTTPException(status_code=404, detail="Product not found")
    
    updated = Product(id=product_id, **product_data.model_dump(), created_at=existing["created_at"])
    await db.products.replace_one({"id": product_id}, updated.model_dump())
    return updated

@api_router.delete("/products/{product_id}")
async def delete_product(product_id: str, admin = Depends(get_current_admin)):
    result = await db.products.delete_one({"id": product_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"message": "Product deleted"}

# ============= Project Routes =============

@api_router.get("/projects", response_model=List[Project])
async def get_projects():
    projects = await db.projects.find({}, {"_id": 0}).to_list(1000)
    return projects

@api_router.post("/projects", response_model=Project)
async def create_project(project_data: ProjectCreate, admin = Depends(get_current_admin)):
    project = Project(**project_data.model_dump())
    await db.projects.insert_one(project.model_dump())
    return project

@api_router.put("/projects/{project_id}", response_model=Project)
async def update_project(project_id: str, project_data: ProjectCreate, admin = Depends(get_current_admin)):
    existing = await db.projects.find_one({"id": project_id}, {"_id": 0})
    if not existing:
        raise HTTPException(status_code=404, detail="Project not found")
    
    updated = Project(id=project_id, **project_data.model_dump(), created_at=existing["created_at"])
    await db.projects.replace_one({"id": project_id}, updated.model_dump())
    return updated

@api_router.delete("/projects/{project_id}")
async def delete_project(project_id: str, admin = Depends(get_current_admin)):
    result = await db.projects.delete_one({"id": project_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Project not found")
    return {"message": "Project deleted"}

# ============= Contact Routes =============

@api_router.post("/contact", response_model=ContactMessage)
async def create_contact_message(message_data: ContactMessageCreate):
    message = ContactMessage(**message_data.model_dump())
    await db.contact_messages.insert_one(message.model_dump())
    return message

@api_router.get("/contact", response_model=List[ContactMessage])
async def get_contact_messages(admin = Depends(get_current_admin)):
    messages = await db.contact_messages.find({}, {"_id": 0}).to_list(1000)
    messages.sort(key=lambda x: x["created_at"], reverse=True)
    return messages

@api_router.delete("/contact/{message_id}")
async def delete_contact_message(message_id: str, admin = Depends(get_current_admin)):
    result = await db.contact_messages.delete_one({"id": message_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Message not found")
    return {"message": "Message deleted"}

# ============= Settings Routes =============

@api_router.get("/settings", response_model=Settings)
async def get_settings():
    settings = await db.settings.find_one({"id": "settings"}, {"_id": 0})
    if not settings:
        raise HTTPException(status_code=404, detail="Settings not found")
    return settings

@api_router.put("/settings", response_model=Settings)
async def update_settings(settings_data: SettingsUpdate, admin = Depends(get_current_admin)):
    updated = Settings(**settings_data.model_dump())
    await db.settings.replace_one({"id": "settings"}, updated.model_dump())
    return updated

# ============= File Upload Route =============

@api_router.post("/upload")
async def upload_file(file: UploadFile = File(...), admin = Depends(get_current_admin)):
    try:
        file_extension = file.filename.split('.')[-1]
        unique_filename = f"{uuid.uuid4()}.{file_extension}"
        file_path = STATIC_DIR / 'uploads' / unique_filename
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        file_url = f"/static/uploads/{unique_filename}"
        return {"url": file_url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"File upload failed: {str(e)}")

# Include the router
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
