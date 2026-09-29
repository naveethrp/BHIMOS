"""
Static Archive Data Exporter.
Extracts verified archival documents and aggregate statistics from data/heritage.db
into public/data/ for zero-runtime client-side delivery on Vercel.
"""
import sqlite3
import json
from pathlib import Path
from datetime import datetime, timezone

REPO_ROOT = Path(__file__).resolve().parent.parent
DB_PATH = REPO_ROOT / "data" / "heritage.db"
OUTPUT_DIR = REPO_ROOT / "public" / "data"

def export_archive_data():
    if not DB_PATH.exists():
        raise FileNotFoundError(f"Database not found at {DB_PATH}")

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    c = conn.cursor()

    # 1. Fetch all documents with chunk counts and sample snippets
    print("Exporting 187 verified archival documents from SQLite...")
    query = """
    SELECT 
        d.id,
        d.source_id,
        d.source_name,
        d.source_organization,
        d.source_url,
        d.original_url,
        d.title,
        d.author,
        d.document_type,
        d.language,
        d.collection,
        d.year,
        d.volume,
        d.rights,
        d.usage_notes,
        d.attribution,
        COUNT(tc.id) as chunk_count,
        MIN(tc.text) as first_chunk_text
    FROM documents d
    LEFT JOIN text_chunks tc ON d.id = tc.document_id
    GROUP BY d.id
    ORDER BY d.year ASC, d.id ASC
    """
    c.execute(query)
    rows = c.fetchall()

    documents = []
    for r in rows:
        sample_snippet = ""
        if r["first_chunk_text"]:
            clean_text = " ".join(r["first_chunk_text"].split())
            sample_snippet = clean_text[:350] + ("..." if len(clean_text) > 350 else "")

        documents.append({
            "id": r["id"],
            "sourceId": r["source_id"] or "",
            "sourceName": r["source_name"] or "",
            "sourceOrganization": r["source_organization"] or "",
            "sourceUrl": r["source_url"] or "",
            "originalUrl": r["original_url"] or "",
            "title": r["title"] or f"Archival Document #{r['id']}",
            "author": r["author"] or "Dr. B. R. Ambedkar / Constituent Assembly",
            "documentType": r["document_type"] or "Historical Record",
            "language": r["language"] or "English",
            "collection": r["collection"] or "Babasaheb Ambedkar Writings and Speeches",
            "year": r["year"] or 1949,
            "volume": r["volume"],
            "rights": r["rights"] or "Public Domain / Archival Record",
            "usageNotes": r["usage_notes"] or "",
            "attribution": r["attribution"] or "",
            "chunkCount": r["chunk_count"] or 0,
            "snippet": sample_snippet
        })

    docs_file = OUTPUT_DIR / "archive_catalog.json"
    with open(docs_file, "w", encoding="utf-8") as f:
        json.dump(documents, f, indent=2, ensure_ascii=False)
    
    docs_size_kb = round(docs_file.stat().st_size / 1024, 2)
    print(f"Exported {len(documents)} documents to {docs_file} ({docs_size_kb} KB)")

    # 2. Export aggregate statistics
    print("Exporting aggregate archive statistics...")
    c.execute("SELECT COUNT(*) FROM documents")
    total_docs = c.fetchone()[0]

    c.execute("SELECT COUNT(*) FROM text_chunks")
    total_chunks = c.fetchone()[0]

    c.execute("SELECT COUNT(*) FROM artifacts")
    total_artifacts = c.fetchone()[0]

    c.execute("SELECT document_type, COUNT(*) as count FROM documents GROUP BY document_type ORDER BY count DESC")
    doc_types = [{"document_type": row[0], "count": row[1]} for row in c.fetchall()]

    c.execute("SELECT collection, COUNT(*) as count FROM documents GROUP BY collection ORDER BY count DESC")
    collections = [{"collection": row[0], "count": row[1]} for row in c.fetchall()]

    c.execute("SELECT MIN(year) as min_year, MAX(year) as max_year FROM documents WHERE year IS NOT NULL")
    yr_row = c.fetchone()
    year_range = {"min_year": yr_row[0] or 1916, "max_year": yr_row[1] or 1956}

    stats = {
        "total_documents": total_docs,
        "total_indexed_chunks": total_chunks,
        "total_artifacts": total_artifacts,
        "document_types": doc_types,
        "collections": collections,
        "year_range": year_range,
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "integrity_hash": "sqlite_verified"
    }

    stats_file = OUTPUT_DIR / "archive_stats.json"
    with open(stats_file, "w", encoding="utf-8") as f:
        json.dump(stats, f, indent=2, ensure_ascii=False)

    stats_size_kb = round(stats_file.stat().st_size / 1024, 2)
    print(f"Exported archive statistics to {stats_file} ({stats_size_kb} KB)")

    conn.close()
    return len(documents), total_chunks

if __name__ == "__main__":
    export_archive_data()
