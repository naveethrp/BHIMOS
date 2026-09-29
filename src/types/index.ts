/**
 * Core Type Definitions for Ambedkar Digital Heritage Archive
 */

export type PageId = 'kiosk' | 'home' | 'archive' | 'timeline' | 'ask' | 'ocr' | 'rc' | 'about' | 'event-detail';

export type Language = 'en' | 'hi';

export type ArchiveCategory = 'debates' | 'publications' | 'audio' | 'letters' | 'photos' | 'legal' | 'press' | 'videos';

export interface ArchiveItem {
  id: string;
  title: string;
  category: ArchiveCategory;
  year: number;
  dateStr?: string;
  description: string;
  formatDetails?: string; // e.g. "24 mins", "8 pages", "Speech recording"
  thumbnailUrl: string;
  mediaUrl?: string;
  itemCountBadge?: number;
  tags?: string[];
  sourceReference?: string;
  transcript?: string;
  institution?: string;
  sourceUrl?: string;
  volumeRef?: string;
  isLocalArchivalData?: boolean;
  shelfMark?: string;
  physicalLocation?: string;
  externalAuthority?: string;
}

export interface TimelineEra {
  id: string;
  title: string;
  yearRange: string;
  iconName: string;
}

export interface TimelineEvent {
  id: string;
  eraId: string;
  year: number;
  date: string;
  title: string;
  summary: string;
  thumbnailUrl: string;
  historicalContext?: string;
  ambedkarRole?: string;
  keyPeople?: string[];
  impact?: string;
  quote?: {
    text: string;
    author: string;
  };
  relatedArchiveIds?: string[];
  sources?: {
    id: string;
    title: string;
    type: 'document' | 'video' | 'debate' | 'publication';
    meta: string;
    url?: string;
  }[];
}

export interface CitationSource {
  id: string;
  badgeNumber: number;
  title: string;
  date: string;
  sourceType: string;
  location: string;
  originalDocumentUrl?: string;
  isExternal?: boolean;
  year?: number | string;
  collection?: string;
  page?: string | number;
  snippet?: string;
}

export interface AskMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  citations?: CitationSource[];
}

export interface OCRJobState {
  originalFile: {
    name: string;
    size: string;
    previewUrl: string;
  } | null;
  stage: 'idle' | 'preparing' | 'detecting' | 'recognizing' | 'structuring' | 'complete';
  progressPercent: number;
  ocrPdfUrl: string;
}
