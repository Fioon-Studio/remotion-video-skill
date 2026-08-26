import fs from 'node:fs';

const file = process.argv[2];
if (!file) {
  console.error('Usage: node scripts/check-timeline.mjs path/to/timing.json');
  process.exit(2);
}
const manifest = JSON.parse(fs.readFileSync(file, 'utf8'));
const issues = [];
const punctuation = /[，。？！]/u;
const inside = (item, segment) => item.startFrame >= segment.startFrame && item.startFrame <= segment.endFrame;

if (!Number.isInteger(manifest.fps) || manifest.fps <= 0) issues.push('fps must be a positive integer');
for (const group of ['chapters', 'segments', 'captions', 'cues']) if (!Array.isArray(manifest[group])) issues.push(`${group} must be an array`);
for (const item of [...(manifest.chapters ?? []), ...(manifest.segments ?? []), ...(manifest.captions ?? []), ...(manifest.cues ?? [])]) {
  if (!Number.isInteger(item.startFrame) || !Number.isInteger(item.endFrame) || item.endFrame <= item.startFrame) issues.push(`${item.id ?? item.segmentId ?? 'item'} has invalid frame range`);
}
for (const chapter of manifest.chapters ?? []) {
  const hasSegment = (manifest.segments ?? []).some((segment) => segment.startFrame >= chapter.startFrame && segment.startFrame < chapter.endFrame);
  if (!hasSegment) issues.push(`chapter ${chapter.id} has no narration segment`);
}
for (const caption of manifest.captions ?? []) {
  if (punctuation.test(caption.text)) issues.push(`caption ${caption.segmentId} still contains screen punctuation`);
  const segment = (manifest.segments ?? []).find((value) => value.id === caption.segmentId);
  if (!segment) issues.push(`caption ${caption.segmentId} has no narration segment`);
  else if (!inside(caption, segment) || caption.endFrame > segment.endFrame) issues.push(`caption ${caption.segmentId} is outside its spoken segment`);
}
for (const cue of manifest.cues ?? []) {
  const segment = (manifest.segments ?? []).find((value) => value.text.includes(cue.anchorText));
  if (!segment) issues.push(`cue ${cue.id} cannot find anchor text: ${cue.anchorText}`);
  else if (!inside(cue, segment)) issues.push(`cue ${cue.id} does not start inside its anchor segment`);
}
if (issues.length) {
  console.error(`TIMELINE_CHECK_FAILED (${issues.length})`);
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}
console.log('TIMELINE_CHECK_OK');
