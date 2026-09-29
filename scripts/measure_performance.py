"""
Performance Measurement Suite for BHIMOS:
Measures actual bundle sizes, database query latency, FAISS load time, and RAG response time.
"""
import os
import time
import json
import sqlite3
import urllib.request
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent

def run_benchmarks():
    print("=== BHIMOS PERFORMANCE BENCHMARK REPORT ===\n")

    # 1. BUNDLE SIZES
    dist_assets = REPO_ROOT / "dist" / "assets"
    print("1. FRONTEND BUNDLE MEASUREMENTS:")
    if dist_assets.exists():
        js_files = sorted(dist_assets.glob("*.js"), key=lambda f: f.stat().st_size, reverse=True)
        css_files = sorted(dist_assets.glob("*.css"), key=lambda f: f.stat().st_size, reverse=True)
        
        main_bundle = next((f for f in js_files if f.name.startswith("index-")), None)
        if main_bundle:
            kb = main_bundle.stat().st_size / 1024
            print(f"   - Main JS Bundle ({main_bundle.name}): {kb:.2f} KB (Target: < 250 KB)")
        
        print("   - Lazy Route Chunks:")
        for f in js_files:
            if not f.name.startswith("index-") and not f.name.startswith("archiveData-"):
                print(f"     * {f.name:32}: {f.stat().st_size / 1024:.2f} KB")

        total_css = sum(f.stat().st_size for f in css_files) / 1024
        print(f"   - Total Combined CSS: {total_css:.2f} KB\n")
    else:
        print("   - dist/ directory not found! Run npm run build first.\n")

    # 2. SQLITE QUERY LATENCY
    db_path = REPO_ROOT / "data" / "heritage.db"
    print("2. DATABASE QUERY LATENCY (data/heritage.db):")
    if db_path.exists():
        conn = sqlite3.connect(str(db_path))
        c = conn.cursor()

        t0 = time.perf_counter()
        c.execute("SELECT COUNT(*) FROM text_chunks")
        _ = c.fetchone()
        t_count = (time.perf_counter() - t0) * 1000
        print(f"   - Chunk count query (70,189 rows): {t_count:.2f} ms")

        t0 = time.perf_counter()
        c.execute("SELECT * FROM documents WHERE title LIKE '%Constitution%'")
        docs = c.fetchall()
        t_search = (time.perf_counter() - t0) * 1000
        print(f"   - Document search query (matched {len(docs)} docs): {t_search:.2f} ms")

        t0 = time.perf_counter()
        c.execute("SELECT tc.id, tc.text, d.title FROM text_chunks tc JOIN documents d ON tc.document_id = d.id WHERE tc.embedding_id IN (100, 500, 1000, 5000, 10000)")
        _ = c.fetchall()
        t_join = (time.perf_counter() - t0) * 1000
        print(f"   - 5-way Embedding ID Join query: {t_join:.2f} ms\n")
        conn.close()

    # 3. FAISS LOAD AND SEARCH LATENCY
    faiss_path = REPO_ROOT / "data" / "vector" / "heritage.faiss"
    print("3. VECTOR INDEX (FAISS) LATENCY:")
    if faiss_path.exists():
        import faiss
        t0 = time.perf_counter()
        idx = faiss.read_index(str(faiss_path))
        t_load = (time.perf_counter() - t0) * 1000
        print(f"   - FAISS index load time (108 MB, 70,189 vectors): {t_load:.2f} ms")

        import numpy as np
        dummy_vec = np.random.randn(1, 384).astype("float32")
        t0 = time.perf_counter()
        idx.search(dummy_vec, 5)
        t_search = (time.perf_counter() - t0) * 1000
        print(f"   - Top-5 Vector KNN search: {t_search:.2f} ms\n")

    # 4. END-TO-END RAG API RESPONSE TIME
    print("4. END-TO-END RAG API LATENCY:")
    try:
        req_data = json.dumps({"question": "What is the historical significance of Article 17?"}).encode("utf-8")
        req = urllib.request.Request(
            "http://127.0.0.1:8000/api/ask",
            data=req_data,
            headers={"Content-Type": "application/json"}
        )
        # Warmup
        urllib.request.urlopen(req).read()

        # Measure 3 runs
        latencies = []
        for _ in range(3):
            t0 = time.perf_counter()
            with urllib.request.urlopen(req) as resp:
                _ = resp.read()
            latencies.append((time.perf_counter() - t0) * 1000)

        avg_latency = sum(latencies) / len(latencies)
        print(f"   - Live RAG Query Latency (encode -> FAISS -> SQLite -> synthesis): {avg_latency:.2f} ms (runs: {[round(l, 1) for l in latencies]})")
    except Exception as e:
        print(f"   - RAG API latency test error: {e}")

if __name__ == "__main__":
    run_benchmarks()
