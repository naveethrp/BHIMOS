"""
API endpoints for BHIMOS digital heritage archive.
"""
from typing import Optional, List
from fastapi import APIRouter, UploadFile, File, Query, HTTPException, status
from pydantic import BaseModel, Field

from backend.app.services.db_service import ArchiveDBService
from backend.app.services.rag_service import rag_service
from backend.app.services.ocr_service import ocr_service
from backend.app.services.drive_service import drive_service

router = APIRouter()

class AskRequest(BaseModel):
    question: str = Field(..., min_length=1, description="Historical inquiry or question")
    language: Optional[str] = Field("en", description="Language code (en, hi, mr)")

class AskResponse(BaseModel):
    query: str
    answer: str
    citations: List[dict]
    mode: str
    grounded: bool

@router.get("/health")
def get_health():
    """System health check and component status."""
    db_ok = False
    stats = {}
    try:
        stats = ArchiveDBService.get_stats()
        db_ok = True
    except Exception as e:
        stats = {"error": str(e)}

    return {
        "status": "healthy" if db_ok else "degraded",
        "database": {
            "connected": db_ok,
            "total_documents": stats.get("total_documents", 0),
            "total_chunks": stats.get("total_indexed_chunks", 0)
        },
        "vector_search": {
            "ready": rag_service.is_vector_ready,
            "faiss_loaded": rag_service.index is not None,
            "vectors_count": rag_service.index.ntotal if rag_service.index else 0
        },
        "ocr_engine": {
            "available": ocr_service.is_available,
            "binary_path": ocr_service.tesseract_path
        },
        "storage": drive_service.get_status()
    }

@router.get("/archive/stats")
def get_archive_stats():
    """Retrieve aggregate statistics of historical records and collections."""
    try:
        return ArchiveDBService.get_stats()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/archive/records")
def search_archive_records(
    query: Optional[str] = Query(None, description="Search term in title/author/collection"),
    collection: Optional[str] = Query(None, description="Filter by collection name"),
    doc_type: Optional[str] = Query(None, description="Filter by document type"),
    year: Optional[int] = Query(None, description="Filter by specific year"),
    limit: int = Query(50, ge=1, le=200),
    offset: int = Query(0, ge=0)
):
    """Search and filter archival documents from SQLite database."""
    try:
        return ArchiveDBService.search_documents(
            query=query,
            collection=collection,
            doc_type=doc_type,
            year=year,
            limit=limit,
            offset=offset
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/archive/records/{doc_id}")
def get_archive_record(doc_id: int):
    """Retrieve complete metadata, artifacts, and preview chunks for a document."""
    doc = ArchiveDBService.get_document_by_id(doc_id)
    if not doc:
        raise HTTPException(status_code=404, detail=f"Archival record {doc_id} not found")
    return doc

@router.post("/ask", response_model=AskResponse)
def ask_archive(payload: AskRequest):
    """
    RAG endpoint: query vector index and SQLite database, returning grounded citations.
    """
    if not payload.question.strip():
        raise HTTPException(status_code=400, detail="Question cannot be empty")
    
    result = rag_service.answer_query(payload.question, language=payload.language or "en")
    return AskResponse(**result)

@router.post("/ocr/extract")
async def extract_ocr_from_file(file: UploadFile = File(...)):
    """
    Process uploaded scan/image and extract text layers with layout coordinates.
    """
    file_bytes = await file.read()
    if len(file_bytes) == 0:
        raise HTTPException(status_code=400, detail="Uploaded file is empty")

    # Limit file upload size to 25 MB
    if len(file_bytes) > 25 * 1024 * 1024:
        raise HTTPException(status_code=413, detail="File size exceeds maximum 25 MB limit")

    result = ocr_service.process_image(file_bytes, file.filename or "uploaded_scan")
    return result

@router.get("/storage/status")
def get_storage_status():
    """Retrieve status of Google Drive external archival storage."""
    return drive_service.get_status()
