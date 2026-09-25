import React from 'react';
import { PageId } from '../types';
import './HomePage.css';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="home-kiosk-container">
      {/* Upper Layered Museum Hero Composition */}
      <section className="hero-composition-stage" aria-label="Ambedkar Heritage Hero Exhibition">
        
        {/* Layer 1: Sky & Atmospheric Canvas Background */}
        <div className="layer-atmosphere" aria-hidden="true">
          <img
            src="/images/composition/canvas-parchment-parliament.png"
            alt=""
            className="canvas-bg-img"
          />
          <img
            src="/images/composition/classical-clouds.jpg"
            alt=""
            className="canvas-clouds-overlay"
          />
          <div className="canvas-gradient-overlay"></div>
        </div>

        {/* Layer 2: Distant Symbolic Watermark (Ashoka Chakra & Parliament) */}
        <div className="layer-distant-symbols" aria-hidden="true">
          <img
            src="/images/composition/ashoka-chakra-blue.png"
            alt=""
            className="chakra-watermark-symbol"
          />
          <img
            src="/images/composition/parliament-isolated.png"
            alt=""
            className="parliament-distant-cutout"
          />
        </div>

        {/* Layer 3: Midground Crowd & Historic Assembly Base */}
        <div className="layer-midground" aria-hidden="true">
          <img
            src="/images/composition/crowd-movement.png"
            alt=""
            className="crowd-silhouette-base"
          />
        </div>

        {/* Layer 4: Primary Subject (Ambedkar Master Cutout) */}
        <div className="layer-primary-subject">
          <div className="ambedkar-cutout-anchor">
            <img
              src="/images/composition/ambedkar-cutout-bust.png"
              alt="Dr. B. R. Ambedkar master portrait cutout in dark blue three-piece suit and glasses"
              className="ambedkar-master-cutout-img"
            />
            {/* Subtle soft grounding shadow */}
            <div className="ambedkar-shadow-ground" aria-hidden="true"></div>
          </div>
        </div>

        {/* Layer 5: Foreground Architectural & Natural Framing */}
        <div className="layer-foreground-framing" aria-hidden="true">
          {/* Top-left Banyan tree branch canopy */}
          <div className="framing-canopy-top-left">
            <img
              src="/images/composition/banyan-tree.png"
              alt=""
              className="tree-canopy-img"
            />
          </div>

          {/* Left classical pillar framing the museum gallery */}
          <div className="framing-pillar-left">
            <img
              src="/images/composition/pillar-stone.png"
              alt=""
              className="pillar-cutout-img"
            />
          </div>

          {/* Right classical gold pillar framing the far side */}
          <div className="framing-pillar-right">
            <img
              src="/images/composition/pillar-gold.png"
              alt=""
              className="pillar-cutout-img"
            />
          </div>

          {/* Grounding law books stack on bottom corner */}
          <div className="framing-law-books">
            <img
              src="/images/composition/law-books-stack.png"
              alt=""
              className="books-cutout-img"
            />
          </div>
        </div>

        {/* Layer 6: Atmospheric Overlay & Golden Divider */}
        <div className="layer-overlay-accents" aria-hidden="true">
          <div className="paper-grain-texture"></div>
        </div>

        {/* Layer 7: Editorial UI / Text Layer (Always on top and legible) */}
        <div className="layer-ui-editorial">
          <div className="hero-editorial-grid">
            {/* Left spacer where Ambedkar's cutout lives physically */}
            <div className="hero-cutout-placeholder" aria-hidden="true"></div>

            {/* Center Editorial Headlines */}
            <div className="hero-text-block">
              <div className="hero-eyebrow-badge">
                <span className="eyebrow-dot">●</span>
                <span>DIGITAL HERITAGE ARCHIVE</span>
              </div>
              <h1 className="hero-main-title font-display">
                A LIFE THAT SHAPED A NATION
              </h1>
              <p className="hero-lead-text">
                Explore the vision, writings, struggles, and constitutional legacy of Dr. B. R. Ambedkar through an interactive digital experience.
              </p>

              <div className="hero-divider-line">
                <img
                  src="/images/composition/divider-ornamental-gold.png"
                  alt=""
                  className="divider-gold-img"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Right Quote & Archival Vignette */}
            <div className="hero-quote-column">
              <figure className="archival-quote-box">
                <span className="quote-mark-symbol" aria-hidden="true">“</span>
                <blockquote className="quote-body font-display">
                  Educate, Agitate, Organize.
                </blockquote>
                <figcaption className="quote-attribution">
                  — B. R. Ambedkar
                </figcaption>
              </figure>

              <div className="hero-mini-vignette">
                <img
                  src="/images/composition/constitution-preamble-art.png"
                  alt="Constitution of India preamble manuscript"
                  className="mini-vignette-doc"
                />
                <div className="mini-vignette-caption">
                  <span className="caption-title">The Constitution of India</span>
                  <span className="caption-sub">Architect of Modern Democracy</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Lower Section: 4 Major Touch-Friendly Kiosk Pathway Cards */}
      <section className="kiosk-pathways-section" aria-label="Museum Exploration Pathways">
        {/* Pathway 1: Digital Archive */}
        <button
          type="button"
          className="pathway-card pathway-archive"
          onClick={() => onNavigate('archive')}
          aria-label="Explore Digital Archive: Videos, audio, letters, debates and publications"
        >
          <div className="pathway-icon-circle">
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
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 18h16M8 6v12M12 6v12M16 6v12M2 20h20M2 4h20" />
            </svg>
          </div>
          <div className="pathway-text-group">
            <h2 className="pathway-title">TIMELINE</h2>
            <p className="pathway-subtitle">Key events and milestones from 1891 to 1956</p>
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
            <p className="pathway-subtitle">Convert historical documents into searchable PDFs</p>
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
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <circle cx="8" cy="10" r="1" fill="currentColor" />
              <circle cx="12" cy="10" r="1" fill="currentColor" />
              <circle cx="16" cy="10" r="1" fill="currentColor" />
            </svg>
          </div>
          <div className="pathway-text-group">
            <h2 className="pathway-title">ASK THE ARCHIVE</h2>
            <p className="pathway-subtitle">Conversational research grounded in original records</p>
          </div>
          <div className="pathway-action-indicator">
            <span className="pathway-arrow">→</span>
          </div>
        </button>
      </section>
    </div>
  );
};
