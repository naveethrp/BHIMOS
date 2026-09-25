import React from 'react';
import { PageId } from '../types';
import './HomePage.css';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="home-kiosk-container">
      {/* Upper Hero Section */}
      <section className="hero-editorial-section" aria-label="Hero Introduction">
        {/* Left: Master Portrait */}
        <div className="hero-portrait-wrapper">
          <div className="hero-portrait-frame">
            <img
              src="/images/portraits/master-portrait-formal.jpg"
              alt="Dr. B. R. Ambedkar portrait in formal suit and glasses"
              className="hero-portrait-img"
            />
          </div>
        </div>

        {/* Center: Headline & Archival Introduction */}
        <div className="hero-text-content">
          <span className="hero-eyebrow">Digital Heritage Archive</span>
          <h1 className="hero-headline font-display">
            A LIFE THAT SHAPED A NATION
          </h1>
          <p className="hero-description">
            Explore the vision, writings, struggles and legacy of Dr. B. R. Ambedkar through an interactive digital experience.
          </p>
        </div>

        {/* Right: Master Quote & Vintage Historical Vignette */}
        <div className="hero-quote-archival-block">
          <figure className="hero-quote-card">
            <blockquote className="hero-quote font-display">
              “Educate, Agitate, Organize.”
            </blockquote>
            <figcaption className="hero-quote-author">
              — B. R. Ambedkar
            </figcaption>
          </figure>
          
          <div className="hero-archival-vignette" aria-hidden="true">
            <img
              src="/images/historical/parliament-crowd.png"
              alt=""
              className="archival-crowd-img"
            />
          </div>
        </div>
      </section>

      {/* Lower Section: 4 Major Touch-Friendly Kiosk Pathway Cards */}
      <section className="kiosk-pathways-section" aria-label="Exploration Pathways">
        {/* Pathway 1: Digital Archive */}
        <button
          type="button"
          className="pathway-card pathway-archive"
          onClick={() => onNavigate('archive')}
          aria-label="Explore Digital Archive: Videos, audio, letters, debates and publications"
        >
          <div className="pathway-icon-circle">
            {/* Film Reel / Camera icon */}
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
              <line x1="7" y1="2" x2="7" y2="22" />
              <line x1="17" y1="2" x2="17" y2="22" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <line x1="2" y1="7" x2="7" y2="7" />
              <line x1="2" y1="17" x2="7" y2="17" />
              <line x1="17" y1="17" x2="22" y2="17" />
              <line x1="17" y1="7" x2="22" y2="7" />
            </svg>
          </div>
          <div className="pathway-text-group">
            <h2 className="pathway-title">DIGITAL ARCHIVE</h2>
            <p className="pathway-subtitle">Videos, audio, letters, debates and publications</p>
          </div>
          <div className="pathway-action-indicator">
            <span className="pathway-arrow">→</span>
          </div>
        </button>

        {/* Pathway 2: Timeline */}
        <button
          type="button"
          className="pathway-card pathway-timeline"
          onClick={() => onNavigate('timeline')}
          aria-label="Explore Interactive Timeline: Key events and milestones"
        >
          <div className="pathway-icon-circle">
            {/* Monument / Column icon */}
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 18h16M8 6v12M12 6v12M16 6v12M2 20h20M2 4h20" />
            </svg>
          </div>
          <div className="pathway-text-group">
            <h2 className="pathway-title">TIMELINE</h2>
            <p className="pathway-subtitle">Key events and milestones</p>
          </div>
          <div className="pathway-action-indicator">
            <span className="pathway-arrow">→</span>
          </div>
        </button>

        {/* Pathway 3: Digitize Documents */}
        <button
          type="button"
          className="pathway-card pathway-ocr"
          onClick={() => onNavigate('ocr')}
          aria-label="Digitize Documents: Convert historical documents using OCR"
        >
          <div className="pathway-icon-circle">
            {/* Scanned Document icon */}
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </div>
          <div className="pathway-text-group">
            <h2 className="pathway-title">DIGITIZE DOCUMENTS</h2>
            <p className="pathway-subtitle">Convert historical documents using OCR</p>
          </div>
          <div className="pathway-action-indicator">
            <span className="pathway-arrow">→</span>
          </div>
        </button>

        {/* Pathway 4: Ask the Archive */}
        <button
          type="button"
          className="pathway-card pathway-ask"
          onClick={() => onNavigate('ask')}
          aria-label="Ask the Archive: Get answers with sources"
        >
          <div className="pathway-icon-circle">
            {/* Speech bubble icon */}
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <circle cx="8" cy="10" r="1" fill="currentColor" />
              <circle cx="12" cy="10" r="1" fill="currentColor" />
              <circle cx="16" cy="10" r="1" fill="currentColor" />
            </svg>
          </div>
          <div className="pathway-text-group">
            <h2 className="pathway-title">ASK THE ARCHIVE</h2>
            <p className="pathway-subtitle">Get answers with sources</p>
          </div>
          <div className="pathway-action-indicator">
            <span className="pathway-arrow">→</span>
          </div>
        </button>
      </section>
    </div>
  );
};
