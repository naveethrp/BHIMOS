import re

with open('src/data/archiveData.ts', encoding='utf-8') as f:
    text = f.read()

pub_ids = re.findall(r'\{\s*"id":\s*"([^"]+)",\s*"title":\s*"([^"]+)",\s*"category":\s*"publications"', text)
print(f'Total publications in archiveData.ts: {len(pub_ids)}')
for pid, title in pub_ids:
    print(f'  {pid}: {title[:60]}')

audio_ids = re.findall(r'\{\s*"id":\s*"([^"]+)",\s*"title":\s*"([^"]+)",\s*"category":\s*"audio"', text)
print(f'\nTotal audio in archiveData.ts: {len(audio_ids)}')
for pid, title in audio_ids:
    print(f'  {pid}: {title[:60]}')

video_ids = re.findall(r'\{\s*"id":\s*"([^"]+)",\s*"title":\s*"([^"]+)",\s*"category":\s*"videos"', text)
print(f'\nTotal videos in archiveData.ts: {len(video_ids)}')
for pid, title in video_ids:
    print(f'  {pid}: {title[:60]}')

letter_ids = re.findall(r'\{\s*"id":\s*"([^"]+)",\s*"title":\s*"([^"]+)",\s*"category":\s*"letters"', text)
print(f'\nTotal letters in archiveData.ts: {len(letter_ids)}')
for pid, title in letter_ids:
    print(f'  {pid}: {title[:60]}')
