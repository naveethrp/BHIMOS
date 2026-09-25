import React, { useState } from 'react';
import { TIMELINE_ERAS, TIMELINE_EVENTS } from '../data/timelineData';
import { PageId } from '../types';
import './TimelinePage.css';

interface TimelinePageProps {
  onNavigate: (page: PageId, eventId?: string) => void;
}

export const TimelinePage: React.FC<TimelinePageProps> = ({ onNavigate }) => {
  const [selectedEraId, setSelectedEraId] = useState<string>('constitutional-journey');

  const selectedEra = TIMELINE_ERAS.find((era) => era.id === selectedEraId) || TIMELINE_ERAS[4];

  const filteredEvents = selectedEraId === 'all'
    ? TIMELINE_EVENTS
    : TIMELINE_EVENTS.filter((e) => e.eraId === selectedEraId || e.eraId === 'constitutional-journey');

  return (
    <div className="timeline-page-container">
      {/* Title & Introduction */}
      <header className="timeline-header-block">
        <span className="timeline-eyebrow">CHRONOLOGICAL EXHIBITION</span>
        <h1 className="timeline-page-title font-display">A Journey Through History</h1>
        <p className="timeline-page-subtitle">
          Explore pivotal eras, milestone struggles, and the constitutional evolution of modern India.
        </p>
      </header>

      {/* Era Selector Tabs (Reference A Screen 3) */}
      <nav className="era-selector-bar" aria-label="Historical Eras">
        {TIMELINE_ERAS.map((era) => {
          const isActive = selectedEraId === era.id;
          return (
            <button
              key={era.id}
              type="button"
              className={`era-tab-btn ${isActive ? 'era-tab-active' : ''}`}
              onClick={() => setSelectedEraId(era.id)}
              aria-current={isActive ? 'true' : undefined}
            >
              <div className="era-icon-wrapper">
                {era.id === 'early-life' && '🏛️'}
                {era.id === 'education' && '🎓'}
                {era.id === 'social-reform' && '✊'}
                {era.id === 'political-movement' && '🇮🇳'}
                {era.id === 'constitutional-journey' && '⚖️'}
                {era.id === 'legacy' && '⭐'}
              </div>
              <span className="era-title">{era.title}</span>
              <span className="era-year-range">{era.yearRange}</span>
            </button>
          );
        })}
      </nav>

      {/* Dynamic Era Feature Stage (Evolving by Era) */}
      <section className="era-dynamic-stage" aria-label={`Era Exhibition: ${selectedEra.title}`}>
        {/* Layer 1: Atmospheric Era Background */}
        <div className="era-stage-background" aria-hidden="true">
          <img
            src={
              selectedEraId === 'constitutional-journey'
                ? '/images/composition/canvas-parchment-parliament.png'
                : selectedEraId === 'social-reform'
                ? '/images/composition/crowd-movement.png'
                : selectedEraId === 'education'
                ? '/images/composition/colonnade-gallery.png'
                : '/images/composition/canvas-parchment-chakra.png'
            }
            alt=""
            className="era-bg-texture-img"
          />
          <div className="era-stage-gradient"></div>
        </div>

        {/* Layer 2: Era Cutout Focal Composition */}
        <div className="era-cutout-composition" aria-hidden="true">
          {selectedEraId === 'constitutional-journey' && (
            <div className="era-cutout-group">
              <img
                src="/images/composition/ambedkar-cutout-standing.png"
                alt="Dr. Ambedkar holding Constitution"
                className="era-cutout-standing-img"
              />
              <img
                src="/images/composition/law-books-stack.png"
                alt=""
                className="era-accents-books-img"
              />
              <img
                src="/images/composition/parliament-isolated.png"
                alt=""
                className="era-backdrop-parliament-img"
              />
            </div>
          )}

          {selectedEraId !== 'constitutional-journey' && (
            <div className="era-cutout-group">
              <img
                src="/images/composition/ambedkar-cutout-bust.png"
                alt="Dr. Ambedkar portrait"
                className="era-cutout-bust-img"
              />
              <img
                src="/images/composition/fountain-pen-manuscript.png"
                alt=""
                className="era-accents-pen-img"
              />
            </div>
          )}
        </div>

        {/* Layer 3: Era Contextual Description */}
        <div className="era-contextual-content">
          <span className="era-badge-indicator">{selectedEra.yearRange}</span>
          <h2 className="era-headline font-display">{selectedEra.title}</h2>
          <p className="era-summary-text">
            {selectedEraId === 'constitutional-journey' &&
              'From 1947 to 1956, Dr. Ambedkar led the drafting of the Constitution of India as Chairman of the Drafting Committee, institutionalizing fundamental rights, universal franchise, and social justice for over 350 million citizens.'}
            {selectedEraId === 'social-reform' &&
              'The era of assertive civil rights, including the historic Mahad Satyagraha of 1927 for equal water rights, and the Kalaram Temple entry movement, awakening millions to human dignity.'}
            {selectedEraId === 'education' &&
              'Intellectual rigor across Columbia University and London School of Economics, authoring pioneering economic treatises on provincial finance and the problem of the rupee.'}
            {selectedEraId === 'early-life' &&
              'Born in Mhow in 1891, overcoming systemic caste discrimination with unwavering scholastic brilliance to become the first matriculate of his community.'}
            {selectedEraId === 'political-movement' &&
              'Founding the Independent Labour Party (1936) and Scheduled Castes Federation, championing workers rights, maternity benefits, and representation.'}
            {selectedEraId === 'legacy' &&
              'Inspiring enduring democratic awakenings, constitutional morality, and the moral philosophy of Liberty, Equality, and Fraternity across the world.'}
          </p>
        </div>
      </section>

      {/* Horizontal Timeline Track */}
      <section className="timeline-horizontal-wrapper" aria-label="Interactive Events Track">
        <div className="timeline-rail-line" aria-hidden="true"></div>

        <div className="timeline-cards-track">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="timeline-event-card-wrapper"
              onClick={() => onNavigate('event-detail', evt.id)}
              role="button"
              tabIndex={0}
              aria-label={`Event: ${evt.year} - ${evt.title}. Click to view details.`}
            >
              {/* Year Pin & Node */}
              <div className="timeline-node-header">
                <span className="timeline-year-badge">{evt.year}</span>
                <div className="timeline-dot-pin"></div>
              </div>

              {/* Event Card Content */}
              <article className="timeline-event-card">
                <div className="timeline-card-image-box">
                  <img
                    src={
                      evt.id === 'drafting-committee-constitution'
                        ? '/images/composition/ambedkar-cutout-chairman.png'
                        : evt.thumbnailUrl
                    }
                    alt={evt.title}
                    className="timeline-card-img"
                  />
                  {evt.id === 'drafting-committee-constitution' && (
                    <span className="timeline-flagship-pill">Flagship Milestone</span>
                  )}
                </div>
                <div className="timeline-card-body">
                  <span className="timeline-card-date">{evt.date}</span>
                  <h3 className="timeline-card-title">{evt.title}</h3>
                  <p className="timeline-card-summary">{evt.summary}</p>
                </div>
                <div className="timeline-card-footer">
                  <span className="timeline-expand-icon" aria-hidden="true">+</span>
                  <span className="timeline-read-label">View Dossier</span>
                </div>
              </article>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
