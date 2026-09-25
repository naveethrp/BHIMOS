import React, { useState } from 'react';
import { PageId, Language } from './types';
import { Header } from './components/common/Header';
import { KioskInactivityModal } from './components/common/KioskInactivityModal';
import { HomePage } from './pages/HomePage';
import { ArchivePage } from './pages/ArchivePage';
import { TimelinePage } from './pages/TimelinePage';
import { EventDetailPage } from './pages/EventDetailPage';
import { OCRPage } from './pages/OCRPage';
import { AskArchivePage } from './pages/AskArchivePage';
import { AboutPage } from './pages/AboutPage';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [language, setLanguage] = useState<Language>('en');
  const [selectedEventId, setSelectedEventId] = useState<string | undefined>('drafting-committee-constitution');

  const handleNavigate = (page: PageId, eventId?: string) => {
    if (eventId) setSelectedEventId(eventId);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleKioskTimeoutReset = () => {
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-root-wrapper">
      {/* Global Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        language={language}
        onLanguageChange={setLanguage}
      />

      {/* Dynamic Page Views */}
      {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
      {currentPage === 'archive' && <ArchivePage onNavigate={handleNavigate} />}
      {currentPage === 'timeline' && <TimelinePage onNavigate={handleNavigate} />}
      {currentPage === 'event-detail' && (
        <EventDetailPage eventId={selectedEventId} onNavigate={handleNavigate} />
      )}
      {currentPage === 'ocr' && <OCRPage />}
      {currentPage === 'ask' && <AskArchivePage />}
      {currentPage === 'about' && <AboutPage />}

      {/* Kiosk Touch Inactivity Auto-Reset Modal */}
      <KioskInactivityModal onTimeoutReturnHome={handleKioskTimeoutReset} />
    </div>
  );
};

export default App;
