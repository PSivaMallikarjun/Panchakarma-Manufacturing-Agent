"""Application configuration."""
from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    """App settings from env."""
    gemini_api_key: str = ""
    imagen_model: str = "imagen-4.0-generate-001"
    gemini_vision_model: str = "gemini-2.0-flash"
    cors_origins: str = "http://localhost:3000,http://127.0.0.1:3000"
    debug: bool = False

    class Config:
        env_file = ".env"
        extra = "ignore"


@lru_cache
def get_settings() -> Settings:
    return Settings()
