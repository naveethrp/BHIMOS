import { ArchiveItem } from '../types';

export const ARCHIVE_CATEGORIES = [
  { id: 'videos', title: 'Videos', description: 'Speeches, interviews and historical footage', count: 24, icon: 'film' },
  { id: 'audio', title: 'Audio', description: 'Speeches and recordings', count: 18, icon: 'mic' },
  { id: 'letters', title: 'Letters', description: 'Personal and official letters', count: 32, icon: 'mail' },
  { id: 'debates', title: 'Debates', description: 'Parliamentary debates and discussions', count: 45, icon: 'message-square' },
  { id: 'publications', title: 'Publications', description: 'Writings, books and research papers', count: 68, icon: 'book-open' }
] as const;

export const ARCHIVE_ITEMS: ArchiveItem[] = [
  {
    id: 'vid-cad-speech',
    title: 'Dr. Ambedkar Address to Constituent Assembly',
    category: 'videos',
    year: 1949,
    dateStr: 'November 25, 1949',
    description: 'Historical recording of Dr. Ambedkar delivering his final address to the Constituent Assembly regarding social democracy.',
    formatDetails: '24 mins • Archival B&W Film',
    thumbnailUrl: '/images/historical/parliament-crowd.png',
    sourceReference: 'Films Division of India / Parliament Archives',
    itemCountBadge: 24
  },
  {
    id: 'aud-bbc-interview',
    title: 'BBC Radio Interview on Universal Franchise',
    category: 'audio',
    year: 1953,
    dateStr: 'May 1953',
    description: 'Dr. Ambedkar discusses why voting rights must not be contingent on property ownership or literacy qualifications.',
    formatDetails: '18 mins • High-Fidelity Audio',
    thumbnailUrl: '/images/portraits/portrait-halo-gold.png',
    sourceReference: 'BBC World Service Audio Archives',
    itemCountBadge: 18
  },
  {
    id: 'let-du-bois',
    title: 'Correspondence with W. E. B. Du Bois',
    category: 'letters',
    year: 1946,
    dateStr: 'July 1946',
    description: 'Exchange of letters between Dr. B. R. Ambedkar and African American civil rights leader W. E. B. Du Bois discussing global civil rights.',
    formatDetails: '4 Pages • Scanned Manuscript',
    thumbnailUrl: '/images/textures/paper-manuscript.png',
    sourceReference: 'Columbia University Rare Book & Manuscript Library',
    itemCountBadge: 32
  },
  {
    id: 'deb-article-17',
    title: 'Debate on Article 17 (Abolition of Untouchability)',
    category: 'debates',
    year: 1948,
    dateStr: 'November 29, 1948',
    description: 'Verbatim transcript and recording notes of the dramatic debate adopting the unconditional abolition of untouchability.',
    formatDetails: 'Official Debates Volume VII',
    thumbnailUrl: '/images/textures/navy-archival-bg.png',
    sourceReference: 'Parliament of India Debates Division'
  },
  {
    id: 'pub-annihilation-caste',
    title: 'Annihilation of Caste (Undelivered Speech & Treatise)',
    category: 'publications',
    year: 1936,
    dateStr: '1936',
    description: 'The monumental treatise examining the philosophical and social foundations of the caste system in India.',
    formatDetails: 'First Edition Print • 118 Pages',
    thumbnailUrl: '/images/textures/constitution-preamble.png',
    sourceReference: 'Bharat Bhushan Press, Bombay'
  }
];
