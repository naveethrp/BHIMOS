import React, { useRef, useEffect } from 'react';
import { PageId, Language } from '../../types';
import { TRANSLATIONS } from '../../utils/translations';
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
  const navRef = useRef<HTMLUListElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: t.homeNav },
    { id: 'archive', label: t.archiveNav },
    { id: 'timeline', label: t.timelineNav },
    { id: 'ask', label: t.askNav },
    { id: 'ocr', label: t.ocrNav },
    { id: 'about', label: t.aboutNav }
  ];

  // Keyboard navigation for nav items
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const buttons = navRef.current?.querySelectorAll<HTMLButtonElement>('.nav-button');
      if (!buttons || buttons.length === 0) return;
      
      const activeIndex = Array.from(buttons).findIndex(btn => btn === document.activeElement);
      if (activeIndex === -1) return;

      let newIndex = activeIndex;
      if (e.key === 'ArrowRight') {
        newIndex = (activeIndex + 1) % buttons.length;
        e.preventDefault();
      } else if (e.key === 'ArrowLeft') {
        newIndex = (activeIndex - 1 + buttons.length) % buttons.length;
        e.preventDefault();
      } else if (e.key === 'Home') {
        newIndex = 0;
        e.preventDefault();
      } else if (e.key === 'End') {
        newIndex = buttons.length - 1;
        e.preventDefault();
      }

      if (newIndex !== activeIndex) {
        buttons[newIndex].focus();
      }
    };

    navRef.current?.addEventListener('keydown', handleKeyDown);
    return () => navRef.current?.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (currentPage === 'kiosk') return null;

  return (
    <header className="global-header" role="banner">
      {/* Brand & Emblem */}
      <div 
        ref={brandRef}
        className="brand-container" 
        onClick={() => onNavigate('home')} 
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onNavigate('home'); }}}
        role="button" 
        tabIndex={0}
        aria-label={language === 'hi' ? 'BHIMOS मुख्य पृष्ठ पर जाएं' : 'Go to BHIMOS Home'}
      >
        <div className="brand-emblem" aria-hidden="true">
          <img
            src="/assets/logo.png"
            alt=""
            className="emblem-img"
            loading="lazy"
          />
        </div>
        <div className="brand-text">
          <h1 className="brand-title">{t.archiveTitle}</h1>
          <span className="brand-subtitle">{t.archiveSubtitle}</span>
        </div>
      </div>

      {/* Primary Global Navigation */}
      <nav className="global-nav" aria-label={t.archiveTitle}>
        <ul ref={navRef} className="nav-list" role="menubar">
          {navItems.map((item) => {
            const isActive = currentPage === item.id || (item.id === 'timeline' && currentPage === 'event-detail');
            return (
              <li key={item.id} className="nav-item" role="none">
                <button
                  type="button"
                  role="menuitem"
                  className={`nav-button ${isActive ? 'nav-button-active' : ''}`}
                  onClick={() => onNavigate(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  aria-selected={isActive}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Language Switcher */}
      <div className="header-actions">
        <div className="language-selector" role="group" aria-label={language === 'hi' ? 'भाषा चुनें' : 'Select Language'}>
          <button
            type="button"
            className={`lang-btn ${language === 'en' ? 'lang-btn-active' : ''}`}
            onClick={() => onLanguageChange('en')}
            aria-pressed={language === 'en'}
            aria-label="English"
          >
            EN
          </button>
          <span className="lang-divider" aria-hidden="true">|</span>
          <button
            type="button"
            className={`lang-btn ${language === 'hi' ? 'lang-btn-active' : ''}`}
            onClick={() => onLanguageChange('hi')}
            aria-pressed={language === 'hi'}
            aria-label="हिंदी"
          >
            हिंदी
          </button>
        </div>
      </div>
    </header>
  );
};