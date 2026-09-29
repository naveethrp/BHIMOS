import React, { useState, useCallback, useRef, useEffect } from 'react';
import { SUGGESTED_QUESTIONS, INITIAL_CONVERSATION, findMatchingAnswer } from '../data/askArchiveData';
import { AskMessage, CitationSource, Language } from '../types';
import { TRANSLATIONS } from '../utils/translations';
import './AskArchivePage.css';

import { askArchiveApi } from '../services/api';

interface AskArchivePageProps {
  language?: Language;
}

export const AskArchivePage: React.FC<AskArchivePageProps> = ({ language = 'en' }) => {
  const isHi = language === 'hi';
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const [messages, setMessages] = useState<AskMessage[]>(INITIAL_CONVERSATION);
  const [inputText, setInputText] = useState('');
  const [activeCitation, setActiveCitation] = useState<CitationSource | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleQuerySubmit = useCallback(async (questionText: string) => {
    const trimmed = questionText.trim();
    if (!trimmed || isLoading) return;

    const userMsg: AskMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: trimmed
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      // 1. Try querying real RAG backend API
      const result = await askArchiveApi(trimmed, language);
      const asstMsg: AskMessage = {
        id: `asst-${Date.now() + 1}`,
        sender: 'assistant',
        text: result.answer,
        citations: result.citations.map((c, idx) => ({
          id: c.id,
          badgeNumber: idx + 1,
          title: c.title,
          date: c.year ? String(c.year) : '1949',
          sourceType: 'Archival Document',
          location: c.collection || 'Parliament House Library / BAWS',
          year: c.year || 1949,
          collection: c.collection || 'Archival Record',
          page: c.page || undefined,
          snippet: c.snippet
        }))
      };
      setMessages((prev) => [...prev, asstMsg]);
    } catch {
      // 2. Graceful fallback to local scholarly knowledge base when offline
      const result = findMatchingAnswer(trimmed);
      const asstMsg: AskMessage = {
        id: `asst-${Date.now() + 1}`,
        sender: 'assistant',
        text: result.answer,
        citations: result.citations
      };
      setMessages((prev) => [...prev, asstMsg]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, language]);

  const handleSelectSuggested = useCallback((question: string) => {
    handleQuerySubmit(question);
  }, [handleQuerySubmit]);

  const handleSend = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    handleQuerySubmit(inputText);
  }, [inputText, handleQuerySubmit]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  }, [handleSend]);

  const relatedDocs = [
    {
      id: 'doc-art17',
      title: 'Draft Constitution (Article 17)',
      type: 'DOCUMENT',
      pages: '3 pages',
      thumb: '/assets/writing.png'
    },
    {
      id: 'doc-cad-nov48',
      title: 'Constituent Assembly Debate — 4 Nov 1948',
      type: 'DEBATE',
      pages: '12 pages',
      thumb: '/assets/speaking-bg.png'
    },
    {
      id: 'doc-final-speech',
      title: "Ambedkar's Final Speech in Assembly",
      type: 'SPEECH',
      pages: '8 pages',
      thumb: '/assets/standing.png'
    },
    {
      id: 'doc-aoc',
      title: 'Annihilation of Caste (First Edition)',
      type: 'TREATISE',
      pages: '84 pages',
      thumb: '/assets/deep-thinking.png'
    },
    {
      id: 'doc-mahad',
      title: 'Mahad Satyagraha Declaration',
      type: 'MANUSCRIPT',
      pages: '2 pages',
      thumb: '/assets/1.jpeg'
    },
    {
      id: 'doc-states-minorities',
      title: 'States and Minorities (Memorandum)',
      type: 'PUBLICATION',
      pages: '245 pages',
      thumb: '/assets/portrait1.png'
    }
  ];

  return (
    <div className="ask-master-page">
      {/* 1. TOP BANNER — Matches ask_reference */}
      <section className="ask-hero-stage" aria-label="Scholarly Research Desk">
        <div className="ask-atmosphere-layer" aria-hidden="true">
          <img src="/assets/clouds.jpeg" alt="" className="ask-sky-clouds" loading="eager" />
          <img src="/assets/bg10.png" alt="" className="ask-canvas-bg" loading="eager" />
          <img src="/assets/trees.jpeg" alt="" className="ask-env-trees" loading="lazy" />
          <img src="/assets/gate.png" alt="" className="ask-env-gate" loading="lazy" />
          <div className="ask-gradient-overlay" />
        </div>

        {/* Left Editorial Titles */}
        <div className="ask-hero-titles">
          <span className="ask-hero-eyebrow">SCHOLARLY RESEARCH DESK</span>
          <h1 className="ask-hero-heading font-display">{t.askPageTitle}</h1>
          <p className="ask-hero-desc">
            {t.askPageSubtitle}
          </p>
        </div>

        {/* Center Quote with Signature */}
        <div className="ask-hero-quote-box" aria-hidden="true">
          <blockquote className="ask-quote-text font-display">
            “Cultivation of mind should be the ultimate aim of human existence.”
          </blockquote>
          <cite className="ask-quote-author">— Dr. B. R. Ambedkar</cite>
          <span className="ask-signature">B. R. Ambedkar</span>
        </div>

        {/* Right Composition: Ambedkar Writing at Desk */}
        <div className="ask-hero-right-cutout" aria-hidden="true">
          <img
            src="/assets/writing.png"
            alt="Dr. B. R. Ambedkar writing"
            className="ask-hero-cutout-img"
            loading="eager"
          />
          <div className="ask-books-spine-stack">
            <span className="spine-tag spine-const">CONSTITUTION OF INDIA</span>
            <span className="spine-tag spine-law">LAW</span>
            <span className="spine-tag spine-econ">ECONOMICS</span>
            <span className="spine-tag spine-soc">SOCIAL JUSTICE</span>
          </div>
        </div>
      </section>

      {/* 2. THREE-COLUMN SCHOLARLY RESEARCH WORKSPACE — Matches ask_reference */}
      <div className="ask-three-col-workspace">
        {/* LEFT COLUMN: Scope, Suggested Questions & Standing Ambedkar */}
        <aside className="ask-left-col">
          {/* About this Research Desk Card */}
          <div className="ask-info-card about-desk-card">
            <div className="info-card-header">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#B8860B" strokeWidth="2" aria-hidden="true">
                <path d="M3 21h18M3 10h18M5 10v11M19 10v11M9 10v11M14 10v11M4 10l8-7 8 7" />
              </svg>
              <h2 className="info-card-title">{t.askAboutTitle}</h2>
            </div>
            <p className="info-card-text">
              {t.askAboutDesc}
            </p>
            <a href="#scope" className="info-card-link">Learn more →</a>
          </div>

          {/* Search Scope Checklist Card */}
          <div className="ask-info-card scope-card">
            <div className="info-card-header">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#B8860B" strokeWidth="2" aria-hidden="true">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <h2 className="info-card-title">{isHi ? 'खोज परिधि' : 'SEARCH SCOPE'}</h2>
            </div>
            <ul className="scope-checklist">
              <li>✓ 22 Published Volumes (BAWS)</li>
              <li>✓ 167 Assembly Sittings (CAD)</li>
              <li>✓ Letters & Correspondence</li>
              <li>✓ Speeches & Writings</li>
              <li>✓ Government of India Records</li>
            </ul>
          </div>

          {/* Suggested Questions Card */}
          <div className="ask-info-card suggested-card">
            <div className="info-card-header">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#B8860B" strokeWidth="2" aria-hidden="true">
                <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-7 7c0 2.5 1.3 4.7 3.3 6 .6.4 1 1.1 1 1.8V17h5.4v-.2c0-.7.4-1.4 1-1.8 2-1.3 3.3-3.5 3.3-6a7 7 0 0 0-7-7z" />
              </svg>
              <h2 className="info-card-title">{t.recommendedInquiries}</h2>
            </div>
            <div className="suggested-pills-list">
              {SUGGESTED_QUESTIONS.slice(0, 5).map((q) => (
                <button
                  key={q}
                  type="button"
                  className="suggested-query-btn"
                  onClick={() => handleSelectSuggested(q)}
                >
                  <span>{q}</span>
                  <span className="query-arrow">›</span>
                </button>
              ))}
            </div>
          </div>

          {/* Standing Ambedkar Cutout Plinth */}
          <div className="ask-standing-cutout-box" aria-hidden="true">
            <img
              src="/assets/standing.png"
              alt="Dr. B. R. Ambedkar standing"
              className="standing-plinth-img"
              loading="lazy"
            />
            <div className="standing-quote-badge">
              <span className="standing-quote-line">“{t.askStandingQuote}”</span>
              <span className="standing-quote-sub">— Dr. B. R. Ambedkar</span>
            </div>
          </div>
        </aside>

        {/* CENTER COLUMN: Chat Interface, Grounded Answers & Citations */}
        <main className="ask-center-col" aria-label="Archival Conversation">
          <div className="ask-chat-viewport">
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-message-row msg-${msg.sender}`}>
                {msg.sender === 'user' ? (
                  <div className="user-message-bubble">
                    <div className="user-avatar-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                    <div className="user-bubble-content">
                      <p className="user-query-text">{msg.text}</p>
                      <span className="bubble-timestamp">10:24 AM</span>
                    </div>
                  </div>
                ) : (
                  <div className="asst-response-container">
                    <div className="asst-header-row">
                      <div className="asst-avatar-wrap">
                        <img src="/assets/writing.png" alt="Dr. B. R. Ambedkar Archival Assistant" loading="lazy" />
                      </div>
                      <div className="asst-name-meta">
                        <span className="asst-name-title">BHIMOS ARCHIVAL ASSISTANT</span>
                        <span className="asst-timestamp">10:24 AM</span>
                      </div>
                    </div>

                    <div className="asst-body-content">
                      <p className="asst-response-text">{msg.text}</p>
                    </div>

                    {/* Source References Block — Matches ask_reference */}
                    {msg.citations && msg.citations.length > 0 && (
                      <div className="asst-citations-block">
                        <div className="citations-header-row">
                          <div className="citations-header-left">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#B8860B" strokeWidth="2" aria-hidden="true">
                              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                            <span className="citations-title">SOURCE REFERENCES</span>
                          </div>
                          <span className="citations-count-pill">{msg.citations.length} sources</span>
                        </div>

                        <div className="citations-list">
                          {msg.citations.map((cite, idx) => (
                            <div
                              key={cite.id || idx}
                              className="citation-card-row"
                              onClick={() => setActiveCitation(cite)}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  setActiveCitation(cite);
                                }
                              }}
                            >
                              <div className="citation-num-badge">{idx + 1}</div>
                              <div className="citation-doc-icon" aria-hidden="true">
                                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#B8860B" strokeWidth="2">
                                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                  <polyline points="14 2 14 8 20 8" />
                                </svg>
                              </div>
                              <div className="citation-card-details">
                                <h4 className="citation-card-title">{cite.title}</h4>
                                <span className="citation-card-meta">
                                  {cite.year} • {cite.collection || 'Constituent Assembly Records'} {cite.page && `• pp. ${cite.page}`}
                                </span>
                              </div>
                              <span className="citation-view-link">View Source →</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="chat-loading-row">
                <div className="asst-avatar-wrap">
                  <img src="/assets/writing.png" alt="" loading="lazy" />
                </div>
                <div className="loading-pulse-bubble">
                  <span className="dot dot-1" />
                  <span className="dot dot-2" />
                  <span className="dot dot-3" />
                  <span className="loading-label">Retrieving verifiable archival records...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Prompt Input Bar — Matches ask_reference */}
          <form className="ask-input-bar-form" onSubmit={handleSend}>
            <div className="ask-input-container">
              <svg className="input-search-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                className="ask-text-input"
                placeholder={t.askInputPlaceholder}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                aria-label="Ask archival question"
                disabled={isLoading}
              />
              <button
                type="button"
                className="btn-input-attach"
                title="Attach manuscript/citation reference"
                aria-label="Attach citation"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                </svg>
              </button>
              <button
                type="submit"
                className="btn-input-send"
                disabled={!inputText.trim() || isLoading}
                aria-label="Send question"
              >
                <span>{t.sendQuery}</span>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </form>
        </main>

        {/* RIGHT COLUMN: Related Documents & Verified External Authorities */}
        <aside className="ask-right-col">
          {/* Related Documents Widget */}
          <div className="ask-widget-card related-docs-widget">
            <div className="widget-header-row">
              <div className="widget-header-left">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#B8860B" strokeWidth="2" aria-hidden="true">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                <h3 className="widget-title">RELATED DOCUMENTS</h3>
              </div>
              <a href="#all" className="widget-link-all">View all →</a>
            </div>

            <div className="related-docs-list">
              {relatedDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="related-doc-item"
                  role="button"
                  tabIndex={0}
                  onClick={() => handleSelectSuggested(`Tell me about ${doc.title}`)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelectSuggested(`Tell me about ${doc.title}`);
                    }
                  }}
                >
                  <div className="related-doc-thumb">
                    <img src={doc.thumb} alt={doc.title} loading="eager" />
                  </div>
                  <div className="related-doc-details">
                    <h4 className="related-doc-name">{doc.title}</h4>
                    <div className="related-doc-meta-row">
                      <span className="related-type-tag">{doc.type}</span>
                      <span className="related-page-count">{doc.pages}</span>
                    </div>
                  </div>
                  <span className="related-chevron" aria-hidden="true">›</span>
                </div>
              ))}
            </div>
          </div>

          {/* External Sources (Reference Only) */}
          <div className="ask-widget-card external-sources-widget">
            <div className="widget-header-row">
              <div className="widget-header-left">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#B8860B" strokeWidth="2" aria-hidden="true">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
                <h3 className="widget-title">EXTERNAL SOURCES (REFERENCE ONLY)</h3>
              </div>
            </div>

            <div className="external-links-list">
              <a
                href="https://www.constitutionofindia.net/debates/"
                target="_blank"
                rel="noopener noreferrer"
                className="external-link-row"
              >
                <div className="ext-link-icon" aria-hidden="true">🏛️</div>
                <div className="ext-link-text">
                  <span className="ext-link-name">Constituent Assembly Debates (Digital)</span>
                  <span className="ext-link-sub">Parliament of India</span>
                </div>
                <span className="ext-arrow-icon">↗</span>
              </a>

              <a
                href="https://www.drambedkarwritings.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="external-link-row"
              >
                <div className="ext-link-icon" aria-hidden="true">📜</div>
                <div className="ext-link-text">
                  <span className="ext-link-name">Dr. B. R. Ambedkar Foundation</span>
                  <span className="ext-link-sub">Ministry of Social Justice & Empowerment</span>
                </div>
                <span className="ext-arrow-icon">↗</span>
              </a>

              <a
                href="https://nationalarchives.nic.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="external-link-row"
              >
                <div className="ext-link-icon" aria-hidden="true">🏛️</div>
                <div className="ext-link-text">
                  <span className="ext-link-name">National Archives of India</span>
                  <span className="ext-link-sub">Official Digital Records Repository</span>
                </div>
                <span className="ext-arrow-icon">↗</span>
              </a>
            </div>

            <div className="external-disclaimer-note">
              <span className="info-circle-i" aria-hidden="true">ℹ</span>
              <p>
                <strong>Note:</strong> External sources are provided for additional scholarly reference. Primary answers are computed based on our local authoritative archival collection.
              </p>
            </div>
          </div>
        </aside>
      </div>

      {/* Citation Inspector Modal */}
      {activeCitation && (
        <div
          className="citation-modal-overlay"
          onClick={() => setActiveCitation(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Citation Details"
        >
          <div className="citation-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="citation-modal-header">
              <h3 className="citation-modal-title font-display">{activeCitation.title}</h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setActiveCitation(null)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="citation-modal-body">
              <p className="citation-full-snippet font-display">"{activeCitation.snippet}"</p>
              <div className="citation-provenance-info">
                <span><strong>Collection:</strong> {activeCitation.collection || 'BAWS / CAD'}</span>
                <span><strong>Year:</strong> {activeCitation.year}</span>
                {activeCitation.page && <span><strong>Page/Sitting:</strong> {activeCitation.page}</span>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};