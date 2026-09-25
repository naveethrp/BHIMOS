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
          <img
            src="/images/composition/ambedkar-emblem-logo.png"
            alt="Ambedkar Digital Heritage Archive emblem"
            className="emblem-img"
          />
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
