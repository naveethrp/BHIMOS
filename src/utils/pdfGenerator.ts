/**
 * Pure client-side PDF 1.4 generator for BHIMOS Archival OCR Records.
 * Zero external dependencies. Generates valid standard PDF byte stream.
 */

export interface ArchivalPdfData {
  documentTitle: string;
  documentSource: string;
  dateScanned: string;
  transcriptionConfidence: string;
  extractedText: string;
  notes?: string;
}

export function generateArchivalOcrPdf(data: ArchivalPdfData): { blob: Blob; url: string; filename: string } {
  const sanitizeText = (txt: string) => {
    return txt
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[\u201C\u201D]/g, '"')
      .replace(/[\u2013\u2014]/g, '--')
      .replace(/[\u2026]/g, '...')
      .replace(/[\u2022]/g, '*')
      .replace(/\\/g, '\\\\')
      .replace(/\(/g, '\\(')
      .replace(/\)/g, '\\)')
      .replace(/[^\x20-\x7E\r\n\t]/g, (char) => {
        // Fallback for non-ASCII characters in Type 1 font
        return `[U+${char.charCodeAt(0).toString(16).toUpperCase()}]`;
      });
  };

  // Split extracted text into lines that fit in ~75 chars per line
  const rawLines = data.extractedText.split('\n');
  const formattedLines: string[] = [];
  const maxLineLen = 78;

  for (const rawLine of rawLines) {
    if (!rawLine.trim()) {
      formattedLines.push('');
      continue;
    }
    const words = rawLine.split(' ');
    let currentLine = '';
    for (const w of words) {
      if ((currentLine + ' ' + w).trim().length > maxLineLen) {
        formattedLines.push(currentLine.trim());
        currentLine = w;
      } else {
        currentLine = (currentLine + ' ' + w).trim();
      }
    }
    if (currentLine) formattedLines.push(currentLine.trim());
  }

  // Build PDF stream commands
  let streamContent = `
q
0.024 0.114 0.169 rg
0 790 595.28 52 re
f
Q
BT
/F2 14 Tf
0.984 0.965 0.929 rg
36 818 Td
(BHIMOS -- AMBEDKAR DIGITAL HERITAGE ARCHIVE) Tj
ET
BT
/F1 8 Tf
0.773 0.627 0.349 rg
36 802 Td
(OFFICIAL ARCHIVAL DIGITIZATION LABORATORY | SIH 2026 KIOSK REPOSITORY) Tj
ET

BT
/F2 16 Tf
0.106 0.086 0.071 rg
36 750 Td
(${sanitizeText(data.documentTitle)}) Tj
ET

BT
/F1 9 Tf
0.3 0.3 0.3 rg
36 732 Td
(Source Provenance: ${sanitizeText(data.documentSource)}) Tj
ET

BT
/F1 9 Tf
0.3 0.3 0.3 rg
36 718 Td
(Digitized: ${sanitizeText(data.dateScanned)}   |   Neural Model Engine: v2.4 Archival-De-En   |   Confidence: ${sanitizeText(data.transcriptionConfidence)}) Tj
ET

q
0.773 0.627 0.349 RG
1 w
36 706 m
559 706 l
S
Q

BT
/F2 11 Tf
0.024 0.114 0.169 rg
36 686 Td
(VERBATIM SEARCHABLE OCR TRANSCRIPTION EXTRACT:) Tj
ET

BT
/F1 9.5 Tf
0.12 0.12 0.12 rg
36 664 Td
13.5 TL
`;

  // Append lines to the PDF stream (up to 38 lines per page)
  const displayLines = formattedLines.slice(0, 42);
  for (const line of displayLines) {
    if (line === '') {
      streamContent += `T*\n`;
    } else {
      streamContent += `(${sanitizeText(line)}) Tj T*\n`;
    }
  }

  streamContent += `
ET

q
0.8 0.8 0.8 RG
0.5 w
36 50 m
559 50 l
S
Q

BT
/F1 8 Tf
0.4 0.4 0.4 rg
36 38 Td
(BHIMOS Archival Record Certification - This document contains raw OCR transcription for research preservation.) Tj
ET
BT
/F1 8 Tf
0.4 0.4 0.4 rg
480 38 Td
(Page 1 of 1) Tj
ET
`;

  const streamBytes = new TextEncoder().encode(streamContent.trim());
  const streamLength = streamBytes.length;

  // Assemble PDF structure with calculated byte offsets
  let pdf = `%PDF-1.4\n`;
  const offsets: number[] = [];

  const addObj = (objContent: string): number => {
    offsets.push(pdf.length);
    pdf += objContent;
    return offsets.length;
  };

  addObj(`1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n`);
  addObj(`2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n`);
  addObj(`3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>\nendobj\n`);
  addObj(`4 0 obj\n<< /Length ${streamLength} >>\nstream\n${streamContent.trim()}\nendstream\nendobj\n`);
  addObj(`5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n`);
  addObj(`6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n`);

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${offsets.length + 1}\n0000000000 65535 f \n`;
  for (const off of offsets) {
    pdf += `${off.toString().padStart(10, '0')} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${offsets.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

  const blob = new Blob([pdf], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const filename = `BHIMOS_${data.documentTitle.replace(/[^a-zA-Z0-9_-]/g, '_')}_Digitized.pdf`;

  return { blob, url, filename };
}
