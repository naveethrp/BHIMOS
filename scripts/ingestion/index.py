"""
Archival Indexing Script for BHIMOS.
Inserts validated documents, artifacts, and chunks into heritage.db,
and updates the FAISS vector index with embedding vectors.
"""
import json
import sqlite3
import argparse
from pathlib import Path
from datetime import datetime
from typing import List, Dict, Any

REPO_ROOT = Path(__file__).resolve().parent.parent.parent
DB_PATH = REPO_ROOT / "data" / "heritage.db"
VECTOR_DIR = REPO_ROOT / "data" / "vector"
FAISS_PATH = VECTOR_DIR / "heritage.faiss"

def insert_document(
    conn: sqlite3.Connection,
    record: Dict[str, Any]
) -> int:
    """Insert or update a document in the documents table."""
    c = conn.cursor()
    now = datetime.utcnow().isoformat()
    meta_json = json.dumps(record.get("metadata", {}))

    c.execute("""
        INSERT INTO documents (
            source_id, source_name, source_organization, source_url, original_url,
            title, author, document_type, language, collection, year, volume,
            rights, usage_notes, attribution, metadata_json, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(original_url) DO UPDATE SET
            title=excluded.title,
            author=excluded.author,
            collection=excluded.collection,
            year=excluded.year,
            volume=excluded.volume,
            rights=excluded.rights
        RETURNING id
    """, (
        record["source_id"],
        record.get("source_name", "National Archive"),
        record.get("source_organization", "Government of India"),
        record.get("source_url", ""),
        record["original_url"],
        record.get("title", "Untitled Document"),
        record.get("author", "Dr. B. R. Ambedkar"),
        record.get("document_type", "document"),
        record.get("language", "en"),
        record.get("collection"),
        record.get("year"),
        record.get("volume"),
        record.get("rights", "Public Domain"),
        record.get("usage_notes", "Educational / Research use"),
        record.get("attribution", "Dr. B. R. Ambedkar Digital Heritage Archive"),
        meta_json,
        now
    ))
    row = c.fetchone()
    return row[0] if row else c.lastrowid

def insert_chunks(
    conn: sqlite3.Connection,
    document_id: int,
    chunks: List[Dict[str, Any]]
) -> List[int]:
    """Insert text chunks for a document, returning chunk IDs."""
    c = conn.cursor()
    chunk_ids = []
    for chunk in chunks:
        c.execute("""
            INSERT INTO text_chunks (
                document_id, ordinal, text, char_start, char_end,
                extraction_method, page_number, embedding_id
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            RETURNING id
        """, (
            document_id,
            chunk["ordinal"],
            chunk["text"],
            chunk.get("char_start", 0),
            chunk.get("char_end", len(chunk["text"])),
            chunk.get("extraction_method", "text_extraction"),
            chunk.get("page_number", 1),
            chunk.get("embedding_id")
        ))
        row = c.fetchone()
        if row:
            chunk_ids.append(row[0])
    return chunk_ids

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="BHIMOS Archival Ingestion Indexer")
    parser.add_argument("--dry-run", action="store_true", help="Simulate indexing without committing")
    args = parser.parse_args()

    print(f"Connecting to heritage.db at {DB_PATH}")
    if DB_PATH.exists():
        conn = sqlite3.connect(str(DB_PATH))
        c = conn.cursor()
        c.execute("SELECT COUNT(*) FROM documents")
        docs = c.fetchone()[0]
        c.execute("SELECT COUNT(*) FROM text_chunks")
        chunks = c.fetchone()[0]
        conn.close()
        print(f"Current archive status: {docs} documents, {chunks} chunks.")
    else:
        print("Database not found. Initialize with schema before running.")
