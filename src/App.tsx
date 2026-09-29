import React, { useState, useEffect, lazy, Suspense } from 'react';
import { PageId, Language } from './types';
import { Header } from './components/common/Header';
import { KioskInactivityModal } from './components/common/KioskInactivityModal';
import { HomePage } from './pages/HomePage';
import { AudioProvider } from './context/AudioContext';

// Lazy-loaded route components for production code-splitting
const ArchivePage = lazy(() => import('./pages/ArchivePage').then(m => ({ default: m.ArchivePage })));
const TimelinePage = lazy(() => import('./pages/TimelinePage').then(m => ({ default: m.TimelinePage })));
const EventDetailPage = lazy(() => import('./pages/EventDetailPage').then(m => ({ default: m.EventDetailPage })));
const OCRPage = lazy(() => import('./pages/OCRPage').then(m => ({ default: m.OCRPage })));
const AskArchivePage = lazy(() => import('./pages/AskArchivePage').then(m => ({ default: m.AskArchivePage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));

const parsePathToPage = (pathname: string): PageId => {
  const clean = pathname.replace(/^\//, '').toLowerCase().split('/')[0];
  if (clean === 'archive') return 'archive';
  if (clean === 'timeline') return 'timeline';
  if (clean === 'event-detail') return 'event-detail';
  if (clean === 'ocr' || clean === 'rc') return 'ocr';
  if (clean === 'ask') return 'ask';
  if (clean === 'about') return 'about';
  return 'home';
};

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageId>(() => parsePathToPage(window.location.pathname));
  const [selectedEventId, setSelectedEventId] = useState<string>('drafting-committee-constitution');
  const [archiveCategory, setArchiveCategory] = useState<any>('all');
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('bhimos_language');
      return (saved === 'hi' || saved === 'en') ? saved : 'en';
    } catch {
      return 'en';
    }
  });

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    try {
      localStorage.setItem('bhimos_language', lang);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(parsePathToPage(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (page: PageId, eventId?: string, initialCategory?: string) => {
    if (eventId) setSelectedEventId(eventId);
    if (initialCategory) setArchiveCategory(initialCategory);
    const resolvedPage = page === 'rc' ? 'ocr' : page;
    setCurrentPage(resolvedPage);

    // Sync browser URL
    const targetUrl = resolvedPage === 'home' ? '/' : `/${resolvedPage}`;
    if (window.location.pathname !== targetUrl) {
      window.history.pushState(null, '', targetUrl);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleKioskTimeoutReset = () => {
    handleNavigate('home');
  };

  return (
    <AudioProvider>
      <div className="app-root-wrapper">
        {/* Global Header */}
        <Header
          currentPage={currentPage}
          onNavigate={handleNavigate}
          language={language}
          onLanguageChange={handleLanguageChange}
        />

        {/* Dynamic Page Views */}
        {/* Dynamic Page Views with Suspense */}
        <main className="main-content-area" role="main">
          <Suspense fallback={
            <div className="route-suspense-loading" aria-live="polite" style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '60vh',
              gap: '16px',
              color: 'var(--color-gold, #C9A227)'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                border: '3px solid rgba(201, 162, 39, 0.2)',
                borderTopColor: '#C9A227',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite'
              }} />
              <span style={{ fontSize: '0.95rem', letterSpacing: '0.05em', color: '#E6D5B8' }}>
                {language === 'hi' ? 'अभिलेखागार लोड हो रहा है...' : 'Accessing Digital Archive...'}
              </span>
            </div>
          }>
            {currentPage === 'home' && <HomePage onNavigate={handleNavigate} language={language} />}
            {currentPage === 'archive' && <ArchivePage onNavigate={handleNavigate} language={language} initialCategory={archiveCategory} />}
            {currentPage === 'timeline' && <TimelinePage onNavigate={handleNavigate} language={language} />}
            {currentPage === 'event-detail' && (
              <EventDetailPage eventId={selectedEventId} onNavigate={handleNavigate} language={language} />
            )}
            {(currentPage === 'ocr' || currentPage === 'rc') && <OCRPage language={language} />}
            {currentPage === 'ask' && <AskArchivePage language={language} />}
            {currentPage === 'about' && <AboutPage language={language} />}
          </Suspense>
        </main>

        {/* Kiosk Touch Inactivity Auto-Reset Modal */}
        <KioskInactivityModal onTimeoutReturnHome={handleKioskTimeoutReset} />
      </div>
    </AudioProvider>
  );
};

export default App;
