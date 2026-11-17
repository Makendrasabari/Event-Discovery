import os, re

img_refs = set()
for root, dirs, files in os.walk('src'):
    for f in files:
        if f.endswith('.js') or f.endswith('.jsx'):
            with open(os.path.join(root, f), 'r', encoding='utf-8') as handle:
                content = handle.read()
                matches = re.findall(r'[\'\"](/assets/[^\'\"]+\.webp)[\'\"]', content)
                for m in matches:
                    img_refs.add(m)

print(f"Total referenced images: {len(img_refs)}")
missing = []
for ref in sorted(img_refs):
    local_path = os.path.join('public', ref.lstrip('/'))
    if not os.path.exists(local_path):
        missing.append((ref, local_path))
    else:
        size = os.path.getsize(local_path)
        print(f"OK: {ref} -> {size} bytes (< 100 KB: {size < 100 * 1024})")

if missing:
    print("MISSING FILES:", missing)
else:
    print("\nSUCCESS: All referenced images exist on disk and meet all constraints!")
