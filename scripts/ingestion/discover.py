"""
Source Discovery Script for BHIMOS Archival Ingestion.
Discovers manifest files and unindexed documents across directories.
"""
import csv
import json
import sqlite3
from pathlib import Path
from typing import List, Dict, Any

REPO_ROOT = Path(__file__).resolve().parent.parent.parent
MANIFEST_DIR = REPO_ROOT / "data" / "manifests"
DB_PATH = REPO_ROOT / "data" / "heritage.db"

def get_already_indexed_urls(db_path: Path) -> set:
    """Return set of original_urls already in SQLite database."""
    if not db_path.exists():
        return set()
    conn = sqlite3.connect(str(db_path))
    c = conn.cursor()
    c.execute("SELECT original_url FROM documents")
    urls = {row[0] for row in c.fetchall()}
    conn.close()
    return urls

def discover_manifests(manifest_dir: Path) -> List[Path]:
    """Find all JSON and CSV manifest files."""
    if not manifest_dir.exists():
        return []
    manifests = sorted(list(manifest_dir.glob("*.json")) + list(manifest_dir.glob("*.csv")))
    return manifests

def discover_pending_records() -> Dict[str, Any]:
    """Scan manifests and find records not yet indexed in heritage.db."""
    indexed_urls = get_already_indexed_urls(DB_PATH)
    manifest_files = discover_manifests(MANIFEST_DIR)
    
    total_discovered = 0
    pending_records = []
    
    for mf in manifest_files:
        try:
            records = []
            if mf.suffix.lower() == ".json":
                with open(mf, "r", encoding="utf-8") as f:
                    data = json.load(f)
                records = data if isinstance(data, list) else data.get("documents", [])
            elif mf.suffix.lower() == ".csv":
                with open(mf, "r", encoding="utf-8", errors="replace") as f:
                    reader = csv.DictReader(f)
                    records = list(reader)

            for r in records:
                total_discovered += 1
                url = r.get("original_url") or r.get("source_url") or r.get("file_url") or r.get("url")
                if url and url not in indexed_urls:
                    pending_records.append({
                        "manifest": mf.name,
                        "record": r
                    })
        except Exception as e:
            print(f"Error reading manifest {mf}: {e}")

    return {
        "manifest_files_count": len(manifest_files),
        "total_manifest_records": total_discovered,
        "already_indexed_count": len(indexed_urls),
        "pending_to_ingest": len(pending_records),
        "pending_sample": pending_records[:5]
    }

if __name__ == "__main__":
    summary = discover_pending_records()
    print("=== BHIMOS INGESTION DISCOVERY ===")
    print(f"Manifests found: {summary['manifest_files_count']}")
    print(f"Total manifest records: {summary['total_manifest_records']}")
    print(f"Already in heritage.db: {summary['already_indexed_count']}")
    print(f"Pending ingestion: {summary['pending_to_ingest']}")
