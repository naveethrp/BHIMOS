"""
Configuration settings for BHIMOS backend.
Loads settings from environment variables with safe defaults.
"""
from pathlib import Path
import json
from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List, Union

REPO_ROOT = Path(__file__).resolve().parent.parent.parent.parent

class Settings(BaseSettings):
    PROJECT_NAME: str = "BHIMOS - Dr. B. R. Ambedkar Digital Heritage Archive API"
    VERSION: str = "1.0.0"
    API_PREFIX: str = "/api"
    
    # Paths (relative to repository root by default)
    DB_PATH: Path = REPO_ROOT / "data" / "heritage.db"
    FAISS_PATH: Path = REPO_ROOT / "data" / "vector" / "heritage.faiss"
    VECTOR_MODEL_NAME: str = "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2"
    
    # OCR settings
    TESSERACT_CMD: str = ""
    
    # CORS
    CORS_ORIGINS: Union[List[str], str] = [
        "http://localhost:5173",
        "http://localhost:4173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:4173",
        "http://127.0.0.1:8000"
    ]

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> List[str]:
        if isinstance(v, str):
            v = v.strip()
            if v.startswith("[") and v.endswith("]"):
                try:
                    return json.loads(v)
                except Exception:
                    pass
            return [i.strip() for i in v.split(",") if i.strip()]
        elif isinstance(v, list):
            return v
        return []
    
    # Google Drive sync (optional credentials)
    GOOGLE_DRIVE_FOLDER_ID: str = ""
    GOOGLE_SERVICE_ACCOUNT_FILE: str = ""
    
    # Server settings
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    DEBUG: bool = False

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()
