from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]
IMAGE_DIR = ROOT / "images"
OUTPUT = ROOT / "gallery.js"

extensions = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"}
images = sorted(
    f"images/{p.name}"
    for p in IMAGE_DIR.iterdir()
    if p.is_file() and p.suffix.lower() in extensions
)

OUTPUT.write_text(
    "/* Fichier généré automatiquement. */\n"
    "const GALLERY_IMAGES = " + json.dumps(images, ensure_ascii=False, indent=2) + ";\n",
    encoding="utf-8"
)
print(f"Galerie : {len(images)} image(s) détectée(s).")
