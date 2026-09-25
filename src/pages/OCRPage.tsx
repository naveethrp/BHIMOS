import React, { useState } from 'react';
import './OCRPage.css';

export const OCRPage: React.FC = () => {
  const [jobState, setJobState] = useState<'idle' | 'processing' | 'completed'>('idle');
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const steps = [
    { title: 'Preparing document...', desc: 'Calibrating archival contrast and paper grain' },
    { title: 'Detecting text regions...', desc: 'Isolating handwritten margins and signature seals' },
    { title: 'Recognizing text...', desc: 'Dual Hindi & English neural character recognition' },
    { title: 'Generating searchable PDF...', desc: 'Embedding invisible OCR text layer with font metadata' }
  ];

  const handleStartSimulatedOCR = () => {
    setJobState('processing');
    setProgressPercent(15);
    setCurrentStepIndex(0);

    const stepInterval = setInterval(() => {
      setProgressPercent((prev) => {
        if (prev >= 100) {
          clearInterval(stepInterval);
          setJobState('completed');
          return 100;
        }
        const next = prev + 25;
        if (next >= 75) setCurrentStepIndex(3);
        else if (next >= 50) setCurrentStepIndex(2);
        else if (next >= 25) setCurrentStepIndex(1);
        return next;
      });
    }, 600);
  };

  const handleResetOCR = () => {
    setJobState('idle');
    setProgressPercent(0);
    setCurrentStepIndex(0);
  };

  return (
    <div className="ocr-page-container">
      {/* Title Header with Archival Lab Motif */}
      <header className="ocr-header-block">
        <div className="ocr-header-text">
          <span className="ocr-eyebrow">DIGITIZATION LABORATORY</span>
          <h1 className="ocr-page-title font-display">Digitize a Historical Document</h1>
          <p className="ocr-page-subtitle">
            Transform physical archival manuscripts, speeches, and legal drafts into searchable, permanent digital heritage records.
          </p>
        </div>
        <div className="ocr-header-decor" aria-hidden="true">
          <img
            src="/images/composition/fountain-pen-manuscript.png"
            alt=""
            className="ocr-pen-decor-img"
          />
        </div>
      </header>

      {/* Main Museum Digitization Stage (Reference A Screen 5) */}
      <div className="ocr-workflow-grid">
        {/* Step 1: Physical Upload & Document Induction */}
        <section className="ocr-dropzone-panel" aria-label="Document Upload Area">
          <div
            className="ocr-dropzone-box"
            onClick={jobState === 'idle' ? handleStartSimulatedOCR : undefined}
            role="button"
            tabIndex={0}
            aria-label="Upload historical document to begin OCR processing"
          >
            <div className="dropzone-tactile-corner corner-tl" aria-hidden="true">⌜</div>
            <div className="dropzone-tactile-corner corner-tr" aria-hidden="true">⌝</div>
            <div className="dropzone-tactile-corner corner-bl" aria-hidden="true">⌞</div>
            <div className="dropzone-tactile-corner corner-br" aria-hidden="true">⌟</div>

            <div className="dropzone-cloud-icon">
              <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <h2 className="dropzone-title">
              {jobState === 'idle'
                ? 'Drag & drop a historical manuscript or click to scan'
                : 'Archival Document Mounted'}
            </h2>
            <p className="dropzone-meta">Supports: High-Res JPG, PNG, PDF (Up to 10 MB)</p>
            {jobState === 'idle' && (
              <button type="button" className="btn-start-ocr" onClick={handleStartSimulatedOCR}>
                Initiate Digitization Pipeline →
              </button>
            )}
          </div>
        </section>

        {/* Step 2: Processing Progress Indicator */}
        <section className="ocr-progress-panel" aria-label="Processing Stages">
          <div className="progress-panel-header">
            <span className="pipeline-label">Processing Pipeline</span>
            {jobState === 'processing' && (
              <span className="pipeline-live-tag">● Live Processing</span>
            )}
          </div>

          <ul className="ocr-steps-list">
            {steps.map((st, idx) => {
              const isDone = jobState === 'completed' || (jobState === 'processing' && idx < currentStepIndex);
              const isCurrent = jobState === 'processing' && idx === currentStepIndex;

              return (
                <li
                  key={st.title}
                  className={`ocr-step-item ${isDone ? 'step-done' : ''} ${isCurrent ? 'step-current' : ''}`}
                >
                  <span className="step-icon">
                    {isDone ? '✓' : isCurrent ? '⚙' : '○'}
                  </span>
                  <div className="step-text-col">
                    <span className="step-label">{st.title}</span>
                    <span className="step-desc">{st.desc}</span>
                  </div>
                  {isCurrent && <span className="step-progress-badge">{progressPercent}%</span>}
                </li>
              );
            })}
          </ul>

          {jobState === 'processing' && (
            <div className="ocr-progress-bar-container">
              <div
                className="ocr-progress-bar-fill"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          )}
        </section>

        {/* Step 3: Comparison View (Original vs OCR Result) */}
        <section className="ocr-preview-panel" aria-label="Original Document and OCR Result">
          <div className="preview-comparison-row">
            {/* Original Document Preview with Scanner Target */}
            <div className="preview-doc-box">
              <span className="preview-doc-label">1. Original Manuscript</span>
              <div className="preview-doc-frame">
                <img
                  src="/images/textures/paper-manuscript.png"
                  alt="Scanned handwritten manuscript page"
                  className="preview-doc-image"
                />
                {jobState === 'processing' && <div className="scanner-laser-line"></div>}
              </div>
              <span className="preview-file-tag">Raw 600 DPI Scan</span>
            </div>

            <div className="preview-arrow-separator">
              <span>➔</span>
            </div>

            {/* OCR Result Preview */}
            <div className="preview-doc-box">
              <span className="preview-doc-label">2. Digitized Searchable PDF</span>
              <div className={`preview-doc-frame ${jobState === 'completed' ? 'ocr-result-completed' : 'ocr-result-pending'}`}>
                {jobState === 'completed' ? (
                  <img
                    src="/images/composition/constitution-preamble-art.png"
                    alt="Searchable digitized Constitution text"
                    className="preview-doc-image"
                  />
                ) : (
                  <div className="pending-ocr-placeholder">
                    <span>Awaiting Recognition</span>
                  </div>
                )}
              </div>
              <span className="preview-file-tag">Text-Layer Indexed PDF</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="ocr-actions-row">
            <button
              type="button"
              className="btn-ocr-primary"
              disabled={jobState !== 'completed'}
              onClick={() => alert('Searchable PDF Viewer: Displaying searchable text overlay.')}
            >
              View Digitized PDF
            </button>
            <button
              type="button"
              className="btn-ocr-download"
              disabled={jobState !== 'completed'}
              onClick={() => alert('Downloading high-resolution searchable PDF.')}
            >
              Download PDF
            </button>
            {jobState === 'completed' && (
              <button type="button" className="btn-ocr-reset" onClick={handleResetOCR}>
                Process Another Document
              </button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
