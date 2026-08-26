# Remotion Video Skill

A reusable Remotion workflow for turning a Chinese narration script into an editable explainer video.

It combines character-led scenes for concrete examples, black knowledge cards for concepts, and a shared timing file for captions, emphasis and sound effects.

## What you get

- A copyable Remotion template
- White scenes, black knowledge cards, chapter progress, screenshot focus and caption components
- Timing-driven captions and visual cues
- Replaceable examples for branding, character assets and audio

## Quick start

1. Copy `templates/remotion-app` into your own project.
2. Run `npm install` and `npm run dev`.
3. Add your narration and assets under `public/audio` and `public/images`.
4. Create a `timing.json` from the final narration.
5. Ask your coding agent to read `SKILL.md`, preview key scenes, then render.

Use white scenes for concrete examples. Use black cards for lists, definitions, comparisons and processes. Show only the relevant part of a screenshot, and trigger each highlight at the start of its spoken phrase.

Before coding, make a director plan: define the opening, chapters, page type, visual purpose and transition reason for every narration section. The [director preflight](references/director-preflight.md) also covers white/black rhythm, product assets, layout collision checks and review frames.

## License

[MIT License](./LICENSE) · Copyright (c) 2026 Fioon-Studio
