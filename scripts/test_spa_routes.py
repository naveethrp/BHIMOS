"""
Test SPA routing on production build:
Verifies that all application routes return HTTP 200 with index.html root container.
"""
import urllib.request

ROUTES = [
    "/",
    "/archive",
    "/timeline",
    "/event-detail",
    "/ocr",
    "/ask",
    "/about"
]

def test_spa_routing(base_url="http://127.0.0.1:4173"):
    print("=== TESTING SPA CLIENT-SIDE FALLBACK ROUTING ===")
    all_ok = True
    for route in ROUTES:
        url = f"{base_url}{route}"
        req = urllib.request.Request(url, headers={"Accept": "text/html"})
        try:
            with urllib.request.urlopen(req) as resp:
                status = resp.status
                content = resp.read().decode("utf-8")
                has_root = 'id="root"' in content
                has_title = "BHIMOS" in content
                ok = (status == 200 and has_root and has_title)
                if not ok:
                    all_ok = False
                print(f"Route {route:15} -> HTTP {status} | HTML Valid: {ok}")
        except Exception as e:
            print(f"Route {route:15} -> FAILED: {e}")
            all_ok = False

    print(f"\nSPA Routing Verdict: {'PASS' if all_ok else 'FAIL'}")
    return all_ok

if __name__ == "__main__":
    test_spa_routing()
