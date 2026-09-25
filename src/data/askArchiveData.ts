import { CitationSource, AskMessage } from '../types';

export const SUGGESTED_QUESTIONS = [
  'What role did Ambedkar play in drafting the Constitution?',
  'What was the Poona Pact?',
  'What did Ambedkar say about education?',
  'Show me his speeches on caste.',
  'What are his major publications?'
];

export const INITIAL_CITATIONS: CitationSource[] = [
  {
    id: 'src-1',
    badgeNumber: 1,
    title: 'Constituent Assembly Debates',
    date: '17 Nov 1949 • Page 153',
    sourceType: 'Official Debate Record',
    location: 'Parliament of India',
    originalDocumentUrl: '/archive/debates/cad-nov1949.pdf'
  },
  {
    id: 'src-2',
    badgeNumber: 2,
    title: 'The Constitution of India (Draft)',
    date: 'Drafting Committee Records',
    sourceType: 'Historical Draft Document',
    location: 'National Archives',
    originalDocumentUrl: '/archive/publications/constitution-draft.pdf'
  },
  {
    id: 'src-3',
    badgeNumber: 3,
    title: 'Ambedkar: Speeches and Writings',
    date: 'Vol. 1 • Page 45',
    sourceType: 'Official Publication',
    location: 'Government of India',
    originalDocumentUrl: '/archive/publications/speeches-writings-vol1.pdf'
  }
];

export const INITIAL_CONVERSATION: AskMessage[] = [
  {
    id: 'msg-user-1',
    sender: 'user',
    text: 'What role did Ambedkar play in drafting the Constitution?'
  },
  {
    id: 'msg-asst-1',
    sender: 'assistant',
    text: 'Dr. B. R. Ambedkar served as the Chairman of the Drafting Committee of the Constitution of India. He played a central role in shaping the document, ensuring fundamental rights, social justice and equality. His legal expertise and vision were crucial in building a democratic and inclusive framework for independent India.',
    citations: INITIAL_CITATIONS
  }
];
