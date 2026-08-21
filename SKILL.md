---
name: codex-remotion-video-skill
description: Build reusable Chinese AI-explainer videos with Remotion by turning a script, voice track, scene assets, captions, and motion rules into a timed composition. Use when Codex needs to create or revise a speech-led tutorial, white-scene explainer, black knowledge card, chapter progress bar, caption/audio alignment, or a reusable video-production workflow.
---

# Codex Remotion Video Skill

Use this Skill to turn one source script into a consistent, editable Remotion video. Keep the workflow reusable: the user may replace the script, images, voice, music, logo, and font without rewriting the visual system.

## Privacy and portability

- Treat every API key, token, signed URL, local path, personal recording, and private screenshot as secret. Never commit them or copy them into generated code, logs, examples, or prompts.
- Start from `config/brand.example.json`. Ask the user to create a private `brand.json` locally when a logo, font, or color needs to be customized.
- Do not bundle a person's cloned voice, private recordings, paid sound effects, or proprietary product screenshots. Use placeholders and document the expected file names.
- Keep all generated project files in the user's chosen project directory. Do not assume a drive letter, username, proxy, or operating-system path.

## Workflow

1. **Inspect the input**
   - Read the script and identify the hook, examples, concepts, transitions, practice step, and closing call-to-action.
   - Prefer one continuous narration file. If the TTS provider only returns chunks, keep the chunks and a timing manifest; never guess durations from character count.
2. **Choose a visual form per sentence**
   - Use a white scene for a concrete life example, product interface, or character action.
   - Use a black knowledge card for definitions, lists longer than three items, relationships, comparisons, and technical structures.
   - Use a transition page only when the narration changes topic. Do not place an unrelated floating sentence on top of a busy image.
3. **Prepare assets**
   - Put images in `public/images`, audio in `public/audio`, and keep filenames stable.
   - Use a small set of consistent character poses and backgrounds. For a new scene, match the established framing before adding decoration.
   - Render important Chinese display text with the supplied font in React/SVG. Do not rely on an image model to typeset a whole paragraph.
4. **Build the timeline**
   - Store narration segments as `{id, text, startFrame, endFrame, scene, emphasis}`.
   - Derive subtitle and scene timing from the narration timestamps. A scene may hold after speech ends only when the storyboard explicitly calls for a visual pause.
   - Keep sentence-end punctuation out of on-screen captions unless it is part of a code or product name.
5. **Render and validate**
   - Preview a representative white page, black card, transition, and caption before rendering the full video.
   - Render at the requested FPS (usually 30 or 60) and verify with `ffprobe`.
   - Check that the final video duration matches narration, captions never lead the voice, text stays inside safe margins, and BGM remains clearly below speech.

## Visual system

### White scene

- Use a light outer canvas, a thick rounded image frame, and a simple background with the visual focus in the center.
- Keep the character and the main object in the same generated scene when possible; avoid a pasted-on cutout look.
- For one to three short emphasis items, place large dark text in a quiet area of the image. Use `white-space: nowrap`, `word-break: keep-all`, and a measured max width to prevent accidental one-character line breaks.
- If the line contains more than three items or the background is busy, switch to a black knowledge card instead of shrinking the text.
- Let the character change pose or expression while the scene remains stable. A new image is not required for every sentence.

### Black knowledge card

- The grid is a bottom layer, never a texture pasted over text.
- Use centered titles, large type, high contrast, and one clear reading order.
- Introduce cards, dots, lines, search boxes, terminals, and arrows in sequence. Keep the settled state visible long enough to read.
- When the narration advances, dim completed items slightly and keep the current item bright. Do not hide the whole page between every word.
- Prefer one transition mechanism per beat: slide, draw-on line, scale, typewriter, or focus shift. Avoid stacking unrelated effects.

### Captions and motion

- Captions are phrase-level, not single-character. Break at natural Chinese pauses and keep two to eight Chinese characters together where possible.
- Keep the caption baseline stable across scenes. The caption should sit below the main visual frame with enough breathing room.
- Use the supplied typeface for important display words and a legible system fallback for ordinary captions.
- Keep motion deterministic: use Remotion frame interpolation and explicit `from`/`durationInFrames` values rather than wall-clock timers.

## Audio

- Use the selected Chinese/English-capable voice consistently for the whole narration. Keep English product names in their original spelling and pronunciation.
- Add intentional pauses in the script or timing manifest before generating TTS. Do not try to repair every pause with arbitrary silence after rendering.
- Loop BGM at a low level under speech and duck it further during explanations. Keep click, whoosh, and confirmation effects short and tied to visible actions.
- If the narration is regenerated, rebuild the timing manifest and captions from the new audio; never reuse stale timestamps.

## Inputs for a reusable run

Provide these values before coding:

```json
{
  "script": "path/to/script.txt",
  "narration": "path/to/narration.wav",
  "timing": "path/to/timing.json",
  "brand": "path/to/brand.json",
  "fps": 60,
  "width": 1080,
  "height": 1920
}
```

When a value is missing, use a visible placeholder and report it. Do not silently substitute a private asset or invent a product logo.

## Bundled references and template

- Read `references/design-system.md` when choosing a scene layout or motion pattern.
- Read `references/timing-and-audio.md` when aligning narration, captions, BGM, or sound effects.
- Copy `templates/remotion-app` as a clean starting point for a new Remotion composition. Replace the placeholder media under `public/` and the sample timeline in `src/KnowledgeCardDemo.tsx`.
- Use `scripts/new-remotion-project.ps1` to copy the template without carrying over private project paths.
- Use `scripts/check-public-release.ps1` before committing. It scans for common secrets and local-path leakage.

## Completion checklist

- The project builds without private files.
- A first-frame and a settled-frame preview exist for each scene family.
- Narration, captions, BGM, and visual changes share one timeline.
- Black cards use Remotion layers for all important text.
- Missing assets are reported instead of silently replaced.
- No API key, personal voice, private screenshot, or local absolute path is present in the release.
