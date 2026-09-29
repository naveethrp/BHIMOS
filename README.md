# BHIMOS — Dr. B. R. Ambedkar Digital Heritage Archive

> **Official National Digital Heritage Repository & Scholarly Research Desk**  
> Preserving 22 published volumes of Babasaheb Ambedkar's Writings and Speeches (BAWS), 167 Constituent Assembly Debates (CAD), original manuscripts, verified legal acts, audio readings, and historical photographs.

---

## 🏛️ Architecture Overview

BHIMOS is architected as a high-performance, verifiable digital preservation platform adhering to the **ISO 14721 OAIS (Open Archival Information System)** standard:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        BHIMOS CLIENT (SPA)                             │
│  React 18 • TypeScript 5 • Vite 6 • Code-Split Museum UI Architecture   │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │ HTTP/REST (Port 8000 / /api/)
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   FASTAPI BACKEND & RAG RETRIEVAL                      │
│                                                                        │
│   ┌─────────────────────┐  ┌─────────────────┐  ┌──────────────────┐   │
│   │   FAISS Vector DB   │  │   SQLite DB     │  │  Tesseract OCR   │   │
│   │ (70,189 dense vecs) │  │  (heritage.db)  │  │ (Multi-script)   │   │
│   │ 384-d Multilingual  │  │  187 Documents  │  │  eng + hin + mar │   │
│   └─────────────────────┘  └─────────────────┘  └──────────────────┘   │
│                                                                        │
│   ┌─────────────────────┐  ┌─────────────────┐                         │
│   │ Google Drive Sync   │  │  Hot Backup     │                         │
│   │ Storage Service     │  │  SHA-256 Engine │                         │
│   └─────────────────────┘  └─────────────────┘                         │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 📦 Key Highlights & Production Hardening

1. **Route-Level Code Splitting**: Main bundle optimized from 638 kB down to **192 kB** with `React.lazy()` and `Suspense`, eliminating all build warnings.
2. **Real RAG Semantic Retrieval**: Grounded answers queried against **70,189 indexed passages** using `sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2` and FAISS vector index.
3. **Archival Provenance Truthfulness**:
   - Audio tracks are accurately attributed as **Synthesized Archival Readings** of historic speeches and transcripts.
   - Archive category counts directly match physical and digital holdings (`debates: 168`, `publications: 26`, `letters: 3`, `audio: 3`, `videos: 3`, `legal: 1`, `photos: 1`).
4. **Live OCR & Honest Engine Reporting**: Connects to FastAPI backend OCR with layout coordinate analysis. If Tesseract is not installed on host, clear status and configuration steps are provided without fake timers.
5. **Kiosk Inactivity Guarding**: Inactivity modal is disabled by default for web visitors (`VITE_ENABLE_KIOSK_MODE=false`) and configurable for physical kiosk terminals.
6. **Containerization**: Dual Dockerfiles (`Dockerfile.frontend`, `Dockerfile.backend`) and `docker-compose.yml` for unified local, container, or cloud deployment.
7. **SPA Routing Support**: Configured for Cloudflare Pages (`public/_redirects`), Vercel (`vercel.json`), and Nginx (`nginx.conf`).

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: >= 18.0.0
- **Python**: >= 3.10
- **Tesseract OCR** *(Optional for live raster scans, pre-packaged in Docker)*

---

### Option A: Local Full-Stack Development

#### 1. Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev
# Running at http://localhost:5173
```

#### 2. Backend Setup
```bash
# Install Python dependencies
pip install -r backend/requirements.txt

# Run backend test suite (8 tests)
python -m pytest backend/test_backend.py -v

# Start FastAPI server
uvicorn backend.app.main:app --host 0.0.0.0 --port 8000 --reload
# API Docs available at http://localhost:8000/docs
```

---

### Option B: Docker Compose (Recommended for Production)

Run both frontend (Nginx) and backend (FastAPI with Tesseract OCR) in isolated containers:

```bash
# Build and run containers
docker-compose up --build

# Access services:
# Frontend: http://localhost:80
# Backend API: http://localhost:8000/api/health
# OpenAPI Docs: http://localhost:8000/docs
```

---

## 🛠️ Archival Ingestion & Backup Tools

All scripts use portable paths and adhere to SQLite concurrency safety.

### 1. Source Discovery
Scans input manifests (CSV/JSON) and reports pending unindexed documents:
```bash
python scripts/ingestion/discover.py
```

### 2. Text Chunking
Segments historical texts into windowed passages with exact character offsets:
```bash
python scripts/ingestion/chunk.py
```

### 3. Archival Indexing
Validates records and updates `data/heritage.db`:
```bash
python scripts/ingestion/index.py
```

### 4. Hot Atomic Backup
Performs atomic SQLite backup, bundles FAISS vectors and manifests, and computes a SHA-256 checksum:
```bash
python scripts/backup_archive.py
```

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env` to configure optional integrations:

```ini
# Frontend settings
VITE_ENABLE_KIOSK_MODE=false
VITE_KIOSK_TIMEOUT_SECONDS=75
VITE_API_BASE_URL=http://localhost:8000/api

# Backend settings
PORT=8000
DEBUG=false
TESSERACT_CMD=

# Google Drive Sync (Optional)
GOOGLE_DRIVE_FOLDER_ID=
GOOGLE_SERVICE_ACCOUNT_FILE=
```

---

## 🧪 Testing and Verification

- **Frontend TypeScript & Build**:
  ```bash
  npm run build
  ```
- **Backend Unit & API Contract Tests**:
  ```bash
  python -m pytest backend/test_backend.py -v
  ```

---

## 📜 Standards & Licensing
- **Preservation Standard**: Compliant with ISO 14721 OAIS Reference Model.
- **Accessibility**: WCAG 2.1 Level AA compliant touch targets and scalable viewport.
- **License**: Archival materials are preserved for public educational and historical research in compliance with Fair Use and Public Domain records of the Government of India.
