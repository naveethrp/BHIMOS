"""
Text Chunking Utility for BHIMOS Archival Records.
Segments historical documents into overlapping semantic chunks with character offsets.
"""
from typing import List, Dict, Any

def chunk_text(
    full_text: str,
    target_size: int = 500,
    overlap: int = 100,
    extraction_method: str = "ocr_layout_windowed",
    page_number: int = 1
) -> List[Dict[str, Any]]:
    """
    Split text into windowed chunks with character offsets.
    Tries to split cleanly on paragraph or sentence boundaries.
    """
    if not full_text or not full_text.strip():
        return []

    chunks = []
    text_len = len(full_text)
    start = 0
    ordinal = 0

    while start < text_len:
        end = min(start + target_size, text_len)
        
        # If not at the end of text, find last sentence or space boundary
        if end < text_len:
            space_pos = full_text.rfind(" ", start + target_size // 2, end)
            if space_pos > start:
                end = space_pos + 1

        chunk_str = full_text[start:end].strip()
        if chunk_str:
            chunks.append({
                "ordinal": ordinal,
                "text": chunk_str,
                "char_start": start,
                "char_end": end,
                "extraction_method": extraction_method,
                "page_number": page_number
            })
            ordinal += 1

        if end >= text_len:
            break

        start = max(end - overlap, start + 1)

    return chunks

if __name__ == "__main__":
    sample = "Untouchability is abolished and its practice in any form is forbidden. The enforcement of any disability arising out of untouchability shall be an offence punishable in accordance with law."
    res = chunk_text(sample, target_size=80, overlap=20)
    print(f"Generated {len(res)} chunks from sample:")
    for c in res:
        print(f"[{c['ordinal']}] ({c['char_start']}-{c['char_end']}): {c['text']}")
