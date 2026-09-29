import React from 'react';
import { PageId, Language } from '../types';
import { TRANSLATIONS } from '../utils/translations';
import './HomePage.css';

interface HomePageProps {
  onNavigate: (page: PageId, eventId?: string, initialCategory?: string) => void;
  language?: Language;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, language = 'en' }) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const isHi = language === 'hi';

  const pathwayCards = [
    {
      id: 'archive' as const,
      category: 'debates' as const,
      number: '01',
      img: '/assets/documents/cad-art17-p1.svg',
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M3 21h18M3 10h18M5 10v11M19 10v11M9 10v11M14 10v11M4 10l8-7 8 7" />
        </svg>
      ),
      title: isHi ? 'संविधान सभा वाद-विवाद' : 'Constituent Assembly Debates',
      subtitle: isHi ? 'संविधान प्रारूपण की आधिकारिक कार्यवाहियां (१९४६–१९५०)।' : 'Verbatim proceedings from the drafting of the Indian Constitution (1946–1950).',
      actionLabel: isHi ? '१६७ बैठकें देखें' : 'Access 167 Sittings'
    },
    {
      id: 'archive' as const,
      category: 'publications' as const,
      number: '02',
      img: '/assets/documents/aoc-1936-p1.svg',
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      ),
      title: isHi ? 'समग्र ग्रंथ एवं भाषण (BAWS)' : 'Writings & Treatises (BAWS)',
      subtitle: isHi ? 'मौलिक शोधग्रंथों, व्याख्यानों व ज्ञापनों के २० प्रकाशित खंड।' : '22 published volumes of seminal treatises, memorandums, and public addresses.',
      actionLabel: isHi ? '२२ खंड देखें' : 'Explore 22 Volumes'
    },
    {
      id: 'archive' as const,
      category: 'audio' as const,
      number: '03',
      img: '/assets/documents/audio-broadcast-disc.svg',
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" y1="19" x2="12" y2="23" />
          <line x1="8" y1="23" x2="16" y2="23" />
        </svg>
      ),
      title: isHi ? 'ऐतिहासिक प्रसारण व भाषण' : 'Broadcast Speeches & Audio',
      subtitle: isHi ? 'बीबीसी व आकाशवाणी के प्रामाणिक ऐतिहासिक प्रसारण व साक्षात्कार (१९४२–१९५३)।' : 'Authentic broadcast speeches and international radio interviews (1942–1953).',
      actionLabel: isHi ? 'प्रसारण देखें' : 'Listen & Transcripts'
    },
    {
      id: 'archive' as const,
      category: 'letters' as const,
      number: '04',
      img: '/assets/documents/letter-manuscript-dubois.svg',
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      title: isHi ? 'पत्राचार एवं संदेश' : 'Letters & Memoranda',
      subtitle: isHi ? 'गांधी, डुबोइस व वेवेल के साथ व्यक्तिगत ऐतिहासिक पत्र व्यवहार।' : 'Personal letters and telegraphic exchanges with Gandhi, Du Bois, and Wavell.',
      actionLabel: isHi ? 'पाण्डुलिपियां पढ़ें' : 'Read Manuscripts'
    },
    {
      id: 'archive' as const,
      category: 'videos' as const,
      number: '05',
      img: '/assets/documents/newsreel-footage-1956.svg',
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="2" />
          <line x1="7" y1="2" x2="7" y2="22" />
          <line x1="17" y1="2" x2="17" y2="22" />
          <line x1="2" y1="12" x2="22" y2="12" />
        </svg>
      ),
      title: isHi ? 'ऐतिहासिक वृत्तचित्र व फिल्म' : 'Historic Newsreels & Film Footage',
      subtitle: isHi ? 'संविधान सभा एवं दीक्षाभूमि के दुर्लभ ऐतिहासिक दृश्य एवं वृत्तचित्र।' : 'Rare 35mm documentary footage and newsreels covering historical events.',
      actionLabel: isHi ? 'वृत्तचित्र देखें' : 'Explore Newsreels'
    }
  ];

  const historicalEras = [
    {
      id: 'early-life',
      years: '1891–1912',
      title: isHi ? 'आरंभिक जीवन व शिक्षा' : 'Early Life & Education',
      img: '/assets/1.jpeg',
      objectPosition: 'center 18%'
    },
    {
      id: 'higher-education',
      years: '1913–1923',
      title: isHi ? 'विदेश में उच्च शिक्षा' : 'Higher Education Abroad',
      img: '/assets/deep-thinking.png',
      objectPosition: 'center 15%'
    },
    {
      id: 'social-reform',
      years: '1924–1935',
      title: isHi ? 'सामाजिक सुधार व अधिकार' : 'Social Reform & Civil Rights',
      img: '/assets/standing.png',
      objectPosition: 'center 12%'
    },
    {
      id: 'political-movement',
      years: '1936–1946',
      title: isHi ? 'राजनीतिक आंदोलन व श्रम' : 'Political Movement & Labour',
      img: '/assets/speaking-bg.png',
      objectPosition: 'center 20%'
    },
    {
      id: 'constitutional-journey',
      years: '1947–1950',
      title: isHi ? 'संविधान निर्माण यात्रा' : 'Constitutional Journey',
      img: '/assets/portrait1.png',
      objectPosition: 'center 20%',
      featured: true
    },
    {
      id: 'later-years',
      years: '1951–1956',
      title: isHi ? 'अंतिम वर्ष व धम्म विरासत' : 'Later Years & Legacy',
      img: '/assets/documents/buddha-dhamma-1956.svg',
      objectPosition: 'center center'
    }
  ];

  return (
    <div className="home-museum-container">
      {/* 1. HERO EDITORIAL STAGE */}
      <section className="hero-editorial-stage" aria-label="Hero Overview">
        {/* Layer 1: Atmospheric Background (BG10 + Clouds + Parchment Overlay) */}
        <div className="layer-atmosphere" aria-hidden="true">
          <img src="/assets/clouds.jpeg" alt="" className="hero-sky-clouds" loading="eager" />
          <img src="/assets/bg10.png" alt="" className="canvas-bg-img" loading="eager" />
          <img src="/assets/bgoverlay1.png" alt="" className="hero-parchment-overlay" loading="eager" />
          <div className="canvas-gradient-overlay" />
        </div>

        {/* Layer 2: Architectural Colonnade & Environmental Depth */}
        <div className="layer-environment" aria-hidden="true">
          <img src="/assets/trees.jpeg" alt="" className="hero-env-trees" loading="lazy" />
          <img src="/assets/gate.png" alt="" className="hero-env-gate" loading="lazy" />
          <img src="/assets/wall.png" alt="" className="hero-env-wall" loading="lazy" />
          <img src="/assets/piller.png" alt="" className="hero-env-pillar hero-pillar-left" loading="lazy" />
          <img src="/assets/old-piller.png" alt="" className="hero-env-pillar hero-pillar-right" loading="lazy" />
          <img src="/assets/single-light.png" alt="" className="hero-env-light" loading="lazy" />
          <img src="/assets/overlay2.png" alt="" className="hero-env-overlay" loading="lazy" />
        </div>

        {/* Layer 3: Primary Focal Subject: Dr. Ambedkar Master Portrait (portrait1.png) */}
        <div className="layer-primary-subject" aria-hidden="true">
          <div className="ambedkar-portrait-anchor">
            <img
              src="/assets/portrait1.png"
              alt="Dr. B. R. Ambedkar — Master Portrait"
              className="ambedkar-master-portrait-img"
              loading="eager"
            />
            <div className="ambedkar-shadow-ground" />
          </div>
        </div>

        {/* Layer 4: Editorial Headlines & Quote */}
        <div className="layer-ui-editorial">
          <div className="hero-editorial-grid">
            <div className="hero-cutout-spacer" aria-hidden="true" />

            <div className="hero-text-block">
              <span className="hero-eyebrow-tag">
                {t.heroEyebrow || 'DR. B. R. AMBEDKAR • 1891–1956'}
              </span>
              <h1 className="hero-main-title font-display">
                {t.heroMainTitle || 'A LIFE THAT'}{' '}
                <span className="title-accent-gold">{t.heroMainTitleAccent || 'SHAPED A NATION'}</span>
              </h1>
              <div className="hero-quote-inline">
                <blockquote className="quote-text font-display">
                  “{t.heroQuote}”
                </blockquote>
                <cite className="quote-author">— {t.heroQuoteAuthor}</cite>
              </div>
              <p className="hero-description-para">
                {t.homeHeroDesc}
              </p>

              <div className="hero-cta-group">
                <button
                  type="button"
                  className="hero-primary-btn"
                  onClick={() => onNavigate('archive')}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                  <span>{t.heroExploreBtn} →</span>
                </button>
                <button
                  type="button"
                  className="hero-secondary-btn"
                  onClick={() => onNavigate('timeline')}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                  </svg>
                  <span>{t.heroTimelineBtn}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Layer 5: Curated 5 Archive Collection Pathway Cards across Hero Base */}
        <div className="hero-floating-pathways-wrap">
          <div className="hero-pathways-grid" role="group" aria-label="Curated Primary Archives">
            {pathwayCards.map((card) => (
              <button
                key={card.number}
                type="button"
                className="museum-pathway-card"
                onClick={() => onNavigate(card.id, undefined, card.category)}
              >
                <div className="pathway-card-body-inner">
                  <div className="pathway-card-top">
                    <div className="pathway-icon-bubble" aria-hidden="true">
                      {card.icon}
                    </div>
                    <span className="pathway-number-badge">{card.number}</span>
                  </div>

                  <div className="pathway-card-content">
                    <h3 className="pathway-card-title font-display">{card.title}</h3>
                    <p className="pathway-card-desc">{card.subtitle}</p>
                  </div>

                  <div className="pathway-card-action">
                    <span className="pathway-action-label">{card.actionLabel}</span>
                    <span className="pathway-arrow" aria-hidden="true">→</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. STATS & PROVENANCE RIBBON */}
      <section className="home-stats-ribbon" aria-label="Archival Holdings and Core Metrics">
        <div className="stats-metrics-group">
          <div className="stat-item">
            <div className="stat-icon-wrap" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
            </div>
            <div className="stat-content">
              <span className="stat-number">187</span>
              <span className="stat-label">{t.statPrimaryRecords}</span>
            </div>
          </div>

          <div className="stat-divider" aria-hidden="true" />

          <div className="stat-item">
            <div className="stat-icon-wrap" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
            <div className="stat-content">
              <span className="stat-number">167</span>
              <span className="stat-label">{t.statAssemblySittings}</span>
            </div>
          </div>

          <div className="stat-divider" aria-hidden="true" />

          <div className="stat-item">
            <div className="stat-icon-wrap" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <div className="stat-content">
              <span className="stat-number">20</span>
              <span className="stat-label">{t.statBawsVolumes}</span>
            </div>
          </div>

          <div className="stat-divider" aria-hidden="true" />

          <div className="stat-item">
            <div className="stat-icon-wrap" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div className="stat-content">
              <span className="stat-number">34</span>
              <span className="stat-label">{t.statManuscriptsLetters}</span>
            </div>
          </div>

          <div className="stat-divider" aria-hidden="true" />

          <div className="stat-item">
            <div className="stat-icon-wrap" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
            </div>
            <div className="stat-content">
              <span className="stat-number">18</span>
              <span className="stat-label">{t.statAudioBroadcasts}</span>
            </div>
          </div>

          <div className="stat-divider" aria-hidden="true" />

          <div className="stat-item">
            <div className="stat-icon-wrap" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <div className="stat-content">
              <span className="stat-number">70,189</span>
              <span className="stat-label">{t.statGroundedCitations}</span>
            </div>
          </div>
        </div>

        <div className="stats-quote-block">
          <p className="stats-quote-text">
            “A great man is different from an eminent one in that he is ready to be the servant of the society.”
          </p>
          <span className="stats-quote-cite">— Dr. B. R. Ambedkar</span>
        </div>
      </section>

      {/* 3. HISTORICAL JOURNEY — EXPLORE KEY ERAS OF HIS LIFE (Matches home_reference) */}
      <section className="home-historical-journey" aria-label="Explore Key Eras of His Life">
        <div className="journey-left-col">
          <span className="journey-eyebrow">HISTORICAL JOURNEY</span>
          <h2 className="journey-title font-display">{t.homeHistoricalJourneyTitle}</h2>
          <p className="journey-desc">
            {t.homeHistoricalJourneyDesc}
          </p>
          <button
            type="button"
            className="journey-timeline-btn"
            onClick={() => onNavigate('timeline')}
          >
            <span>{t.homeViewFullTimeline}</span>
          </button>
        </div>

        <div className="journey-eras-grid" role="group" aria-label="Key Historical Eras">
          {historicalEras.map((era) => (
            <div
              key={era.id}
              className={`journey-era-card ${era.featured ? 'era-card-featured' : ''}`}
              onClick={() => onNavigate('timeline')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('timeline'); }}
            >
              <div className="era-card-media">
                <img
                  src={era.img}
                  alt={era.title}
                  className="era-card-img"
                  style={{ objectPosition: era.objectPosition || 'center center' }}
                  loading="lazy"
                />
              </div>
              <div className="era-card-content">
                <span className="era-card-years">{era.years}</span>
                <h3 className="era-card-title">{era.title}</h3>
                <span className="era-card-arrow" aria-hidden="true">→</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. DUAL RESEARCH WORKSPACE CALLOUTS — Refined Editorial Composition */}
      <section className="home-research-callouts" aria-label="Digital Research Workspaces">
        {/* Callout Left: Digitize Documents */}
        <div className="research-callout-card callout-digitize">
          <div className="callout-card-inner">
            <span className="callout-badge">{t.researchOcrBadge}</span>
            <h3 className="callout-heading font-display">{t.researchOcrHeading}</h3>
            <p className="callout-summary">{t.researchOcrSummary}</p>
            <button 
              type="button" 
              className="callout-action-btn"
              onClick={() => onNavigate('ocr')}
            >
              <span>{t.researchOcrBtn}</span>
              <span className="callout-btn-arrow" aria-hidden="true">→</span>
            </button>
          </div>
          <div className="callout-card-visual-panel" aria-hidden="true">
            <img
              src="/assets/documents/ocr-digitization-scan.svg"
              alt="Archival OCR Scanning Studio"
              className="callout-visual-img"
              loading="lazy"
            />
            <div className="callout-visual-badge">OCR LAB • 600 DPI</div>
          </div>
        </div>

        {/* Callout Right: Ask the Archive */}
        <div className="research-callout-card callout-ask">
          <div className="callout-card-inner">
            <span className="callout-badge">{t.researchAskBadge}</span>
            <h3 className="callout-heading font-display">{t.researchAskHeading}</h3>
            <p className="callout-summary">{t.researchAskSummary}</p>
            <button 
              type="button" 
              className="callout-action-btn"
              onClick={() => onNavigate('ask')}
            >
              <span>{t.researchAskBtn}</span>
              <span className="callout-btn-arrow" aria-hidden="true">→</span>
            </button>
          </div>
          <div className="callout-card-visual-panel" aria-hidden="true">
            <img
              src="/assets/documents/cad-art17-p1.svg"
              alt="Constituent Assembly Proceedings Research"
              className="callout-visual-img"
              loading="lazy"
            />
            <div className="callout-visual-badge">SCHOLARLY RAG • CAD</div>
          </div>
        </div>
      </section>
    </div>
  );
};