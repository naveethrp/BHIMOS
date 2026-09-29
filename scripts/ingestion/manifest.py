"""
Manifest Validation and Generation for BHIMOS Archival Ingestion.
Ensures rigorous archival metadata standards, licensing, and SHA256 integrity.
"""
import json
import hashlib
from pathlib import Path
from typing import Dict, Any, List, Optional
from datetime import datetime

REQUIRED_FIELDS = [
    "source_id", "source_name", "title", "document_type", 
    "language", "rights", "usage_notes", "attribution"
]

def compute_sha256(file_path: Path) -> str:
    """Compute SHA-256 hash of a file."""
    hasher = hashlib.sha256()
    with open(file_path, "rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            hasher.update(chunk)
    return hasher.hexdigest()

def validate_manifest_record(record: Dict[str, Any]) -> List[str]:
    """Validate that a single manifest item adheres to archival standards."""
    errors = []
    for field in REQUIRED_FIELDS:
        if not record.get(field):
            errors.append(f"Missing required field: '{field}'")
    
    if "year" in record and record["year"] is not None:
        try:
            year_int = int(record["year"])
            if year_int < 1850 or year_int > 2050:
                errors.append(f"Invalid historical year: {year_int}")
        except ValueError:
            errors.append(f"Year must be an integer: {record['year']}")

    return errors

def validate_manifest_file(manifest_path: Path) -> Dict[str, Any]:
    """Validate complete manifest file."""
    if not manifest_path.exists():
        return {"valid": False, "errors": [f"Manifest file not found: {manifest_path}"]}

    try:
        with open(manifest_path, "r", encoding="utf-8") as f:
            data = json.load(f)
    except Exception as e:
        return {"valid": False, "errors": [f"Malformed JSON: {str(e)}"]}

    records = data if isinstance(data, list) else data.get("documents", [])
    all_errors = {}

    for idx, rec in enumerate(records):
        rec_errors = validate_manifest_record(rec)
        if rec_errors:
            key = rec.get("source_id") or f"Record #{idx}"
            all_errors[key] = rec_errors

    return {
        "valid": len(all_errors) == 0,
        "total_records": len(records),
        "errors": all_errors
    }

if __name__ == "__main__":
    import sys
    path = Path(sys.argv[1]) if len(sys.argv) > 1 else Path("data/manifests/baws.json")
    print(f"Validating manifest: {path}")
    result = validate_manifest_file(path)
    print(json.dumps(result, indent=2))
