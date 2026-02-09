#!/usr/bin/env python3
# /// script
# requires-python = ">=3.14"
# dependencies = ["Pillow"]
# ///
"""Generate the base OG image template for Hugo blog posts.

Creates a 1200x630px image with:
- Dark navy gradient background
- Light blue accent line at top
- Separator line for metadata section
- Circular author photo on the right
- "iamit.in" branding at bottom right
- Decorative dots at bottom left

Usage:
    uv run scripts/generate_og_base.py
"""


from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

SCRIPT_DIR = Path(__file__).parent
REPO_ROOT = SCRIPT_DIR.parent
ASSETS_DIR = REPO_ROOT / "assets"
FONTS_DIR = ASSETS_DIR / "fonts"
OUTPUT_PATH = ASSETS_DIR / "og_base.png"
TITLE_CANVAS_PATH = ASSETS_DIR / "og_title_canvas.png"
AUTHOR_PHOTO = ASSETS_DIR / "author.jpg"

WIDTH = 1200
HEIGHT = 630
TITLE_CANVAS_WIDTH = 850
TITLE_CANVAS_HEIGHT = 400


def gradient_color(y: int) -> tuple[int, int, int]:
    r = int(15 + (25 - 15) * y / HEIGHT)
    g = int(23 + (35 - 23) * y / HEIGHT)
    b = int(42 + (65 - 42) * y / HEIGHT)
    return (r, g, b)


def create_gradient(draw: ImageDraw.Draw, width: int = WIDTH) -> None:
    for y in range(HEIGHT):
        draw.line([(0, y), (width, y)], fill=gradient_color(y))


def add_accent_line(draw: ImageDraw.Draw) -> None:
    draw.rectangle([(0, 0), (WIDTH, 5)], fill=(99, 179, 237))


def add_separator_line(draw: ImageDraw.Draw) -> None:
    draw.rectangle([(80, 410), (WIDTH - 80, 411)], fill=(50, 65, 100))


def add_author_photo(img: Image.Image) -> None:
    photo = Image.open(AUTHOR_PHOTO)
    photo_size = 200
    photo = photo.resize((photo_size, photo_size), Image.LANCZOS)

    # Circular mask
    mask = Image.new("L", (photo_size, photo_size), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.ellipse([(0, 0), (photo_size, photo_size)], fill=255)

    # Border ring
    border_size = 4
    photo_x = WIDTH - photo_size - 100
    photo_y = 120
    ring_draw = ImageDraw.Draw(img)
    ring_draw.ellipse(
        [
            (photo_x - border_size, photo_y - border_size),
            (photo_x + photo_size + border_size, photo_y + photo_size + border_size),
        ],
        fill=(50, 70, 110),
    )

    img.paste(photo, (photo_x, photo_y), mask)


def add_branding(draw: ImageDraw.Draw) -> None:
    font_path = FONTS_DIR / "FiraSans-Regular.ttf"
    try:
        brand_font = ImageFont.truetype(str(font_path), 22)
    except OSError:
        brand_font = ImageFont.load_default()

    brand_text = "iamit.in"
    bbox = draw.textbbox((0, 0), brand_text, font=brand_font)
    text_width = bbox[2] - bbox[0]
    draw.text(
        (WIDTH - text_width - 80, HEIGHT - 70),
        brand_text,
        fill=(120, 145, 185),
        font=brand_font,
    )


def add_decorative_dots(draw: ImageDraw.Draw) -> None:
    for i in range(3):
        for j in range(3):
            x = 80 + i * 14
            y = HEIGHT - 80 + j * 14
            draw.ellipse([(x, y), (x + 5, y + 5)], fill=(60, 85, 130))


def generate() -> None:
    ASSETS_DIR.mkdir(parents=True, exist_ok=True)

    img = Image.new("RGB", (WIDTH, HEIGHT))
    draw = ImageDraw.Draw(img)

    create_gradient(draw)
    add_accent_line(draw)
    add_separator_line(draw)
    add_author_photo(img)

    # Re-create draw after pasting photo
    draw = ImageDraw.Draw(img)
    add_branding(draw)
    add_decorative_dots(draw)

    img.save(str(OUTPUT_PATH), "PNG")
    print(f"Created {OUTPUT_PATH} ({WIDTH}x{HEIGHT})")

    # Title canvas: narrow+short image with matching gradient for text wrapping
    title_canvas = Image.new("RGB", (TITLE_CANVAS_WIDTH, TITLE_CANVAS_HEIGHT))
    tc_draw = ImageDraw.Draw(title_canvas)
    for y in range(TITLE_CANVAS_HEIGHT):
        tc_draw.line([(0, y), (TITLE_CANVAS_WIDTH, y)], fill=gradient_color(y))
    tc_draw.rectangle([(0, 0), (TITLE_CANVAS_WIDTH, 5)], fill=(99, 179, 237))
    title_canvas.save(str(TITLE_CANVAS_PATH), "PNG")
    print(f"Created {TITLE_CANVAS_PATH} ({TITLE_CANVAS_WIDTH}x{TITLE_CANVAS_HEIGHT})")


if __name__ == "__main__":
    generate()
