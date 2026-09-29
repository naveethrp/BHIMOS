"""
Test script for verifying RAG edge cases:
1. Known historical query
2. Unrelated / modern query
3. Nonsense random query
4. Empty query
"""
import json
import urllib.request
import urllib.error

def test_query(title, question):
    print(f"==================================================")
    print(f"TEST: {title}")
    print(f"QUERY: '{question}'")
    req = urllib.request.Request(
        "http://127.0.0.1:8000/api/ask",
        data=json.dumps({"question": question}).encode("utf-8"),
        headers={"Content-Type": "application/json"}
    )
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            print(f"STATUS: HTTP {resp.status}")
            print(f"MODE: {data.get('mode')}")
            print(f"GROUNDED: {data.get('grounded')}")
            print(f"CITATIONS COUNT: {len(data.get('citations', []))}")
            if data.get("citations"):
                top = data["citations"][0]
                print(f"TOP CITATION TITLE: {top.get('title')}")
                print(f"TOP CITATION YEAR: {top.get('year')}")
                print(f"TOP CITATION COLLECTION: {top.get('collection')}")
                print(f"EXCERPT: {top.get('snippet')[:140]}...")
            print(f"ANSWER SNIPPET:\n{data.get('answer')[:200]}...")
    except urllib.error.HTTPError as e:
        print(f"STATUS: HTTP {e.code}")
        print(f"ERROR BODY: {e.read().decode('utf-8')}")
    print()

if __name__ == "__main__":
    # 1. Known historical query
    test_query(
        "Known Query (Article 17 Untouchability)",
        "What was Dr. Ambedkar's argument on Article 17 and the abolition of untouchability?"
    )

    # 2. Known historical query 2 (Reserve Bank / Currency)
    test_query(
        "Known Query (Currency and Problem of the Rupee)",
        "What did Ambedkar propose regarding the gold standard and currency management in India?"
    )

    # 3. Unrelated / out-of-scope query
    test_query(
        "Unrelated Modern Query (Quantum Physics)",
        "Explain quantum entanglement and quantum computing algorithms in modern cryptography"
    )

    # 4. Nonsense query
    test_query(
        "Nonsense Query (Random Characters)",
        "xyzzy98765 asdfghjk qwertyuiop zxcvbnm 12345"
    )

    # 5. Empty query
    test_query(
        "Empty Query",
        ""
    )
