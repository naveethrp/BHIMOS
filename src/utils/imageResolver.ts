/**
 * BHIMOS Semantic Image Resolver
 * Centralized, deterministic resolution of archival assets across all pages,
 * collections, timeline eras, and records.
 *
 * Rules:
 * 1. Never reuse identical images simply because they exist.
 * 2. Never fall back blindly to a single portrait.
 * 3. Never use environmental background layers (e.g. bg1..bg10) as content thumbnails.
 * 4. Maintain a strict priority hierarchy:
 *    Exact Record Asset -> Collection/Category Semantics -> Era Semantics -> Safe Fallback.
 */

import { ArchiveItem } from '../types';

/**
 * Resolves the appropriate thumbnail for an archival record card.
 */
export function resolveRecordThumbnail(item: Partial<ArchiveItem>): string {
  // 1. If explicit, verified document facsimile is given, prefer it
  if (item.thumbnailUrl && !isGenericFallback(item.thumbnailUrl)) {
    return item.thumbnailUrl;
  }

  const id = item.id || '';
  const title = (item.title || '').toLowerCase();

  // Specific high-priority record ID / title mappings
  if (id.includes('cad') || id.includes('assembly') || title.includes('constituent assembly') || title.includes('article 17')) {
    if (id.includes('art17-p2') || id.includes('sitting-12')) return '/assets/documents/cad-art17-p2.svg';
    if (id.includes('art17-p3') || id.includes('sitting-24')) return '/assets/documents/cad-art17-p3.svg';
    return '/assets/documents/cad-art17-p1.svg';
  }

  if (id.includes('draft-constitution') || title.includes('draft constitution')) {
    return '/assets/documents/draft-constitution-1948.svg';
  }

  if (id.includes('states-and-minorities') || title.includes('states and minorities')) {
    return '/assets/documents/states-minorities-1947.svg';
  }

  if (id.includes('aoc') || id.includes('annihilation') || title.includes('annihilation of caste')) {
    return '/assets/documents/aoc-1936-p1.svg';
  }

  if (id.includes('rupee') || title.includes('problem of the rupee')) {
    return '/assets/documents/rupee-1923-p1.svg';
  }

  if (id.includes('mahad') || title.includes('mahad')) {
    return '/assets/documents/mahad-1927-p1.svg';
  }

  if (id.includes('poona-pact') || title.includes('poona pact')) {
    return '/assets/documents/poona-pact-1932-p1.svg';
  }

  if (id.includes('buddha') || title.includes('buddha and his dhamma')) {
    return '/assets/documents/buddha-dhamma-1956.svg';
  }

  if (id.includes('dubois') || id.includes('letter') || title.includes('correspondence') || title.includes('letter')) {
    return '/assets/documents/letter-manuscript-dubois.svg';
  }

  if (id.includes('film') || id.includes('newsreel') || id.includes('video') || id.includes('deekshabhoomi')) {
    return '/assets/documents/newsreel-footage-1956.svg';
  }

  if (id.includes('bbc') || id.includes('air') || id.includes('voa') || id.includes('audio') || id.includes('broadcast')) {
    return '/assets/documents/audio-broadcast-disc.svg';
  }

  // 2. Semantic category-level resolution
  switch (item.category) {
    case 'debates':
      return '/assets/documents/cad-art17-p1.svg';
    case 'publications':
      // Differentiate volume numbers
      if (item.volumeRef && (item.volumeRef.includes('Vol. 6') || item.volumeRef.includes('Vol. 06'))) {
        return '/assets/documents/rupee-1923-p1.svg';
      }
      return '/assets/documents/aoc-1936-p1.svg';
    case 'audio':
      return '/assets/documents/audio-broadcast-disc.svg';
    case 'letters':
      return '/assets/documents/letter-manuscript-dubois.svg';
    case 'videos':
      return '/assets/documents/newsreel-footage-1956.svg';
    case 'photos':
      return '/assets/1.jpeg';
    case 'legal':
      return '/assets/documents/draft-constitution-1948.svg';
    case 'press':
      return '/assets/documents/mahad-1927-p1.svg';
    default:
      return '/assets/documents/cad-art17-p1.svg';
  }
}

/**
 * Checks if a path is considered a generic/lazy fallback that should be upgraded.
 */
function isGenericFallback(path: string): boolean {
  return (
    !path ||
    path === '/assets/bg.png' ||
    path === '/assets/bg1.png' ||
    path === '/assets/bg4.png' ||
    path === '/assets/bg7.png' ||
    path === '/assets/bg8.png' ||
    path === '/assets/bg9.png' ||
    path === '/assets/bg10.png' ||
    path === '/assets/wall.png' ||
    path === '/assets/gate.png'
  );
}

/**
 * Resolves images for Curated Collection cards (Home pathways, Archive category headers, About key areas).
 */
export function resolveCollectionImage(categoryId: string): string {
  switch (categoryId) {
    case 'debates':
      return '/assets/speaking-bg.png';
    case 'publications':
      return '/assets/writing.png';
    case 'audio':
      return '/assets/documents/audio-broadcast-disc.svg';
    case 'letters':
      return '/assets/portrait1.png';
    case 'videos':
      return '/assets/documents/newsreel-footage-1956.svg';
    case 'photos':
      return '/assets/1.jpeg';
    case 'legal':
      return '/assets/standing.png';
    case 'press':
      return '/assets/deep-thinking.png';
    default:
      return '/assets/portrait1.png';
  }
}

/**
 * Resolves compact thumbnails for Timeline Era Navigation pills.
 */
export function resolveEraNavImage(eraId: string): string {
  switch (eraId) {
    case 'early-life':
      return '/assets/portrait1.png';
    case 'higher-education':
      return '/assets/writing.png';
    case 'social-reform':
      return '/assets/standing.png';
    case 'political-movement':
      return '/assets/speaking-bg.png';
    case 'constitutional-journey':
      return '/assets/portrait1.png';
    case 'later-years':
      return '/assets/deep-thinking.png';
    default:
      return '/assets/standing.png';
  }
}

/**
 * Resolves rotating full Ambedkar PNG portraits for the Timeline Hero Stage Left Cutout.
 */
export function resolveEraHeroImage(eraId: string): string {
  switch (eraId) {
    case 'early-life':
      return '/assets/standing.png';
    case 'higher-education':
      return '/assets/writing.png';
    case 'social-reform':
      return '/assets/standing.png';
    case 'political-movement':
      return '/assets/speaking-bg.png';
    case 'constitutional-journey':
      return '/assets/portrait1.png';
    case 'later-years':
      return '/assets/deep-thinking.png';
    default:
      return '/assets/standing.png';
  }
}

/**
 * Resolves image for Active Era Banner Card center thumbnail.
 */
export function resolveEraBannerImage(eraId: string): string {
  switch (eraId) {
    case 'early-life':
      return '/assets/portrait1.png';
    case 'higher-education':
      return '/assets/writing.png';
    case 'social-reform':
      return '/assets/standing.png';
    case 'political-movement':
      return '/assets/speaking-bg.png';
    case 'constitutional-journey':
      return '/assets/portrait1.png';
    case 'later-years':
      return '/assets/deep-thinking.png';
    default:
      return '/assets/standing.png';
  }
}

/**
 * Resolves event-specific archival image for Timeline Rail milestone cards.
 */
export function resolveTimelineEventImage(eventId: string, eraId: string, customThumb?: string): string {
  if (customThumb && !isGenericFallback(customThumb)) {
    return customThumb;
  }

  switch (eventId) {
    case 'birth-mhow':
      return '/assets/portrait1.png';
    case 'elphinstone-matriculation':
      return '/assets/standing.png';
    case 'ba-bombay-1912':
      return '/assets/writing.png';
    case 'columbia-university-1913':
      return '/assets/deep-thinking.png';
    case 'lse-grays-inn-1916':
      return '/assets/standing.png';
    case 'problem-of-rupee-1923':
      return '/assets/writing.png';
    case 'bahishkrit-sabha-1924':
      return '/assets/documents/mahad-1927-p1.svg';
    case 'mahad-satyagraha-1927':
      return '/assets/documents/mahad-1927-p2.svg';
    case 'kalaram-mandir-1930':
      return '/assets/standing.png';
    case 'round-table-1930':
      return '/assets/speaking-bg.png';
    case 'poona-pact-1932':
      return '/assets/documents/poona-pact-1932-p1.svg';
    case 'yeola-declaration-1935':
      return '/assets/documents/poona-pact-1932-p2.svg';
    case 'annihilation-of-caste-1936':
      return '/assets/documents/aoc-1936-p1.svg';
    case 'ilp-labour-charter-1937':
      return '/assets/documents/aoc-1936-p2.svg';
    case 'labour-member-viceroy-1942':
      return '/assets/documents/audio-broadcast-disc.svg';
    case 'dubois-letter-1946':
      return '/assets/documents/letter-manuscript-dubois.svg';
    case 'states-and-minorities-1947':
      return '/assets/documents/states-minorities-1947.svg';
    case 'drafting-committee-chair-1947':
      return '/assets/documents/draft-constitution-1948.svg';
    case 'cad-opening-address-1948':
      return '/assets/documents/cad-art17-p1.svg';
    case 'article-17-adoption-1948':
      return '/assets/documents/cad-art17-p2.svg';
    case 'constitution-final-passage-1949':
      return '/assets/documents/cad-art17-p3.svg';
    case 'law-minister-hindu-code-1951':
      return '/assets/portrait1.png';
    case 'rajya-sabha-democracy-1952':
      return '/assets/documents/audio-broadcast-disc.svg';
    case 'buddha-and-his-dhamma-1956':
      return '/assets/documents/buddha-dhamma-1956.svg';
    case 'deekshabhoomi-conversion-1956':
    case 'mahaparinirvana-1956':
      return '/assets/documents/newsreel-footage-1956.svg';
    default:
      // Era fallback if event not recognized
      switch (eraId) {
        case 'early-life': return '/assets/1.jpeg';
        case 'higher-education': return '/assets/documents/rupee-1923-p1.svg';
        case 'social-reform': return '/assets/documents/mahad-1927-p1.svg';
        case 'political-movement': return '/assets/documents/aoc-1936-p1.svg';
        case 'constitutional-journey': return '/assets/documents/cad-art17-p1.svg';
        case 'later-years': return '/assets/documents/buddha-dhamma-1956.svg';
        default: return '/assets/documents/cad-art17-p1.svg';
      }
  }
}
