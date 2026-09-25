import React, { useState } from 'react';
import { SUGGESTED_QUESTIONS, INITIAL_CONVERSATION, INITIAL_CITATIONS } from '../data/askArchiveData';
import { AskMessage } from '../types';
import './AskArchivePage.css';

export const AskArchivePage: React.FC = () => {
  const [messages, setMessages] = useState<AskMessage[]>(INITIAL_CONVERSATION);
  const [inputText, setInputText] = useState('');

  const handleSelectSuggested = (question: string) => {
    const userMsg: AskMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: question
    };

    let replyText = 'Dr. B. R. Ambedkar served as Chairman of the Drafting Committee, rigorously shaping the fundamental rights, abolition of untouchability, and social democracy framework for the Constitution of India.';
    if (question.includes('Poona Pact')) {
      replyText = 'The Poona Pact was signed on 24 September 1932 between Dr. Ambedkar and Mahatma Gandhi, securing 148 reserved seats for the Depressed Classes in provincial legislatures, effectively doubling their political representation under joint electorates.';
    } else if (question.includes('education')) {
      replyText = 'Dr. Ambedkar held that education is the fundamental catalyst for human dignity. His motto "Educate, Agitate, Organize" underscored the institutional founding of the People’s Education Society (1945), Siddharth College in Bombay, and Milind College in Aurangabad.';
    } else if (question.includes('caste')) {
      replyText = 'In "Annihilation of Caste" (1936), Dr. Ambedkar provided an incisive socio-philosophical critique, proving that caste is not a division of labour, but an unnatural division of labourers backed by religious sanction.';
    } else if (question.includes('publications')) {
      replyText = 'Major published works include "Castes in India" (1916), "The Problem of the Rupee" (1923), "Annihilation of Caste" (1936), "Who Were the Shudras?" (1946), "States and Minorities" (1947), and "The Buddha and His Dhamma" (1957).';
    }

    const asstMsg: AskMessage = {
      id: `asst-${Date.now() + 1}`,
      sender: 'assistant',
      text: replyText,
      citations: INITIAL_CITATIONS
    };

    setMessages([...messages, userMsg, asstMsg]);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    handleSelectSuggested(inputText);
    setInputText('');
  };

  return (
    <div className="ask-page-container">
      {/* Left Column: Research Desk Overview & Suggested Inquiries */}
      <aside className="ask-sidebar">
        <div className="ask-intro-box">
          <div className="ask-desk-header">
            <span className="ask-eyebrow">SCHOLARLY RESEARCH DESK</span>
            <div className="ask-books-icon">
              <img
                src="/images/composition/law-books-stack.png"
                alt="Law and Constitutional Books"
                className="ask-books-img"
              />
            </div>
          </div>
          <h1 className="ask-main-title font-display">Ask the Archive</h1>
          <p className="ask-lead-desc">
            Directly query authentic parliamentary records, legal drafts, and published volumes with verbatim evidence citations.
          </p>
        </div>

        <div className="suggested-questions-block">
          <h2 className="suggested-heading">Recommended Inquiries</h2>
          <ul className="suggested-list">
            {SUGGESTED_QUESTIONS.map((q) => (
              <li key={q}>
                <button
                  type="button"
                  className="suggested-q-btn"
                  onClick={() => handleSelectSuggested(q)}
                >
                  <span>{q}</span>
                  <span className="suggested-arrow">›</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Archival Provenance Desk Note */}
        <div className="ask-provenance-note">
          <span className="provenance-title">Strict Archival Grounding</span>
          <p className="provenance-desc">
            Every response is mapped directly to verified primary documents from the Constituent Assembly of India and Government published works.
          </p>
        </div>
      </aside>

      {/* Right Column: Grounded Conversation & Source Cards (Reference A Screen 6) */}
      <main className="ask-chat-workspace">
        <div className="chat-messages-scroll-area">
          {messages.map((msg) => (
            <div key={msg.id} className={`chat-message-row message-${msg.sender}`}>
              {msg.sender === 'user' ? (
                <div className="user-bubble">
                  <p>{msg.text}</p>
                </div>
              ) : (
                <div className="assistant-bubble-container">
                  <div className="assistant-header-row">
                    <div className="assistant-avatar-circle">
                      <img
                        src="/images/composition/ambedkar-cutout-bust.png"
                        alt="Ambedkar Archive"
                        className="asst-avatar-img"
                      />
                    </div>
                    <div className="assistant-text-content">
                      <div className="asst-title-tag">Dr. Ambedkar Digital Heritage Assistant</div>
                      <p className="assistant-text">{msg.text}</p>
                      
                      {msg.citations && msg.citations.length > 0 && (
                        <div className="citation-pills-row">
                          {msg.citations.map((c) => (
                            <span key={c.id} className="citation-pill">
                              [{c.badgeNumber}] {c.title}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Grounded Evidence Sources Cards (Reference A Screen 6) */}
                  {msg.citations && msg.citations.length > 0 && (
                    <div className="sources-evidence-section">
                      <div className="sources-title-row">
                        <span className="sources-header-label">Archival Sources</span>
                        <span className="sources-verified-badge">✓ Primary Documents</span>
                      </div>
                      <div className="sources-cards-grid">
                        {msg.citations.map((src) => (
                          <div key={src.id} className="source-citation-card">
                            <div className="source-card-badge-col">
                              <span className="source-num-box">{src.badgeNumber}</span>
                            </div>
                            <div className="source-card-content">
                              <h3 className="source-card-title">{src.title}</h3>
                              <p className="source-card-date">{src.date}</p>
                              <span className="source-card-location">{src.location}</span>
                              <button
                                type="button"
                                className="btn-open-source"
                                onClick={() => alert(`Opening archival citation: ${src.title}`)}
                              >
                                View Source Record →
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form className="ask-input-form" onSubmit={handleSend}>
          <input
            type="text"
            className="ask-input-field"
            placeholder="Ask a question about Dr. B. R. Ambedkar's speeches, writings, or debates..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            aria-label="Ask a question about Dr. B. R. Ambedkar"
          />
          <button type="submit" className="btn-send-query" aria-label="Send question">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>
      </main>
    </div>
  );
};
