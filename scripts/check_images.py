from pathlib import Path

base_dir = Path(__file__).resolve().parent.parent
src_dir = base_dir / 'src'
pub_dir = base_dir / 'public'

image_pattern = re.compile(r'[\'\"](/[a-zA-Z0-9_\-\.\s/]+\.(?:png|jpe?g|webp|svg|gif))[\'\"]', re.IGNORECASE)

broken = []
valid = []

for root, dirs, files in os.walk(src_dir):
    for f in files:
        if f.endswith(('.ts', '.tsx', '.css', '.html', '.json')):
            full_path = os.path.join(root, f)
            with open(full_path, 'r', encoding='utf-8', errors='ignore') as fp:
                content = fp.read()
            matches = image_pattern.findall(content)
            for m in matches:
                disk_path = os.path.join(pub_dir, m.lstrip('/\\').replace('/', os.sep))
                if not os.path.exists(disk_path):
                    broken.append((os.path.relpath(full_path, src_dir), m, disk_path))
                else:
                    valid.append((os.path.relpath(full_path, src_dir), m))

print(f'Total valid image references found: {len(valid)}')
print(f'Total BROKEN image references found: {len(broken)}')
if broken:
    print('Broken details:')
    for item in sorted(list(set(broken))):
        print(f'  In {item[0]}: "{item[1]}" -> not found on disk')
