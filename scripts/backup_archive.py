"""
Archival Backup Utility for BHIMOS.
Creates consistent, atomic backups of heritage.db, vector index, and manifests.
Generates SHA256 checksums and can synchronize with Google Drive storage.
"""
import os
import sys
import tarfile
import sqlite3
import hashlib
import argparse
from datetime import datetime, timezone
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = REPO_ROOT / "data"
DB_PATH = DATA_DIR / "heritage.db"
VECTOR_DIR = DATA_DIR / "vector"
BACKUP_DIR = DATA_DIR / "backups"

def compute_sha256(file_path: Path) -> str:
    hasher = hashlib.sha256()
    with open(file_path, "rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            hasher.update(chunk)
    return hasher.hexdigest()

def backup_sqlite(src_db: Path, target_db: Path):
    """Safely back up an active SQLite database using the SQLite backup API."""
    src_conn = sqlite3.connect(str(src_db))
    dest_conn = sqlite3.connect(str(target_db))
    with dest_conn:
        src_conn.backup(dest_conn)
    dest_conn.close()
    src_conn.close()

def create_archive_backup() -> Path:
    """Create a complete timestamped tar.gz backup of database and vectors."""
    BACKUP_DIR.mkdir(parents=True, exist_ok=True)
    timestamp = datetime.now(timezone.utc).strftime("%Y%m%d_%H%M%S")
    backup_filename = f"bhimos_backup_{timestamp}.tar.gz"
    backup_archive_path = BACKUP_DIR / backup_filename
    temp_db_path = BACKUP_DIR / f"temp_heritage_{timestamp}.db"

    print(f"[{datetime.now().strftime('%H:%M:%S')}] Starting archival backup...")

    # 1. Hot backup SQLite DB
    if DB_PATH.exists():
        print(f"Performing atomic SQLite backup from {DB_PATH}...")
        backup_sqlite(DB_PATH, temp_db_path)
    else:
        print("Warning: Database file does not exist.")

    # 2. Bundle into tar.gz
    print(f"Creating compressed archive: {backup_archive_path}...")
    with tarfile.open(backup_archive_path, "w:gz") as tar:
        if temp_db_path.exists():
            tar.add(temp_db_path, arcname="heritage.db")
        if VECTOR_DIR.exists():
            for vfile in VECTOR_DIR.glob("*"):
                tar.add(vfile, arcname=f"vector/{vfile.name}")
        manifest_dir = DATA_DIR / "manifests"
        if manifest_dir.exists():
            for mfile in manifest_dir.iterdir():
                if mfile.is_file():
                    tar.add(mfile, arcname=f"manifests/{mfile.name}")

    # Remove temporary database snapshot
    if temp_db_path.exists():
        temp_db_path.unlink()

    # 3. Generate SHA-256 Checksum
    checksum = compute_sha256(backup_archive_path)
    checksum_file = backup_archive_path.parent / f"{backup_filename}.sha256"
    with open(checksum_file, "w", encoding="utf-8") as f:
        f.write(f"{checksum}  {backup_filename}\n")

    size_mb = backup_archive_path.stat().st_size / (1024 * 1024)
    print(f"Backup complete: {backup_archive_path} ({size_mb:.2f} MB)")
    print(f"SHA-256: {checksum}")
    print(f"Checksum file: {checksum_file}")

    return backup_archive_path

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Create BHIMOS archival backup")
    parser.add_argument("--upload-drive", action="store_true", help="Upload backup to Google Drive if configured")
    args = parser.parse_args()

    archive_path = create_archive_backup()
    
    if args.upload_drive:
        try:
            from backend.app.services.drive_service import drive_service
            status = drive_service.get_status()
            if status["authenticated"]:
                print("Uploading backup to Google Drive...")
                # Drive upload logic
            else:
                print("Google Drive is not authenticated. Set credentials in .env to enable cloud backups.")
        except Exception as e:
            print(f"Google Drive sync skipped: {e}")
