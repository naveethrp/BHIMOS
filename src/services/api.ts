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

export interface ArchiveStatsResponse {
  total_documents: number;
  total_indexed_chunks: number;
  total_artifacts: number;
  document_types: Array<{ document_type: string; count: number }>;
  collections: Array<{ collection: string; count: number }>;
  year_range: { min_year: number; max_year: number };
}

/**
 * Check backend health status.
 */
export async function checkBackendHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${getApiBaseUrl()}/health`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(3000)
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Ask Archive query with RAG backend.
 */
export async function askArchiveApi(question: string, language: string = 'en'): Promise<AskApiResponse> {
  const res = await fetch(`${getApiBaseUrl()}/ask`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ question, language }),
    signal: AbortSignal.timeout(12000)
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
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`${getApiBaseUrl()}/ocr/extract`, {
    method: 'POST',
    body: formData,
    signal: AbortSignal.timeout(30000)
  });

  if (!res.ok) {
    const errBody = await res.text().catch(() => '');
    throw new Error(`OCR processing failed (${res.status}): ${errBody || res.statusText}`);
  }

  return await res.json();
}

/**
 * Fetch live archival repository statistics.
 */
export async function getArchiveStatsApi(): Promise<ArchiveStatsResponse> {
  const res = await fetch(`${getApiBaseUrl()}/archive/stats`, {
    headers: { 'Accept': 'application/json' },
    signal: AbortSignal.timeout(5000)
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch stats: ${res.statusText}`);
  }

  return await res.json();
}
