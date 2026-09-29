import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { ARCHIVE_CATEGORIES, ARCHIVE_ITEMS } from '../data/archiveData';
import { ArchiveCategory, ArchiveItem, PageId, Language } from '../types';
import { useAudio } from '../context/AudioContext';
import { ArchivalAudioPlayer } from '../components/common/ArchivalAudioPlayer';
import { TRANSLATIONS } from '../utils/translations';
import { resolveRecordThumbnail } from '../utils/imageResolver';
import { getArchiveStatsApi, ArchiveStatsResponse } from '../services/api';
import './ArchivePage.css';

interface ArchivePageProps {
  onNavigate?: (page: PageId, eventId?: string) => void;
  language?: Language;
  initialCategory?: ArchiveCategory | 'all';
}

export const ArchivePage: React.FC<ArchivePageProps> = ({ onNavigate: _onNavigate, language = 'en', initialCategory = 'all' }) => {
  const isHi = language === 'hi';
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const [selectedCategory, setSelectedCategory] = useState<ArchiveCategory | 'all'>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [archiveStats, setArchiveStats] = useState<ArchiveStatsResponse | null>(null);

  useEffect(() => {
    getArchiveStatsApi().then(setArchiveStats).catch(() => {});
  }, []);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);
  const [activeItem, setActiveItem] = useState<ArchiveItem | null>(null);
  const [selectedYearPeriod, setSelectedYearPeriod] = useState<string>('all');
  const [selectedSource, setSelectedSource] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'year-desc' | 'year-asc' | 'title'>('year-desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [copiedCitation, setCopiedCitation] = useState(false);

  const ITEMS_PER_PAGE = 12;

  const { activeTrack, playTrack, stopTrack } = useAudio();

  useEffect(() => {
    return () => {
      stopTrack();
    };
  }, [stopTrack]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeItem) {
        setActiveItem(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeItem]);

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const items = ARCHIVE_ITEMS.filter((item) => {
      const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;

      const matchesYear =
        selectedYearPeriod === 'all' ||
        (selectedYearPeriod === '1910s' && item.year >= 1910 && item.year <= 1919) ||
        (selectedYearPeriod === '1920s' && item.year >= 1920 && item.year <= 1929) ||
        (selectedYearPeriod === '1930s' && item.year >= 1930 && item.year <= 1939) ||
        (selectedYearPeriod === '1940s' && item.year >= 1940 && item.year <= 1949) ||
        (selectedYearPeriod === '1950s' && item.year >= 1950 && item.year <= 1959);

      const matchesSource =
        selectedSource === 'all' ||
        (item.institution && item.institution.toLowerCase().includes(selectedSource.toLowerCase())) ||
        (item.sourceReference && item.sourceReference.toLowerCase().includes(selectedSource.toLowerCase()));

      const matchesType =
        selectedType === 'all' ||
        item.category === selectedType ||
        (item.tags && item.tags.some(tg => tg.toLowerCase() === selectedType.toLowerCase()));

      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        (item.sourceReference && item.sourceReference.toLowerCase().includes(q)) ||
        (item.institution && item.institution.toLowerCase().includes(q)) ||
        (item.formatDetails && item.formatDetails.toLowerCase().includes(q)) ||
        (item.tags && item.tags.some(tg => tg.toLowerCase().includes(q))) ||
        (item.transcript && item.transcript.toLowerCase().includes(q)) ||
        (item.shelfMark && item.shelfMark.toLowerCase().includes(q));

      return matchesCat && matchesYear && matchesSource && matchesType && matchesQuery;
    });

    return items.sort((a, b) => {
      if (sortBy === 'year-desc') return b.year - a.year;
      if (sortBy === 'year-asc') return a.year - b.year;
      return a.title.localeCompare(b.title);
    });
  }, [selectedCategory, selectedYearPeriod, selectedSource, selectedType, searchQuery, sortBy]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE) || 1;
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredItems, currentPage]);

  const handleCategorySelect = useCallback((catId: ArchiveCategory | 'all') => {
    setSelectedCategory(catId);
    setCurrentPage(1);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleCopyCitation = (item: ArchiveItem) => {
    const citation = `${item.title} (${item.year}). Shelf Mark: ${item.shelfMark || item.id}. Repository: ${item.institution || 'National Archives'}. BHIMOS Digital Heritage Register.`;
    navigator.clipboard.writeText(citation).then(() => {
      setCopiedCitation(true);
      setTimeout(() => setCopiedCitation(false), 2500);
    });
  };

  const getCategoryBadgeClass = (cat: string) => {
    switch (cat) {
      case 'debates': return 'badge-debate';
      case 'publications': return 'badge-publication';
      case 'letters': return 'badge-letter';
      case 'audio': return 'badge-audio';
      case 'photos': return 'badge-photo';
      case 'legal': return 'badge-legal';
      case 'press': return 'badge-press';
      default: return 'badge-general';
    }
  };

  return (
    <div className="archive-master-page">
      {/* 1. HERO BANNER — Matches archive_reference */}
      <section className="archive-hero-stage" aria-label="Archive Overview">
        {/* Layer 1: Atmospheric Environmental Background */}
        <div className="archive-atmosphere-layer" aria-hidden="true">
          <img src="/assets/clouds.jpeg" alt="" className="archive-sky-clouds" loading="eager" />
          <img src="/assets/bg10.png" alt="" className="archive-canvas-bg" loading="eager" />
          <img src="/assets/trees.jpeg" alt="" className="archive-env-trees" loading="lazy" />
          <img src="/assets/gate.png" alt="" className="archive-env-gate" loading="lazy" />
          <div className="archive-gradient-overlay" />
        </div>

        {/* Right Composition: Ambedkar Portrait + Preamble Inscription */}
        <div className="archive-hero-cutout-wrap" aria-hidden="true">
          <img
            src="/assets/writing.png"
            alt="Dr. B. R. Ambedkar"
            className="archive-hero-portrait-img"
            loading="eager"
          />
          <div className="archive-stone-preamble-tablet">
            <span className="tablet-sub">CONSTITUTIONAL VALUES</span>
            <div className="tablet-words">
              <span>JUSTICE</span>
              <span>LIBERTY</span>
              <span>EQUALITY</span>
              <span>FRATERNITY</span>
            </div>
            <span className="tablet-signature">B. R. Ambedkar</span>
          </div>
        </div>

        {/* Left Editorial Content: Header, Search & Filter Ribbon */}
        <div className="archive-hero-content">
          <div className="archive-hero-titles">
            <span className="archive-hero-eyebrow">{t.archiveHeroEyebrow}</span>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '4px 12px',
              background: 'rgba(201, 162, 39, 0.12)',
              border: '1px solid rgba(201, 162, 39, 0.3)',
              borderRadius: '20px',
              fontSize: '0.78rem',
              color: '#8A6818',
              fontWeight: 600,
              letterSpacing: '0.04em',
              marginBottom: '8px',
              width: 'fit-content'
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#C9A227' }} />
              <span>
                {archiveStats 
                  ? `${archiveStats.total_documents} Verified Manuscripts • ${archiveStats.total_indexed_chunks.toLocaleString()} Text Chunks Indexed` 
                  : '187 Verified Manuscripts • 70,189 Text Chunks Indexed'}
              </span>
            </div>
            <h1 className="archive-hero-heading font-display">{t.archivePageTitle}</h1>
            <p className="archive-hero-description">
              {t.archivePageDesc}
            </p>
          </div>

          {/* Search Bar with Gold Action Button */}
          <form className="archive-search-form" onSubmit={handleSearchSubmit}>
            <div className="search-input-box">
              <svg className="search-icon-svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                className="search-main-input"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search archival records"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
            <button type="submit" className="search-submit-btn">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span>{t.archiveSearchBtn}</span>
            </button>
          </form>

          {/* Secondary Filter Bar below Search */}
          <div className="archive-filter-row">
            <div className="filter-group-left">
              <span className="filter-by-label">{t.archiveFilterBy}</span>

              {/* Collections Dropdown */}
              <select
                className="filter-select"
                value={selectedCategory}
                onChange={(e) => handleCategorySelect(e.target.value as any)}
                aria-label="Filter by collection"
              >
                <option value="all">{t.allCollections}</option>
                <option value="debates">{t.debatesCat}</option>
                <option value="publications">{t.publicationsCat}</option>
                <option value="audio">{t.audioCat}</option>
                <option value="letters">{t.lettersCat}</option>
                <option value="photos">{t.photosCat}</option>
                <option value="legal">{t.legalCat}</option>
                <option value="press">{t.pressCat}</option>
              </select>

              {/* Years Dropdown */}
              <select
                className="filter-select"
                value={selectedYearPeriod}
                onChange={(e) => { setSelectedYearPeriod(e.target.value); setCurrentPage(1); }}
                aria-label="Filter by years"
              >
                <option value="all">{t.archiveAllYears}</option>
                <option value="1910s">1910–1919</option>
                <option value="1920s">1920–1929</option>
                <option value="1930s">1930–1939</option>
                <option value="1940s">1940–1949</option>
                <option value="1950s">1950–1959</option>
              </select>

              {/* Sources Dropdown */}
              <select
                className="filter-select"
                value={selectedSource}
                onChange={(e) => { setSelectedSource(e.target.value); setCurrentPage(1); }}
                aria-label="Filter by source"
              >
                <option value="all">{t.archiveAllSources}</option>
                <option value="Constituent Assembly">Constituent Assembly of India</option>
                <option value="Ambedkar Foundation">Dr. Ambedkar Foundation</option>
                <option value="National Archives">National Archives of India</option>
                <option value="BBC World Service">BBC World Service</option>
                <option value="Maharashtra State Archives">Maharashtra State Archives</option>
              </select>

              {/* Types Dropdown */}
              <select
                className="filter-select"
                value={selectedType}
                onChange={(e) => { setSelectedType(e.target.value); setCurrentPage(1); }}
                aria-label="Filter by record type"
              >
                <option value="all">{t.archiveAllTypes}</option>
                <option value="debates">Debates</option>
                <option value="publications">Treatises</option>
                <option value="letters">Correspondence</option>
                <option value="audio">Audio Discs</option>
                <option value="photos">Photographs</option>
                <option value="legal">Legal Folios</option>
                <option value="press">Press Editorials</option>
              </select>
            </div>

            <div className="filter-group-right">
              <span className="results-count-badge">
                <strong>{filteredItems.length}</strong> {isHi ? 'अभिलेख' : 'records'}
              </span>

              <div className="sort-by-wrap">
                <span className="sort-by-label">{t.sortBy}</span>
                <select
                  className="filter-select sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  aria-label="Sort records"
                >
                  <option value="year-desc">{t.sortYearDesc}</option>
                  <option value="year-asc">{t.sortYearAsc}</option>
                  <option value="title">{t.sortTitle}</option>
                </select>
              </div>

              {/* View Mode Toggle: Grid vs List */}
              <div className="view-toggle-btns" role="radiogroup" aria-label="View layout">
                <button
                  type="button"
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                  title="Grid view"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                  </svg>
                </button>
                <button
                  type="button"
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                  aria-label="List view"
                  title="List view"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <line x1="8" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <line x1="8" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <line x1="8" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="4" cy="6" r="1.5" />
                    <circle cx="4" cy="12" r="1.5" />
                    <circle cx="4" cy="18" r="1.5" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SEVEN HORIZONTAL CATEGORY CARDS — Matches archive_reference */}
      <section className="archive-categories-stage" aria-label="Archive Categories">
        <div className="archive-cat-cards-grid">
          {ARCHIVE_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <div
                key={cat.id}
                className={`archive-cat-card ${isSelected ? 'cat-card-selected' : ''}`}
                onClick={() => handleCategorySelect(isSelected ? 'all' : cat.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCategorySelect(isSelected ? 'all' : cat.id);
                  }
                }}
              >
                <div className="cat-card-thumb-wrap">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="cat-card-thumb-img"
                    style={{ objectPosition: cat.objectPosition || 'center center' }}
                    loading="eager"
                  />
                  <div className="cat-card-icon-emblem" aria-hidden="true">
                    {cat.id === 'debates' && (
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 21h18M3 10h18M5 10v11M19 10v11M9 10v11M14 10v11M4 10l8-7 8 7" />
                      </svg>
                    )}
                    {cat.id === 'publications' && (
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                      </svg>
                    )}
                    {cat.id === 'audio' && (
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                        <line x1="12" y1="19" x2="12" y2="23" />
                        <line x1="8" y1="23" x2="16" y2="23" />
                      </svg>
                    )}
                    {cat.id === 'letters' && (
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    )}
                    {cat.id === 'videos' && (
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="2" width="20" height="20" rx="2" />
                        <line x1="7" y1="2" x2="7" y2="22" />
                        <line x1="17" y1="2" x2="17" y2="22" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                      </svg>
                    )}
                    {cat.id === 'photos' && (
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                        <circle cx="12" cy="13" r="4" />
                      </svg>
                    )}
                    {cat.id === 'legal' && (
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                      </svg>
                    )}
                    {cat.id === 'press' && (
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                        <path d="M18 14h-8" />
                        <path d="M15 18h-5" />
                        <path d="M10 6h8v4h-8V6Z" />
                      </svg>
                    )}
                  </div>
                </div>

                <div className="cat-card-body">
                  <h3 className="cat-card-title font-display">{cat.title}</h3>
                  <div className="cat-card-footer">
                    <span className="cat-card-count-label">
                      {cat.id === 'debates' && `${cat.count} Sittings`}
                      {cat.id === 'publications' && `${cat.count} Volumes`}
                      {cat.id === 'audio' && `${cat.count} Broadcasts`}
                      {cat.id === 'letters' && `${cat.count} Manuscripts`}
                      {cat.id === 'videos' && `${cat.count} Newsreels`}
                      {cat.id === 'photos' && `${cat.count} Items`}
                      {cat.id === 'legal' && `${cat.count} Records`}
                      {cat.id === 'press' && `${cat.count} Items`}
                    </span>
                    <span className="cat-card-arrow" aria-hidden="true">→</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. ARCHIVAL COLLECTION RECORDS SECTION — Matches archive_reference */}
      <section className="archive-collection-section" aria-label="Archival Records Grid">
        <div className="archive-collection-header">
          <div className="collection-header-titles">
            <span className="collection-eyebrow">ARCHIVAL COLLECTION</span>
            <h2 className="collection-main-title font-display">
              {selectedCategory === 'all'
                ? (isHi ? 'समस्त अभिलेख' : 'All Records')
                : (ARCHIVE_CATEGORIES.find(c => c.id === selectedCategory)?.title || 'Records')}
            </h2>
            <p className="collection-lead-desc">
              {isHi
                ? `विविध अभिलेखागारों से ${filteredItems.length} प्राथमिक ऐतिहासिक प्रलेख प्रदर्शित`
                : `Showing ${filteredItems.length} archival records from various collections`}
            </p>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="pagination-bar" role="navigation" aria-label="Pagination">
              <button
                type="button"
                className="page-btn page-nav-arrow"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                ‹
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    type="button"
                    className={`page-btn ${currentPage === pageNum ? 'active' : ''}`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}
              {totalPages > 5 && (
                <>
                  <span className="page-ellipsis">…</span>
                  <button
                    type="button"
                    className={`page-btn ${currentPage === totalPages ? 'active' : ''}`}
                    onClick={() => setCurrentPage(totalPages)}
                  >
                    {totalPages}
                  </button>
                </>
              )}
              <button
                type="button"
                className="page-btn page-nav-arrow"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                ›
              </button>
            </div>
          )}
        </div>

        {/* Records Display: Grid vs List */}
        {viewMode === 'grid' ? (
          <div className="archive-cards-grid">
            {paginatedItems.map((item) => (
              <article
                key={item.id}
                className="archive-record-card"
                onClick={() => setActiveItem(item)}
                role="button"
                tabIndex={0}
                aria-label={item.title}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveItem(item);
                  }
                }}
              >
                <div className="record-card-thumb-box">
                  <img
                    src={resolveRecordThumbnail(item)}
                    alt=""
                    className="record-thumb-img"
                    loading="eager"
                  />
                </div>

                <div className="record-card-content">
                  <div className="record-card-tags-row">
                    <span className={`record-category-badge ${getCategoryBadgeClass(item.category)}`}>
                      {item.category.toUpperCase()}
                    </span>
                    <span className="record-year-badge">{item.year}</span>
                  </div>

                  <h3 className="record-card-title font-display">
                    {item.title}
                  </h3>

                  <p className="record-card-desc">
                    {item.description}
                  </p>

                  <div className="record-institution-row">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M3 21h18M3 10h18M5 10v11M19 10v11M9 10v11M14 10v11M4 10l8-7 8 7" />
                    </svg>
                    <span className="record-institution-name">
                      {item.institution || 'National Archives of India'}
                    </span>
                  </div>

                  <div className="record-card-footer">
                    <div className="record-format-meta">
                      {item.category === 'audio' ? (
                        <>
                          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                          <span>{item.formatDetails || 'Archival Audio'}</span>
                        </>
                      ) : (
                        <>
                          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="4" y="2" width="16" height="20" rx="2" />
                            <line x1="8" y1="6" x2="16" y2="6" />
                            <line x1="8" y1="10" x2="16" y2="10" />
                          </svg>
                          <span>{item.formatDetails || 'Archival Record'}</span>
                        </>
                      )}
                    </div>

                    <button
                      type="button"
                      className={`record-action-pill-btn ${item.category === 'audio' ? 'btn-audio-action' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (item.category === 'audio' && item.mediaUrl) {
                          playTrack(item);
                        }
                        setActiveItem(item);
                      }}
                    >
                      {item.category === 'audio' ? (
                        item.mediaUrl ? (
                          <>
                            <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" aria-hidden="true">
                              <polygon points="5 3 19 12 5 21 5 3" />
                            </svg>
                            <span>Listen →</span>
                          </>
                        ) : (
                          <span>Transcript →</span>
                        )
                      ) : (
                        <span>View →</span>
                      )}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="archive-records-list-view">
            {paginatedItems.map((item) => (
              <article
                key={item.id}
                className="archive-record-list-row"
                onClick={() => setActiveItem(item)}
                role="button"
                tabIndex={0}
              >
                <div className="list-row-thumb">
                  <img src={resolveRecordThumbnail(item)} alt="" loading="lazy" />
                </div>
                <div className="list-row-main">
                  <div className="record-card-tags-row">
                    <span className={`record-category-badge ${getCategoryBadgeClass(item.category)}`}>
                      {item.category.toUpperCase()}
                    </span>
                    <span className="record-year-badge">{item.year}</span>
                    <span className="list-row-shelfmark">{item.shelfMark || item.id}</span>
                  </div>
                  <h3 className="list-row-title font-display">{item.title}</h3>
                  <p className="list-row-desc">{item.description}</p>
                </div>
                <div className="list-row-actions">
                  <span className="list-row-institution">{item.institution}</span>
                  <button
                    type="button"
                    className="record-action-pill-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (item.category === 'audio' && item.mediaUrl) {
                        playTrack(item);
                      }
                      setActiveItem(item);
                    }}
                  >
                    <span>{item.category === 'audio' ? (item.mediaUrl ? 'Listen →' : 'Transcript →') : 'View →'}</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {filteredItems.length === 0 && (
          <div className="archive-empty-state">
            <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#B8860B" strokeWidth="1.5" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <h3 className="empty-title font-display">{isHi ? 'कोई अभिलेख नहीं मिला' : 'No Archival Records Found'}</h3>
            <p className="empty-desc">
              {isHi
                ? 'कृपया खोज शब्द बदलें अथवा फ़िल्टर रीसेट करें।'
                : 'Try adjusting your search terms or resetting the collection and year filters.'}
            </p>
            <button
              type="button"
              className="btn-reset-filters"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedYearPeriod('all');
                setSelectedSource('all');
                setSelectedType('all');
              }}
            >
              {isHi ? 'सभी फ़िल्टर रीसेट करें' : 'Reset All Filters'}
            </button>
          </div>
        )}
      </section>

      {/* 4. RECORD DOSSIER MODAL WITH PROVENANCE & AUDIO PLAYER — Matches reference */}
      {activeItem && (
        <div
          className="dossier-modal-overlay"
          onClick={() => setActiveItem(null)}
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
        >
          <div className="dossier-modal-window" onClick={(e) => e.stopPropagation()}>
            <div className="dossier-modal-header">
              <div className="dossier-modal-title-box">
                <span className="dossier-shelfmark">{activeItem.shelfMark || activeItem.id}</span>
                <h2 className="dossier-modal-heading font-display">{activeItem.title}</h2>
              </div>
              <button
                type="button"
                className="dossier-close-btn"
                onClick={() => setActiveItem(null)}
                aria-label="Close dossier"
              >
                ✕
              </button>
            </div>

            <div className="dossier-modal-body">
              <div className="dossier-meta-grid">
                <div className="dossier-meta-item">
                  <span className="meta-label">{isHi ? 'श्रेणी' : 'CATEGORY'}</span>
                  <span className="meta-val">{activeItem.category.toUpperCase()}</span>
                </div>
                <div className="dossier-meta-item">
                  <span className="meta-label">{isHi ? 'ऐतिहासिक वर्ष' : 'HISTORICAL YEAR'}</span>
                  <span className="meta-val">{activeItem.year} ({activeItem.dateStr || 'Archival'})</span>
                </div>
                <div className="dossier-meta-item">
                  <span className="meta-label">{isHi ? 'अभिलेखागार' : 'REPOSITORY'}</span>
                  <span className="meta-val">{activeItem.institution || 'National Archives of India'}</span>
                </div>
                <div className="dossier-meta-item">
                  <span className="meta-label">{isHi ? 'प्रमाणिकता' : 'AUTHENTICITY'}</span>
                  <span className="meta-val meta-verified">{t.verifiedPrimaryRecord}</span>
                </div>
              </div>

              {/* Archival Audio Player when category is audio */}
              {activeItem.category === 'audio' && (
                <ArchivalAudioPlayer track={activeItem} />
              )}

              {activeItem.transcript && (
                <div className="dossier-transcript-box">
                  <span className="transcript-box-label">{t.archiveModalTranscript}</span>
                  <blockquote className="dossier-quote font-display">
                    "{activeItem.transcript}"
                  </blockquote>
                </div>
              )}

              <div className="dossier-desc-block">
                <span className="desc-block-label">{t.archiveModalProvenance}</span>
                <p>{activeItem.description}</p>
                {activeItem.sourceReference && (
                  <p className="dossier-source-ref">
                    <strong>Source Citation:</strong> {activeItem.sourceReference}
                  </p>
                )}
                {activeItem.physicalLocation && (
                  <p className="dossier-phys-loc">
                    <strong>Physical Vault:</strong> {activeItem.physicalLocation}
                  </p>
                )}
              </div>
            </div>

            <div className="dossier-modal-footer">
              <button
                type="button"
                className="dossier-action-btn dossier-btn-cite"
                onClick={() => handleCopyCitation(activeItem)}
              >
                {copiedCitation ? t.archiveCitationCopied : t.archiveCopyCitation}
              </button>
              {activeItem.sourceUrl && (
                <a
                  href={activeItem.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dossier-action-btn dossier-btn-source"
                >
                  {t.archiveViewOriginal}
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating Bottom Audio Player Dock when audio is active and modal is closed */}
      {activeTrack && !activeItem && (
        <div className="archive-floating-audio-dock">
          <ArchivalAudioPlayer track={activeTrack} inline onClose={stopTrack} />
        </div>
      )}
    </div>
  );
};