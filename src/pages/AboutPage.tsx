import React from 'react';
import './AboutPage.css';

export const AboutPage: React.FC = () => {
  return (
    <div className="about-page-container">
      <header className="about-header-block">
        <span className="about-eyebrow">Institutional Overview</span>
        <h1 className="about-title font-display">About the Digital Heritage Archive</h1>
        <p className="about-lead">
          Dedicated to the preservation, scholarly access, and interactive public exhibition of the life, writings, speeches, and constitutional legacy of Dr. Bhimrao Ramji Ambedkar (1891–1956).
        </p>
      </header>

      <div className="about-sections-grid">
        <article className="about-card">
          <div className="about-card-badge">01</div>
          <h2 className="about-card-title font-display">Museum & Kiosk First</h2>
          <p className="about-card-text">
            Designed specifically for public-facing museum touchscreen kiosks as well as academic workstations, offering large touch targets, tactile archival typography, zero reliance on hover-only interactions, and seamless navigation.
          </p>
        </article>

        <article className="about-card">
          <div className="about-card-badge">02</div>
          <h2 className="about-card-title font-display">Archival Provenance</h2>
          <p className="about-card-text">
            Every quote, milestone, and debate record is mapped directly to authoritative sources, including Constituent Assembly Debates, Government of India published volumes, and rare personal correspondence.
          </p>
        </article>

        <article className="about-card">
          <div className="about-card-badge">03</div>
          <h2 className="about-card-title font-display">AI-Powered Digitization</h2>
          <p className="about-card-text">
            A state-of-the-art archival digitization pipeline allowing historical manuscripts, typed resolutions, and legal drafts to be transformed into searchable, indexed digital artifacts.
          </p>
        </article>
      </div>

      <div className="about-quote-block">
        <blockquote className="about-quote font-display">
          “Constitutional morality is not a natural sentiment. It has to be cultivated. We must realize that our people have yet to learn it.”
        </blockquote>
        <figcaption className="about-quote-author">
          — Dr. B. R. Ambedkar, Constituent Assembly of India (4 November 1948)
        </figcaption>
      </div>
    </div>
  );
};
