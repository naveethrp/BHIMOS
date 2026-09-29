"""
Test script to verify complete Backup + Restore pipeline:
1. Run backup
2. Verify SHA-256 checksum
3. Restore into clean temporary folder
4. Verify SQLite, FAISS, and Manifests are fully readable
"""
import os
import sys
import shutil
import hashlib
import tarfile
import sqlite3
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))

from scripts.backup_archive import create_archive_backup, compute_sha256
RESTORE_DIR = REPO_ROOT / "data" / "test_restore_dest"

def run_test():
    print("=== STEP 1: CREATE BACKUP ===")
    backup_file = create_archive_backup()
    assert backup_file.exists(), "Backup archive was not created!"
    
    print("\n=== STEP 2: VERIFY SHA-256 CHECKSUM ===")
    checksum_file = backup_file.parent / f"{backup_file.name}.sha256"
    assert checksum_file.exists(), "Checksum file not found!"
    
    with open(checksum_file, "r") as f:
        expected_hash = f.read().split()[0].strip()
    
    actual_hash = compute_sha256(backup_file)
    print(f"Expected SHA-256: {expected_hash}")
    print(f"Actual   SHA-256: {actual_hash}")
    assert expected_hash == actual_hash, "Checksum mismatch!"
    print("[OK] Checksum match verified.")

    print("\n=== STEP 3: RESTORE ARCHIVE TO CLEAN TEMP DIRECTORY ===")
    if RESTORE_DIR.exists():
        shutil.rmtree(RESTORE_DIR)
    RESTORE_DIR.mkdir(parents=True)

    with tarfile.open(backup_file, "r:gz") as tar:
        tar.extractall(RESTORE_DIR)
    print(f"Extracted to {RESTORE_DIR}")

    print("\n=== STEP 4: VERIFY RESTORED SQLITE DATABASE ===")
    restored_db = RESTORE_DIR / "heritage.db"
    assert restored_db.exists(), "Restored heritage.db missing!"
    conn = sqlite3.connect(str(restored_db))
    c = conn.cursor()
    c.execute("SELECT COUNT(*) FROM documents")
    docs_count = c.fetchone()[0]
    c.execute("SELECT COUNT(*) FROM text_chunks")
    chunks_count = c.fetchone()[0]
    conn.close()
    print(f"Restored Database Documents: {docs_count} (Expected: 187)")
    print(f"Restored Database Chunks:    {chunks_count} (Expected: 70189)")
    assert docs_count == 187, f"Expected 187 docs, found {docs_count}"
    assert chunks_count == 70189, f"Expected 70189 chunks, found {chunks_count}"
    print("[OK] SQLite integrity verified.")

    print("\n=== STEP 5: VERIFY RESTORED FAISS VECTOR INDEX ===")
    restored_faiss = RESTORE_DIR / "vector" / "heritage.faiss"
    assert restored_faiss.exists(), "Restored heritage.faiss missing!"
    import faiss
    idx = faiss.read_index(str(restored_faiss))
    print(f"Restored FAISS ntotal: {idx.ntotal} (Expected: 70189)")
    print(f"Restored FAISS dim:    {idx.d} (Expected: 384)")
    assert idx.ntotal == 70189, f"Expected 70189 vectors, found {idx.ntotal}"
    assert idx.d == 384, f"Expected 384 dim, found {idx.d}"
    print("[OK] FAISS vector integrity verified.")

    print("\n=== STEP 6: VERIFY RESTORED MANIFESTS ===")
    manifest_dir = RESTORE_DIR / "manifests"
    assert manifest_dir.exists(), "Restored manifests missing!"
    manifest_files = list(manifest_dir.glob("*"))
    print(f"Restored manifests count: {len(manifest_files)}")
    assert len(manifest_files) >= 2, "Expected at least 2 manifest files!"
    print("[OK] Manifests verified.")

    # Cleanup temporary test files
    shutil.rmtree(RESTORE_DIR)
    backup_file.unlink()
    checksum_file.unlink()
    print("\n=== ALL BACKUP & RESTORE TESTS PASSED CLEANLY! ===")

if __name__ == "__main__":
    run_test()
