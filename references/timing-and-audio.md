# Timing and audio notes

## Timing manifest

Use a frame-based manifest so captions and visual actions share the same source of truth:

```json
[
  {"id":"hook","text":"五分钟看懂 Agent","startFrame":0,"endFrame":180,"scene":"black-title","emphasis":["Agent"]},
  {"id":"example","text":"让它帮你整理周报","startFrame":180,"endFrame":420,"scene":"white-example","emphasis":["整理周报"]}
]
```

Use the real narration timestamps when filling `startFrame` and `endFrame`. At 60 fps, one second is 60 frames; at 30 fps, one second is 30 frames.

## Word-level visual anchors

Do not estimate visual timing by dividing a scene. Produce a word-level ASR or forced-alignment JSON from the final narration, then describe every visual event in `visual-anchor-spec.json`:

```json
{"anchors":[
  {"id":"readme-focus","phrase":"先看 README"},
  {"id":"install-highlight","phrase":"再点 Code"}
]}
```

Build and verify the shared timeline:

```bash
node scripts/build-visual-anchors.mjs timing.json aligned-items.json visual-anchor-spec.json visual-anchors.json --write-timing
node scripts/check-visual-anchors.mjs timing.json visual-anchor-spec.json visual-anchors.json
node scripts/check-visual-bindings.mjs src/YourComposition.tsx visual-anchor-spec.json
```

The output contains the actual `startFrame` and `endFrame` for every requested phrase. Components must read this output; hand-written frame numbers are not a substitute. If narration changes, regenerate alignment, anchors, `timing.json`, captions and then re-check before rendering.

For every visual cue, store the target and its anchor explicitly. For example:

```json
{"id":"readme-focus","target":"README","anchorText":"先看 README","startFrame":820,"endFrame":940,"mode":"focus"}
```

`startFrame` must be the real start of `anchorText`. A cue must never be placed by evenly dividing the scene duration. Use `mode: "focus"` only for a single inspection target; use `mode: "highlight"` when the item should stay in its original list or grid position.

## Alignment checks

- The first visible caption should begin with the spoken phrase, not before it.
- A caption should end no later than the phrase it represents, except for a deliberate reading hold.
- A scene change should happen at a sentence boundary or a designed pause.
- An in-place highlight must start when its matching word is spoken, not at the beginning of the scene.
- A screenshot frame must put the highlighted region near the center of its visible crop. Dim or crop the surrounding interface instead of showing an unrelated full-screen capture.
- Review stills at each cue boundary: before the spoken word, at the first frame of the word, and after the next cue begins.
- When narration changes, regenerate the manifest and captions together.

## Mix guidance

- Speech is the reference track. Lower BGM until every consonant remains clear on laptop speakers.
- Duck BGM at scene changes and during dense explanations.
- Keep short sound effects below speech and avoid triggering several effects on the same frame.
- Export a version with no BGM when checking subtitle and narration alignment.
