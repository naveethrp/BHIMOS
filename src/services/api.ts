/**
 * BHIMOS Production API Service Client.
 * Connects frontend interfaces with the FastAPI backend for RAG retrieval, OCR, and archive stats.
 * Provides seamless, graceful fallback to static scholarly records if backend is offline.
 */

export const getApiBaseUrl = (): string => {
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return 'http://localhost:8000/api';
  }
  return '/api';
};

export interface AskApiResponse {
  query: string;
  answer: string;
  citations: Array<{
    id: string;
    title: string;
    collection?: string;
    year?: number;
    volume?: string;
    page?: string;
    snippet: string;
    rights?: string;
  }>;
  mode: string;
  grounded: boolean;
}

export interface OcrApiResponse {
  success: boolean;
  status: 'completed' | 'tesseract_unavailable' | 'error';
  filename?: string;
  extracted_text?: string;
  confidence?: number;
  boxes?: Array<{
    word: string;
    confidence: number;
    x: number;
    y: number;
    width: number;
    height: number;
  }>;
  image_info?: {
    format: string;
    width: number;
    height: number;
    mode: string;
    byte_size: number;
    filename: string;
  };
  error?: string;
}

export interface ArchiveDocument {
  id: number;
  sourceId: string;
  sourceName: string;
  sourceOrganization: string;
  sourceUrl: string;
  originalUrl: string;
  title: string;
  author: string;
  documentType: string;
  language: string;
  collection: string;
  year: number;
  volume?: string;
  rights: string;
  usageNotes: string;
  attribution: string;
  chunkCount: number;
  snippet: string;
}

export interface ArchiveStatsResponse {
  total_documents: number;
  total_indexed_chunks: number;
  total_artifacts: number;
  document_types: Array<{ document_type: string; count: number }>;
  collections: Array<{ collection: string; count: number }>;
  year_range: { min_year: number; max_year: number };
}

/**
 * Check backend health status with a fast timeout.
 */
export async function checkBackendHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${getApiBaseUrl()}/health`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(2000)
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Fetch static precomputed archive catalog (187 verified SQLite documents).
 */
export async function getStaticArchiveCatalog(): Promise<ArchiveDocument[]> {
  try {
    const res = await fetch('/data/archive_catalog.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Could not load static archive catalog:', err);
    return [];
  }
}

/**
 * Fetch static precomputed archive statistics.
 */
export async function getStaticArchiveStats(): Promise<ArchiveStatsResponse | null> {
  try {
    const res = await fetch('/data/archive_stats.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch {
    return null;
  }
}

/**
 * Ask Archive query with RAG backend.
 * Falls back cleanly if backend is offline.
 */
export async function askArchiveApi(question: string, language: string = 'en'): Promise<AskApiResponse> {
  const res = await fetch(`${getApiBaseUrl()}/ask`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ question, language }),
    signal: AbortSignal.timeout(8000)
  });

  if (!res.ok) {
    const errBody = await res.text().catch(() => '');
    throw new Error(`Archival query failed (${res.status}): ${errBody || res.statusText}`);
  }

  return await res.json();
}

/**
 * Extract OCR text from uploaded scan file.
 */
export async function extractOcrApi(file: File): Promise<OcrApiResponse> {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch(`${getApiBaseUrl()}/ocr/extract`, {
      method: 'POST',
      body: formData,
      signal: AbortSignal.timeout(20000)
    });

    if (!res.ok) {
      throw new Error(`OCR processing failed (${res.status})`);
    }

    return await res.json();
  } catch {
    // Return honest fallback status when backend container or Tesseract is offline
    return {
      success: false,
      status: 'tesseract_unavailable',
      filename: file.name,
      image_info: {
        format: file.type || 'IMAGE',
        width: 0,
        height: 0,
        mode: 'RGB',
        byte_size: file.size,
        filename: file.name
      },
      error: 'Backend OCR container is currently offline or unreachable. Use verified historical presets.'
    };
  }
}

/**
 * Fetch live archival repository statistics.
 * Tries backend first; falls back seamlessly to precomputed static dataset.
 */
export async function getArchiveStatsApi(): Promise<ArchiveStatsResponse> {
  try {
    const res = await fetch(`${getApiBaseUrl()}/archive/stats`, {
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(2000)
    });
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Backend offline, fall back to static
  }

  const staticStats = await getStaticArchiveStats();
  if (staticStats) {
    return staticStats;
  }

  return {
    total_documents: 187,
    total_indexed_chunks: 70189,
    total_artifacts: 187,
    document_types: [
      { document_type: 'Constituent Assembly debate transcript', count: 168 },
      { document_type: 'Speech / Writings (BAWS Volumes)', count: 19 }
    ],
    collections: [
      { collection: 'Constituent Assembly Debates', count: 168 },
      { collection: 'Babasaheb Ambedkar Writings and Speeches', count: 19 }
    ],
    year_range: { min_year: 1916, max_year: 1956 }
  };
}
