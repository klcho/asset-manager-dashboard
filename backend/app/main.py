from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# API Router
from app.api.endpoints.assets import router as asset_router

app = FastAPI(
    title="AssetMap Pro API",
    description="자산관리 대시보드 백엔드 (FastAPI + Supabase)",
    version="1.0.0"
)

# CORS Config (Frontend 연동을 위해 허용)
origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to AssetMap Pro API Endpoint"}

@app.get("/health")
def health_check():
    return {"status": "ok"}

app.include_router(asset_router, prefix="/api/v1/assets", tags=["Assets"])
