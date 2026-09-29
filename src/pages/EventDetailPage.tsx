import React, { useState, useRef } from 'react';
import { TIMELINE_ERAS, TIMELINE_EVENTS } from '../data/timelineData';
import { PageId, Language } from '../types';
import { GhostButton } from '../components/common/Buttons';
import { TRANSLATIONS } from '../utils/translations';
import './EventDetailPage.css';

interface EventDetailPageProps {
  eventId?: string;
  onNavigate: (page: PageId, eventId?: string) => void;
  language?: Language;
}

export const EventDetailPage: React.FC<EventDetailPageProps> = ({
  eventId = 'drafting-committee-constitution',
  onNavigate,
  language = 'en'
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const [activeTab, setActiveTab] = useState<'context' | 'role' | 'people' | 'impact'>('context');
  const [activeSourceModal, setActiveSourceModal] = useState<any | null>(null);
  const verticalNavRef = useRef<HTMLDivElement>(null);

  const event = TIMELINE_EVENTS.find((e) => e.id === eventId) || TIMELINE_EVENTS[10] || TIMELINE_EVENTS[0];
  const era = TIMELINE_ERAS.find((r) => r.id === event.eraId) || TIMELINE_ERAS[4];

  // Dynamically compute era milestones so any era's events can be browsed
  const eraEvents = TIMELINE_EVENTS.filter((e) => e.eraId === event.eraId);
  const milestones = eraEvents.map((e) => ({
    id: e.id,
    year: e.year,
    label: e.title,
    active: e.id === event.id
  }));

  const tabs = [
    { id: 'context' as const, label: t.historicalContext },
    { id: 'role' as const, label: t.ambedkarRole },
    { id: 'people' as const, label: t.keyPeople },
    { id: 'impact' as const, label: t.impactLegacy }
  ];

  return (
    <div className="event-detail-page-container">
      {/* Top Breadcrumb Navigation */}
      <div className="detail-top-nav">
        <GhostButton
          type="button"
          className="btn-back-kiosk"
          onClick={() => onNavigate('timeline')}
          aria-label={t.backToTimeline}
        >
          <span className="back-arrow" aria-hidden="true">←</span> {t.backToTimeline}
        </GhostButton>
        <span className="detail-breadcrumb-indicator" aria-current="page">
          {era.title} ({era.yearRange}) / {event.title}
        </span>
      </div>

      <div className="detail-layout-grid">
        {/* Left Vertical Milestone Navigator */}
        <aside 
          ref={verticalNavRef}
          className="detail-vertical-milestones" 
          aria-label={`Milestones in ${era.title}`}
        >
          <div className="milestone-box-header">
            <span className="milestone-box-eyebrow">{era.title}</span>
            <span className="milestone-box-years">({era.yearRange})</span>
          </div>

          <div className="vertical-timeline-track" role="list">
            {milestones.map((m) => (
              <div
                key={m.id}
                className={`vertical-node-item ${m.active ? 'vertical-node-active' : ''}`}
                onClick={() => onNavigate('event-detail', m.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onNavigate('event-detail', m.id);
                  }
                }}
                role="listitem"
                tabIndex={0}
                aria-label={`View milestone: ${m.year} - ${m.label}${m.active ? ' (current)' : ''}`}
                aria-current={m.active ? 'true' : undefined}
              >
                <div className="vertical-marker-col">
                  <span className="marker-bullet" aria-hidden="true" />
                  <div className="marker-stem" aria-hidden="true" />
                </div>
                <div className="marker-content">
                  <span className="marker-year">{m.year}</span>
                  <span className="marker-label">{m.label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Archival State Seal in Sidebar */}
          <div className="milestone-seal-card">
            <span className="seal-tag">ARCHIVAL RECORD</span>
            <span className="seal-text">National Heritage Archive Collection</span>
          </div>
        </aside>

        {/* Right Main Editorial Dossier */}
        <main className="detail-main-dossier" role="main">
          {/* Editorial Dossier Header */}
          <div className="dossier-stage-composition">
            <div className="dossier-header-row">
              <div className="dossier-title-col">
                <span className="dossier-year-gold">{event.year} • {event.date}</span>
                <h1 className="dossier-title font-display">{event.title}</h1>
                <p className="dossier-summary">{event.summary}</p>
              </div>

              {/* Primary Subject Cutout & Master Quote */}
              <div className="dossier-portrait-quote-box">
                <div className="dossier-portrait-img-box">
                  <img
                    src={event.thumbnailUrl || '/assets/speaking-bg.png'}
                    alt={event.title}
                    className="dossier-portrait"
                    loading="lazy"
                  />
                </div>
                {event.quote && (
                  <figure className="dossier-quote-figure">
                    <span className="dossier-quote-mark" aria-hidden="true">"</span>
                    <blockquote className="font-display">
                      {event.quote.text}
                    </blockquote>
                    <figcaption>— {event.quote.author}</figcaption>
                  </figure>
                )}
              </div>
            </div>
          </div>

          {/* Interactive Information Tabs */}
          <div className="dossier-tabs-nav" role="tablist" aria-label="Event Details">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`tabpanel-${tab.id}`}
                id={`tab-${tab.id}`}
                className={`dossier-tab-btn ${activeTab === tab.id ? 'tab-btn-active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content Panel */}
          <div className="dossier-tab-panel" role="tabpanel" id={`tabpanel-${activeTab}`} aria-labelledby={`tab-${activeTab}`}>
            {activeTab === 'context' && (
              <p className="tab-body-text">{event.historicalContext || event.summary}</p>
            )}
            {activeTab === 'role' && (
              <p className="tab-body-text">{event.ambedkarRole || 'Championed statutory safeguards, social equality, and constitutional integrity.'}</p>
            )}
            {activeTab === 'people' && (
              <ul className="tab-people-list" role="list">
                {event.keyPeople && event.keyPeople.length > 0 ? (
                  event.keyPeople.map((person) => (
                    <li key={person} className="person-badge" role="listitem">
                      <svg className="person-icon-svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <circle cx="12" cy="8" r="5" />
                        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                      </svg> {person}
                    </li>
                  ))
                ) : (
                  <li className="person-badge" role="listitem">
                    <svg className="person-icon-svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <circle cx="12" cy="8" r="5" />
                      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                    </svg> Dr. B. R. Ambedkar
                  </li>
                )}
              </ul>
            )}
            {activeTab === 'impact' && (
              <p className="tab-body-text">{event.impact || 'Established irreversible legal and democratic precedents for modern India.'}</p>
            )}
          </div>

          {/* Related Primary Sources Strip */}
          {event.sources && event.sources.length > 0 && (
            <section className="detail-related-archive-section" aria-labelledby="related-sources-heading">
              <div className="related-section-header">
                <h2 id="related-sources-heading" className="related-section-title">Related Primary Sources</h2>
                <span className="related-count-note">Archival Evidence Mapped</span>
              </div>
              <div className="related-cards-track" role="list">
                {event.sources.map((src) => (
                  <div
                    key={src.id}
                    className="related-card-item"
                    onClick={() => setActiveSourceModal(src)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveSourceModal(src);
                      }
                    }}
                    role="listitem"
                    tabIndex={0}
                    aria-label={`View source: ${src.title}`}
                  >
                    <div className="related-card-thumb">
                      <img
                        src={
                          src.type === 'debate'
                            ? '/assets/speaking-bg.png'
                            : src.type === 'document'
                            ? '/assets/writing.png'
                            : '/assets/portrait-1.png'
                        }
                        alt=""
                        className="related-thumb-img"
                        loading="lazy"
                      />
                    </div>
                    <div className="related-card-info">
                      <span className="related-card-name">{src.title}</span>
                      <span className="related-card-type">{src.meta}</span>
                    </div>
                    <span className="related-card-arrow" aria-hidden="true">›</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>

      {/* Primary Source Evidence Modal */}
      {activeSourceModal && (
        <div className="event-source-modal-backdrop" onClick={() => setActiveSourceModal(null)} role="dialog" aria-modal="true" aria-labelledby="source-modal-title">
          <div className="event-source-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="source-modal-header">
              <div className="source-modal-title-group">
                <span className="source-modal-eyebrow">PRIMARY SOURCE DOSSIER</span>
                <h3 id="source-modal-title" className="source-modal-title font-display">{activeSourceModal.title}</h3>
              </div>
              <button
                type="button"
                className="btn-close-source-modal"
                onClick={() => setActiveSourceModal(null)}
                aria-label="Close Source Modal"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="source-modal-body">
              <div className="source-meta-grid">
                <div><strong>Classification:</strong> {activeSourceModal.type.toUpperCase()} RECORD</div>
                <div><strong>Identifier:</strong> {activeSourceModal.meta}</div>
                <div><strong>Holding Repository:</strong> Parliament Archives / Dr. Ambedkar Foundation</div>
                <div><strong>Status:</strong> <span className="source-verified-tag">✓ Verified Primary Evidence</span></div>
              </div>

              <div className="source-description-box">
                <p>
                  Official primary record mapped to the historical event "{event.title}".
                  Verified in the BHIMOS National Heritage Repository register.
                </p>
              </div>
            </div>

            <div className="source-modal-footer">
              {activeSourceModal.url && (
                <a
                  href={activeSourceModal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-external-source-link"
                >
                  Access Archival Archive ↗
                </a>
              )}
              <button
                type="button"
                className="btn-close-source-box"
                onClick={() => setActiveSourceModal(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};