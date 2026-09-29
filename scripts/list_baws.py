import csv, json

with open('data/manifests/ambedkar_master_inventory.csv', encoding='utf-8') as f:
    rows = list(csv.DictReader(f))

baws_volumes = [r for r in rows if r['category'] == 'Writings & Speeches']
print(f'Total BAWS volumes in inventory: {len(baws_volumes)}')
for b in baws_volumes:
    print(b['inventory_id'], b['volume'], b['title'])
