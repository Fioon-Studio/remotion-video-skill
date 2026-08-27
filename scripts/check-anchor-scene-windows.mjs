import fs from 'node:fs';

const [specPath, anchorsPath, windowsPath] = process.argv.slice(2);
if (!specPath || !anchorsPath || !windowsPath) {
  throw new Error('Usage: node scripts/check-anchor-scene-windows.mjs <visual-anchor-spec.json> <visual-anchors.json> <scene-windows.json>');
}

const read = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
const spec = read(specPath);
const anchors = read(anchorsPath);
const windows = read(windowsPath);
const byId = new Map((anchors.anchors ?? []).map((anchor) => [anchor.id, anchor]));
const assigned = new Set();
const minimumHold = Number(windows.minimumHoldFrames ?? 30);

for (const scene of windows.scenes ?? []) {
  if (!Number.isInteger(scene.startFrame) || !Number.isInteger(scene.endFrame) || scene.endFrame <= scene.startFrame) {
    throw new Error('ANCHOR_SCENE_CHECK_FAIL invalid scene range ' + scene.id);
  }
  for (const id of scene.anchorIds ?? []) {
    if (assigned.has(id)) throw new Error('ANCHOR_SCENE_CHECK_FAIL ' + id + ' is assigned to more than one scene');
    assigned.add(id);
    const anchor = byId.get(id);
    if (!anchor) throw new Error('ANCHOR_SCENE_CHECK_FAIL ' + scene.id + ' references missing anchor ' + id);
    if (anchor.startFrame < scene.startFrame || anchor.startFrame >= scene.endFrame) {
      throw new Error('ANCHOR_SCENE_CHECK_FAIL ' + id + ' starts outside ' + scene.id);
    }
    if (scene.endFrame - anchor.startFrame < minimumHold) {
      throw new Error('ANCHOR_SCENE_CHECK_FAIL ' + id + ' has too little readable hold in ' + scene.id);
    }
  }
}

const missing = (spec.anchors ?? []).map((rule) => rule.id).filter((id) => !assigned.has(id));
if (missing.length) throw new Error('ANCHOR_SCENE_CHECK_FAIL unassigned anchors: ' + missing.join(', '));
console.log('ANCHOR_SCENE_CHECK_OK ' + (spec.anchors ?? []).length);
