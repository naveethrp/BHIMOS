"""
Inspect and classify all pending records from manifests against heritage.db.
"""
import csv
import sqlite3
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent

def analyze_pending():
    conn = sqlite3.connect(str(REPO_ROOT / "data" / "heritage.db"))
    c = conn.cursor()
    c.execute("SELECT original_url, id, source_id, title FROM documents")
    indexed_urls = {row[0]: (row[1], row[2], row[3]) for row in c.fetchall()}

    c.execute("SELECT requested_url, source_id, status, error FROM fetch_records")
    fetch_records = {row[0]: (row[1], row[2], row[3]) for row in c.fetchall()}
    conn.close()

    master_path = REPO_ROOT / "data" / "manifests" / "ambedkar_master_inventory.csv"
    with open(master_path, "r", encoding="utf-8", errors="replace") as f:
        master_rows = list(csv.DictReader(f))

    queue_path = REPO_ROOT / "data" / "manifests" / "ingestion_queue.csv"
    with open(queue_path, "r", encoding="utf-8", errors="replace") as f:
        queue_rows = list(csv.DictReader(f))

    pending = []
    seen_urls = set()

    for r in master_rows + queue_rows:
        url = r.get("original_url") or r.get("source_url") or r.get("file_url") or r.get("url")
        if not url or url in seen_urls:
            continue
        seen_urls.add(url)

        if url not in indexed_urls:
            f_rec = fetch_records.get(url)
            # Classify
            avail = (r.get("availability") or "").upper()
            rights = (r.get("rights_status") or "").lower()
            notes = r.get("notes") or ""

            if "downloaded" in notes.lower() and (REPO_ROOT / (r.get("local_path") or "")).exists():
                category = "READY TO INGEST"
            elif "copyright" in rights or "review_required" in rights:
                category = "REQUIRES PERMISSION"
            elif avail in ["NOT_AVAILABLE", "UNAVAILABLE", "PAYWALLED"]:
                category = "REQUIRES SOURCE"
            elif f_rec and f_rec[1] == "FAILED":
                category = "FAILED"
            elif "duplicate" in notes.lower() or "superseded" in notes.lower():
                category = "DUPLICATE"
            else:
                category = "INTENTIONALLY PENDING"

            pending.append({
                "id": r.get("inventory_id") or r.get("source_id") or r.get("id"),
                "title": r.get("title") or "Untitled",
                "category": r.get("category"),
                "url": url,
                "classification": category,
                "availability": avail,
                "rights": rights,
                "notes": notes[:80]
            })

    print(f"Total Unique Pending Records: {len(pending)}")
    for idx, p in enumerate(pending, 1):
        print(f"{idx:2d}. [{p['classification']}] {p['id']}: {p['title']}")
        print(f"    URL: {p['url']}")
        print(f"    Rights: {p['rights']} | Notes: {p['notes']}")

if __name__ == "__main__":
    analyze_pending()
