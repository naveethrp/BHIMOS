import React, { useState } from 'react';
import { TIMELINE_EVENTS } from '../data/timelineData';
import { PageId } from '../types';
import './EventDetailPage.css';

interface EventDetailPageProps {
  eventId?: string;
  onNavigate: (page: PageId) => void;
}

export const EventDetailPage: React.FC<EventDetailPageProps> = ({
  eventId = 'drafting-committee-constitution',
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<'context' | 'role' | 'people' | 'impact'>('context');

  const event = TIMELINE_EVENTS.find((e) => e.id === eventId) || TIMELINE_EVENTS[4];

  const milestones = [
    { year: 1946, label: 'Constituent Assembly' },
    { year: 1947, label: 'Drafting Committee', active: true },
    { year: 1949, label: 'Final Draft' },
    { year: 1950, label: 'Constitution Adopted' },
    { year: 1956, label: 'Final Years' }
  ];

  return (
    <div className="event-detail-page-container">
      {/* Top Breadcrumb & Back Action */}
      <div className="detail-top-nav">
        <button
          type="button"
          className="btn-back-kiosk"
          onClick={() => onNavigate('timeline')}
          aria-label="Back to Timeline"
        >
          <span className="back-arrow">←</span> Back to Timeline
        </button>
      </div>

      <div className="detail-layout-grid">
        {/* Left Vertical Milestone Navigator (Reference A Screen 4) */}
        <aside className="detail-vertical-milestones">
          <div className="milestone-box-header">
            <span className="milestone-box-eyebrow">Constitutional Journey</span>
            <span className="milestone-box-years">(1947–1956)</span>
          </div>

          <div className="vertical-timeline-track">
            {milestones.map((m) => (
              <div
                key={m.year}
                className={`vertical-node-item ${m.active ? 'vertical-node-active' : ''}`}
              >
                <div className="vertical-marker-col">
                  <span className="marker-bullet"></span>
                  <div className="marker-stem"></div>
                </div>
                <div className="marker-content">
                  <span className="marker-year">{m.year}</span>
                  <span className="marker-label">{m.label}</span>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Right Main Editorial Dossier */}
        <main className="detail-main-dossier">
          {/* Header Row: Title on Left, Portrait & Quote on Right */}
          <div className="dossier-header-row">
            <div className="dossier-title-col">
              <span className="dossier-year-gold">{event.year}</span>
              <h1 className="dossier-title font-display">{event.title}</h1>
              <p className="dossier-summary">{event.summary}</p>
            </div>

            <div className="dossier-portrait-quote-box">
              <div className="dossier-portrait-img-box">
                <img
                  src="/images/portraits/master-portrait-formal.jpg"
                  alt="Dr. B. R. Ambedkar"
                  className="dossier-portrait"
                />
              </div>
              <figure className="dossier-quote-figure">
                <blockquote className="font-display">
                  “We are going to enter into a life of contradictions. In politics we will have equality and in social and economic life we will have inequality.”
                </blockquote>
                <figcaption>— B. R. Ambedkar</figcaption>
              </figure>
            </div>
          </div>

          {/* Interactive Information Tabs */}
          <div className="dossier-tabs-nav" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'context'}
              className={`dossier-tab-btn ${activeTab === 'context' ? 'tab-btn-active' : ''}`}
              onClick={() => setActiveTab('context')}
            >
              Historical Context
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'role'}
              className={`dossier-tab-btn ${activeTab === 'role' ? 'tab-btn-active' : ''}`}
              onClick={() => setActiveTab('role')}
            >
              Ambedkar's Role
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'people'}
              className={`dossier-tab-btn ${activeTab === 'people' ? 'tab-btn-active' : ''}`}
              onClick={() => setActiveTab('people')}
            >
              Key People
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'impact'}
              className={`dossier-tab-btn ${activeTab === 'impact' ? 'tab-btn-active' : ''}`}
              onClick={() => setActiveTab('impact')}
            >
              Impact & Legacy
            </button>
          </div>

          {/* Tab Content Panel */}
          <div className="dossier-tab-panel" role="tabpanel">
            {activeTab === 'context' && (
              <p className="tab-body-text">{event.historicalContext}</p>
            )}
            {activeTab === 'role' && (
              <p className="tab-body-text">{event.ambedkarRole}</p>
            )}
            {activeTab === 'people' && (
              <ul className="tab-people-list">
                {event.keyPeople?.map((person) => (
                  <li key={person} className="person-badge">
                    <span className="person-icon">👤</span> {person}
                  </li>
                ))}
              </ul>
            )}
            {activeTab === 'impact' && (
              <p className="tab-body-text">{event.impact}</p>
            )}
          </div>

          {/* Related Archive Strip (Reference A Screen 4) */}
          <section className="detail-related-archive-section">
            <h2 className="related-section-title">Related Archive Material</h2>
            <div className="related-cards-track">
              {event.sources?.map((src) => (
                <div key={src.id} className="related-card-item">
                  <div className="related-card-thumb">
                    <img
                      src={
                        src.type === 'video'
                          ? '/images/historical/parliament-crowd.png'
                          : src.type === 'document'
                          ? '/images/textures/paper-manuscript.png'
                          : '/images/textures/constitution-preamble.png'
                      }
                      alt=""
                      className="related-thumb-img"
                    />
                  </div>
                  <div className="related-card-info">
                    <span className="related-card-name">{src.title}</span>
                    <span className="related-card-type">{src.meta}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};
