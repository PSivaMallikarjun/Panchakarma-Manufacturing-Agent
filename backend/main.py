"""OpalAI / Panchakarma Agent - FastAPI entrypoint."""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import get_settings
from app.api import router

app = FastAPI(
    title="OpalAI Agentic Manufacturing API",
    description="Image generation (Gemini), intent parsing, and 5 domain manufacturing agents.",
    version="0.1.0",
)
settings = get_settings()
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins.split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(router, prefix="/api", tags=["api"])


@app.get("/")
def root():
    return {"service": "OpalAI Agent", "docs": "/docs", "health": "ok"}


@app.get("/health")
def health():
    return {"status": "ok"}
