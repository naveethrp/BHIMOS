import React, { useState, useRef } from 'react';
import { TIMELINE_ERAS, TIMELINE_EVENTS } from '../data/timelineData';
import { PageId, Language } from '../types';
import { TRANSLATIONS } from '../utils/translations';
import {
  resolveEraNavImage,
  resolveEraHeroImage,
  resolveEraBannerImage,
  resolveTimelineEventImage
} from '../utils/imageResolver';
import './TimelinePage.css';

interface TimelinePageProps {
  onNavigate: (page: PageId, eventId?: string) => void;
  language?: Language;
}

export const TimelinePage: React.FC<TimelinePageProps> = ({ onNavigate, language = 'en' }) => {
  const isHi = language === 'hi';
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const [selectedEraId, setSelectedEraId] = useState<string>('early-life');
  const eraSelectorRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const selectedEra = TIMELINE_ERAS.find((era) => era.id === selectedEraId) || TIMELINE_ERAS[0];
  const filteredEvents = TIMELINE_EVENTS.filter((e) => e.eraId === selectedEraId);

  const eraHeroPositions: Record<string, string> = {
    'early-life': 'center bottom',
    'higher-education': 'center bottom',
    'social-reform': 'center bottom',
    'political-movement': 'center bottom',
    'constitutional-journey': 'center bottom',
    'later-years': 'center bottom'
  };

  const eraQuotes: Record<string, { text: string; author: string }> = {
    'early-life': {
      text: 'Knowledge gives power, knowledge is liberation.',
      author: 'Dr. B. R. Ambedkar'
    },
    'higher-education': {
      text: 'My life is dedicated to the acquisition and diffusion of knowledge.',
      author: 'Dr. B. R. Ambedkar'
    },
    'social-reform': {
      text: 'Lost rights are never regained by appeals to conscience alone, but by relentless struggle.',
      author: 'Dr. B. R. Ambedkar'
    },
    'political-movement': {
      text: 'Educate, Agitate, Organize.',
      author: 'Dr. B. R. Ambedkar'
    },
    'constitutional-journey': {
      text: 'Constitutional morality is not a natural sentiment. It has to be cultivated.',
      author: 'Dr. B. R. Ambedkar'
    },
    'later-years': {
      text: 'I measure the progress of a community by the degree of progress which women have achieved.',
      author: 'Dr. B. R. Ambedkar'
    }
  };

  const activeQuote = eraQuotes[selectedEraId] || eraQuotes['early-life'];

  const scrollTrack = (direction: 'left' | 'right') => {
    if (trackRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      trackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="timeline-master-page">
      {/* 1. TOP HERO BANNER — Matches timeline_reference */}
      <section className="timeline-hero-stage" aria-label="Timeline Chronological Exhibition">
        {/* Environmental & Architectural Atmosphere */}
        <div className="timeline-atmosphere-layer" aria-hidden="true">
          <img src="/assets/clouds.jpeg" alt="" className="timeline-sky-clouds" loading="eager" />
          <img src="/assets/bg10.png" alt="" className="timeline-canvas-bg" loading="eager" />
          <img src="/assets/trees.jpeg" alt="" className="timeline-env-trees" loading="lazy" />
          <img src="/assets/gate.png" alt="" className="timeline-env-gate" loading="lazy" />
          <div className="timeline-gradient-overlay" />
        </div>

        {/* Left Side: Ambedkar with Constitution Portrait */}
        <div className="timeline-hero-left-cutout" aria-hidden="true">
          <div className="timeline-tablet-motto">
            <span>EDUCATE</span>
            <span>AGITATE</span>
            <span>ORGANIZE</span>
            <span className="tablet-sig">B. R. Ambedkar</span>
          </div>
          <img
            src={resolveEraHeroImage(selectedEraId)}
            alt="Dr. B. R. Ambedkar"
            className="timeline-hero-portrait-img"
            style={{ objectPosition: eraHeroPositions[selectedEraId] || 'center 20%' }}
            loading="eager"
          />
        </div>

        {/* Right Side Composition: Parliament & Constitution Books Stack */}
        <div className="timeline-hero-right-books" aria-hidden="true">
          <div className="books-stack-vertical">
            <span className="book-spine spine-const">CONSTITUTION OF INDIA</span>
            <span className="book-spine spine-law">LAW</span>
            <span className="book-spine spine-econ">ECONOMICS</span>
            <span className="book-spine spine-just">SOCIAL JUSTICE</span>
          </div>
        </div>

        {/* Center Editorial Titles */}
        <div className="timeline-hero-center-titles">
          <span className="timeline-hero-eyebrow">{t.timelineEyebrow}</span>
          <h1 className="timeline-hero-heading font-display">{t.timelinePageTitle}</h1>
          <p className="timeline-hero-description">
            {t.timelinePageSubtitle}
          </p>
        </div>
      </section>

      {/* 2. ERA SELECTOR PILL BAR (6 ERAS) — Matches timeline_reference */}
      <nav ref={eraSelectorRef} className="timeline-era-pill-bar" aria-label="Historical Eras" role="tablist">
        {TIMELINE_ERAS.map((era) => {
          const isActive = selectedEraId === era.id;
          const thumb = resolveEraNavImage(era.id);
          return (
            <button
              key={era.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              id={`era-pill-${era.id}`}
              className={`era-pill-btn ${isActive ? 'era-pill-active' : ''}`}
              onClick={() => setSelectedEraId(era.id)}
            >
              <div className="era-pill-thumb">
                <img src={thumb} alt="" loading="eager" />
              </div>
              <div className="era-pill-text">
                <span className="era-pill-years">{era.yearRange}</span>
                <span className="era-pill-name">{era.title}</span>
              </div>
            </button>
          );
        })}
      </nav>

      {/* 3. ACTIVE ERA HERO CARD — Matches timeline_reference */}
      <section className="active-era-banner-card" aria-label={selectedEra.title}>
        <div className="era-banner-left">
          <span className="era-banner-years">{selectedEra.yearRange}</span>
          <h2 className="era-banner-title font-display">{selectedEra.title}</h2>
          <p className="era-banner-summary">
            {selectedEraId === 'early-life' &&
              (isHi
                ? '१८९१ में महू में जन्म, सामाजिक विषमताओं व भेदभाव को परास्त करते हुए अपनी मेधा से समाज के प्रथम मैट्रिकुलेट बने।'
                : 'Born in Mhow in 1891, overcoming systemic caste discrimination with unwavering scholastic brilliance to become the first matriculate of his community.')}
            {selectedEraId === 'higher-education' &&
              (isHi
                ? 'कोलंबिया विश्वविद्यालय और लंदन स्कूल ऑफ इकोनॉमिक्स में उच्च अकादमिक शोध और मौलिक आर्थिक ग्रंथ रचना।'
                : 'Pioneering doctoral research at Columbia University and London School of Economics, shaping international scholarship and public finance.')}
            {selectedEraId === 'social-reform' &&
              (isHi
                ? 'महाड़ सत्याग्रह और कालाराम मंदिर आंदोलन द्वारा शोषित वर्गों में आत्मसम्मान और मानवीय अधिकारों की अलख जगाई।'
                : 'Leading the historic Mahad Satyagraha of 1927 at Chavdar Tank and the Kalaram Temple entry movement for civil equality and human dignity.')}
            {selectedEraId === 'political-movement' &&
              (isHi
                ? 'इंडिपेंडेंट लेबर पार्टी की स्थापना, श्रम सुधार और ब्रिटिश वाइसरॉय परिषद में कामगार अधिकारों का वैधानिक संरक्षण।'
                : 'Founding the Independent Labour Party (1936), institutionalizing the 8-hour workday, maternity benefits, and river valley projects.')}
            {selectedEraId === 'constitutional-journey' &&
              (isHi
                ? 'संविधान सभा की प्रारूप समिति के अध्यक्ष के रूप में स्वतंत्र भारत के संविधान का निर्माण और मौलिक अधिकारों की स्थापना।'
                : 'Leading the Drafting Committee as Chairman, piloting 395 Articles through 114 sittings and establishing constitutional morality and equality.')}
            {selectedEraId === 'later-years' &&
              (isHi
                ? 'दीक्षाभूमि नागपुर में बौद्ध धम्म अंगीकार कर प्रज्ञा, करुणा और समता पर आधारित नवयान का शंखनाद।'
                : 'Embracing Buddhism at Deekshabhoomi, Nagpur with over 500,000 followers, inspiring enduring ethical and democratic awakenings.')}
          </p>
        </div>

        <div className="era-banner-center-thumb" aria-hidden="true">
          <img src={resolveEraBannerImage(selectedEraId)} alt="" loading="eager" />
        </div>

        <div className="era-banner-right-quote">
          <blockquote className="era-quote-text font-display">
            “{activeQuote.text}”
          </blockquote>
          <cite className="era-quote-author">— {activeQuote.author}</cite>
        </div>
      </section>

      {/* 4. INTERACTIVE TIMELINE RAIL & EVENT CARDS — Matches timeline_reference */}
      <section className="timeline-rail-section" aria-label="Timeline Milestones">
        <div className="timeline-controls-header">
          <button
            type="button"
            className="rail-nav-btn rail-btn-prev"
            onClick={() => scrollTrack('left')}
            aria-label="Scroll milestones left"
          >
            ‹
          </button>

          {/* Node Milestones Horizontal Wire */}
          <div className="timeline-milestones-track">
            <div className="milestones-line-gold" aria-hidden="true" />
            <div className="milestones-nodes-row">
              {filteredEvents.map((evt) => (
                <div key={evt.id} className="milestone-node-item">
                  <span className="milestone-year-label">{evt.year}</span>
                  <div className="milestone-circle-node" />
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="rail-nav-btn rail-btn-next"
            onClick={() => scrollTrack('right')}
            aria-label="Scroll milestones right"
          >
            ›
          </button>
        </div>

        {/* Event Cards Row */}
        <div ref={trackRef} className="timeline-cards-scroll-container">
          {filteredEvents.map((evt) => (
            <article
              key={evt.id}
              className="timeline-event-card-refined"
              onClick={() => onNavigate('event-detail', evt.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onNavigate('event-detail', evt.id);
                }
              }}
            >
              <div className="event-card-thumb-wrap">
                <img src={resolveTimelineEventImage(evt.id, evt.eraId, evt.thumbnailUrl)} alt="" loading="eager" />
                <div className="event-card-icon-badge" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
              </div>

              <div className="event-card-body-content">
                <div className="event-card-meta-tags">
                  <span className="event-date-text">{evt.date.toUpperCase()}</span>
                  <span className="event-cat-tag">
                    {evt.eraId === 'early-life' ? 'BIRTH / EDUCATION' : 'HISTORICAL RECORD'}
                  </span>
                </div>

                <h3 className="event-card-title font-display">{evt.title}</h3>
                <p className="event-card-summary">{evt.summary}</p>

                {evt.sources?.[0] && (
                  <div className="event-card-source-row">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    </svg>
                    <span><strong>Source:</strong> {evt.sources[0].title}</span>
                  </div>
                )}

                <div className="event-card-bottom-row">
                  <div className="circle-arrow-btn" aria-hidden="true">
                    <span>→</span>
                  </div>
                  <span className="view-source-link">View Source →</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};