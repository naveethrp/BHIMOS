import { TimelineEra, TimelineEvent } from '../types';

export const TIMELINE_ERAS: TimelineEra[] = [
  { id: 'early-life', title: 'Early Life & Education', yearRange: '1891–1912', iconName: 'baby' },
  { id: 'higher-education', title: 'Higher Education Abroad', yearRange: '1913–1923', iconName: 'graduation-cap' },
  { id: 'social-reform', title: 'Social Reform & Civil Rights', yearRange: '1924–1935', iconName: 'users' },
  { id: 'political-movement', title: 'Political Movement & Labour', yearRange: '1936–1946', iconName: 'landmark' },
  { id: 'constitutional-journey', title: 'Constitutional Journey', yearRange: '1947–1950', iconName: 'scale' },
  { id: 'later-years', title: 'Later Years & Legacy', yearRange: '1951–1956', iconName: 'award' }
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  // --- Early Life & Education (1891–1912) ---
  {
    id: 'birth-mhow',
    eraId: 'early-life',
    year: 1891,
    date: 'April 14, 1891',
    title: 'Birth in Mhow, Central Provinces',
    summary: 'Born as the 14th child of Subedar Major Ramji Maloji Sakpal and Bhimabai in the military cantonment of Mhow (now Dr. Ambedkar Nagar, Madhya Pradesh).',
    thumbnailUrl: '/assets/portrait1.png',
    historicalContext: 'Born into the Mahar (Dalit) community, facing systemic caste discrimination from birth in colonial India. His father served in the British Indian Army, providing some access to education.',
    ambedkarRole: 'Overcame severe institutional exclusions — forced to sit outside classrooms on gunny sacks, denied water access — to pursue formal schooling.',
    impact: 'Formed his lifelong resolve to eliminate untouchability and demand human dignity under rule of law.',
    keyPeople: ['Ramji Maloji Sakpal', 'Bhimabai Sakpal'],
    sources: [
      { id: 'birth-record', title: 'Birth Certificate / Military Records', type: 'document', meta: 'Mhow Cantonment Records, 1891', url: 'https://drambedkarwritings.gov.in/' }
    ]
  },
  {
    id: 'elphinstone-matriculation',
    eraId: 'early-life',
    year: 1907,
    date: '1907',
    title: 'Matriculation from Elphinstone High School, Bombay',
    summary: 'Passed matriculation examination, becoming the first from his Mahar community to achieve this milestone.',
    thumbnailUrl: '/assets/standing.png',
    historicalContext: 'A landmark public celebration was organized by community elders in Bombay. Scholar K. A. Keluskar presented him with a biography of the Buddha, planting seeds for his later conversion.',
    ambedkarRole: 'Demonstrated scholastic brilliance despite segregation, securing philanthropic sponsorship from Maharaja Sayajirao Gaekwad III of Baroda.',
    impact: 'Pioneered higher education opportunities for millions of Depressed Classes citizens.',
    keyPeople: ['K. A. Keluskar', 'Maharaja Sayajirao Gaekwad III'],
    sources: [
      { id: 'matric-record', title: 'Elphinstone High School Records', type: 'document', meta: 'Bombay University Archives, 1907', url: 'https://drambedkarwritings.gov.in/' }
    ]
  },
  {
    id: 'ba-bombay-1912',
    eraId: 'early-life',
    year: 1912,
    date: '1912',
    title: 'B.A. in Political Science & Economics, Elphinstone College',
    summary: 'Graduated with Bachelor of Arts from University of Bombay, majoring in Persian, English Literature, Economics, and Political Science.',
    thumbnailUrl: '/assets/writing.png',
    historicalContext: 'Entered Baroda State service briefly before securing the Gaekwad fellowship for postgraduate studies in the United States.',
    ambedkarRole: 'Rigorous scholastic training that prepared him for advanced academic fellowships at Columbia University and LSE.',
    impact: 'Established the foundation for his institutional economic analyses of Indian public finance.',
    sources: [
      { id: 'ba-degree', title: 'University of Bombay Degree Certificate', type: 'document', meta: 'Elphinstone College Records, 1912', url: 'https://drambedkarwritings.gov.in/' }
    ]
  },

  // --- Higher Education Abroad (1913–1923) ---
  {
    id: 'columbia-university-1913',
    eraId: 'higher-education',
    year: 1913,
    date: 'July 1913',
    title: 'Columbia University Fellowship — New York',
    summary: 'Arrived in New York on a Baroda State fellowship to pursue postgraduate studies at Columbia University under John Dewey, Edwin Seligman, and James Shotwell.',
    thumbnailUrl: '/assets/deep-thinking.png',
    historicalContext: 'Studied under American pragmatist philosophers and economists. The intellectual environment shaped his democratic ethos and constitutional thinking.',
    ambedkarRole: 'Earned M.A. in 1915 (thesis: "Ancient Indian Commerce") and completed Ph.D. in 1917 ("The Evolution of Provincial Finance in British India").',
    impact: 'Formulated the theoretical framework for democratic equality, institutional checks, and social ethics that informed his later constitutional work.',
    keyPeople: ['John Dewey', 'Edwin Seligman', 'James Shotwell'],
    sources: [
      { id: 'columbia-phd', title: 'Columbia University Doctoral Dissertation', type: 'document', meta: 'Columbia University Archives, 1917', url: 'https://drambedkarwritings.gov.in/' }
    ]
  },
  {
    id: 'lse-grays-inn-1916',
    eraId: 'higher-education',
    year: 1916,
    date: '1916–1921',
    title: 'London School of Economics & Gray\'s Inn',
    summary: 'Admitted to Gray\'s Inn for the Bar and enrolled at LSE for D.Sc. in Economics. Undertook rigorous research in the British Museum reading room, often 16 hours daily.',
    thumbnailUrl: '/assets/standing.png',
    historicalContext: 'Faced severe financial constraints when Baroda scholarship was terminated. Completed D.Sc. thesis "The Problem of the Rupee" and was called to the Bar in 1922.',
    ambedkarRole: 'Researched imperial monetary economics and British provincial administration. Attained dual qualifications as constitutional barrister and doctor of science in economics.',
    impact: 'Provided critical evidence to the Royal Commission on Indian Currency (1925) that informed the founding of the Reserve Bank of India (1935).',
    keyPeople: ['Edwin Cannan', 'Herbert Foxwell'],
    sources: [
      { id: 'lse-dsc', title: 'LSE Doctoral Thesis — The Problem of the Rupee', type: 'document', meta: 'LSE Library / BAWS Vol. 6, 1923', url: 'https://drambedkarwritings.gov.in/content/writings-and-speeches/volume-06.php' },
      { id: 'hiltown-evidence', title: 'Evidence before Royal Commission on Indian Currency', type: 'document', meta: 'Minutes of Evidence Vol. IV, 1925', url: 'https://drambedkarwritings.gov.in/content/writings-and-speeches/volume-06.php' }
    ]
  },
  {
    id: 'problem-of-rupee-1923',
    eraId: 'higher-education',
    year: 1923,
    date: '1923',
    title: 'The Problem of the Rupee Published — D.Sc. Awarded',
    summary: 'Awarded Doctor of Science (Economics) by University of London and published foundational treatise on Indian currency system, analyzing monetary instability under gold-exchange standard.',
    thumbnailUrl: '/assets/writing.png',
    historicalContext: 'His empirical analysis on currency stability was utilized by the Hilton Young Commission (1925) whose recommendations led to the Reserve Bank of India Act, 1934.',
    ambedkarRole: 'Argued for a gold currency standard with price-level stabilization, establishing scientific central banking principles for India.',
    impact: 'Institutionalized macroeconomic fiscal discipline and central banking architecture in India.',
    sources: [
      { id: 'problem-rupee-book', title: 'The Problem of the Rupee: Its Origin and Solution', type: 'publication', meta: 'P.S. King & Son, London / BAWS Vol. 6', url: 'https://drambedkarwritings.gov.in/content/writings-and-speeches/volume-06.php' }
    ]
  },

  // --- Social Reform & Civil Rights (1924–1935) ---
  {
    id: 'bahishkrit-hitakarini-1924',
    eraId: 'social-reform',
    year: 1924,
    date: 'July 20, 1924',
    title: 'Bahishkrit Hitakarini Sabha Founded',
    summary: 'Established the central institution for the welfare of Depressed Classes with the historic motto: "Educate, Agitate, Organize."',
    thumbnailUrl: '/assets/standing.png',
    historicalContext: 'Created free student hostels, libraries, and industrial training workshops across Maharashtra, shifting from petitioning authorities to building self-reliant community power.',
    ambedkarRole: 'Provided organized leadership for the modern civil rights era for over 60 million socially marginalized citizens.',
    impact: 'Launched systematic educational and economic upliftment infrastructure for Dalit communities.',
    keyPeople: ['K. A. Keluskar', 'M. R. Jayakar'],
    sources: [
      { id: 'bhs-founding', title: 'Bahishkrit Hitakarini Sabha Trust Deed', type: 'document', meta: 'Registration Records, Bombay, 1924', url: 'https://drambedkarwritings.gov.in/' }
    ]
  },
  {
    id: 'mahad-satyagraha-1927',
    eraId: 'social-reform',
    year: 1927,
    date: 'March 20, 1927',
    title: 'Mahad Satyagraha — Equal Water Rights at Chavdar Tale',
    summary: 'Led a peaceful march of ~3,000 satyagrahis to the Chavdar Tale tank in Mahad to assert the right to public water, defying caste prohibitions.',
    thumbnailUrl: '/assets/documents/mahad-1927-p1.svg',
    historicalContext: 'The Bole Resolution (1923) had declared municipal tanks open to all, but orthodox groups violently resisted implementation. Ambedkar drank from the tank maintaining absolute nonviolence.',
    ambedkarRole: 'Transformed a local water-rights struggle into a national declaration of human dignity. Celebrated annually as Social Empowerment Day.',
    impact: 'Heralded as India\'s Declaration of Human Rights; established nonviolent civil disobedience as a tool for caste annihilation.',
    keyPeople: ['Anant Vinayak Chitre', 'Gangadhar Nilkanth Sahasrabuddhe'],
    sources: [
      { id: 'mahad-declaration', title: 'Mahad Satyagraha Declaration Leaflet', type: 'document', meta: 'Bahishkrit Hitakarini Sabha Archives, 1927', url: 'https://drambedkarwritings.gov.in/' }
    ]
  },
  {
    id: 'mooknayak-1920',
    eraId: 'social-reform',
    year: 1920,
    date: 'January 31, 1920',
    title: 'Mooknayak (Leader of the Voiceless) — First Issue Published',
    summary: 'Launched the first Marathi fortnightly newspaper for Depressed Classes, giving voice to the voiceless and exposing caste atrocities.',
    thumbnailUrl: '/assets/documents/aoc-1936-p1.svg',
    historicalContext: 'Funded by Chatrapati Shahu Maharaj of Kolhapur. Became the primary platform for Ambedkar\'s early political philosophy and mobilization.',
    ambedkarRole: 'Editor and principal writer, articulating the political consciousness of the untouchable masses.',
    impact: 'Established the first sustained Dalit public sphere in print media.',
    sources: [
      { id: 'mooknayak-vol1', title: 'Mooknayak, Vol. 1, Issue 1', type: 'publication', meta: 'January 1920, Kolhapur', url: 'https://drambedkarwritings.gov.in/' }
    ]
  },
  {
    id: 'poona-pact-1932',
    eraId: 'social-reform',
    year: 1932,
    date: 'September 24, 1932',
    title: 'Poona Pact — 148 Reserved Seats Secured',
    summary: 'Negotiated historic agreement with Mahatma Gandhi at Yerwada Central Jail, replacing separate electorates with joint electorates and doubling reserved seats from 71 to 148.',
    thumbnailUrl: '/assets/documents/poona-pact-1932-p1.svg',
    historicalContext: 'Gandhi undertook fast unto death against the Communal Award (1932) granting separate electorates. Ambedkar negotiated under immense pressure, preventing civil war while securing unprecedented representation.',
    ambedkarRole: 'Statesmanlike negotiation balancing community survival with national unity. Secured permanent constitutional reservation principles.',
    impact: 'Established the template for Scheduled Caste legislative representation in India\'s democratic framework.',
    keyPeople: ['Mahatma Gandhi', 'Madan Mohan Malaviya', 'C. Rajagopalachari', 'M. C. Rajah'],
    sources: [
      { id: 'poona-pact-text', title: 'Poona Pact Agreement — Official Protocol', type: 'document', meta: 'Home Poll. File 41/5/32, National Archives', url: 'https://drambedkarwritings.gov.in/' },
      { id: 'gandhi-ambedkar-correspondence', title: 'Gandhi-Ambedkar Correspondence (Sept 1932)', type: 'document', meta: 'Sabarmati Ashram Archives / National Archives', url: 'https://drambedkarwritings.gov.in/' }
    ]
  },
  {
    id: 'kalaram-temple-1930',
    eraId: 'social-reform',
    year: 1930,
    date: 'March 2, 1930',
    title: 'Kalaram Temple Entry Satyagraha, Nashik',
    summary: 'Led a nonviolent campaign for Dalit entry into the Kalaram Temple, Nashik, challenging religious exclusion sanctioned by tradition.',
    thumbnailUrl: '/assets/standing.png',
    historicalContext: 'Part of the broader temple entry movement. Met with violent resistance from orthodox Hindus. The satyagraha continued for years, symbolizing the fight for spiritual equality.',
    ambedkarRole: 'Mobilized thousands in disciplined nonviolent protest, framing temple entry as a civil rights issue.',
    impact: 'Catalyzed the temple entry movement across India, leading to the Temple Entry Authorization Act (1947) in princely states.',
    sources: [
      { id: 'kalaram-records', title: 'Kalaram Temple Satyagraha Records', type: 'document', meta: 'BAWS Vol. 17, Part 2', url: 'https://drambedkarwritings.gov.in/' }
    ]
  },

  // --- Political Movement & Labour (1936–1946) ---
  {
    id: 'annihilation-of-caste-1936',
    eraId: 'political-movement',
    year: 1936,
    date: 'May 1936',
    title: '"Annihilation of Caste" Published — Self-Published After Conference Cancellation',
    summary: 'The Jat-Pat-Todak Mandal cancelled its Lahore conference rather than allow Ambedkar to deliver this address. He self-published the treatise, selling thousands of copies.',
    thumbnailUrl: '/assets/documents/aoc-1936-p1.svg',
    historicalContext: 'The undelivered speech became the definitive philosophical critique of caste as a graded hierarchy of labourers, not merely division of labour.',
    ambedkarRole: 'Debated Mahatma Gandhi on reason, liberty, and scriptural authority. Established caste annihilation as prerequisite for nation-building.',
    impact: 'Regarded globally as one of the 20th century\'s most profound texts on social philosophy and human liberation.',
    sources: [
      { id: 'aoc-first-edition', title: 'Annihilation of Caste — First Edition', type: 'publication', meta: 'Bharat Bhushan Press, Bombay / BAWS Vol. 1', url: 'https://drambedkarwritings.gov.in/content/writings-and-speeches/volume-01.php' }
    ]
  },
  {
    id: 'independent-labour-party-1936',
    eraId: 'political-movement',
    year: 1936,
    date: 'August 1936',
    title: 'Independent Labour Party Founded',
    summary: 'Formed the ILP to represent workers and Depressed Classes in electoral politics, winning 14 of 17 contested seats in the 1937 Bombay Presidency elections.',
    thumbnailUrl: '/assets/standing.png',
    historicalContext: 'First political party in India explicitly linking caste oppression with class exploitation, advocating land reform, workers\' rights, and universal suffrage.',
    ambedkarRole: 'Party president and chief ideologue, translating social reform into electoral politics.',
    impact: 'Established Dalits as an independent political force in provincial legislatures.',
    keyPeople: ['N. S. Kajrolkar', 'B. T. Ranadive'],
    sources: [
      { id: 'ilp-manifesto', title: 'ILP Manifesto & Election Programme', type: 'document', meta: 'BAWS Vol. 17, Part 1, 1936', url: 'https://drambedkarwritings.gov.in/' }
    ]
  },
  {
    id: 'viceroys-council-1942',
    eraId: 'political-movement',
    year: 1942,
    date: 'July 1942',
    title: 'Labour Member, Viceroy\'s Executive Council',
    summary: 'Appointed Member for Labour, Irrigation, and Power — the first Dalit in the Viceroy\'s cabinet. Authored India\'s modern labour code.',
    thumbnailUrl: '/assets/speaking-bg.png',
    historicalContext: 'Pioneered wartime economic planning: reduced factory hours from 12 to 8, instituted maternity benefits, created Employees State Insurance (ESI) scheme, established Tripartite Labour Conference, initiated Damodar Valley Corporation.',
    ambedkarRole: 'Architected the legislative architecture for modern Indian labour protections and river valley development.',
    impact: 'Laid foundations for India\'s post-independence labour laws, social security, and multipurpose river valley projects.',
    keyPeople: ['Viceroy Lord Linlithgow', 'B. N. Rau'],
    sources: [
      { id: 'labour-reforms', title: 'Labour Legislation (1942–1946)', type: 'document', meta: 'BAWS Vol. 10 / Government Gazettes', url: 'https://drambedkarwritings.gov.in/content/writings-and-speeches/volume-10.php' }
    ]
  },
  {
    id: 'scheduled-castes-federation-1942',
    eraId: 'political-movement',
    year: 1942,
    date: '1942',
    title: 'All India Scheduled Castes Federation Formed',
    summary: 'Transformed the ILP into SCF as a national platform for Dalit political representation, demanding separate electorates and constitutional safeguards.',
    thumbnailUrl: '/assets/standing.png',
    historicalContext: 'Submitted "States and Minorities" memorandum (1947) to the Constituent Assembly, outlining a comprehensive Fundamental Rights charter with State Socialism.',
    ambedkarRole: 'National president, articulating Dalit political demands at the highest constitutional forums.',
    impact: 'Ensured Dalit voice in the Constituent Assembly negotiations and the Cabinet Mission Plan discussions.',
    sources: [
      { id: 'scf-states-minorities', title: 'States and Minorities Memorandum', type: 'document', meta: 'BAWS Vol. 1, Section 5, March 1947', url: 'https://drambedkarwritings.gov.in/content/writings-and-speeches/volume-01.php' }
    ]
  },

  // --- Constitutional Journey (1947–1950) ---
  {
    id: 'drafting-committee-constitution',
    eraId: 'constitutional-journey',
    year: 1947,
    date: 'August 29, 1947',
    title: 'Elected Chairman, Drafting Committee of the Constituent Assembly',
    summary: 'Unanimously appointed to lead the 7-member Drafting Committee to prepare the Constitution of India for 350 million citizens.',
    thumbnailUrl: '/assets/documents/cad-art17-p1.svg',
    historicalContext: 'Following independence and partition, the Constituent Assembly (299 members) undertook synthesis of democratic traditions into an enduring supreme legal code.',
    ambedkarRole: 'Chief Architect — piloted 395 Articles and 8 Schedules through 114 sittings of line-by-line debate over 2 years, 11 months, 18 days.',
    impact: 'Constructed the world\'s most comprehensive democratic constitution with fundamental rights, independent judiciary, and universal adult franchise.',
    keyPeople: ['B. N. Rau (Constitutional Advisor)', 'Alladi Krishnaswami Ayyar', 'N. Gopalaswami Ayyangar', 'K. M. Munshi', 'Mohammad Saadullah', 'B. L. Mitter', 'D. P. Khaitan'],
    sources: [
      { id: 'cad-vol7-intro', title: 'Introducing the Draft Constitution (CAD Vol. VII)', type: 'debate', meta: 'Parliament of India, 4 Nov 1948', url: 'https://www.constitutionofindia.net/constitution-assembly-debates/volume/7/1948-11-04' },
      { id: 'drafting-committee-proceedings', title: 'Drafting Committee Proceedings', type: 'document', meta: 'Constituent Assembly Records, National Archives', url: 'https://drambedkarwritings.gov.in/' },
      { id: 'constitution-1949', title: 'The Constitution of India (1949)', type: 'publication', meta: 'Parliament Archives — First Enacted Edition', url: 'https://www.constitutionofindia.net/' }
    ],
    quote: {
      text: 'We are going to enter into a life of contradictions. In politics we will have equality and in social and economic life we will have inequality.',
      author: 'Dr. B. R. Ambedkar (Address to Constituent Assembly, 25 Nov 1949)'
    }
  },
  {
    id: 'article17-adoption-1948',
    eraId: 'constitutional-journey',
    year: 1948,
    date: 'November 29, 1948',
    title: 'Article 17 Adopted — Untouchability Abolished Unconditionally',
    summary: 'The Constituent Assembly unanimously adopted Article 11 (renumbered Article 17), declaring untouchability abolished in all forms and its practice an offence punishable by law.',
    thumbnailUrl: '/assets/documents/cad-art17-p2.svg',
    historicalContext: 'Draft Article 11 was brought before the floor and cheered across political lines as a transformative moral victory for humanity.',
    ambedkarRole: 'Defended unconditional, non-derogable wording making enforcement of any disability arising from untouchability a criminal offence.',
    impact: 'Eradicated institutionalized social segregation from the legal foundation of modern India.',
    sources: [
      { id: 'cad-vol7-art17', title: 'CAD Vol. VII — Article 17 Debate', type: 'debate', meta: '29 Nov 1948, pp. 659–669', url: 'https://www.constitutionofindia.net/constitution-assembly-debates/volume/7/1948-11-29' }
    ]
  },
  {
    id: 'article32-soul-1948',
    eraId: 'constitutional-journey',
    year: 1948,
    date: 'November 9, 1948',
    title: 'Article 32 Defended — "The Very Soul and Heart of the Constitution"',
    summary: 'Dr. Ambedkar\'s passionate defense of the Right to Constitutional Remedies, establishing the Supreme Court as the guardian of fundamental rights with original jurisdiction.',
    thumbnailUrl: '/assets/writing.png',
    historicalContext: 'Debate on Draft Article 25 (Article 32). Ambedkar argued that without judicial enforcement, fundamental rights would be mere pious declarations.',
    ambedkarRole: 'Articulated the doctrinal basis for judicial review and the Supreme Court\'s role as sentinel on the qui vive.',
    impact: 'Established the most powerful fundamental rights enforcement mechanism in any Commonwealth constitution.',
    sources: [
      { id: 'cad-vol7-art32', title: 'CAD Vol. VII — Article 32 Debate', type: 'debate', meta: '9 Nov 1948, pp. 450–457', url: 'https://www.constitutionofindia.net/constitution-assembly-debates/volume/7/1948-11-09' }
    ]
  },
  {
    id: 'final-cad-address-1949',
    eraId: 'constitutional-journey',
    year: 1949,
    date: 'November 25, 1949',
    title: 'Final Address to Constituent Assembly — Three Warnings',
    summary: 'Delivered historic closing speech on adoption of the Constitution, articulating the doctrine of constitutional morality and warning against hero-worship (bhakti) in politics.',
    thumbnailUrl: '/assets/standing.png',
    historicalContext: 'Concluding the three-year drafting process before formal adoption on 26 November 1949. The speech remains the definitive philosophical touchstone for Indian constitutional jurisprudence.',
    ambedkarRole: 'Warned that political democracy cannot last unless social democracy lies at its base. Identified three threats: hero-worship, unconstitutional methods, and social-economic inequality.',
    impact: 'Became the foundational text for constitutional morality doctrine in Supreme Court jurisprudence.',
    sources: [
      { id: 'cad-vol11-final', title: 'CAD Vol. XI — Final Address', type: 'debate', meta: '25 Nov 1949, pp. 972–981', url: 'https://www.constitutionofindia.net/constitution-assembly-debates/volume/11/1949-11-25' }
    ],
    quote: {
      text: 'Bhakti in religion may be a road to the salvation of the soul. But in politics, Bhakti or hero-worship is a sure road to degradation and to eventual dictatorship.',
      author: 'Dr. B. R. Ambedkar (25 November 1949)'
    }
  },
  {
    id: 'constitution-enacted-1950',
    eraId: 'constitutional-journey',
    year: 1950,
    date: 'January 26, 1950',
    title: 'Constitution of India Comes into Force — Republic Day',
    summary: 'The Constitution of India came into full legal force, establishing India as a Sovereign Democratic Republic with Dr. Rajendra Prasad as first President.',
    thumbnailUrl: '/assets/documents/cad-art17-p3.svg',
    historicalContext: 'Marked the transition from British dominion to sovereign constitutional republic. Dr. Ambedkar, as first Law Minister, oversaw ceremonial enactment and initial institutional implementation.',
    ambedkarRole: 'As Minister of Law, supervised the swearing-in of the first President and the commencement of constitutional governance.',
    impact: 'Empowered hundreds of millions with fundamental rights, independent judiciary, universal adult franchise, and affirmative action.',
    sources: [
      { id: 'constitution-gazette', title: 'Constitution of India — Gazette Notification', type: 'publication', meta: 'Government of India, 26 Jan 1950', url: 'https://www.constitutionofindia.net/' }
    ]
  },

  // --- Later Years & Legacy (1951–1956) ---
  {
    id: 'hindu-code-bill-resignation-1951',
    eraId: 'later-years',
    year: 1951,
    date: 'September 27, 1951',
    title: 'Resignation as Law Minister — Hindu Code Bill Defeat',
    summary: 'Resigned from Nehru\'s cabinet after the Hindu Code Bill (granting women equal inheritance, divorce rights, banning polygamy) was stalled by conservative opposition in Parliament.',
    thumbnailUrl: '/assets/speaking-bg.png',
    historicalContext: 'Ambedkar viewed the bill as essential to completing the Constitution\'s promise of equality. His resignation statement declared women\'s rights a matter of moral conscience.',
    ambedkarRole: 'Chose principle over position, demonstrating that constitutional morality transcends political expediency.',
    impact: 'The bill\'s provisions were later enacted piecemeal (1955–56). His resignation remains a landmark in Indian political ethics.',
    sources: [
      { id: 'resignation-statement', title: 'Statement on Resignation from Cabinet', type: 'document', meta: 'Parliament Secretariat, 10 Oct 1951 / BAWS Vol. 14', url: 'https://drambedkarwritings.gov.in/content/writings-and-speeches/volume-14.php' }
    ]
  },
  {
    id: 'deekshabhoomi-conversion-1956',
    eraId: 'later-years',
    year: 1956,
    date: 'October 14, 1956',
    title: 'Mass Conversion to Buddhism at Deekshabhoomi, Nagpur',
    summary: 'Along with ~500,000 followers, formally embraced Buddhism by taking the Three Refuges, Five Precepts, and 22 vows at Deekshabhoomi, fulfilling his 1935 pledge.',
    thumbnailUrl: '/assets/deep-thinking.png',
    historicalContext: 'Chose Buddhism for its principles of Prajna (wisdom), Karuna (compassion), and Samata (equality) — a rational, non-theistic path to human liberation from caste.',
    ambedkarRole: 'Administered the vows in an unprecedented nonviolent moral revolution, initiating the Navayana Buddhist movement.',
    impact: 'Created an egalitarian spiritual identity for millions of marginalized communities; revived Buddhism in modern India.',
    keyPeople: ['Savita Ambedkar', 'Bhadant Anand Kausalyayan'],
    sources: [
      { id: 'deekshabhoomi-speech', title: 'Speech at Deekshabhoomi — Why I Embraced Buddhism', type: 'document', meta: '15 Oct 1956 / BAWS Vol. 17, Part 3', url: 'https://drambedkarwritings.gov.in/' },
      { id: 'buddha-dhamma', title: 'The Buddha and His Dhamma', type: 'publication', meta: 'BAWS Vol. 11 (Posthumous, 1957)', url: 'https://drambedkarwritings.gov.in/content/writings-and-speeches/volume-11.php' }
    ],
    quote: {
      text: 'I have embraced the religion of the Buddha because it teaches three principles in combination: Prajna (understanding against superstition), Karuna (love/compassion), and Samata (equality).',
      author: 'Dr. B. R. Ambedkar (Nagpur, 14 October 1956)'
    }
  },
  {
    id: 'mahaparinirvana-1956',
    eraId: 'later-years',
    year: 1956,
    date: 'December 6, 1956',
    title: 'Mahaparinirvana — Passing Away in Delhi',
    summary: 'Dr. B. R. Ambedkar passed away in his sleep at 26 Alipur Road, Delhi, aged 65. His last rites were performed at Chaitya Bhoomi, Mumbai, attended by millions.',
    thumbnailUrl: '/assets/writing.png',
    historicalContext: 'Completed "The Buddha and His Dhamma" just days before. The nation mourned the architect of its Constitution and champion of the oppressed.',
    ambedkarRole: 'Left an enduring legacy as the Father of the Indian Constitution, champion of human rights, and liberator of millions from caste bondage.',
    impact: 'His vision continues to shape Indian democracy, social justice movements, and constitutional jurisprudence globally.',
    sources: [
      { id: 'obituary', title: 'Parliamentary Obituary References', type: 'document', meta: 'Lok Sabha & Rajya Sabha Records, Dec 1956', url: 'https://drambedkarwritings.gov.in/' }
    ]
  },
  {
    id: 'bharat-ratna-1990',
    eraId: 'later-years',
    year: 1990,
    date: 'April 14, 1990',
    title: 'Bharat Ratna Conferred Posthumously',
    summary: 'India\'s highest civilian honour conferred on his 99th birth anniversary. Portrait unveiled in Parliament\'s Central Hall, cementing his legacy as Father of the Constitution.',
    thumbnailUrl: '/assets/standing.png',
    historicalContext: 'Recognized across global universities (Columbia, LSE) and institutions as a champion of universal human rights and constitutional democracy.',
    ambedkarRole: 'Enduring architectural father of India\'s social democracy, universal franchise, and constitutional morality.',
    impact: 'Institutionalized state recognition of his contributions to nation-building and human liberation.',
    sources: [
      { id: 'bharat-ratna-gazette', title: 'Bharat Ratna Award Gazette Notification', type: 'document', meta: 'Government of India, 1990', url: 'https://drambedkarwritings.gov.in/' }
    ]
  }
];