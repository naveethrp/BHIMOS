import { Language } from '../types';

export interface UITranslations {
  // Navigation & Brand
  archiveTitle: string;
  archiveSubtitle: string;
  homeNav: string;
  archiveNav: string;
  timelineNav: string;
  askNav: string;
  ocrNav: string;
  aboutNav: string;

  // Home Page
  heroEyebrow: string;
  heroMainTitle: string;
  heroMainTitleAccent: string;
  heroQuote: string;
  heroQuoteAuthor: string;
  heroExploreBtn: string;
  heroTimelineBtn: string;
  homeHeroDesc: string;
  statPrimaryRecords: string;
  statAssemblySittings: string;
  statBawsVolumes: string;
  statManuscriptsLetters: string;
  statAudioBroadcasts: string;
  statGroundedCitations: string;
  pathwayDebatesTitle: string;
  pathwayDebatesSubtitle: string;
  pathwayDebatesAction: string;
  pathwayBawsTitle: string;
  pathwayBawsSubtitle: string;
  pathwayBawsAction: string;
  pathwayAudioTitle: string;
  pathwayAudioSubtitle: string;
  pathwayAudioAction: string;
  pathwayCorrespondenceTitle: string;
  pathwayCorrespondenceSubtitle: string;
  pathwayCorrespondenceAction: string;
  homeHistoricalJourneyTitle: string;
  homeHistoricalJourneyDesc: string;
  homeViewFullTimeline: string;
  researchOcrBadge: string;
  researchOcrHeading: string;
  researchOcrSummary: string;
  researchOcrBtn: string;
  researchAskBadge: string;
  researchAskHeading: string;
  researchAskSummary: string;
  researchAskBtn: string;

  // Archive Page
  archivePageTitle: string;
  archivePageDesc: string;
  archiveHeroEyebrow: string;
  searchPlaceholder: string;
  searchLabel: string;
  archiveSearchBtn: string;
  archiveFilterBy: string;
  allCollections: string;
  archiveAllYears: string;
  archiveAllSources: string;
  archiveAllTypes: string;
  videosCat: string;
  audioCat: string;
  lettersCat: string;
  debatesCat: string;
  publicationsCat: string;
  photosCat: string;
  legalCat: string;
  pressCat: string;
  sortBy: string;
  sortYearDesc: string;
  sortYearAsc: string;
  sortTitle: string;
  showingRecords: string;
  openRecord: string;
  listenBroadcast: string;
  pauseBroadcast: string;
  noRecordsFound: string;
  returnToAll: string;
  closeDossier: string;
  archivalProvenance: string;
  verifiedPrimaryRecord: string;
  archiveCopyCitation: string;
  archiveCitationCopied: string;
  archiveViewOriginal: string;
  archiveModalTranscript: string;
  archiveModalProvenance: string;

  // Timeline Page
  timelinePageTitle: string;
  timelinePageSubtitle: string;
  timelineEyebrow: string;
  exhibitionDossier: string;
  backToTimeline: string;
  historicalContext: string;
  ambedkarRole: string;
  keyPeople: string;
  impactLegacy: string;
  relatedPrimarySources: string;
  timelineViewSource: string;

  // Ask Archive Page
  askPageTitle: string;
  askPageSubtitle: string;
  askAboutTitle: string;
  askAboutDesc: string;
  recommendedInquiries: string;
  askInputPlaceholder: string;
  sendQuery: string;
  archivalSourceBadge: string;
  externalSourceBadge: string;
  noVerifiedRecordFound: string;
  inspectSource: string;
  closeInspector: string;
  askStandingQuote: string;

  // Digital Documents / OCR Page
  ocrPageTitle: string;
  ocrPageSubtitle: string;
  selectDocument: string;
  searchInDocument: string;
  searchDocPlaceholder: string;
  pageIndicator: string;
  zoomIn: string;
  zoomOut: string;
  zoomReset: string;
  transcriptionTab: string;
  provenanceTab: string;
  downloadPdf: string;
  copyText: string;
  textCopied: string;
  runOcr: string;
  uploadCustomScan: string;

  // About Page
  aboutEyebrow: string;
  aboutTitle: string;
  aboutQuote: string;
  aboutMissionTitle: string;
  aboutMissionLead: string;
  aboutMissionBadge1: string;
  aboutMissionBadge2: string;
  aboutMissionBadge3: string;
  aboutVisionTitle: string;
  aboutVisionLead: string;
  aboutVisionDesc: string;
  aboutExploreBtn: string;
  aboutKeyAreasTitle: string;
  aboutKeyAreasQuote: string;
}

export const TRANSLATIONS: Record<Language, UITranslations> = {
  en: {
    // Navigation & Brand
    archiveTitle: 'BHIMOS',
    archiveSubtitle: 'AMBEDKAR DIGITAL HERITAGE ARCHIVE',
    homeNav: 'Home',
    archiveNav: 'Archive',
    timelineNav: 'Timeline',
    askNav: 'Ask the Archive',
    ocrNav: 'Digitize Documents',
    aboutNav: 'About',

    // Home Page
    heroEyebrow: 'DR. B. R. AMBEDKAR • 1891–1956',
    heroMainTitle: 'A LIFE THAT',
    heroMainTitleAccent: 'SHAPED A NATION',
    heroQuote: 'Educate, Agitate, Organize.',
    heroQuoteAuthor: 'Babasaheb Dr. B. R. Ambedkar',
    heroExploreBtn: 'Explore Collection (187 Items)',
    heroTimelineBtn: 'View Historical Timeline →',
    homeHeroDesc: "Explore the life, writings, speeches, and constitutional legacy of Dr. Bhimrao Ramji Ambedkar through an interactive digital archive.",
    statPrimaryRecords: 'Primary Archival Records',
    statAssemblySittings: 'Assembly Sittings (CAD)',
    statBawsVolumes: 'Volumes of Writings (BAWS)',
    statManuscriptsLetters: 'Manuscripts & Letters',
    statAudioBroadcasts: 'Audio Transcripts & Reconstructions',
    statGroundedCitations: 'Indexed Archival Passages',
    pathwayDebatesTitle: 'Constituent Assembly Debates',
    pathwayDebatesSubtitle: 'Verbatim proceedings from the drafting of the Indian Constitution (1946–1950).',
    pathwayDebatesAction: 'Access 168 Sittings',
    pathwayBawsTitle: 'Writings & Speeches (BAWS)',
    pathwayBawsSubtitle: '22 published volumes of seminal treatises, memorandums, and public addresses.',
    pathwayBawsAction: 'Explore 22 Volumes',
    pathwayAudioTitle: 'Archival Audio Reconstructions',
    pathwayAudioSubtitle: 'Archival speech readings and radio transcripts (1942–1953).',
    pathwayAudioAction: 'Listen to Reconstructions',
    pathwayCorrespondenceTitle: 'Correspondence & Letters',
    pathwayCorrespondenceSubtitle: 'Personal letters and telegraphic exchanges with Gandhi, Du Bois, and Wavell.',
    pathwayCorrespondenceAction: 'Read Manuscripts',
    homeHistoricalJourneyTitle: 'Explore Key Eras of His Life',
    homeHistoricalJourneyDesc: "From a young student in Mhow to the chief architect of the Indian Constitution, explore the defining phases of Dr. Ambedkar's extraordinary journey.",
    homeViewFullTimeline: 'View Full Timeline →',
    researchOcrBadge: 'DIGITIZATION LAB',
    researchOcrHeading: 'Preserve & Search Manuscripts',
    researchOcrSummary: 'Experience our neural OCR scanner designed to process historical prints, legal drafts, and gazettes with instant term highlighting and downloadable synthesized PDFs.',
    researchOcrBtn: 'Open Digitization Studio →',
    researchAskBadge: 'SCHOLARLY RAG',
    researchAskHeading: 'Source-Grounded Archival Research',
    researchAskSummary: 'Query the full corpus of Dr. Ambedkar’s writings, parliamentary debates, and speeches. Every answer is substantiated with direct volume, page, and sitting citations.',
    researchAskBtn: 'Begin Archival Research →',

    // Archive Page
    archivePageTitle: 'ARCHIVE',
    archivePageDesc: "A curated collection of Dr. B. R. Ambedkar's parliamentary records, writings, speeches, letters, and historical materials from trusted sources.",
    archiveHeroEyebrow: 'EXPLORE • DISCOVER • RESEARCH',
    searchPlaceholder: 'Search archival records, documents, speeches, letters...',
    searchLabel: 'Primary Collections',
    archiveSearchBtn: 'Search',
    archiveFilterBy: 'Filter by:',
    allCollections: 'All Collections',
    archiveAllYears: 'All Years',
    archiveAllSources: 'All Sources',
    archiveAllTypes: 'All Types',
    videosCat: 'Videos',
    audioCat: 'Audio & Broadcast',
    lettersCat: 'Correspondence & Letters',
    debatesCat: 'Constituent Assembly Debates',
    publicationsCat: 'Writings & Speeches (BAWS)',
    photosCat: 'Photographs & Visual',
    legalCat: 'Publications & Legal',
    pressCat: 'Newspapers & Press',
    sortBy: 'Sort by:',
    sortYearDesc: 'Year (Newest First)',
    sortYearAsc: 'Year (Oldest First)',
    sortTitle: 'Title (A-Z)',
    showingRecords: 'records',
    openRecord: 'Open Record →',
    listenBroadcast: '▶ Listen',
    pauseBroadcast: '❚❚ Pause',
    noRecordsFound: 'No verified archival record found matching your query.',
    returnToAll: '← Return to All Collections',
    closeDossier: 'Close Dossier',
    archivalProvenance: 'Archival Provenance:',
    verifiedPrimaryRecord: '✓ Verified Primary Record',
    archiveCopyCitation: 'Copy Archival Citation',
    archiveCitationCopied: '✓ Citation Copied',
    archiveViewOriginal: 'View Original Archive ↗',
    archiveModalTranscript: 'ARCHIVAL VERBATIM TRANSCRIPT',
    archiveModalProvenance: 'RECORD PROVENANCE & SUMMARY',

    // Timeline Page
    timelinePageTitle: 'A JOURNEY THROUGH HISTORY',
    timelinePageSubtitle: 'Explore pivotal eras, milestone struggles, and the constitutional evolution of modern India.',
    timelineEyebrow: 'CHRONOLOGICAL EXHIBITION',
    exhibitionDossier: 'Exhibition Dossier →',
    backToTimeline: '← Back to Timeline',
    historicalContext: 'Historical Context',
    ambedkarRole: "Dr. Ambedkar's Role",
    keyPeople: 'Key People',
    impactLegacy: 'Impact & Legacy',
    relatedPrimarySources: 'Related Primary Sources',
    timelineViewSource: 'View Source →',

    // Ask Archive Page
    askPageTitle: 'Ask the Archive',
    askPageSubtitle: 'Directly query authentic parliamentary records, legal drafts, and published volumes with verbatim evidence citations.',
    askAboutTitle: 'ABOUT THIS RESEARCH DESK',
    askAboutDesc: 'Searches 22 published volumes (BAWS), 167 Constituent Assembly debates, letters, speeches and related archival collections. Every answer is backed by verified sources.',
    recommendedInquiries: 'SUGGESTED QUESTIONS',
    askInputPlaceholder: 'Ask a question about Dr. B. R. Ambedkar...',
    sendQuery: 'Send question',
    archivalSourceBadge: 'Archive Source',
    externalSourceBadge: 'External Source',
    noVerifiedRecordFound: 'No verified record was found in the archive.',
    inspectSource: 'View Source Record →',
    closeInspector: 'Close Inspector',
    askStandingQuote: '“Educate, Agitate, Organize.” — Dr. B. R. Ambedkar',

    // Digital Documents / OCR Page
    ocrPageTitle: 'Archival Document Research & OCR Studio',
    ocrPageSubtitle: 'Induct physical historical manuscripts, parliamentary proceedings, and typed memoranda into searchable, verified digital records.',
    selectDocument: 'Select Manuscript:',
    searchInDocument: 'Search Within This Document:',
    searchDocPlaceholder: 'Search document text or keywords...',
    pageIndicator: 'Page',
    zoomIn: 'Zoom In (+)',
    zoomOut: 'Zoom Out (-)',
    zoomReset: 'Fit',
    transcriptionTab: 'Transcription',
    provenanceTab: 'Provenance',
    downloadPdf: 'Synthesize & Download PDF →',
    copyText: 'Copy Text',
    textCopied: '✓ Text Copied',
    runOcr: 'Run Neural Recognition Pipeline',
    uploadCustomScan: '+ Upload Custom Scan...',

    // About Page
    aboutEyebrow: 'INSTITUTIONAL OVERVIEW',
    aboutTitle: 'About the Digital Heritage Archive',
    aboutQuote: '“Constitutional morality is not a natural sentiment. It has to be cultivated.”',
    aboutMissionTitle: 'OUR MISSION',
    aboutMissionLead: 'Preserve. Research. Educate.',
    aboutMissionBadge1: 'AUTHENTIC SOURCES',
    aboutMissionBadge2: 'SEARCH & EXPLORE',
    aboutMissionBadge3: 'PUBLIC ACCESS',
    aboutVisionTitle: 'OUR VISION',
    aboutVisionLead: 'A More Equal and Informed Society',
    aboutVisionDesc: 'The Ambedkar Digital Heritage Archive aims to make Babasaheb’s intellectual legacy globally accessible to citizens, jurists, educators, and scholars through open archival standards and source-grounded exploration.',
    aboutExploreBtn: 'Explore the Archive →',
    aboutKeyAreasTitle: 'KEY AREAS OF THE ARCHIVE',
    aboutKeyAreasQuote: '“Men are mortal. So are ideas. An idea needs propagation as much as a plant needs watering. Otherwise both will wither and die.”'
  },

  hi: {
    // Navigation & Brand
    archiveTitle: 'भीम ओएस',
    archiveSubtitle: 'आंबेडकर डिजिटल धरोहर अभिलेखागार',
    homeNav: 'मुख्य पृष्ठ',
    archiveNav: 'अभिलेखागार',
    timelineNav: 'कालक्रम',
    askNav: 'जिज्ञासा',
    ocrNav: 'दस्तावेज़ डिजिटलीकरण',
    aboutNav: 'परिचय',

    // Home Page
    heroEyebrow: 'डॉ. बी. आर. आंबेडकर • १८९१–१९५६',
    heroMainTitle: 'एक जीवन जिसने',
    heroMainTitleAccent: 'राष्ट्र को गढ़ा',
    heroQuote: 'शिक्षित बनो, संघर्ष करो, संगठित रहो।',
    heroQuoteAuthor: 'बाबासाहेब डॉ. बी. आर. आंबेडकर',
    heroExploreBtn: 'संग्रह देखें (१८७ प्रलेख)',
    heroTimelineBtn: 'ऐतिहासिक कालक्रम देखें →',
    homeHeroDesc: 'डॉ. भीमराव रामजी आंबेडकर के जीवन, मौलिक ग्रंथों, व्याख्यानों एवं संवैधानिक विरासत को एक अंतःक्रियात्मक डिजिटल अभिलेखागार के माध्यम से अन्वेषित करें।',
    statPrimaryRecords: 'प्रामाणिक ऐतिहासिक प्रलेख',
    statAssemblySittings: 'संविधान सभा बैठकें (CAD)',
    statBawsVolumes: 'ग्रंथ एवं भाषण खंड (BAWS)',
    statManuscriptsLetters: 'पांडुलिपियां एवं पत्राचार',
    statAudioBroadcasts: 'ध्वनि आलेख एवं पुनर्निर्माण',
    statGroundedCitations: 'अनुक्रमित अभिलेखीय अंश',
    pathwayDebatesTitle: 'संविधान सभा वाद-विवाद',
    pathwayDebatesSubtitle: 'भारतीय संविधान निर्माण (१९४६-१९५०) की प्रामाणिक एवं विस्तृत कार्यवाहियां।',
    pathwayDebatesAction: '१६८ बैठकें देखें',
    pathwayBawsTitle: 'समग्र ग्रंथ एवं भाषण (BAWS)',
    pathwayBawsSubtitle: 'डॉ. आंबेडकर के दार्शनिक ग्रंथों, शोध निबंधों और अभिभाषणों के २२ प्रकाशित खंड।',
    pathwayBawsAction: '२२ खंड देखें',
    pathwayAudioTitle: 'अभिलेखीय ध्वनि पुनर्निर्माण',
    pathwayAudioSubtitle: 'आकाशवाणी (AIR) और बीबीसी (BBC) प्रसारणों के प्रामाणिक आलेख और ध्वनि पठन।',
    pathwayAudioAction: 'पुनर्निर्माण सुनें',
    pathwayCorrespondenceTitle: 'पत्राचार एवं संदेश',
    pathwayCorrespondenceSubtitle: 'महात्मा गांधी, डब्ल्यू. ई. बी. डुबोइस और लॉर्ड वेवेल के साथ दुर्लभ ऐतिहासिक पत्राचार।',
    pathwayCorrespondenceAction: 'पांडुलिपियां पढ़ें',
    homeHistoricalJourneyTitle: 'जीवन के ऐतिहासिक युगों का अन्वेषण',
    homeHistoricalJourneyDesc: 'महू के बाल्यकाल से लेकर स्वतंत्र भारत के संविधान शिल्पी तक, डॉ. आंबेडकर की असाधारण जीवन-यात्रा के युगांतरकारी पड़ाव।',
    homeViewFullTimeline: 'पूर्ण कालक्रम देखें →',
    researchOcrBadge: 'डिजिटलीकरण प्रयोगशाला',
    researchOcrHeading: 'पांडुलिपि संरक्षण एवं खोज',
    researchOcrSummary: 'ऐतिहासिक अभिलेखों, कानूनी मसौदों और गजटों को न्यूरल ओसीआर द्वारा खोजने योग्य डिजिटल प्रलेखों और पीडीएफ में परिवर्तित करें।',
    researchOcrBtn: 'डिजिटलीकरण स्टूडियो खोलें →',
    researchAskBadge: 'शोध जिज्ञासा सहायक',
    researchAskHeading: 'साक्ष्य-आधारित अभिलेखीय शोध',
    researchAskSummary: 'डॉ. आंबेडकर के समग्र ग्रंथों, बहसों और अभिभाषणों से प्रश्न पूछें। प्रत्येक उत्तर सीधे खंड, पृष्ठ और बैठक साक्ष्य से प्रमाणित है।',
    researchAskBtn: 'शोध कार्यशाला शुरू करें →',

    // Archive Page
    archivePageTitle: 'अभिलेखागार',
    archivePageDesc: 'डॉ. बी. आर. आंबेडकर के संसदीय अभिलेखों, मौलिक शोधग्रंथों, व्याख्यानों, ऐतिहासिक पत्राचार एवं दुर्लभ स्रोतों का प्रामाणिक संग्रह।',
    archiveHeroEyebrow: 'अन्वेषण • अनुसंधान • अध्ययन',
    searchPlaceholder: 'अभिलेख, प्रलेख, भाषण, पत्र खोजें...',
    searchLabel: 'प्रमुख संग्रह',
    archiveSearchBtn: 'खोजें',
    archiveFilterBy: 'फ़िल्टर:',
    allCollections: 'सभी संग्रह',
    archiveAllYears: 'सभी वर्ष',
    archiveAllSources: 'सभी स्रोत',
    archiveAllTypes: 'सभी प्रारूप',
    videosCat: 'चलचित्र',
    audioCat: 'ध्वनि प्रसारण',
    lettersCat: 'पत्राचार एवं संदेश',
    debatesCat: 'संविधान सभा वाद-विवाद',
    publicationsCat: 'समग्र ग्रंथ (BAWS)',
    photosCat: 'छायाचित्र अभिलेख',
    legalCat: 'विधि एवं चार्टर',
    pressCat: 'समाचार पत्र अभिलेख',
    sortBy: 'क्रमबद्ध करें:',
    sortYearDesc: 'वर्ष (नवीनतम)',
    sortYearAsc: 'वर्ष (पुरातन)',
    sortTitle: 'शीर्षक (A–Z)',
    showingRecords: 'अभिलेख',
    openRecord: 'प्रलेख खोलें →',
    listenBroadcast: '▶ सुनें',
    pauseBroadcast: '❚❚ रोकें',
    noRecordsFound: 'आपकी खोज के अनुसार कोई प्रमाणित अभिलेख नहीं मिला।',
    returnToAll: '← समस्त संग्रह पर लौटें',
    closeDossier: 'अभिलेख बंद करें',
    archivalProvenance: 'ऐतिहासिक स्रोत:',
    verifiedPrimaryRecord: '✓ सत्यापित प्राथमिक प्रलेख',
    archiveCopyCitation: 'उद्धरण प्रतिलिपि बनाएं',
    archiveCitationCopied: '✓ उद्धरण प्रतिलिपि बनाई गई',
    archiveViewOriginal: 'मूल अभिलेखागार देखें ↗',
    archiveModalTranscript: 'प्रामाणिक पाठ्यांतरण',
    archiveModalProvenance: 'अभिलेख स्रोत एवं विवरण',

    // Timeline Page
    timelinePageTitle: 'इतिहास की स्वर्णिम यात्रा',
    timelinePageSubtitle: 'आधुनिक भारत के निर्माण, सामाजिक संघर्षों और संवैधानिक विकास के युगांतरकारी पड़ावों का अन्वेषण करें।',
    timelineEyebrow: 'ऐतिहासिक कालक्रम प्रदर्शनी',
    exhibitionDossier: 'प्रदर्शनी विवरण देखें →',
    backToTimeline: '← कालक्रम पर लौटें',
    historicalContext: 'ऐतिहासिक संदर्भ',
    ambedkarRole: 'डॉ. आंबेडकर की भूमिका',
    keyPeople: 'प्रमुख व्यक्तित्व',
    impactLegacy: 'दूरगामी प्रभाव एवं विरासत',
    relatedPrimarySources: 'संबंधित प्राथमिक ऐतिहासिक स्रोत',
    timelineViewSource: 'स्रोत देखें →',

    // Ask Archive Page
    askPageTitle: 'जिज्ञासा शोध डेस्क',
    askPageSubtitle: 'संविधान सभा की बहसों, सरकारी गजटों और डॉ. आंबेडकर के ग्रंथों से प्रत्यक्ष साक्ष्य-सत्यापित शोध करें।',
    askAboutTitle: 'शोध डेस्क परिधि',
    askAboutDesc: 'यह शोध सहायक २२ खंडों (BAWS) और १६७ संविधान सभा बैठकों के अभिलेखों की पड़ताल करता है। प्रत्येक उत्तर प्रामाणिक साक्ष्य पर आधारित है।',
    recommendedInquiries: 'अनुशंसित शोध प्रश्न',
    askInputPlaceholder: 'डॉ. बी. आर. आंबेडकर के विचारों या बहसों के विषय में पूछें...',
    sendQuery: 'प्रश्न भेजें',
    archivalSourceBadge: 'अभिलेखागार स्रोत',
    externalSourceBadge: 'बाहरी स्रोत',
    noVerifiedRecordFound: 'इस विषय पर अभिलेखागार में कोई सत्यापित प्रलेख नहीं मिला।',
    inspectSource: 'स्रोत प्रलेख देखें →',
    closeInspector: 'विवरण बंद करें',
    askStandingQuote: '“शिक्षित बनो, संघर्ष करो, संगठित रहो।” — डॉ. बी. आर. आंबेडकर',

    // Digital Documents / OCR Page
    ocrPageTitle: 'दस्तावेज़ डिजिटलीकरण एवं ओसीआर स्टूडियो',
    ocrPageSubtitle: 'भौतिक ऐतिहासिक पांडुलिपियों, संसदीय कार्यवाहियों और कानूनी ज्ञापनों को खोजने योग्य डिजिटल प्रलेखों में बदलें।',
    selectDocument: 'पांडुलिपि चुनें:',
    searchInDocument: 'इस प्रलेख में खोजें:',
    searchDocPlaceholder: 'दस्तावेज़ के शब्द खोजें...',
    pageIndicator: 'पृष्ठ',
    zoomIn: 'बड़ा करें (+)',
    zoomOut: 'छोटा करें (-)',
    zoomReset: 'सामान्य',
    transcriptionTab: 'पाठ्यांतरण',
    provenanceTab: 'स्रोत विवरण',
    downloadPdf: 'खोजने योग्य पीडीएफ डाउनलोड करें →',
    copyText: 'प्रतिलिपि बनाएं',
    textCopied: '✓ प्रतिलिपि बनाई गई',
    runOcr: 'न्यूरल ओसीआर निष्पादित करें',
    uploadCustomScan: '+ नया स्कैन अपलोड करें...',

    // About Page
    aboutEyebrow: 'संस्थागत परिचय',
    aboutTitle: 'डिजिटल धरोहर अभिलेखागार के विषय में',
    aboutQuote: '“संवैधानिक नैतिकता कोई प्राकृतिक भावना नहीं है। इसे विकसित करना होता है।”',
    aboutMissionTitle: 'हमारा उद्देश्य',
    aboutMissionLead: 'संरक्षण। अनुसंधान। शिक्षण।',
    aboutMissionBadge1: 'प्रामाणिक स्रोत',
    aboutMissionBadge2: 'खोज एवं अध्ययन',
    aboutMissionBadge3: 'सार्वजनिक पहुंच',
    aboutVisionTitle: 'हमारा दृष्टिकोण',
    aboutVisionLead: 'एक अधिक समतामूलक एवं प्रबुद्ध समाज',
    aboutVisionDesc: 'आंबेडकर डिजिटल धरोहर अभिलेखागार का लक्ष्य बाबासाहेब की बौद्धिक विरासत को खुली अभिलेखीय प्रणालियों के माध्यम से नागरिकों, न्यायविदों, शिक्षकों और शोधकर्ताओं तक पहुंचाना है।',
    aboutExploreBtn: 'अभिलेखागार का अन्वेषण करें →',
    aboutKeyAreasTitle: 'अभिलेखागार के प्रमुख स्तंभ',
    aboutKeyAreasQuote: '“मनुष्य नश्वर है। विचार भी नश्वर हैं। एक विचार को भी पोषण की उतनी ही आवश्यकता होती है जितनी एक पौधे को पानी की। अन्यथा दोनों मुरझा कर समाप्त हो जाते हैं।”'
  }
};
