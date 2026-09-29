"""
Unit and integration tests for BHIMOS FastAPI backend.
Tests health checks, database queries, search filters, and API contracts.
"""
import pytest
from fastapi.testclient import TestClient
from backend.app.main import app
from backend.app.services.db_service import ArchiveDBService

client = TestClient(app)

def test_root_endpoint():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert "version" in data
    assert "docs_url" in data

def test_health_endpoint():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] in ["healthy", "degraded"]
    assert "database" in data
    assert data["database"]["connected"] is True
    assert data["database"]["total_documents"] == 187
    assert data["database"]["total_chunks"] == 70189

def test_archive_stats():
    response = client.get("/api/archive/stats")
    assert response.status_code == 200
    data = response.json()
    assert data["total_documents"] == 187
    assert data["total_indexed_chunks"] == 70189
    assert len(data["document_types"]) > 0

def test_archive_search():
    response = client.get("/api/archive/records?query=Constitution&limit=5")
    assert response.status_code == 200
    data = response.json()
    assert "records" in data
    assert "total" in data
    assert data["limit"] == 5

def test_archive_record_by_id():
    response = client.get("/api/archive/records/1")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == 1
    assert "title" in data
    assert "artifacts" in data
    assert "preview_chunks" in data

def test_archive_record_not_found():
    response = client.get("/api/archive/records/999999")
    assert response.status_code == 404

def test_ask_endpoint():
    response = client.post("/api/ask", json={"question": "What did Ambedkar say about Article 17 untouchability?"})
    assert response.status_code == 200
    data = response.json()
    assert "answer" in data
    assert "citations" in data
    assert len(data["citations"]) > 0

def test_storage_status():
    response = client.get("/api/storage/status")
    assert response.status_code == 200
    data = response.json()
    assert "status" in data

if __name__ == "__main__":
    pytest.main(["-v", __file__])
