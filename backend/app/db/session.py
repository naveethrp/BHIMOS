"""
Database connection management for SQLite heritage.db.
Provides robust thread-safe connection pooling and dictionary row factory.
"""
import sqlite3
from contextlib import contextmanager
from typing import Generator
from backend.app.core.config import settings

def dict_factory(cursor, row):
    fields = [column[0] for column in cursor.description]
    return {key: value for key, value in zip(fields, row)}

@contextmanager
def get_db_connection() -> Generator[sqlite3.Connection, None, None]:
    """Yield a SQLite connection with dictionary row factory."""
    if not settings.DB_PATH.exists():
        raise FileNotFoundError(f"Database not found at {settings.DB_PATH}")
    
    conn = sqlite3.connect(str(settings.DB_PATH), check_same_thread=False)
    conn.row_factory = dict_factory
    try:
        yield conn
    finally:
        conn.close()
