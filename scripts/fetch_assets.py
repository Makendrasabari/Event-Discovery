import urllib.request
import os
import sys
from PIL import Image
import io

IMAGE_SPECS = [
    # Hero & General
    {"id": "hero_event", "cat": "general", "url": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1400&q=80", "size": (1280, 680), "q": 82},
    {"id": "about_conference", "cat": "general", "url": "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1000&q=80", "size": (900, 600), "q": 80},
    {"id": "about_workshop", "cat": "general", "url": "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1000&q=80", "size": (900, 600), "q": 80},
    
    # Categories
    {"id": "cat_technology", "cat": "categories", "url": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80", "size": (600, 400), "q": 80},
    {"id": "cat_business", "cat": "categories", "url": "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=800&q=80", "size": (600, 400), "q": 80},
    {"id": "cat_design", "cat": "categories", "url": "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80", "size": (600, 400), "q": 80},
    {"id": "cat_education", "cat": "categories", "url": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80", "size": (600, 400), "q": 80},

    # 12 Distinct Events
    {"id": "event_ai_summit", "cat": "events", "url": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80", "size": (800, 500), "q": 80},
    {"id": "event_fintech_forum", "cat": "events", "url": "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80", "size": (800, 500), "q": 80},
    {"id": "event_ux_craft", "cat": "events", "url": "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&q=80", "size": (800, 500), "q": 80},
    {"id": "event_cloud_devops", "cat": "events", "url": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80", "size": (800, 500), "q": 80},
    {"id": "event_edtech_expo", "cat": "events", "url": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80", "size": (800, 500), "q": 80},
    {"id": "event_women_leadership", "cat": "events", "url": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80", "size": (800, 500), "q": 80},
    {"id": "event_design_systems", "cat": "events", "url": "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80", "size": (800, 500), "q": 80},
    {"id": "event_cyber_defense", "cat": "events", "url": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80", "size": (800, 500), "q": 80},
    {"id": "event_venture_pitch", "cat": "events", "url": "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80", "size": (800, 500), "q": 80},
    {"id": "event_data_science", "cat": "events", "url": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80", "size": (800, 500), "q": 80},
    {"id": "event_stem_innovators", "cat": "events", "url": "https://images.unsplash.com/photo-1576085898323-218337e3e43c?w=800&q=80", "size": (800, 500), "q": 80},
    {"id": "event_brand_motion", "cat": "events", "url": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80", "size": (800, 500), "q": 80},

    # 8 Speakers
    {"id": "speaker_elena", "cat": "speakers", "url": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80", "size": (400, 400), "q": 82},
    {"id": "speaker_marcus", "cat": "speakers", "url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80", "size": (400, 400), "q": 82},
    {"id": "speaker_aisha", "cat": "speakers", "url": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&q=80", "size": (400, 400), "q": 82},
    {"id": "speaker_david", "cat": "speakers", "url": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=80", "size": (400, 400), "q": 82},
    {"id": "speaker_sarah", "cat": "speakers", "url": "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&q=80", "size": (400, 400), "q": 82},
    {"id": "speaker_javier", "cat": "speakers", "url": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&q=80", "size": (400, 400), "q": 82},
    {"id": "speaker_priya", "cat": "speakers", "url": "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=500&q=80", "size": (400, 400), "q": 82},
    {"id": "speaker_alex", "cat": "speakers", "url": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=500&q=80", "size": (400, 400), "q": 82},

    # 4 Testimonials
    {"id": "avatar_jessica", "cat": "testimonials", "url": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80", "size": (300, 300), "q": 80},
    {"id": "avatar_daniel", "cat": "testimonials", "url": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80", "size": (300, 300), "q": 80},
    {"id": "avatar_amira", "cat": "testimonials", "url": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80", "size": (300, 300), "q": 80},
    {"id": "avatar_thomas", "cat": "testimonials", "url": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80", "size": (300, 300), "q": 80},
]

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for spec in IMAGE_SPECS:
    filename = f"{spec['id']}.webp"
    # Save to public/assets/<cat>/ and assets/<cat>/
    dirs = [
        f"public/assets/{spec['cat']}",
        f"assets/{spec['cat']}"
    ]
    for d in dirs:
        os.makedirs(d, exist_ok=True)
    
    target_path = os.path.join(dirs[0], filename)
    target_path2 = os.path.join(dirs[1], filename)
    
    if os.path.exists(target_path) and os.path.getsize(target_path) < 100 * 1024:
        print(f"Skipping {filename}, already exists ({os.path.getsize(target_path)} bytes)")
        continue

    print(f"Fetching {spec['id']}...")
    try:
        req = urllib.request.Request(spec['url'], headers=headers)
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = resp.read()
        
        img = Image.open(io.BytesIO(data))
        if img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Center crop to target aspect ratio
        target_w, target_h = spec['size']
        orig_w, orig_h = img.size
        target_ratio = target_w / target_h
        orig_ratio = orig_w / orig_h

        if orig_ratio > target_ratio:
            # Crop width
            new_w = int(orig_h * target_ratio)
            left = (orig_w - new_w) // 2
            img = img.crop((left, 0, left + new_w, orig_h))
        else:
            # Crop height
            new_h = int(orig_w / target_ratio)
            top = (orig_h - new_h) // 2
            img = img.crop((0, top, orig_w, top + new_h))
        
        img = img.resize((target_w, target_h), Image.Resampling.LANCZOS)
        
        # Save as WEBP, ensure < 100KB
        q = spec.get('q', 80)
        while q >= 20:
            buf = io.BytesIO()
            img.save(buf, 'WEBP', quality=q)
            size = buf.tell()
            if size < 98 * 1024:
                break
            q -= 5

        with open(target_path, 'wb') as f:
            f.write(buf.getvalue())
        with open(target_path2, 'wb') as f:
            f.write(buf.getvalue())

        print(f"  -> Saved {filename}: {os.path.getsize(target_path)} bytes (Quality {q})")
    except Exception as e:
        print(f"Error fetching {spec['id']}: {e}")
