import fs from 'node:fs';

const [sourcePath, specPath] = process.argv.slice(2);
if (!sourcePath || !specPath) throw new Error('Usage: node scripts/check-visual-bindings.mjs <component.tsx> <visual-anchor-spec.json>');
const source = fs.readFileSync(sourcePath, 'utf8');
const ids = new Set(JSON.parse(fs.readFileSync(specPath, 'utf8')).anchors.map((item) => item.id));
const calls = [
  ...[...source.matchAll(/visual\('([^']+)'\)/g)].map((match) => match[1]),
  ...[...source.matchAll(/(?:isAnchored|isOn)\(frame,\s*'([^']+)'\)/g)].map((match) => match[1]),
];
const missing = [...new Set(calls.filter((id) => !ids.has(id)))];
if (missing.length) throw new Error(`VISUAL_BINDING_CHECK_FAIL ids missing from visual-anchor-spec.json: ${missing.join(', ')}`);
console.log(`VISUAL_BINDING_CHECK_OK ${new Set(calls).size}`);
