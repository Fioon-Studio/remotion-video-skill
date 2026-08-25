# Remotion Video Skill

A Chinese-first Codex / WorkBuddy / DeepSeek Harness Skill for reusable Remotion videos.

It turns a script, narration, images, captions and motion rules into an editable video project. It is designed for AI beginner tutorials, enterprise-AI explainers, character-led scenes and black knowledge cards.

## Features

- White character scenes and black grid knowledge cards
- Chapter progress bars, emphasis words, rails, cards, search boxes and terminal typewriter effects
- Caption, scene and sound-effect timing derived from real narration timestamps
- Reusable fonts, logo placement, character framing and layout rules

## Quick start

1. Copy `templates/remotion-app` into your project.
2. Copy `config/brand.example.json` and create a private local brand file.
3. Prepare a script, one continuous narration track and a timing manifest.
4. Put assets under `public/images` and `public/audio`.
5. Preview representative scene types before rendering the full video.

If a project has a README, read it first. Otherwise start with `SKILL.md` and ask your Agent to explain the folders, requirements and first run.

## Privacy

This public repository must not contain API keys, cloned voices, personal recordings, private screenshots, signed URLs or absolute local paths. Run `scripts/check-public-release.ps1` before publishing.

## License

MIT License. Copyright (c) 2026 FioonStudio. See [LICENSE](./LICENSE).

