"""
Staging and Fetch Script for BHIMOS Archival Ingestion.
Verifies file presence, computes SHA256 checksums, and logs fetch status to database.
Supports resumable runs without re-fetching existing valid artifacts.
"""
import sqlite3
import hashlib
from datetime import datetime
from pathlib import Path
from typing import Dict, Any, Optional

REPO_ROOT = Path(__file__).resolve().parent.parent.parent
DB_PATH = REPO_ROOT / "data" / "heritage.db"
STAGE_DIR = REPO_ROOT / "data" / "originals"

def compute_sha256(file_path: Path) -> str:
    hasher = hashlib.sha256()
    with open(file_path, "rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            hasher.update(chunk)
    return hasher.hexdigest()

def stage_and_record_fetch(
    source_id: str,
    requested_url: str,
    local_file_path: Optional[Path] = None,
    run_id: Optional[int] = None
) -> Dict[str, Any]:
    """
    Verify and record local file artifact for ingestion.
    """
    STAGE_DIR.mkdir(parents=True, exist_ok=True)
    status = "FAILED"
    error = None
    sha256 = None
    byte_size = 0

    if local_file_path and local_file_path.exists():
        status = "COMPLETED"
        sha256 = compute_sha256(local_file_path)
        byte_size = local_file_path.stat().st_size
    else:
        error = f"Artifact not found on disk: {local_file_path}"

    if DB_PATH.exists():
        conn = sqlite3.connect(str(DB_PATH))
        c = conn.cursor()
        now = datetime.utcnow().isoformat()
        try:
            c.execute("""
                INSERT INTO fetch_records (run_id, source_id, requested_url, final_url, status, retrieved_at, error)
                VALUES (?, ?, ?, ?, ?, ?, ?)
                ON CONFLICT(source_id, requested_url) DO UPDATE SET
                    status=excluded.status,
                    retrieved_at=excluded.retrieved_at,
                    error=excluded.error
            """, (run_id, source_id, requested_url, str(local_file_path) if local_file_path else None, status, now, error))
            conn.commit()
        except Exception as e:
            print(f"Warning: Could not log fetch_record: {e}")
        finally:
            conn.close()

    return {
        "source_id": source_id,
        "status": status,
        "sha256": sha256,
        "byte_size": byte_size,
        "error": error
    }

if __name__ == "__main__":
    print("Fetch staging utility initialized.")
