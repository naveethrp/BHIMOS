import React from 'react';
import { PageId, Language } from '../../types';
import './Header.css';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  language,
  onLanguageChange
}) => {
  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'archive', label: 'Archive' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'ask', label: 'Ask' },
    { id: 'ocr', label: 'OCR Digitize' },
    { id: 'about', label: 'About' }
  ];

  return (
    <header className="global-header">
      {/* Brand & Emblem */}
      <div 
        className="brand-container" 
        onClick={() => onNavigate('home')} 
        role="button" 
        tabIndex={0}
        aria-label="Ambedkar Digital Heritage Archive Home"
      >
        <div className="brand-emblem">
          <svg viewBox="0 0 40 40" className="emblem-svg" fill="none" stroke="currentColor">
            {/* Architectural dome & Ashoka Chakra motif inspired by Reference B */}
            <circle cx="20" cy="20" r="18" stroke="#A87820" strokeWidth="1.5" />
            <path d="M10 28 L10 20 Q20 10 30 20 L30 28 Z" stroke="#F5EBDD" strokeWidth="1.5" />
            <circle cx="20" cy="18" r="4" stroke="#A87820" strokeWidth="1.2" />
            <line x1="8" y1="28" x2="32" y2="28" stroke="#A87820" strokeWidth="1.5" />
            <line x1="14" y1="28" x2="14" y2="22" stroke="#F5EBDD" strokeWidth="1" />
            <line x1="20" y1="28" x2="20" y2="22" stroke="#F5EBDD" strokeWidth="1" />
            <line x1="26" y1="28" x2="26" y2="22" stroke="#F5EBDD" strokeWidth="1" />
          </svg>
        </div>
        <div className="brand-text">
          <h1 className="brand-title">AMBEDKAR</h1>
          <span className="brand-subtitle">DIGITAL HERITAGE ARCHIVE</span>
        </div>
      </div>

      {/* Primary Global Navigation */}
      <nav className="global-nav" aria-label="Main Navigation">
        <ul className="nav-list">
          {navItems.map((item) => {
            const isActive = currentPage === item.id || (item.id === 'timeline' && currentPage === 'event-detail');
            return (
              <li key={item.id} className="nav-item">
                <button
                  type="button"
                  className={`nav-button ${isActive ? 'nav-button-active' : ''}`}
                  onClick={() => onNavigate(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Language Switcher & Kiosk Indicator */}
      <div className="header-actions">
        <div className="language-selector" role="group" aria-label="Select Language">
          <button
            type="button"
            className={`lang-btn ${language === 'en' ? 'lang-btn-active' : ''}`}
            onClick={() => onLanguageChange('en')}
            aria-pressed={language === 'en'}
          >
            EN
          </button>
          <span className="lang-divider">|</span>
          <button
            type="button"
            className={`lang-btn ${language === 'hi' ? 'lang-btn-active' : ''}`}
            onClick={() => onLanguageChange('hi')}
            aria-pressed={language === 'hi'}
          >
            हिंदी
          </button>
        </div>
      </div>
    </header>
  );
};
