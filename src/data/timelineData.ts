import { TimelineEra, TimelineEvent } from '../types';

export const TIMELINE_ERAS: TimelineEra[] = [
  { id: 'early-life', title: 'Early Life', yearRange: '1891–1912', iconName: 'baby' },
  { id: 'education', title: 'Education', yearRange: '1913–1923', iconName: 'graduation-cap' },
  { id: 'social-reform', title: 'Social Reform', yearRange: '1924–1935', iconName: 'users' },
  { id: 'political-movement', title: 'Political Movement', yearRange: '1935–1947', iconName: 'landmark' },
  { id: 'constitutional-journey', title: 'Constitutional Journey', yearRange: '1947–1956', iconName: 'scale' },
  { id: 'legacy', title: 'Legacy', yearRange: '1956 onwards', iconName: 'award' }
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 'birth-mhow',
    eraId: 'early-life',
    year: 1891,
    date: 'April 14, 1891',
    title: 'Birth in Mhow',
    summary: 'Born into a Mahar family, faced early discrimination but showed exceptional intellect.',
    thumbnailUrl: '/images/portraits/portrait-sepia-sketch.png',
    historicalContext: 'Bhimrao Ramji Ambedkar was born in the military cantonment town of Mhow (now Dr. Ambedkar Nagar) in Central Provinces (now Madhya Pradesh).',
    ambedkarRole: 'Overcame severe institutional barriers to pursue schooling.',
    impact: 'Laid the bedrock of determination to abolish social injustice in India.'
  },
  {
    id: 'early-education',
    eraId: 'early-life',
    year: 1907,
    date: '1907',
    title: 'Early Education',
    summary: 'Attended school in Satara, later in Bombay. Faced caste discrimination but excelled in academics.',
    thumbnailUrl: '/images/historical/heritage-buildings.png',
    historicalContext: 'Passed matriculation from Elphinstone High School in Bombay, becoming the first in his community to achieve this milestone.',
    ambedkarRole: 'Demonstrated exceptional scholarly promise, gaining the patronage of Sayajirao Gaekwad III.',
    impact: 'Proved the transformative power of modern education.'
  },
  {
    id: 'studies-abroad',
    eraId: 'education',
    year: 1913,
    date: '1913–1916',
    title: 'Studies Abroad',
    summary: 'Awarded a scholarship to Columbia University, New York. Exposure to global ideas of justice and equality.',
    thumbnailUrl: '/images/historical/parliament-crowd.png',
    historicalContext: 'Studied economics, sociology, and political science under John Dewey, Edwin Seligman, and Alexander Goldenweiser.',
    ambedkarRole: 'Authored seminal papers on castes in India, analyzing systemic caste mechanics scientifically.',
    impact: 'Formulated the theoretical framework for democratic equality.'
  },
  {
    id: 'mahad-satyagraha',
    eraId: 'social-reform',
    year: 1927,
    date: 'March 20, 1927',
    title: 'Mahad Satyagraha',
    summary: 'Led a historic movement for the right to access public water tanks, challenging untouchability.',
    thumbnailUrl: '/images/historical/ambedkar-standing.png',
    historicalContext: 'The Chavdar Tale water tank at Mahad was legally open to all, yet untouchables were barred by orthodox social customs.',
    ambedkarRole: 'Personally drank from the public tank and organized thousands of satyagrahis with complete nonviolence.',
    impact: 'Heralded the beginning of the assertive civil rights movement in modern India.'
  },
  {
    id: 'drafting-committee-constitution',
    eraId: 'constitutional-journey',
    year: 1947,
    date: 'August 29, 1947',
    title: 'Drafting Committee of the Constitution',
    summary: 'Dr. B. R. Ambedkar was appointed as the Chairman of the Drafting Committee of the Constituent Assembly.',
    thumbnailUrl: '/images/portraits/master-portrait-formal.jpg',
    historicalContext: 'India was on the path to independence, and the Constituent Assembly was tasked with drafting a Constitution for a diverse and democratic nation. Ambedkar’s legal expertise and vision were crucial in building a document that balanced liberty, equality and social justice.',
    ambedkarRole: 'Chaired the Drafting Committee, scrutinized every provision, defended fundamental rights, abolished untouchability (Article 17), and framed the Directive Principles.',
    keyPeople: ['Dr. B. R. Ambedkar', 'Alladi Krishnaswamy Iyer', 'N. Gopalaswami Ayyangar', 'K. M. Munshi', 'Sir B. N. Rau (Advisor)'],
    impact: 'Established the world’s most comprehensive democratic constitution with universal adult franchise.',
    quote: {
      text: 'We are going to enter into a life of contradictions. In politics we will have equality and in social and economic life we will have inequality.',
      author: 'Dr. B. R. Ambedkar (Address to the Constituent Assembly, 25 Nov 1949)'
    },
    sources: [
      {
        id: 'cad-17nov49',
        title: 'Constituent Assembly Debates',
        type: 'debate',
        meta: '17 Nov 1949 • Page 153 • Parliament of India'
      },
      {
        id: 'draft-doc',
        title: 'Drafting Committee Records',
        type: 'document',
        meta: 'National Archives of India'
      },
      {
        id: 'draft-pdf',
        title: 'The Constitution of India (Draft)',
        type: 'publication',
        meta: 'Original 1949 Archival Print'
      }
    ]
  }
];
