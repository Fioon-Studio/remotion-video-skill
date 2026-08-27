import fs from 'node:fs';

const [timingPath, specPath, anchorsPath] = process.argv.slice(2);
if (!timingPath || !specPath || !anchorsPath) throw new Error('Usage: node scripts/check-visual-anchors.mjs <timing.json> <visual-anchor-spec.json> <visual-anchors.json>');
const read = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
const timing = read(timingPath);
const spec = read(specPath);
const anchors = read(anchorsPath);
const anchorById = new Map((anchors.anchors ?? []).map((item) => [item.id, item]));
const cueById = new Map((timing.cues ?? []).map((item) => [item.id, item]));
for (const rule of spec.anchors ?? []) {
  const anchor = anchorById.get(rule.id);
  if (!anchor || anchor.source !== 'word-level-forced-alignment') throw new Error(`VISUAL_ANCHOR_CHECK_FAIL missing forced ASR anchor ${rule.id}`);
  if (!Number.isInteger(anchor.startFrame) || !Number.isInteger(anchor.endFrame) || anchor.endFrame < anchor.startFrame) throw new Error(`VISUAL_ANCHOR_CHECK_FAIL invalid range ${rule.id}`);
  const cue = cueById.get(rule.id);
  if (!cue || cue.startFrame !== anchor.startFrame || cue.endFrame !== anchor.endFrame) throw new Error(`VISUAL_ANCHOR_CHECK_FAIL timing mismatch ${rule.id}`);
}
console.log(`VISUAL_ANCHOR_CHECK_OK ${(spec.anchors ?? []).length}`);
