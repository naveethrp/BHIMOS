import React from 'react';
import { ARCHIVE_CATEGORIES } from '../data/archiveData';
import { Language, PageId } from '../types';
import { TRANSLATIONS } from '../utils/translations';
import { resolveCollectionImage } from '../utils/imageResolver';
import './AboutPage.css';

interface AboutPageProps {
  onNavigate?: (page: PageId) => void;
  language?: Language;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, language = 'en' }) => {
  const isHi = language === 'hi';
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const statsList = [
    { number: '187', label: t.statPrimaryRecords },
    { number: '168', label: t.statAssemblySittings },
    { number: '22', label: t.statBawsVolumes },
    { number: '34', label: t.statManuscriptsLetters },
    { number: '3', label: t.statAudioBroadcasts },
    { number: '70,189', label: t.statGroundedCitations }
  ];

  return (
    <div className="about-master-page">
      {/* 1. TOP HERO BANNER — Matches about_reference */}
      <section className="about-hero-stage" aria-label="Institutional Overview">
        <div className="about-atmosphere-layer" aria-hidden="true">
          <img src="/assets/clouds.jpeg" alt="" className="about-sky-clouds" loading="eager" />
          <img src="/assets/bg10.png" alt="" className="about-canvas-bg" loading="eager" />
          <img src="/assets/trees.jpeg" alt="" className="about-env-trees" loading="lazy" />
          <img src="/assets/gate.png" alt="" className="about-env-gate" loading="lazy" />
          <div className="about-gradient-overlay" />
        </div>

        {/* Left Side: Law Books Stack */}
        <div className="about-hero-left-books" aria-hidden="true">
          <div className="about-books-stack">
            <span className="about-book-spine spine-const">CONSTITUTION OF INDIA</span>
            <span className="about-book-spine spine-law">LAW</span>
            <span className="about-book-spine spine-econ">ECONOMICS</span>
            <span className="about-book-spine spine-soc">SOCIAL JUSTICE</span>
            <span className="about-book-spine spine-hist">HISTORY</span>
          </div>
        </div>

        {/* Center: Main Editorial Text & Quote */}
        <div className="about-hero-center-content">
          <span className="about-hero-eyebrow">{t.aboutEyebrow}</span>
          <h1 className="about-hero-heading font-display">{t.aboutTitle}</h1>
          <p className="about-hero-description">
            {isHi
              ? 'डॉ. भीमराव रामजी आंबेडकर (१८९१–१९५६) के जीवन, रचनाओं, भाषणों एवं संवैधानिक विरासत के संरक्षण, अकादमिक शोध और सार्वजनिक प्रदर्शनी हेतु समर्पित।'
              : 'Dedicated to the preservation, scholarly access, and interactive public exhibition of the life, writings, speeches, and constitutional legacy of Dr. Bhimrao Ramji Ambedkar (1891–1956).'}
          </p>

          <div className="about-hero-quote-inline">
            <blockquote className="about-quote-text font-display">
              “{t.aboutQuote}”
            </blockquote>
            <cite className="about-quote-author">—— Dr. B. R. Ambedkar</cite>
          </div>
        </div>

        {/* Center-Right Portrait: Dr. Ambedkar Thinking */}
        <div className="about-hero-portrait-wrap" aria-hidden="true">
          <img
            src="/assets/portrait1.png"
            alt="Dr. B. R. Ambedkar portrait"
            className="about-thinking-portrait-img"
            loading="eager"
          />
        </div>

        {/* Far Right: Preamble Stone Tablet */}
        <div className="about-hero-tablet-wrap" aria-hidden="true">
          <div className="about-stone-tablet">
            <span className="tablet-sub">PREAMBLE CORE</span>
            <div className="tablet-words">
              <span>JUSTICE</span>
              <span>LIBERTY</span>
              <span>EQUALITY</span>
              <span>FRATERNITY</span>
            </div>
            <span className="tablet-sig">B. R. Ambedkar</span>
          </div>
        </div>
      </section>

      {/* 2. OUR MISSION & OUR VISION SPLIT SECTION — Matches about_reference */}
      <section className="about-mission-vision-section" aria-label="Mission and Vision">
        {/* Left Card: OUR MISSION */}
        <div className="mission-vision-card mission-card">
          <div className="mission-card-thumb-wrap">
            <img src="/assets/writing.png" alt="Dr. B. R. Ambedkar writing" loading="eager" />
          </div>
          <div className="mission-card-content">
            <span className="mv-card-badge">{isHi ? 'हमारा ध्येय' : 'OUR MISSION'}</span>
            <h2 className="mv-card-heading font-display">{t.aboutMissionTitle}</h2>
            <p className="mv-card-desc">
              {t.aboutMissionLead}
            </p>

            <div className="mission-features-row">
              <div className="mission-feat-item">
                <div className="feat-icon-bubble" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#B8860B" strokeWidth="2">
                    <rect x="4" y="2" width="16" height="20" rx="2" />
                    <line x1="8" y1="6" x2="16" y2="6" />
                    <line x1="8" y1="10" x2="16" y2="10" />
                  </svg>
                </div>
                <div className="feat-text-box">
                  <span className="feat-title">{t.aboutMissionBadge1}</span>
                  <span className="feat-sub">{isHi ? 'प्रमाणित अभिलेखागारों और प्रकाशनों से' : 'From verified archives and publications'}</span>
                </div>
              </div>

              <div className="mission-feat-item">
                <div className="feat-icon-bubble" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#B8860B" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
                <div className="feat-text-box">
                  <span className="feat-title">{t.aboutMissionBadge2}</span>
                  <span className="feat-sub">{isHi ? 'अर्थपूर्ण खोज, ओसीआर और अनुक्रमण' : 'Semantic search, OCR and indexing'}</span>
                </div>
              </div>

              <div className="mission-feat-item">
                <div className="feat-icon-bubble" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#B8860B" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div className="feat-text-box">
                  <span className="feat-title">{t.aboutMissionBadge3}</span>
                  <span className="feat-sub">{isHi ? 'शोधार्थियों, विद्यार्थियों और नागरिकों के लिए' : 'For students, researchers and citizens'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: OUR VISION */}
        <div className="mission-vision-card vision-card">
          <div className="vision-card-content">
            <span className="mv-card-badge">{isHi ? 'हमारा दृष्टिकोण' : 'OUR VISION'}</span>
            <h2 className="mv-card-heading font-display">{t.aboutVisionTitle}</h2>
            <p className="mv-card-desc">
              {t.aboutVisionLead}
            </p>
            <button
              type="button"
              className="vision-explore-btn"
              onClick={() => onNavigate?.('archive')}
            >
              <span>{t.aboutExploreBtn}</span>
            </button>
          </div>

          <div className="vision-standing-thumb-wrap">
            <img src="/assets/standing.png" alt="Dr. B. R. Ambedkar standing" loading="eager" />
          </div>
        </div>
      </section>

      {/* 3. KEY AREAS OF THE ARCHIVE (7 CARDS) — Matches about_reference */}
      <section className="about-key-areas-section" aria-label="Key Areas of the Archive">
        <div className="key-areas-header">
          <div className="key-areas-titles">
            <span className="key-areas-eyebrow">KEY AREAS OF THE ARCHIVE</span>
            <h2 className="key-areas-main-title font-display">What You Can Explore</h2>
            <p className="key-areas-desc">
              Access a rich collection of archival materials from multiple domains of Dr. Ambedkar's life and work.
            </p>
          </div>

          <div className="key-areas-quote-box">
            <blockquote className="key-areas-quote font-display">
              “A great man is different from an eminent one in that he is ready to be the servant of the society.”
            </blockquote>
            <cite className="key-areas-author">— Dr. B. R. Ambedkar</cite>
          </div>
        </div>

        {/* 7 Horizontal Cards Row */}
        <div className="key-areas-cards-grid">
          {ARCHIVE_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="key-area-card"
              onClick={() => onNavigate?.('archive')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onNavigate?.('archive');
                }
              }}
            >
              <div className="key-area-thumb-wrap">
                <img
                  src={resolveCollectionImage(cat.id)}
                  alt={cat.title}
                  loading="eager"
                  style={{ objectPosition: cat.objectPosition || 'center center' }}
                />
              </div>
              <div className="key-area-body">
                <h3 className="key-area-title font-display">{cat.title}</h3>
                <div className="key-area-footer">
                  <span className="key-area-count">
                    {cat.id === 'debates' && `${cat.count} Sittings`}
                    {cat.id === 'publications' && `${cat.count} Volumes`}
                    {cat.id === 'audio' && `${cat.count} Broadcasts`}
                    {cat.id === 'letters' && `${cat.count} Manuscripts`}
                    {cat.id === 'videos' && `${cat.count} Newsreels`}
                    {cat.id === 'photos' && `${cat.count} Items`}
                    {cat.id === 'legal' && `${cat.count} Records`}
                    {cat.id === 'press' && `${cat.count} Items`}
                  </span>
                  <span className="key-area-arrow" aria-hidden="true">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. BOTTOM STATS RIBBON — Matches about_reference */}
      <section className="about-stats-ribbon" aria-label="Archive Statistics">
        <div className="about-stats-grid">
          {statsList.map((stat, idx) => (
            <div key={idx} className="about-stat-item">
              <div className="about-stat-icon-wrap" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#B8860B" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <div className="about-stat-info">
                <span className="about-stat-number">{stat.number}</span>
                <span className="about-stat-label">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};