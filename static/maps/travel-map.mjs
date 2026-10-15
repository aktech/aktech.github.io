// Draws each [data-travel-map] element with Leaflet (loaded globally as `L`). All colours live in lanyon.css.
import { placeLabels, planTravelMap } from './travel-map-layout.mjs';

// Grey country names spread across the map for orientation; visited countries are dropped
const LANDMARKS = [
  { name: 'Spain', lat: 40.2, lng: -3.6 },
  { name: 'Algeria', lat: 28, lng: 2.6 },
  { name: 'Russia', lat: 61, lng: 60 },
  { name: 'Turkey', lat: 39, lng: 35 },
  { name: 'Egypt', lat: 26.5, lng: 30 },
  { name: 'Saudi Arabia', lat: 24, lng: 45 },
  { name: 'Kazakhstan', lat: 48, lng: 67 },
  { name: 'United States', country: 'United States of America', lat: 39.5, lng: -98.5 },
  { name: 'Brazil', lat: -10, lng: -53 },
  { name: 'Australia', lat: -25, lng: 134 }
];

function addMarker(map, { lat, lng }, className, html, interactive) {
  const icon = L.divIcon({ className, html, iconSize: [0, 0] });
  return L.marker([lat, lng], { icon, interactive, keyboard: false }).addTo(map);
}

// Box of a Leaflet control relative to the map, so names keep clear of it
function controlBox(container, selector) {
  const el = container.querySelector(selector);
  if (!el) return null;
  const c = container.getBoundingClientRect(), r = el.getBoundingClientRect();
  return [r.left - c.left, r.top - c.top, r.right - c.left, r.bottom - c.top];
}

async function drawTravelMap(container) {
  const plan = planTravelMap(JSON.parse(container.dataset.locations), LANDMARKS);
  const visited = new Set(plan.countries);

  const map = L.map(container, { zoomSnap: 0.25, zoomDelta: 0.5, minZoom: 1.5, maxZoom: 7, maxBounds: [[-85, -200], [85, 200]], maxBoundsViscosity: 1 });
  map.attributionControl.addAttribution('Borders &copy; <a href="https://www.naturalearthdata.com/">Natural Earth</a>');
  map.fitBounds(plan.places.map(p => [p.lat, p.lng]), { padding: [50, 50], maxZoom: 5 });

  const places = plan.places.map(p => {
    const label = p.labelled ? `<span class="tm-label">${p.name}</span>` : '';
    const marker = addMarker(map, p, 'tm-place', `<span class="tm-dot"></span>${label}`, true)
      .bindTooltip(p.fullName, { direction: 'top', offset: [0, -6], className: 'tm-tip' });
    return { ...p, el: marker.getElement() };
  });
  const landmarks = plan.landmarks.map(l => ({ ...l, centered: true, el: addMarker(map, l, 'tm-place tm-landmark', `<span class="tm-label">${l.name}</span>`, false).getElement() }));
  const named = [...places.filter(p => p.labelled), ...landmarks];

  function layoutLabels() {
    const point = ({ lat, lng }) => map.latLngToContainerPoint([lat, lng]);
    const { x: width, y: height } = map.getSize();
    const sides = placeLabels(
      named.map(n => ({ ...point(n), width: n.el.querySelector('.tm-label').offsetWidth, centered: n.centered })),
      {
        dots: places.map(point),
        blocked: ['.leaflet-control-zoom', '.leaflet-control-attribution'].map(s => controlBox(container, s)).filter(Boolean),
        width,
        height
      }
    );
    named.forEach((n, i) => { n.el.dataset.side = sides[i] ?? 'hidden'; });
  }
  map.on('zoomend moveend resize', layoutLabels);
  layoutLabels();
  // Name widths change once Fira Sans replaces the fallback font
  document.fonts.ready.then(layoutLabels);

  // Borders load last so the dots and names appear without waiting for the 1.5 MB file
  const countries = await (await fetch(container.dataset.countries)).json();
  L.geoJSON(countries, {
    interactive: false,
    style: f => ({ className: visited.has(f.properties.name) ? 'tm-country tm-visited' : 'tm-country' })
  }).addTo(map);
}

document.querySelectorAll('[data-travel-map]').forEach(drawTravelMap);
