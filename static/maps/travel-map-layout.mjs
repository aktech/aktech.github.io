// Decides what the travel map shows and where its names go. No DOM or Leaflet here, so it runs under `node --test`.

// Country suffixes used in data/travel_*.json that differ from Natural Earth's country names
const COUNTRY_ALIASES = { UK: 'United Kingdom' };

const DOT_RADIUS = 6;
const EDGE_MARGIN = 4;

// Where a name can go relative to its point (x, y), as [left, top, right, bottom] in pixels.
// Names with a dot try DOT_SIDES in order; centred names (no dot) only use `center`.
// The offsets match the .tm-label / [data-side] rules in static/public/css/lanyon.css; change both together.
const SIDES = {
  center: (x, y, w) => [x - w / 2, y - 8, x + w / 2, y + 8],
  below: (x, y, w) => [x - w / 2, y + 7, x + w / 2, y + 23],
  right: (x, y, w) => [x + 9, y - 8, x + 9 + w, y + 8],
  left: (x, y, w) => [x - 9 - w, y - 8, x - 9, y + 8],
  above: (x, y, w) => [x - w / 2, y - 23, x + w / 2, y - 7]
};
const DOT_SIDES = ['below', 'right', 'left', 'above'];

const overlaps = (a, b) => a[0] < b[2] && a[2] > b[0] && a[1] < b[3] && a[3] > b[1];
const dotBox = ({ x, y }) => [x - DOT_RADIUS, y - DOT_RADIUS, x + DOT_RADIUS, y + DOT_RADIUS];

/**
 * locations: [{ name: 'City, Country' or 'Country', lat, lng }], most important first within each country.
 * landmarks: grey country names [{ name, country?, lat, lng }], `country` being the Natural Earth name when it differs.
 * Returns the visited countries (Natural Earth names), the places, and the landmarks not visited.
 * The first listed place in each country is named on the map.
 */
export function planTravelMap(locations, landmarks) {
  const visited = new Set();
  const places = locations.map(l => {
    // 'City, Country', or just 'Country'
    const [name, suffix = name] = l.name.split(', ');
    const country = COUNTRY_ALIASES[suffix] || suffix;
    const labelled = !visited.has(country);
    visited.add(country);
    return { name, fullName: l.name, lat: l.lat, lng: l.lng, country, labelled };
  });
  const unvisited = landmarks.filter(l => !visited.has(l.country || l.name));
  return { countries: [...visited], places, landmarks: unvisited };
}

/**
 * labels: [{ x, y, width, centered? }] in screen pixels, most important first.
 * dots: every dot on screen [{ x, y }]; blocked: extra boxes to keep clear (map controls).
 * Returns each label's side (`below`, `right`, `left`, `above`, `center`) or null when it should be hidden.
 * A dotted name may cover other unnamed dots as a last resort; a centred name hides instead.
 */
export function placeLabels(labels, { dots, blocked = [], width: frameWidth, height: frameHeight }) {
  const inFrame = b => b[0] > EDGE_MARGIN && b[1] > EDGE_MARGIN && b[2] < frameWidth - EDGE_MARGIN && b[3] < frameHeight - EDGE_MARGIN;
  // Named dots, placed names and blocked areas must never be covered
  const keepClear = [...blocked, ...labels.filter(l => !l.centered).map(dotBox)];
  const allDots = dots.map(dotBox);
  return labels.map(({ x, y, width, centered }) => {
    const freeSide = obstacles => (centered ? ['center'] : DOT_SIDES).find(k => {
      const box = SIDES[k](x, y, width);
      return inFrame(box) && !obstacles.some(o => overlaps(box, o));
    });
    const side = freeSide([...keepClear, ...allDots]) ?? (centered ? null : freeSide(keepClear)) ?? null;
    if (side) keepClear.push(SIDES[side](x, y, width));
    return side;
  });
}
