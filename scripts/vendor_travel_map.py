#!/usr/bin/env python3
"""Vendor everything the travel map needs into static/maps/ so the page
makes no requests to other servers.

Downloads pinned, hash-checked sources:
- Leaflet (npm tarball) -> static/maps/leaflet/
- Natural Earth 1:50m country borders (public domain) -> static/maps/countries.geojson,
  keeping only each country's name and rounding coordinates to keep the file small.
- Fira Sans (SIL Open Font License, from google/fonts) -> static/maps/fonts/

Usage:
    python3 scripts/vendor_travel_map.py
"""

import base64
import hashlib
import io
import json
import shutil
import tarfile
import urllib.request
from pathlib import Path

LEAFLET_VERSION = "1.9.4"
LEAFLET_URL = f"https://registry.npmjs.org/leaflet/-/leaflet-{LEAFLET_VERSION}.tgz"
LEAFLET_SHA512 = "nxS1ynzJOmOlHp+iL3FyWqK89GtNL8U8rvlMOsQdTTssxZwCXh8N2NB3GDQOL+YR3XnWyZAxwQixURb+FA74PA=="
LEAFLET_FILES = {"leaflet.js": "package/dist/leaflet.js", "leaflet.css": "package/dist/leaflet.css", "LICENSE": "package/LICENSE"}

# Natural Earth v5.1.2 release commit
NE_COMMIT = "f1890d9f152c896d250a77557a5751a93d494776"
NE_URL = (
    "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/"
    f"{NE_COMMIT}/geojson/ne_50m_admin_0_countries.geojson"
)
NE_SHA256 = "3e458fc036ad0a66411f2c1e6cac49c5d7bfb81cb1123bc513b22511a2b7fdeb"
COORD_DECIMALS = 2

GOOGLE_FONTS_COMMIT = "1d0e46c7933245c8180fe83e47917961c913bbdb"
FONTS = {
    "FiraSans-Medium.ttf": "cbc1842cbed8c1d1146ba7c9db97d8f28c9bedfd25f41c5b0e1259ca48622328",
    "FiraSans-SemiBold.ttf": "db0321f83eb3e9f527b8af384a1b3fefdc1039cf2b06fd39b3f61492bda9561c",
    "OFL.txt": "8f24842e9174beda18a556c2ae7d54f5dc444340c19a3a9ef77e23bca366adbd",
}

OUT = Path(__file__).resolve().parent.parent / "static" / "maps"


def fetch_verified(url, algorithm, expected, encode=lambda d: d.hex()):
    with urllib.request.urlopen(url) as resp:
        data = resp.read()
    digest = encode(hashlib.new(algorithm, data).digest())
    if digest != expected:
        raise SystemExit(f"Hash mismatch for {url}: got {digest}")
    return data


def vendor_leaflet():
    data = fetch_verified(LEAFLET_URL, "sha512", LEAFLET_SHA512, encode=lambda d: base64.b64encode(d).decode())
    dest = OUT / "leaflet"
    shutil.rmtree(dest, ignore_errors=True)
    dest.mkdir(parents=True)
    with tarfile.open(fileobj=io.BytesIO(data), mode="r:gz") as tar:
        for name, src in LEAFLET_FILES.items():
            (dest / name).write_bytes(tar.extractfile(src).read())


def simplify_ring(ring):
    out = []
    for lng, lat, *_ in ring:
        point = [round(lng, COORD_DECIMALS), round(lat, COORD_DECIMALS)]
        if not out or out[-1] != point:
            out.append(point)
    return out


def simplify_geometry(geom):
    if geom["type"] == "Polygon":
        polygons = [geom["coordinates"]]
    else:
        polygons = geom["coordinates"]
    polygons = [[simplify_ring(r) for r in poly] for poly in polygons]
    polygons = [[r for r in poly if len(r) >= 4] for poly in polygons]
    polygons = [poly for poly in polygons if poly]
    return {"type": "MultiPolygon", "coordinates": polygons}


def vendor_countries():
    src = json.loads(fetch_verified(NE_URL, "sha256", NE_SHA256))
    features = [
        {"type": "Feature", "properties": {"name": f["properties"]["ADMIN"]}, "geometry": simplify_geometry(f["geometry"])}
        for f in src["features"]
        if f["geometry"]
    ]
    (OUT / "countries.geojson").write_text(
        json.dumps({"type": "FeatureCollection", "features": features}, separators=(",", ":"))
    )


def vendor_fonts():
    dest = OUT / "fonts"
    dest.mkdir(parents=True, exist_ok=True)
    base = f"https://raw.githubusercontent.com/google/fonts/{GOOGLE_FONTS_COMMIT}/ofl/firasans/"
    for name, sha256 in FONTS.items():
        (dest / name).write_bytes(fetch_verified(base + name, "sha256", sha256))


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    vendor_leaflet()
    vendor_countries()
    vendor_fonts()
    print(f"Wrote {OUT}")
