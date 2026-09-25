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
    { year: 1946, label: 'Constituent Assembly Convenes' },
    { year: 1947, label: 'Drafting Committee Appointed', active: true },
    { year: 1949, label: 'Final Draft Presented (17 Nov)' },
    { year: 1950, label: 'Constitution of India Enacted' },
    { year: 1956, label: 'Final Architectural Legacy' }
  ];

  return (
    <div className="event-detail-page-container">
      {/* Top Breadcrumb Navigation */}
      <div className="detail-top-nav">
        <button
          type="button"
          className="btn-back-kiosk"
          onClick={() => onNavigate('timeline')}
          aria-label="Back to Timeline"
        >
          <span className="back-arrow">←</span> Back to Timeline
        </button>
        <span className="detail-breadcrumb-indicator">
          Constitutional Journey (1947–1956) / {event.title}
        </span>
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

          {/* Archival State Seal in Sidebar */}
          <div className="milestone-seal-card">
            <img
              src="/images/composition/ashoka-chakra-blue.png"
              alt=""
              className="milestone-chakra-seal"
            />
            <span className="seal-text">Official Constituent Assembly Record</span>
          </div>
        </aside>

        {/* Right Main Editorial Dossier */}
        <main className="detail-main-dossier">
          {/* Layered Dossier Header Stage (Reference A Screen 4) */}
          <div className="dossier-stage-composition">
            {/* Background Parchment & Architecture */}
            <div className="dossier-bg-atmosphere" aria-hidden="true">
              <img
                src="/images/composition/canvas-parchment-parliament.png"
                alt=""
                className="dossier-bg-canvas"
              />
            </div>

            <div className="dossier-header-row">
              <div className="dossier-title-col">
                <span className="dossier-year-gold">{event.year}</span>
                <h1 className="dossier-title font-display">{event.title}</h1>
                <p className="dossier-summary">{event.summary}</p>

                <div className="dossier-supporting-objects">
                  <img
                    src="/images/composition/scales-justice-gavel.png"
                    alt="Scales of Justice"
                    className="scales-justice-img"
                  />
                  <img
                    src="/images/composition/law-books-stack.png"
                    alt="Constitutional Law Volumes"
                    className="law-books-mini-img"
                  />
                </div>
              </div>

              {/* Primary Subject Cutout & Master Quote */}
              <div className="dossier-portrait-quote-box">
                <div className="dossier-portrait-img-box">
                  <img
                    src="/images/composition/ambedkar-cutout-chairman.png"
                    alt="Dr. B. R. Ambedkar presiding over Drafting Committee"
                    className="dossier-portrait"
                  />
                </div>
                <figure className="dossier-quote-figure">
                  <span className="dossier-quote-mark" aria-hidden="true">“</span>
                  <blockquote className="font-display">
                    We are going to enter into a life of contradictions. In politics we will have equality and in social and economic life we will have inequality.
                  </blockquote>
                  <figcaption>— Dr. B. R. Ambedkar</figcaption>
                </figure>
              </div>
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
            <div className="related-section-header">
              <h2 className="related-section-title">Related Archive Material</h2>
              <span className="related-count-note">3 Verified Documents Mapped</span>
            </div>
            <div className="related-cards-track">
              {event.sources?.map((src) => (
                <div key={src.id} className="related-card-item">
                  <div className="related-card-thumb">
                    <img
                      src={
                        src.type === 'video'
                          ? '/images/composition/ambedkar-speech-assembly.png'
                          : src.type === 'document'
                          ? '/images/textures/paper-manuscript.png'
                          : '/images/composition/constitution-preamble-art.png'
                      }
                      alt=""
                      className="related-thumb-img"
                    />
                  </div>
                  <div className="related-card-info">
                    <span className="related-card-name">{src.title}</span>
                    <span className="related-card-type">{src.meta}</span>
                  </div>
                  <span className="related-card-arrow">›</span>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};
