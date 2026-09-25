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
          <div className="archive-intro-header">
            <span className="archive-eyebrow">Collection Index</span>
            <div className="archive-lion-capital-icon">
              <img
                src="/images/composition/lion-capital-gold.png"
                alt="Ashoka Lion Capital"
                className="lion-capital-mini-img"
              />
            </div>
          </div>
          <h1 className="archive-main-title font-display">Digital Archive</h1>
          <p className="archive-lead-desc">
            Explore rare and historical records, speeches, letters, debates, and constitutional publications preserved in authentic digital form.
          </p>

          {/* Search Box */}
          <div className="archive-search-wrapper">
            <span className="search-icon" aria-hidden="true">🔍</span>
            <input
              type="text"
              className="archive-search-input"
              placeholder="Search by keyword, year, or person..."
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

        {/* Archival Depth Quote Block with Portrait */}
        <div className="archive-quote-block">
          <div className="quote-backdrop-watermark" aria-hidden="true">
            <img
              src="/images/composition/ashoka-chakra-watermark.png"
              alt=""
              className="quote-chakra-watermark-img"
            />
          </div>
          <figure className="archive-sidebar-quote">
            <span className="quote-mark-mini" aria-hidden="true">“</span>
            <blockquote className="font-display">
              Preserving history so ideas continue to inspire future generations.
            </blockquote>
            <figcaption>— Dr. B. R. Ambedkar</figcaption>
          </figure>
          <div className="archive-portrait-silhouette">
            <img
              src="/images/composition/ambedkar-cutout-bust.png"
              alt="Dr. B. R. Ambedkar contemplation"
              className="archive-silhouette-img"
            />
          </div>
        </div>
      </aside>

      {/* Right Column: Layered Category Compositions (Reference A Screen 2) */}
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
                {/* Layered Category Visual Stage */}
                <div className="cat-card-media-stage">
                  {/* Category-Specific Layered Composition */}
                  {cat.id === 'videos' && (
                    <div className="cat-composition-wrapper">
                      <img
                        src="/images/composition/ambedkar-speech-assembly.png"
                        alt=""
                        className="cat-backdrop-photo"
                      />
                      <div className="cat-composition-film-badge">
                        <span className="film-reel-icon">▶</span>
                        <span className="film-format-pill">16mm Archival</span>
                      </div>
                    </div>
                  )}

                  {cat.id === 'audio' && (
                    <div className="cat-composition-wrapper cat-audio-stage">
                      <img
                        src="/images/composition/canvas-parchment-parliament.png"
                        alt=""
                        className="cat-backdrop-parchment"
                      />
                      <img
                        src="/images/composition/ambedkar-cutout-bust.png"
                        alt=""
                        className="cat-cutout-audio-portrait"
                      />
                      <div className="audio-soundwaves-badge">
                        <span className="mic-icon">🎙️</span>
                        <span className="soundwave-bar bar-1"></span>
                        <span className="soundwave-bar bar-2"></span>
                        <span className="soundwave-bar bar-3"></span>
                      </div>
                    </div>
                  )}

                  {cat.id === 'letters' && (
                    <div className="cat-composition-wrapper cat-letters-stage">
                      <img
                        src="/images/textures/paper-manuscript.png"
                        alt=""
                        className="cat-backdrop-manuscript"
                      />
                      <img
                        src="/images/composition/fountain-pen-manuscript.png"
                        alt=""
                        className="cat-cutout-pen-scroll"
                      />
                      <div className="letters-seal-badge">
                        <span>✉️</span>
                      </div>
                    </div>
                  )}

                  {cat.id === 'debates' && (
                    <div className="cat-composition-wrapper cat-debates-stage">
                      <img
                        src="/images/composition/parliament-isolated.png"
                        alt=""
                        className="cat-backdrop-parliament"
                      />
                      <img
                        src="/images/composition/colonnade-gallery.png"
                        alt=""
                        className="cat-gallery-arch-bg"
                      />
                      <div className="debates-assembly-badge">
                        <span>🏛️</span>
                      </div>
                    </div>
                  )}

                  {cat.id === 'publications' && (
                    <div className="cat-composition-wrapper cat-publications-stage">
                      <img
                        src="/images/composition/constitution-preamble-art.png"
                        alt=""
                        className="cat-preamble-bg"
                      />
                      <img
                        src="/images/composition/law-books-stack.png"
                        alt=""
                        className="cat-cutout-law-books"
                      />
                      <div className="publications-book-badge">
                        <span>📖</span>
                      </div>
                    </div>
                  )}

                  {cat.count && <span className="cat-count-badge">{cat.count} Records</span>}
                </div>

                {/* Card Editorial Footer */}
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
              <div className="showcase-title-group">
                <span className="showcase-eyebrow">Category Filter Active</span>
                <h2 className="font-display">
                  {selectedCategory.toUpperCase()} COLLECTION ({filteredItems.length} curated records)
                </h2>
              </div>
              <button
                type="button"
                className="showcase-reset-btn"
                onClick={() => setSelectedCategory('all')}
              >
                Reset to All Records
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
                    <span className="item-source">Archival Provenance: {item.sourceReference}</span>
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
