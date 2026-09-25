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

    let replyText = 'Dr. B. R. Ambedkar was a tireless champion of social equality, constitutional democracy, and educational reform.';
    if (question.includes('Poona Pact')) {
      replyText = 'The Poona Pact was an agreement reached in September 1932 between Dr. Ambedkar and Mahatma Gandhi, ensuring reserved seats for Depressed Classes within the general electorate rather than separate electorates.';
    } else if (question.includes('education')) {
      replyText = 'Dr. Ambedkar regarded education as the greatest weapon of emancipation. He established the People’s Education Society in 1945 and founded Siddharth College in Bombay and Milind College in Aurangabad.';
    } else if (question.includes('caste')) {
      replyText = 'In "Annihilation of Caste" (1936), Dr. Ambedkar argued that caste is not a division of labour, but a division of labourers, emphasizing that democracy is not merely a form of government, but primarily a mode of associated living.';
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
      {/* Left Column: Overview & Suggested Questions */}
      <aside className="ask-sidebar">
        <div className="ask-intro-box">
          <span className="ask-eyebrow">Archival Intelligence</span>
          <h1 className="ask-main-title font-display">Ask the Archive</h1>
          <p className="ask-lead-desc">
            Get accurate answers grounded in authentic historical records, parliamentary debates, and original writings.
          </p>
        </div>

        <div className="suggested-questions-block">
          <h2 className="suggested-heading">Example Questions</h2>
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
                        src="/images/portraits/portrait-sepia-sketch.png"
                        alt="Ambedkar Archive"
                        className="asst-avatar-img"
                      />
                    </div>
                    <div className="assistant-text-content">
                      <p className="assistant-text">{msg.text}</p>
                      
                      {msg.citations && msg.citations.length > 0 && (
                        <div className="citation-pills-row">
                          {msg.citations.map((c) => (
                            <span key={c.id} className="citation-pill">
                              [{c.badgeNumber}]
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Grounded Evidence Sources Cards */}
                  {msg.citations && msg.citations.length > 0 && (
                    <div className="sources-evidence-section">
                      <span className="sources-header-label">Sources</span>
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
                                onClick={() => alert(`Opening archival source: ${src.title}`)}
                              >
                                View Source →
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
            placeholder="Ask a question about Dr. B. R. Ambedkar..."
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
