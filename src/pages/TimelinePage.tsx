import React, { useState } from 'react';
import { TIMELINE_ERAS, TIMELINE_EVENTS } from '../data/timelineData';
import { PageId } from '../types';
import './TimelinePage.css';

interface TimelinePageProps {
  onNavigate: (page: PageId, eventId?: string) => void;
}

export const TimelinePage: React.FC<TimelinePageProps> = ({ onNavigate }) => {
  const [selectedEraId, setSelectedEraId] = useState<string>('early-life');

  const filteredEvents = selectedEraId === 'all'
    ? TIMELINE_EVENTS
    : TIMELINE_EVENTS.filter((e) => e.eraId === selectedEraId || e.eraId === 'constitutional-journey');

  return (
    <div className="timeline-page-container">
      {/* Title & Introduction */}
      <header className="timeline-header-block">
        <h1 className="timeline-page-title font-display">A Journey Through History</h1>
        <p className="timeline-page-subtitle">
          Explore key events in the life and legacy of Dr. B. R. Ambedkar.
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
                <span className="era-bullet">⚜</span>
              </div>
              <span className="era-title">{era.title}</span>
              <span className="era-year-range">{era.yearRange}</span>
            </button>
          );
        })}
      </nav>

      {/* Horizontal Timeline Track */}
      <section className="timeline-horizontal-wrapper" aria-label="Interactive Events Track">
        <div className="timeline-rail-line" aria-hidden="true">
          <div className="timeline-rail-progress"></div>
        </div>

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
                    src={evt.thumbnailUrl}
                    alt={evt.title}
                    className="timeline-card-img"
                  />
                </div>
                <div className="timeline-card-body">
                  <h2 className="timeline-card-title">{evt.title}</h2>
                  <p className="timeline-card-summary">{evt.summary}</p>
                </div>
                <div className="timeline-card-footer">
                  <span className="timeline-expand-icon" aria-hidden="true">+</span>
                  <span className="timeline-read-label">View Milestone</span>
                </div>
              </article>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
