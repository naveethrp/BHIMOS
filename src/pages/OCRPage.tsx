import React, { useState } from 'react';
import './OCRPage.css';

export const OCRPage: React.FC = () => {
  const [jobState, setJobState] = useState<'idle' | 'processing' | 'completed'>('idle');
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const steps = [
    'Preparing document...',
    'Detecting text regions...',
    'Recognizing text...',
    'Generating searchable PDF...'
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
      {/* Title Header */}
      <header className="ocr-header-block">
        <h1 className="ocr-page-title font-display">Digitize a Historical Document</h1>
        <p className="ocr-page-subtitle">
          Upload a scanned document or image to convert it into a searchable PDF using AI-powered OCR.
        </p>
      </header>

      {/* Main OCR Interactive Workflow (Reference A Screen 5) */}
      <div className="ocr-workflow-grid">
        {/* Step 1: Upload / Dropzone */}
        <section className="ocr-dropzone-panel" aria-label="Document Upload Area">
          <div
            className="ocr-dropzone-box"
            onClick={jobState === 'idle' ? handleStartSimulatedOCR : undefined}
            role="button"
            tabIndex={0}
            aria-label="Upload historical document to begin OCR processing"
          >
            <div className="dropzone-cloud-icon">
              <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <h2 className="dropzone-title">
              {jobState === 'idle' ? 'Drag & drop a file here or click to upload' : 'Document Loaded'}
            </h2>
            <p className="dropzone-meta">Supports: JPG, PNG, PDF (Max 10 MB)</p>
            {jobState === 'idle' && (
              <button type="button" className="btn-start-ocr" onClick={handleStartSimulatedOCR}>
                Start OCR Processing
              </button>
            )}
          </div>
        </section>

        {/* Step 2: Processing Progress Indicator */}
        <section className="ocr-progress-panel" aria-label="Processing Stages">
          <ul className="ocr-steps-list">
            {steps.map((label, idx) => {
              const isDone = jobState === 'completed' || (jobState === 'processing' && idx < currentStepIndex);
              const isCurrent = jobState === 'processing' && idx === currentStepIndex;

              return (
                <li key={label} className={`ocr-step-item ${isDone ? 'step-done' : ''} ${isCurrent ? 'step-current' : ''}`}>
                  <span className="step-icon">
                    {isDone ? '✓' : isCurrent ? '⚙' : '○'}
                  </span>
                  <span className="step-label">{label}</span>
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
            {/* Original Document Preview */}
            <div className="preview-doc-box">
              <span className="preview-doc-label">Original Document</span>
              <div className="preview-doc-frame">
                <img
                  src="/images/textures/paper-manuscript.png"
                  alt="Scanned handwritten manuscript page"
                  className="preview-doc-image"
                />
              </div>
            </div>

            <div className="preview-arrow-separator">
              <span>➔</span>
            </div>

            {/* OCR Result Preview */}
            <div className="preview-doc-box">
              <span className="preview-doc-label">OCR Result (PDF)</span>
              <div className="preview-doc-frame ocr-result-frame">
                <img
                  src="/images/textures/constitution-preamble.png"
                  alt="Searchable digitized Constitution text"
                  className="preview-doc-image"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons (View PDF / Download PDF / Process Another) */}
          <div className="ocr-actions-row">
            <button
              type="button"
              className="btn-ocr-primary"
              disabled={jobState !== 'completed'}
              onClick={() => alert('Searchable PDF Viewer: Ready for production PDF.js renderer.')}
            >
              View PDF
            </button>
            <button
              type="button"
              className="btn-ocr-download"
              disabled={jobState !== 'completed'}
              onClick={() => alert('Downloading digitized searchable PDF.')}
            >
              Download PDF
            </button>
            {jobState === 'completed' && (
              <button type="button" className="btn-ocr-reset" onClick={handleResetOCR}>
                Process Another
              </button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
