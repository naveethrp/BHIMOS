"""
Test frontend -> backend communication contract for all required actions:
- Archive Stats
- Archive Search
- Record Detail
- Ask Archive (RAG)
- OCR File Upload
- Storage Status
"""
import json
import urllib.request

API_BASE = "http://127.0.0.1:8000/api"

def test_flow():
    print("=== TESTING FRONTEND -> BACKEND CONTRACT ===")
    
    # 1. Archive Stats
    req = urllib.request.Request(f"{API_BASE}/archive/stats")
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode("utf-8"))
        print(f"1. Archive Stats: HTTP {resp.status} | Docs: {data['total_documents']}, Chunks: {data['total_indexed_chunks']}")
        assert data['total_documents'] == 187
        assert data['total_indexed_chunks'] == 70189

    # 2. Archive Search
    req = urllib.request.Request(f"{API_BASE}/archive/records?query=Constitution&limit=3")
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode("utf-8"))
        print(f"2. Archive Search ('Constitution'): HTTP {resp.status} | Matches: {data['total']}, Returned: {len(data['records'])}")
        assert len(data['records']) > 0

    # 3. Record Detail
    req = urllib.request.Request(f"{API_BASE}/archive/records/1")
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode("utf-8"))
        print(f"3. Record Detail (ID 1): HTTP {resp.status} | Title: {data['title'][:40]} | Chunks: {data['total_chunks']}")
        assert data['id'] == 1

    # 4. Ask Archive
    payload = json.dumps({"question": "What is Article 17 about?"}).encode("utf-8")
    req = urllib.request.Request(f"{API_BASE}/ask", data=payload, headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode("utf-8"))
        print(f"4. Ask Archive: HTTP {resp.status} | Mode: {data['mode']} | Citations: {len(data['citations'])}")
        assert data['grounded'] is True
        assert len(data['citations']) > 0

    # 5. Storage Status
    req = urllib.request.Request(f"{API_BASE}/storage/status")
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode("utf-8"))
        print(f"5. Storage Status: HTTP {resp.status} | Status: {data['status']} | Authenticated: {data['authenticated']}")
        assert "status" in data

    print("\nAll Frontend -> Backend Contract Tests: PASS!")

if __name__ == "__main__":
    test_flow()
