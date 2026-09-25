import React, { useState } from 'react';
import { ARCHIVE_CATEGORIES, ARCHIVE_ITEMS } from '../data/archiveData';
import { ArchiveCategory, PageId } from '../types';
import './ArchivePage.css';

interface ArchivePageProps {
  onNavigate: (page: PageId) => void;
}

export const ArchivePage: React.FC<ArchivePageProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState<ArchiveCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = ARCHIVE_ITEMS.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesQuery = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="archive-page-container">
      {/* Left Column: Collection Overview & Search */}
      <aside className="archive-sidebar">
        <div className="archive-intro-box">
          <span className="archive-eyebrow">Collection Index</span>
          <h1 className="archive-main-title font-display">Digital Archive</h1>
          <p className="archive-lead-desc">
            Explore rare and historical records, speeches, letters, debates, and publications.
          </p>

          {/* Search Box */}
          <div className="archive-search-wrapper">
            <span className="search-icon" aria-hidden="true">🔍</span>
            <input
              type="text"
              className="archive-search-input"
              placeholder="Search the archive..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search the archive"
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
        </div>

        {/* Archival Quote Block with Portrait */}
        <div className="archive-quote-block">
          <figure className="archive-sidebar-quote">
            <blockquote className="font-display">
              “Preserving history so ideas continue to inspire future generations.”
            </blockquote>
            <figcaption>— Dr. B. R. Ambedkar</figcaption>
          </figure>
          <div className="archive-portrait-silhouette">
            <img
              src="/images/portraits/portrait-sepia-sketch.png"
              alt="Dr. B. R. Ambedkar contemplation"
              className="archive-silhouette-img"
            />
          </div>
        </div>
      </aside>

      {/* Right Column: Category Tiles & Items (Reference A Screen 2) */}
      <main className="archive-main-content">
        <div className="archive-categories-grid">
          {ARCHIVE_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <div
                key={cat.id}
                className={`archive-cat-card ${isSelected ? 'cat-card-selected' : ''}`}
                onClick={() => setSelectedCategory(isSelected ? 'all' : (cat.id as ArchiveCategory))}
                role="button"
                tabIndex={0}
                aria-label={`${cat.title} archive (${cat.count} items)`}
              >
                <div className="cat-card-media-wrapper">
                  <img
                    src={
                      cat.id === 'videos'
                        ? '/images/historical/parliament-crowd.png'
                        : cat.id === 'audio'
                        ? '/images/portraits/portrait-navy-duotone.png'
                        : cat.id === 'letters'
                        ? '/images/textures/paper-manuscript.png'
                        : cat.id === 'debates'
                        ? '/images/historical/ambedkar-standing.png'
                        : '/images/textures/constitution-preamble.png'
                    }
                    alt={cat.title}
                    className="cat-card-img"
                  />
                  {cat.count && <span className="cat-count-badge">{cat.count}</span>}
                  <div className="cat-media-icon-badge">
                    {cat.id === 'videos' && '▶'}
                    {cat.id === 'audio' && '🎙️'}
                    {cat.id === 'letters' && '✉️'}
                    {cat.id === 'debates' && '🏛️'}
                    {cat.id === 'publications' && '📖'}
                  </div>
                </div>

                <div className="cat-card-info">
                  <div className="cat-card-text">
                    <h2 className="cat-card-title">{cat.title}</h2>
                    <p className="cat-card-desc">{cat.description}</p>
                  </div>
                  <div className="cat-card-action">
                    <span className="cat-arrow-btn">→</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Items Detail Showcase */}
        {selectedCategory !== 'all' && (
          <section className="archive-items-showcase" aria-label="Archive Items">
            <div className="showcase-header">
              <h2 className="font-display">
                Showing: {selectedCategory.toUpperCase()} ({filteredItems.length} records)
              </h2>
              <button
                type="button"
                className="showcase-reset-btn"
                onClick={() => setSelectedCategory('all')}
              >
                View All Categories
              </button>
            </div>

            <div className="showcase-items-list">
              {filteredItems.map((item) => (
                <article key={item.id} className="archive-item-row">
                  <div className="item-thumbnail-box">
                    <img src={item.thumbnailUrl} alt="" className="item-thumb-img" />
                  </div>
                  <div className="item-details-box">
                    <span className="item-meta-tag">{item.formatDetails || item.category}</span>
                    <h3 className="item-title font-display">{item.title}</h3>
                    <p className="item-desc">{item.description}</p>
                    <span className="item-source">Source: {item.sourceReference}</span>
                  </div>
                  <div className="item-action-box">
                    <button type="button" className="btn-view-item">
                      Open Record →
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
