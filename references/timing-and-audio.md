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

## Alignment checks

- The first visible caption should begin with the spoken phrase, not before it.
- A caption should end no later than the phrase it represents, except for a deliberate reading hold.
- A scene change should happen at a sentence boundary or a designed pause.
- When narration changes, regenerate the manifest and captions together.

## Mix guidance

- Speech is the reference track. Lower BGM until every consonant remains clear on laptop speakers.
- Duck BGM at scene changes and during dense explanations.
- Keep short sound effects below speech and avoid triggering several effects on the same frame.
- Export a version with no BGM when checking subtitle and narration alignment.
