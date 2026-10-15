import { test } from 'node:test';
import assert from 'node:assert/strict';
import { placeLabels, planTravelMap } from '../static/maps/travel-map-layout.mjs';

const trip = [
  { name: 'London, UK', lat: 51.5, lng: -0.1 },
  { name: 'Delhi, India', lat: 28.7, lng: 77.1 },
  { name: 'Oxford, UK', lat: 51.8, lng: -1.3 },
  { name: 'Paris, France', lat: 48.9, lng: 2.4 }
];

test('visited countries are listed once each, in the order they first appear', () => {
  const plan = planTravelMap(trip, []);
  assert.deepEqual(plan.countries, ['United Kingdom', 'India', 'France']);
  assert.deepEqual(plan.places.map(p => [p.name, p.country]), [
    ['London', 'United Kingdom'],
    ['Delhi', 'India'],
    ['Oxford', 'United Kingdom'],
    ['Paris', 'France']
  ]);
});

test('only the first listed place in each country is named on the map', () => {
  const named = planTravelMap(trip, []).places.filter(p => p.labelled).map(p => p.name);
  assert.deepEqual(named, ['London', 'Delhi', 'Paris']);
});

test('grey country names leave out countries that were visited', () => {
  const landmarks = [
    { name: 'France', lat: 46, lng: 2 },
    { name: 'Spain', lat: 40, lng: -4 },
    { name: 'United States', country: 'United States of America', lat: 39, lng: -98 }
  ];
  const visitedUs = [...trip, { name: 'Austin, United States of America', lat: 30, lng: -97 }];
  assert.deepEqual(planTravelMap(visitedUs, landmarks).landmarks.map(l => l.name), ['Spain']);
});

const frame = { width: 400, height: 300 };
const dotAt = (x, y) => ({ x, y });

test('a name sits below its dot when that space is free', () => {
  const sides = placeLabels([{ x: 200, y: 150, width: 50 }], { ...frame, dots: [dotAt(200, 150)] });
  assert.deepEqual(sides, ['below']);
});

test('a name moves beside its dot when another dot is below it', () => {
  const sides = placeLabels([{ x: 200, y: 150, width: 50 }], { ...frame, dots: [dotAt(200, 150), dotAt(200, 165)] });
  assert.deepEqual(sides, ['right']);
});

test('a name never runs off the edge of the map', () => {
  const nearBottom = placeLabels([{ x: 200, y: 280, width: 50 }], { ...frame, dots: [dotAt(200, 280)] });
  const offScreen = placeLabels([{ x: 900, y: 150, width: 50 }], { ...frame, dots: [] });
  assert.deepEqual([nearBottom, offScreen], [['right'], [null]]);
});

test('a crowded city name may cover unnamed dots but never a named one', () => {
  const surrounded = [dotAt(200, 150), dotAt(200, 165), dotAt(240, 150), dotAt(160, 150), dotAt(200, 135)];
  const [crowded] = placeLabels([{ x: 200, y: 150, width: 50 }], { ...frame, dots: surrounded });
  const [, besideNamedDot] = placeLabels(
    [{ x: 240, y: 150, width: 20 }, { x: 200, y: 150, width: 50 }],
    { ...frame, dots: surrounded }
  );
  assert.notEqual(crowded, null);
  assert.notEqual(besideNamedDot, 'right');
});

test('a country name sits centred on its spot and hides rather than cover a dot', () => {
  const country = { x: 100, y: 100, width: 60, centered: true };
  const [alone] = placeLabels([country], { ...frame, dots: [] });
  const [overDot] = placeLabels([country], { ...frame, dots: [dotAt(110, 100)] });
  assert.deepEqual([alone, overDot], ['center', null]);
});

test('names keep out of blocked areas such as the zoom buttons', () => {
  const zoomButtons = [0, 0, 60, 100];
  const [side] = placeLabels([{ x: 40, y: 40, width: 30, centered: true }], { ...frame, dots: [], blocked: [zoomButtons] });
  assert.equal(side, null);
});

test('an entry naming only a country counts as a visit to that country', () => {
  const plan = planTravelMap([{ name: 'Italy', lat: 41.9, lng: 12.6 }, { name: 'Iceland', lat: 65, lng: -19 }], []);
  assert.deepEqual(plan.countries, ['Italy', 'Iceland']);
  assert.deepEqual(plan.places.filter(p => p.labelled).map(p => p.name), ['Italy', 'Iceland']);
});
