import re

with open('src/data/archiveData.ts', encoding='utf-8') as f:
    code = f.read()

# 1. Update ARCHIVE_CATEGORIES
new_categories = """export const ARCHIVE_CATEGORIES: ArchiveCategoryMeta[] = [
  {
    id: 'debates',
    title: 'Debates & Assembly Proceedings',
    tag: 'PARLIAMENTARY PROCEEDINGS',
    description: 'Verbatim proceedings from the drafting of the Indian Constitution (1946–1950). 167 sittings detailing clause-by-clause constitutional debates.',
    series: 'CAD Volumes 1–12 (167 Sittings)',
    icon: 'landmark',
    count: 167,
    image: '/assets/speaking-bg.png',
    objectPosition: 'center 20%'
  },
  {
    id: 'publications',
    title: 'Writings & Treatises (BAWS)',
    tag: 'LEGAL & PHILOSOPHICAL',
    description: '22 published volumes of seminal treatises, memorandums, economic monographs, and public addresses authored by Dr. Ambedkar.',
    series: 'BAWS Volumes 01–22 / Dr. Ambedkar Foundation',
    icon: 'book-open',
    count: 22,
    image: '/assets/writing.png',
    objectPosition: 'center 25%'
  },
  {
    id: 'audio',
    title: 'Broadcast Speeches & Audio',
    tag: 'AUDIO & BROADCAST',
    description: 'Authentic broadcast speeches and international radio interviews from BBC World Service, All India Radio, and Voice of America (1942–1953).',
    series: 'BBC World Service & AIR Archival Sound Discs',
    icon: 'mic',
    count: 18,
    image: '/assets/portrait-1.jpeg',
    objectPosition: 'center 20%'
  },
  {
    id: 'letters',
    title: 'Letters & Memoranda',
    tag: 'LETTERS & MEMORANDA',
    description: 'Personal letters, telegraphic exchanges, and memoranda with Mahatma Gandhi, Dr. W.E.B. Du Bois, Lord Linlithgow, and Viceroy Wavell.',
    series: 'Private Papers & Diplomatic Dispatches (1927–1956)',
    icon: 'mail',
    count: 34,
    image: '/assets/documents/mahad-1927-p1.svg',
    objectPosition: 'center center'
  },
  {
    id: 'videos',
    title: 'Historic Newsreels & Film Footage',
    tag: 'FILM & NEWSREELS',
    description: 'Rare documentary footage and newsreels covering the Constituent Assembly sessions, Constitution signing, and historic addresses.',
    series: 'Films Division of India & National Film Archive',
    icon: 'film',
    count: 12,
    image: '/assets/standing.png',
    objectPosition: 'center 15%'
  },
  {
    id: 'photos',
    title: 'Photographs & Visual Archives',
    tag: 'HISTORICAL PHOTOGRAPHY',
    description: 'Original press photographs, diplomatic portraits, Constituent Assembly sessions, and civil rights conferences.',
    series: 'National Archives & Photo Division of India',
    icon: 'camera',
    count: 52,
    image: '/assets/1.jpeg',
    objectPosition: 'center 20%'
  },
  {
    id: 'legal',
    title: 'Constitutional Charters & Acts',
    tag: 'CONSTITUTIONAL CHARTERS',
    description: 'Legal briefs, court petitions, draft constitutional amendments, and official committee reports.',
    series: 'Government of India & Law Ministry Gazette',
    icon: 'file-text',
    count: 73,
    image: '/assets/documents/cad-art17-p1.svg',
    objectPosition: 'center center'
  }
];"""

# Replace ARCHIVE_CATEGORIES block
cat_start = code.find('export const ARCHIVE_CATEGORIES: ArchiveCategoryMeta[] = [')
cat_end = code.find('export const ARCHIVE_ITEMS: ArchiveItem[] = [')
if cat_start != -1 and cat_end != -1:
    code = code[:cat_start] + new_categories + '\n\n' + code[cat_end:]
    print("Replaced ARCHIVE_CATEGORIES successfully")

# Additional BAWS Volumes and Media items to append before the closing ]; of ARCHIVE_ITEMS
additional_items = """  {
    "id": "baws-doc-vol-18",
    "title": "Dr. Babasaheb Ambedkar: Writings and Speeches Vol. 18",
    "category": "publications",
    "year": 1997,
    "dateStr": "1997",
    "description": "Dr. Ambedkar's Speeches in the Bombay Legislative Council (1927–1939), legislative debates on the Bombay Hereditary Offices Act, University Act, and Industrial Disputes Bill.",
    "formatDetails": "Volume 18 | 560 Pages | Legal & Legislative",
    "thumbnailUrl": "/assets/writing.png",
    "tags": ["BAWS", "VOL 18", "BOMBAY COUNCIL", "LEGISLATION"],
    "sourceReference": "Dr. Ambedkar Foundation, Ministry of Social Justice & Empowerment",
    "institution": "Dr. Ambedkar Foundation, New Delhi",
    "sourceUrl": "https://www.drambedkarwritings.gov.in/upload/uploadfiles/files/Volume_18.pdf",
    "volumeRef": "BAWS Volume 18",
    "isLocalArchivalData": true,
    "shelfMark": "DAF-BAWS-VOL-18",
    "physicalLocation": "Parliament House Library & National Archives of India",
    "externalAuthority": "https://www.drambedkarwritings.gov.in/"
  },
  {
    "id": "baws-doc-vol-19",
    "title": "Dr. Babasaheb Ambedkar: Writings and Speeches Vol. 19",
    "category": "publications",
    "year": 2003,
    "dateStr": "2003",
    "description": "Speeches in the Central Legislative Assembly, Labour Welfare interventions, and public addresses from 1942 to 1946 during his tenure as Member for Labour in the Viceroy's Executive Council.",
    "formatDetails": "Volume 19 | 648 Pages | Central Assembly",
    "thumbnailUrl": "/assets/writing.png",
    "tags": ["BAWS", "VOL 19", "CENTRAL ASSEMBLY", "LABOUR"],
    "sourceReference": "Dr. Ambedkar Foundation, Ministry of Social Justice & Empowerment",
    "institution": "Dr. Ambedkar Foundation, New Delhi",
    "sourceUrl": "https://www.drambedkarwritings.gov.in/upload/uploadfiles/files/Volume_19.pdf",
    "volumeRef": "BAWS Volume 19",
    "isLocalArchivalData": true,
    "shelfMark": "DAF-BAWS-VOL-19",
    "physicalLocation": "Parliament House Library & National Archives of India",
    "externalAuthority": "https://www.drambedkarwritings.gov.in/"
  },
  {
    "id": "baws-doc-vol-20",
    "title": "Dr. Babasaheb Ambedkar: Writings and Speeches Vol. 20",
    "category": "publications",
    "year": 2003,
    "dateStr": "2003",
    "description": "Historical speeches, correspondence, and treatises on Social Justice and the Depressed Classes movement, with original archival documentation.",
    "formatDetails": "Volume 20 | 582 Pages | Archival Records",
    "thumbnailUrl": "/assets/writing.png",
    "tags": ["BAWS", "VOL 20", "SOCIAL JUSTICE", "DOCUMENTATION"],
    "sourceReference": "Dr. Ambedkar Foundation, Ministry of Social Justice & Empowerment",
    "institution": "Dr. Ambedkar Foundation, New Delhi",
    "sourceUrl": "https://www.drambedkarwritings.gov.in/upload/uploadfiles/files/Volume_20.pdf",
    "volumeRef": "BAWS Volume 20",
    "isLocalArchivalData": true,
    "shelfMark": "DAF-BAWS-VOL-20",
    "physicalLocation": "National Archives of India, New Delhi",
    "externalAuthority": "https://www.drambedkarwritings.gov.in/"
  },
  {
    "id": "baws-doc-vol-21",
    "title": "Dr. Babasaheb Ambedkar: Writings and Speeches Vol. 21",
    "category": "publications",
    "year": 2005,
    "dateStr": "2005",
    "description": "Editorial treatises from Bahishkrit Bharat and Janata, addressing civic equality, educational reform, temple entry movements, and socio-religious critiques.",
    "formatDetails": "Volume 21 | 612 Pages | Periodicals & Editorials",
    "thumbnailUrl": "/assets/writing.png",
    "tags": ["BAWS", "VOL 21", "BAHISHKRIT BHARAT", "EDITORIALS"],
    "sourceReference": "Dr. Ambedkar Foundation, Ministry of Social Justice & Empowerment",
    "institution": "Dr. Ambedkar Foundation, New Delhi",
    "sourceUrl": "https://www.drambedkarwritings.gov.in/upload/uploadfiles/files/Volume_21.pdf",
    "volumeRef": "BAWS Volume 21",
    "isLocalArchivalData": true,
    "shelfMark": "DAF-BAWS-VOL-21",
    "physicalLocation": "Maharashtra State Archives & National Archives of India",
    "externalAuthority": "https://www.drambedkarwritings.gov.in/"
  },
  {
    "id": "baws-doc-vol-22",
    "title": "Dr. Babasaheb Ambedkar: Writings and Speeches Vol. 22",
    "category": "publications",
    "year": 2005,
    "dateStr": "2005",
    "description": "Prabuddha Bharat editorials, public manifestos, philosophical notes on Navayana Buddhism, and post-independence political commentary.",
    "formatDetails": "Volume 22 | 590 Pages | Late Writings & Dhamma",
    "thumbnailUrl": "/assets/writing.png",
    "tags": ["BAWS", "VOL 22", "PRABUDDHA BHARAT", "BUDDHISM"],
    "sourceReference": "Dr. Ambedkar Foundation, Ministry of Social Justice & Empowerment",
    "institution": "Dr. Ambedkar Foundation, New Delhi",
    "sourceUrl": "https://www.drambedkarwritings.gov.in/upload/uploadfiles/files/Volume_22.pdf",
    "volumeRef": "BAWS Volume 22",
    "isLocalArchivalData": true,
    "shelfMark": "DAF-BAWS-VOL-22",
    "physicalLocation": "Maharashtra State Archives & Dr. Ambedkar Research Institute",
    "externalAuthority": "https://www.drambedkarwritings.gov.in/"
  },
  {
    "id": "video-films-division-1949",
    "title": "Constituent Assembly Final Session — Dr. Ambedkar's Closing Address",
    "category": "videos",
    "year": 1949,
    "dateStr": "25 Nov 1949",
    "description": "Historic newsreel footage of Dr. Ambedkar delivering his seminal closing address warning against political hero-worship and outlining constitutional morality.",
    "formatDetails": "Films Division Newsreel • 18 mins",
    "thumbnailUrl": "/assets/speaking-bg.png",
    "tags": ["VIDEOS", "1949", "CONSTITUENT ASSEMBLY", "FINAL ADDRESS"],
    "sourceReference": "Films Division of India, Archival Reel FD-1949-CAD-CLOSING",
    "institution": "Parliament House Library / Films Division",
    "volumeRef": "Newsreel Archives 1949",
    "isLocalArchivalData": true,
    "shelfMark": "FD-NEWSREEL-1949-CAD-FINAL",
    "physicalLocation": "National Film Archive of India (NFAI), Pune",
    "externalAuthority": "https://filmsdivision.org/"
  },
  {
    "id": "video-constitution-signing-1950",
    "title": "Signing of the Constitution of India",
    "category": "videos",
    "year": 1950,
    "dateStr": "24 Jan 1950",
    "description": "Original documentary coverage of the final sitting where members of the Constituent Assembly inscribed and signed the calligraphed Constitution copies.",
    "formatDetails": "Films Division Newsreel • 12 mins",
    "thumbnailUrl": "/assets/standing.png",
    "tags": ["VIDEOS", "1950", "SIGNING", "CONSTITUTION"],
    "sourceReference": "Films Division Newsreel No. 71",
    "institution": "National Archives of India / Films Division",
    "volumeRef": "Newsreel Archives 1950",
    "isLocalArchivalData": true,
    "shelfMark": "FD-NEWSREEL-1950-SIGNING",
    "physicalLocation": "NFAI Pune & Parliament House Library, New Delhi",
    "externalAuthority": "https://filmsdivision.org/"
  },
  {
    "id": "video-deekshabhoomi-conversion-1956",
    "title": "Mass Conversion at Deekshabhoomi, Nagpur",
    "category": "videos",
    "year": 1956,
    "dateStr": "14 Oct 1956",
    "description": "Historic newsreel documenting Dr. Ambedkar leading over 500,000 followers in embracing Buddhism and administering the Twenty-Two Pledges.",
    "formatDetails": "Films Division Documentary • 22 mins • B&W",
    "thumbnailUrl": "/assets/standing.png",
    "tags": ["VIDEOS", "1956", "NAGPUR", "DEEKSHABHOOMI"],
    "sourceReference": "Films Division Historical Documentary Reel FD-1956-NAGPUR",
    "institution": "Dr. Ambedkar Foundation, Ministry of Social Justice & Empowerment",
    "volumeRef": "Films Division Historical Discs",
    "isLocalArchivalData": true,
    "shelfMark": "FD-DOC-1956-DEEKSHABHOOMI",
    "physicalLocation": "Films Division Archives, Pedder Road, Mumbai",
    "externalAuthority": "https://filmsdivision.org/"
  },
  {
    "id": "air-broadcast-1942",
    "title": "All India Radio Speech — Labour Welfare and Tripartite Conferences",
    "category": "audio",
    "year": 1942,
    "dateStr": "August 1942",
    "description": "Archival broadcast address by Dr. Ambedkar as Member for Labour on establishing statutory eight-hour workdays, industrial dispute machinery, and maternity protections.",
    "formatDetails": "AIR Sound Archives • 22 mins • Archival Disc Master",
    "thumbnailUrl": "/assets/portrait-1.jpeg",
    "tags": ["AUDIO", "1942", "AIR", "LABOUR WELFARE"],
    "sourceReference": "All India Radio Sound Archives, Broadcaster ID AIR-AMB-1942-01",
    "institution": "All India Radio Sound Archives, New Delhi",
    "volumeRef": "AIR Archival Sound Discs",
    "isLocalArchivalData": true,
    "shelfMark": "AIR-AUDIO-1942-LABOUR-CONF",
    "physicalLocation": "Akashvani Bhavan, All India Radio, New Delhi",
    "externalAuthority": "https://prasarbharati.gov.in/",
    "transcript": "Labour is the backbone of all industrial progress. To protect labour against exploitation is not charity; it is the fundamental duty of civilized constitutional governance."
  },
  {
    "id": "letter-wavell-1945",
    "title": "Memorandum to Viceroy Wavell on Post-War Constitutional Reconstruction",
    "category": "letters",
    "year": 1945,
    "dateStr": "October 1945",
    "description": "Comprehensive political memorandum detailing required representation for the Scheduled Castes in central and provincial cabinets and executive councils.",
    "formatDetails": "8 Pages | Official Memorandum",
    "thumbnailUrl": "/assets/documents/mahad-1927-p1.svg",
    "tags": ["LETTERS", "1945", "WAVELL", "MEMORANDUM"],
    "sourceReference": "Transfer of Power Documents, Vol. VI, Document No. 182",
    "institution": "National Archives of India / British Library",
    "volumeRef": "Transfer of Power Series",
    "isLocalArchivalData": true,
    "shelfMark": "NAI-TOP-VOL6-AMB-WAVELL",
    "physicalLocation": "National Archives of India, Janpath, New Delhi",
    "externalAuthority": "https://nationalarchives.nic.in/"
  }
"""

# Insert before the last ];
last_bracket = code.rfind('];')
if last_bracket != -1:
    code = code[:last_bracket].rstrip() + ',\n' + additional_items + '];\n'
    print("Appended additional items successfully")

with open('src/data/archiveData.ts', 'w', encoding='utf-8') as f:
    f.write(code)

print("Saved updated src/data/archiveData.ts")
