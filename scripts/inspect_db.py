import sqlite3

conn = sqlite3.connect('data/heritage.db')
c = conn.cursor()

for table in ['documents', 'artifacts', 'fetch_records', 'text_chunks', 'ingestion_runs']:
    cols = [r[1] for r in c.execute(f"PRAGMA table_info({table})")]
    print(f"Table '{table}': {cols}")
    sample = c.execute(f"SELECT * FROM {table} LIMIT 1").fetchone()
    print(f"Sample: {sample}\n")
