# Remotion Video Skill

一套中文优先的 Codex / WorkBuddy / DeepSeek Harness 视频制作 Skill。

它把一份口播稿、配音、图片、字幕和动效规则，整理成可复用的 Remotion 视频项目。适合 AI 小白教程、企业 AI 解释、人物讲解和黑底知识卡。

## 能做什么

- 白底人物讲解和黑底知识卡切换
- 章节进度条、重点词、连线、卡片、搜索框和终端打字效果
- 按真实配音时间戳对齐字幕、画面和音效
- 长期复用同一套字体、Logo、人物比例和排版

## 快速开始

1. 复制 `templates/remotion-app`
2. 复制 `config/brand.example.json`，在本地创建私有品牌配置
3. 准备脚本、连续 narration 音频和 timing manifest
4. 按 `SKILL.md` 把素材放入 `public/images` 和 `public/audio`
5. 先预览四类场景，再渲染完整视频

如果项目有 README，先读 README。没有 README 时，从 `SKILL.md` 开始，让 Agent 先解释目录、准备条件和第一次运行步骤。

## 目录说明

- `agents`：面向 Agent 的初始化提示
- `config`：品牌配置示例
- `references`：设计、时间线和音频规则
- `scripts`：初始化、检查和辅助脚本
- `templates`：可复制的 Remotion 项目模板

## 隐私提醒

公开仓库不包含 API key、克隆音色、个人录音、企业截图和本地绝对路径。发布前请运行 `scripts/check-public-release.ps1`。

## License

MIT License，版权归 FioonStudio 所有，详见 [LICENSE](./LICENSE)。

