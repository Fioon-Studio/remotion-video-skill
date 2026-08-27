import fs from 'node:fs';
import path from 'node:path';

const [timingPath, alignedItemsPath, specPath, outputPath, ...flags] = process.argv.slice(2);
if (!timingPath || !alignedItemsPath || !specPath || !outputPath) {
  throw new Error('Usage: node scripts/build-visual-anchors.mjs <timing.json> <aligned-items.json> <visual-anchor-spec.json> <visual-anchors.json> [--write-timing]');
}

const normalize = (value) => String(value).normalize('NFKC').replace(/[^0-9A-Za-z\u4e00-\u9fff]+/g, '').toLowerCase();
const read = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
const timing = read(timingPath);
const alignedItems = read(alignedItemsPath);
const spec = read(specPath);
if (!Array.isArray(alignedItems) || !Array.isArray(spec.anchors)) throw new Error('Invalid aligned items or anchor spec');

const units = [];
for (const item of alignedItems) {
  const text = normalize(item.text);
  const startMs = Number(item.startMs);
  const endMs = Number(item.endMs);
  if (!text || !Number.isFinite(startMs) || !Number.isFinite(endMs)) continue;
  for (let index = 0; index < text.length; index += 1) {
    units.push({char: text[index], startMs: Math.round(startMs + ((endMs - startMs) * index) / text.length), endMs: Math.round(startMs + ((endMs - startMs) * (index + 1)) / text.length)});
  }
}
const stream = units.map((item) => item.char).join('');
const findAll = (needle) => {
  const positions = [];
  for (let cursor = stream.indexOf(needle); cursor !== -1; cursor = stream.indexOf(needle, cursor + 1)) positions.push(cursor);
  return positions;
};
const anchors = spec.anchors.map((rule) => {
  const phrase = normalize(rule.phrase);
  const start = findAll(phrase)[Math.max(1, Number(rule.occurrence ?? 1)) - 1];
  if (start === undefined) throw new Error(`ASR anchor not found: ${rule.id} -> ${rule.phrase}`);
  const last = start + phrase.length - 1;
  return {id: rule.id, phrase: rule.phrase, occurrence: Math.max(1, Number(rule.occurrence ?? 1)), startMs: units[start].startMs, endMs: units[last].endMs, startFrame: Math.round((units[start].startMs / 1000) * timing.fps), endFrame: Math.round((units[last].endMs / 1000) * timing.fps), source: 'word-level-forced-alignment'};
});

fs.mkdirSync(path.dirname(outputPath), {recursive: true});
fs.writeFileSync(outputPath, JSON.stringify({schemaVersion: 1, fps: timing.fps, alignedItems: path.basename(alignedItemsPath), anchors}, null, 2) + '\n');
if (flags.includes('--write-timing')) {
  const existing = new Map((timing.cues ?? []).map((item) => [item.id, item]));
  for (const anchor of anchors) {
    const cue = existing.get(anchor.id);
    if (cue) Object.assign(cue, {anchorText: anchor.phrase, startFrame: anchor.startFrame, endFrame: anchor.endFrame, alignmentSource: anchor.source});
    else (timing.cues ??= []).push({id: anchor.id, anchorText: anchor.phrase, startFrame: anchor.startFrame, endFrame: anchor.endFrame, mode: 'highlight', alignmentSource: anchor.source});
  }
  fs.writeFileSync(timingPath, JSON.stringify(timing, null, 2) + '\n');
}
console.log(`VISUAL_ANCHORS_OK ${anchors.length}`);
