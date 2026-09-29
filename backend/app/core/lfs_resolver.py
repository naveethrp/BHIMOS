"""
Git LFS resolver for BHIMOS persistent backend.
Ensures that data/heritage.db and data/vector/heritage.faiss are downloaded and fully hydrated
even when deployed to container environments that clone without Git LFS pre-installed.
"""
import os
import json
import logging
import urllib.request
from pathlib import Path

logger = logging.getLogger("bhimos.lfs")

GITHUB_REPO_LFS_URL = "https://github.com/naveethrp/BHIMOS.git/info/lfs/objects/batch"

KNOWN_LFS_OBJECTS = {
    "heritage.db": {
        "oid": "236b2855f1bc6a584d39b84f942b222c1a51264135ade29d6e7163690475bdf2",
        "size": 70807552
    },
    "heritage.faiss": {
        "oid": "f0782f0d6fe35671bd56e6f7a71bf0ed4708a13837e7afd7d479519c84636531",
        "size": 108375629
    }
}

def is_lfs_pointer(file_path: Path) -> bool:
    """Check if the given file does not exist or is a Git LFS text pointer."""
    if not file_path.exists():
        return True
    
    # If file size is larger than 1MB, it cannot be an LFS pointer
    if file_path.stat().st_size > 1024 * 1024:
        return False
        
    try:
        with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
            header = f.readline()
            return "version https://git-lfs.github.com/spec/v1" in header
    except Exception:
        return False

def parse_pointer_info(file_path: Path, filename: str) -> tuple[str, int]:
    """Parse oid and size from pointer or fall back to known OID map."""
    oid = ""
    size = 0
    if file_path.exists():
        try:
            with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                for line in f:
                    line = line.strip()
                    if line.startswith("oid sha256:"):
                        oid = line.split(":", 1)[1].strip()
                    elif line.startswith("size "):
                        size = int(line.split(" ", 1)[1].strip())
        except Exception as e:
            logger.warning(f"Could not parse pointer file {file_path}: {e}")
            
    if not oid or not size:
        known = KNOWN_LFS_OBJECTS.get(filename, {})
        oid = known.get("oid", "")
        size = known.get("size", 0)
        
    return oid, size

def download_lfs_object(file_path: Path, oid: str, size: int) -> bool:
    """Download Git LFS object directly from GitHub LFS storage."""
    logger.info(f"Downloading Git LFS object for {file_path.name} (OID: {oid[:10]}..., Size: {size / (1024*1024):.2f} MB)...")
    
    payload = {
        "operation": "download",
        "transfers": ["basic"],
        "objects": [{"oid": oid, "size": size}]
    }
    
    req = urllib.request.Request(
        GITHUB_REPO_LFS_URL,
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Content-Type": "application/json",
            "Accept": "application/vnd.git-lfs+json",
            "User-Agent": "git-lfs"
        }
    )
    
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            download_url = data["objects"][0]["actions"]["download"]["href"]
    except Exception as e:
        logger.error(f"Failed to obtain LFS download URL for {file_path.name}: {e}")
        return False

    temp_path = file_path.with_suffix(file_path.suffix + ".downloading")
    file_path.parent.mkdir(parents=True, exist_ok=True)
    
    try:
        download_req = urllib.request.Request(download_url, headers={"User-Agent": "BHIMOS-Backend"})
        with urllib.request.urlopen(download_req, timeout=120) as source, open(temp_path, "wb") as dest:
            downloaded = 0
            chunk_size = 1024 * 1024 # 1MB
            while True:
                chunk = source.read(chunk_size)
                if not chunk:
                    break
                dest.write(chunk)
                downloaded += len(chunk)
                
        if temp_path.stat().st_size != size:
            logger.error(f"Size mismatch for {file_path.name}: expected {size} bytes, got {temp_path.stat().st_size} bytes")
            if temp_path.exists():
                temp_path.unlink()
            return False
            
        temp_path.replace(file_path)
        logger.info(f"Successfully downloaded and verified {file_path.name} ({size / (1024*1024):.2f} MB).")
        return True
    except Exception as e:
        logger.error(f"Error downloading {file_path.name}: {e}")
        if temp_path.exists():
            temp_path.unlink()
        return False

def ensure_lfs_objects_hydrated(db_path: Path, faiss_path: Path) -> dict:
    """Verify and hydrate database and FAISS index from Git LFS if needed."""
    results = {}
    
    for path, name in [(db_path, "heritage.db"), (faiss_path, "heritage.faiss")]:
        if is_lfs_pointer(path):
            logger.warning(f"{name} at {path} is an LFS pointer or missing. Hydrating from GitHub LFS...")
            oid, size = parse_pointer_info(path, name)
            if oid and size:
                success = download_lfs_object(path, oid, size)
                results[name] = "hydrated" if success else "failed"
            else:
                results[name] = "missing_oid"
        else:
            size_mb = path.stat().st_size / (1024 * 1024)
            logger.info(f"{name} is intact ({size_mb:.2f} MB).")
            results[name] = "intact"
            
    return results
