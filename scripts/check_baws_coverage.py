import json, re

# Read archiveData.ts
with open('src/data/archiveData.ts', encoding='utf-8') as f:
    content = f.read()

# Verify existing BAWS volumes
for vol in range(1, 23):
    pat = rf'Writings and Speeches.*?Vol.*?{vol:02d}'
    pat2 = rf'Writings and Speeches.*?Vol.*?{vol}\b'
    m = re.search(pat, content) or re.search(pat2, content)
    print(f'Vol {vol}:', 'Found' if m else 'MISSING')
