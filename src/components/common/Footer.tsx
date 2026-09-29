import React from 'react';
import { PageId, Language } from '../../types';
import './Footer.css';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, language }) => {
  return (
    <footer className="global-footer" role="contentinfo">
      <div className="footer-top-ornament" aria-hidden="true" />
      
      <div className="footer-main-container">
        {/* Brand & Provenance Column */}
        <div className="footer-brand-column">
          <div 
            className="footer-brand-header" 
            onClick={() => onNavigate('home')} 
            role="button" 
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onNavigate('home'); }}}
          >
            <div className="footer-emblem-wrap">
              <img
                src="/assets/logo.png"
                alt="Ambedkar Digital Heritage Archive Seal"
                className="footer-emblem-img"
                loading="lazy"
              />
            </div>
            <div className="footer-brand-text">
              <span className="footer-brand-title">BHIMOS</span>
              <span className="footer-brand-subtitle">
                {language === 'hi' 
                  ? 'आंबेडकर डिजिटल धरोहर अभिलेखागार' 
                  : 'AMBEDKAR DIGITAL HERITAGE ARCHIVE'}
              </span>
            </div>
          </div>

          <p className="footer-mission-statement">
            {language === 'hi'
              ? 'बाबासाहेब डॉ. भीमराव रामजी आंबेडकर के बौद्धिक योगदान, संविधान निर्माण, सामाजिक आंदोलनों एवं मूल प्रलेखों का राष्ट्रीय स्तर का आधिकारिक एवं संरचित डिजिटल संग्रहालय।'
              : "A national source-grounded digital museum dedicated to the preservation, scholarly research, and public dissemination of Dr. B. R. Ambedkar's constitutional legacy, writings, speeches, and archival records."}
          </p>

          <div className="footer-terminal-badge">
            <span className="footer-station-dot" aria-hidden="true" />
            <span className="footer-station-text">
              TERMINAL DL-PARL-01 • PARLIAMENT CENTRAL HALL HERITAGE NODE
            </span>
          </div>
        </div>

        {/* Navigation Pathways Column */}
        <div className="footer-nav-column">
          <h3 className="footer-heading">
            {language === 'hi' ? 'अभिलेखागार दीर्घाएं' : 'ARCHIVE GALLERIES'}
          </h3>
          <ul className="footer-links-list">
            <li>
              <button type="button" onClick={() => onNavigate('home')}>
                {language === 'hi' ? 'मुख्य पृष्ठ (Home)' : 'Home Exhibition'}
              </button>
            </li>
            <li>
              <button type="button" onClick={() => onNavigate('archive')}>
                {language === 'hi' ? 'डिजिटल संग्रह (187 प्रलेख)' : 'Digital Archive (187 Items)'}
              </button>
            </li>
            <li>
              <button type="button" onClick={() => onNavigate('timeline')}>
                {language === 'hi' ? 'ऐतिहासिक कालक्रम (1891–1956)' : 'Historical Timeline (1891–1956)'}
              </button>
            </li>
            <li>
              <button type="button" onClick={() => onNavigate('ocr')}>
                {language === 'hi' ? 'दस्तावेज़ डिजिटलीकरण (OCR)' : 'Digitize Documents (OCR)'}
              </button>
            </li>
            <li>
              <button type="button" onClick={() => onNavigate('ask')}>
                {language === 'hi' ? 'जिज्ञासा शोध सहायक (RAG)' : 'Ask the Archive (Research)'}
              </button>
            </li>
            <li>
              <button type="button" onClick={() => onNavigate('about')}>
                {language === 'hi' ? 'परियोजना परिचय' : 'About the Project'}
              </button>
            </li>
          </ul>
        </div>

        {/* Collections Breakdown Column */}
        <div className="footer-nav-column">
          <h3 className="footer-heading">
            {language === 'hi' ? 'प्रमुख संग्रह' : 'CORE COLLECTIONS'}
          </h3>
          <ul className="footer-links-list">
            <li>
              <span className="footer-static-item">Constituent Assembly Debates (167 Sittings)</span>
            </li>
            <li>
              <span className="footer-static-item">Dr. Ambedkar: Writings & Speeches (20 Vols)</span>
            </li>
            <li>
              <span className="footer-static-item">Mahad Satyagraha & Social Movement Papers</span>
            </li>
            <li>
              <span className="footer-static-item">BBC & All India Radio Historic Audio</span>
            </li>
            <li>
              <span className="footer-static-item">Calligraphed Constitution Draft Folios (1949)</span>
            </li>
          </ul>
        </div>

        {/* Verified Provenance & Attribution Column */}
        <div className="footer-nav-column">
          <h3 className="footer-heading">
            {language === 'hi' ? 'प्रामाणिक स्रोत' : 'AUTHORITATIVE SOURCES'}
          </h3>
          <ul className="footer-links-list">
            <li>
              <a 
                href="https://drambedkarwritings.gov.in" 
                target="_blank" 
                rel="noopener noreferrer"
                className="footer-external-link"
              >
                Dr. Ambedkar Writings (GoI) ↗
              </a>
            </li>
            <li>
              <a 
                href="https://www.constitutionofindia.net" 
                target="_blank" 
                rel="noopener noreferrer"
                className="footer-external-link"
              >
                Constitution of India Debates ↗
              </a>
            </li>
            <li>
              <a 
                href="https://www.bbc.co.uk/archive" 
                target="_blank" 
                rel="noopener noreferrer"
                className="footer-external-link"
              >
                BBC Sound Archives ↗
              </a>
            </li>
            <li>
              <a 
                href="https://sansad.in/rs" 
                target="_blank" 
                rel="noopener noreferrer"
                className="footer-external-link"
              >
                Parliament of India Archives ↗
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Legal & Heritage Bar */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-content">
          <span className="footer-motto-quote">
            “Educate, Agitate, Organize.” — Babasaheb Dr. B. R. Ambedkar
          </span>
          <span className="footer-copyright-text">
            © 2026 Ambedkar Digital Heritage Archive (BHIMOS). Public Educational & Heritage Access.
          </span>
        </div>
      </div>
    </footer>
  );
};
