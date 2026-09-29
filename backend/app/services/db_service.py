"""
Database access service for documents, artifacts, and text chunks.
"""
import json
from typing import List, Dict, Any, Optional
from backend.app.db.session import get_db_connection

class ArchiveDBService:
    @staticmethod
    def get_stats() -> Dict[str, Any]:
        """Return aggregate statistics of the archival repository."""
        with get_db_connection() as conn:
            c = conn.cursor()
            c.execute("SELECT COUNT(*) as count FROM documents")
            doc_count = c.fetchone()["count"]

            c.execute("SELECT COUNT(*) as count FROM text_chunks")
            chunk_count = c.fetchone()["count"]

            c.execute("SELECT COUNT(*) as count FROM artifacts")
            artifact_count = c.fetchone()["count"]

            c.execute("SELECT DISTINCT document_type, COUNT(*) as count FROM documents GROUP BY document_type")
            doc_types = c.fetchall()

            c.execute("SELECT DISTINCT collection, COUNT(*) as count FROM documents WHERE collection IS NOT NULL GROUP BY collection")
            collections = c.fetchall()

            c.execute("SELECT MIN(year) as min_year, MAX(year) as max_year FROM documents WHERE year IS NOT NULL")
            year_range = c.fetchone()

            return {
                "total_documents": doc_count,
                "total_indexed_chunks": chunk_count,
                "total_artifacts": artifact_count,
                "document_types": doc_types,
                "collections": collections,
                "year_range": year_range
            }

    @staticmethod
    def search_documents(
        query: Optional[str] = None,
        collection: Optional[str] = None,
        doc_type: Optional[str] = None,
        year: Optional[int] = None,
        limit: int = 50,
        offset: int = 0
    ) -> Dict[str, Any]:
        """Search documents table with parameterized filters."""
        sql = "SELECT id, source_id, source_name, title, author, document_type, language, collection, year, volume, rights, usage_notes, attribution, created_at FROM documents WHERE 1=1"
        params: List[Any] = []

        if query:
            sql += " AND (title LIKE ? OR author LIKE ? OR collection LIKE ?)"
            pattern = f"%{query}%"
            params.extend([pattern, pattern, pattern])

        if collection:
            sql += " AND collection = ?"
            params.append(collection)

        if doc_type:
            sql += " AND document_type = ?"
            params.append(doc_type)

        if year:
            sql += " AND year = ?"
            params.append(year)

        count_sql = f"SELECT COUNT(*) as total FROM ({sql})"
        with get_db_connection() as conn:
            c = conn.cursor()
            c.execute(count_sql, params)
            total = c.fetchone()["total"]

            sql += " ORDER BY year ASC, id ASC LIMIT ? OFFSET ?"
            params.extend([limit, offset])

            c.execute(sql, params)
            records = c.fetchall()

            return {
                "total": total,
                "limit": limit,
                "offset": offset,
                "records": records
            }

    @staticmethod
    def get_document_by_id(doc_id: int) -> Optional[Dict[str, Any]]:
        """Fetch full document details, artifacts, and initial text chunks."""
        with get_db_connection() as conn:
            c = conn.cursor()
            c.execute("SELECT * FROM documents WHERE id = ?", (doc_id,))
            doc = c.fetchone()
            if not doc:
                return None

            try:
                doc["metadata"] = json.loads(doc.get("metadata_json") or "{}")
            except Exception:
                doc["metadata"] = {}

            c.execute("SELECT id, sha256, storage_path, content_type, byte_size FROM artifacts WHERE document_id = ?", (doc_id,))
            doc["artifacts"] = c.fetchall()

            c.execute("SELECT id, ordinal, text, page_number, extraction_method FROM text_chunks WHERE document_id = ? ORDER BY ordinal ASC LIMIT 20", (doc_id,))
            doc["preview_chunks"] = c.fetchall()

            c.execute("SELECT COUNT(*) as total_chunks FROM text_chunks WHERE document_id = ?", (doc_id,))
            doc["total_chunks"] = c.fetchone()["total_chunks"]

            return doc

    @staticmethod
    def get_chunks_by_embedding_ids(embedding_ids: List[int]) -> List[Dict[str, Any]]:
        """Fetch chunks by their FAISS embedding IDs with parent document metadata."""
        if not embedding_ids:
            return []

        placeholders = ",".join(["?"] * len(embedding_ids))
        sql = f"""
            SELECT 
                tc.id as chunk_id,
                tc.embedding_id,
                tc.ordinal,
                tc.text,
                tc.page_number,
                tc.extraction_method,
                d.id as doc_id,
                d.title as doc_title,
                d.author,
                d.collection,
                d.year,
                d.volume,
                d.rights
            FROM text_chunks tc
            JOIN documents d ON tc.document_id = d.id
            WHERE tc.embedding_id IN ({placeholders})
        """
        with get_db_connection() as conn:
            c = conn.cursor()
            c.execute(sql, embedding_ids)
            return c.fetchall()

    @staticmethod
    def search_chunks_keyword(query: str, limit: int = 10) -> List[Dict[str, Any]]:
        """Fallback keyword search in text_chunks with stopword filtering and ranking."""
        stopwords = {
            "what", "did", "say", "about", "the", "and", "for", "with", "from", 
            "this", "that", "were", "been", "have", "does", "will", "would", 
            "tell", "give", "some", "into", "their", "them", "which"
        }
        raw_terms = [t.strip("?,.:;\"'()[]{}") for t in query.lower().split()]
        terms = [t for t in raw_terms if len(t) > 2 and t not in stopwords]
        
        # If all terms were filtered, fall back to any term > 2 chars
        if not terms:
            terms = [t for t in raw_terms if len(t) > 2]
        if not terms:
            return []

        # Use OR clauses so having key terms like 'untouchability' or 'article 17' matches
        clauses = " OR ".join(["LOWER(tc.text) LIKE ?" for _ in terms])
        params: List[Any] = [f"%{term}%" for term in terms]
        params.append(limit)

        sql = f"""
            SELECT 
                tc.id as chunk_id,
                tc.embedding_id,
                tc.ordinal,
                tc.text,
                tc.page_number,
                d.id as doc_id,
                d.title as doc_title,
                d.author,
                d.collection,
                d.year,
                d.volume,
                d.rights
            FROM text_chunks tc
            JOIN documents d ON tc.document_id = d.id
            WHERE {clauses}
            LIMIT ?
        """
        with get_db_connection() as conn:
            c = conn.cursor()
            c.execute(sql, params)
            return c.fetchall()
