"""Prepare the ten approved concept illustrations; keep the source PNGs untouched."""
import json
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'output/imagegen/2026-10-29-priority-10'
DEST = ROOT / 'public/images/worlds'
FILES = {
    'world-transition': '01-dual-worlds.png',
    'hero-poetic': '02-poetic-hero.png',
    'hero-digital': '03-digital-hero.png',
    'world-poster': '04-world-poster.png',
    'cover-memory-express': '05-memory-express.png',
    'cover-little-desk': '06-little-desk.png',
    'cover-rainos': '07-rain-os.png',
    'cover-constellation': '08-memory-constellation.png',
    'cover-film-darkroom': '09-film-darkroom.png',
    'cover-rain-post-office': '10-rain-post-office.png',
}

DEST.mkdir(parents=True, exist_ok=True)
manifest = {}
for asset_id, filename in FILES.items():
    with Image.open(SOURCE / filename) as original:
        image = original.convert('RGB')
        variants = []
        for width in (720, 1440):
            width = min(width, image.width)
            height = round(image.height * width / image.width)
            target = DEST / f'{asset_id}-{width}.webp'
            image.resize((width, height), Image.Resampling.LANCZOS).save(target, 'WEBP', quality=82, method=6)
            variants.append({'src': '/images/worlds/' + target.name, 'width': width, 'height': height})
        manifest[asset_id] = {'source': filename, 'variants': variants}
(ROOT / 'src/data/visual-assets.json').write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8')
print(f'Prepared {len(manifest)} illustrations, {sum(p.stat().st_size for p in DEST.glob("*.webp")):,} bytes')
