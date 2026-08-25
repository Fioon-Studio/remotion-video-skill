---
name: codex-remotion-video-skill
description: 用 Remotion 把中文口播稿、配音、画面素材、字幕和动效编排成可复用的视频。支持白底人物讲解、黑底知识卡、章节进度条、字幕与配音对齐，以及长期复用的账号视觉规范。
---

# Codex Remotion Video Skill

这套 Skill 面向中文内容创作者，默认中文优先。Agent、Skill、Workflow、Tool、Memory、TTS、Remotion 等技术名词保留英文拼写，配音时按英文原本发音处理。

## 适用场景

- AI 小白教程和企业 AI 解释视频
- 白底人物讲解、黑底知识卡和章节过渡页
- 口播、字幕、人物动作、重点词和音效的统一编排
- 把同一套排版、字体、Logo 和节奏长期复用到不同选题

## 隐私与可移植性

- API key、token、签名链接、本地路径、个人录音和私有截图都视为敏感信息，不得写进仓库、示例、日志或提示词
- 从 `config/brand.example.json` 开始，品牌 Logo、字体和颜色请在本地创建私有的 `brand.json`
- 不要把克隆音色、个人录音、付费音效或企业内部截图打包进公开仓库，只保留占位文件名和说明
- 不假设用户的盘符、用户名、代理或操作系统，项目应当能在不同电脑上初始化

## 推荐工作流

### 1. 先读懂文案

找出黄金三秒、生活化例子、核心概念、过渡、练习和结尾行动。优先使用一整段 narration 音频；如果 TTS 只能返回分段文件，就保存分段和 timing manifest，不要用字数估算时间。

### 2. 给每句话选画面

- 生活场景、产品界面、人物动作使用白底场景
- 定义、超过三项的列点、关系图、对比和技术结构使用黑底知识卡
- 只有真正换主题时才使用过渡页，不要在复杂图片上随意叠一条无关句子

### 3. 准备素材

- 图片放进 `public/images`，音频放进 `public/audio`，文件名保持稳定
- 人物姿势和场景尽量来自同一套素材，新增画面先匹配已有构图
- 重要中文展示字用提供的字体在 React 或 SVG 中渲染，普通字幕使用清晰的系统字体
- 画面文字不超过三项时可以放在图片安静区域，超过三项直接切黑底卡，不要把字号压小

### 4. 建立时间线

把 narration 片段保存为 `{id, text, startFrame, endFrame, scene, emphasis}`。字幕和场景时间必须来自真实音频时间戳。字幕按词组或短句切分，保持自然停顿，不要拆成单字。

### 5. 音频和动效

- 全片使用同一套中文和英文都能自然朗读的音色
- BGM 低音量循环铺底，讲解时继续压低，点击、转场和确认音效只放在看得见的动作上
- 配音重新生成后，必须重新生成 timing manifest 和字幕，不能沿用旧时间戳

## 视觉系统

### 白底场景

使用浅色外框、较粗的圆角图片边框和简单背景，人物与主要物件尽量在同一张场景图里。让人物在场景不变时更换表情或动作，避免每句话都换背景。

### 黑底知识卡

网格是最底层的背景。标题居中、字号足够大、阅读顺序清楚。点、线、搜索框、终端、箭头和卡片按顺序出现。讲完的内容轻微暗下，当前内容保持最亮。一次只使用一种主要转场动作。

### 字幕和运动

- 字幕按短语切分，中文一组保留两到八个字
- 字幕基线在各场景保持稳定，并留出安全边距
- 重要词使用指定字体，普通字幕使用易读字体
- 动效使用 Remotion 的 frame 插值和明确的 `from`、`durationInFrames`，不要依赖墙钟时间

## 可复用输入

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

缺少素材时使用明显占位符并报告缺项，不要偷偷替换成私有文件或虚构的 Logo。

## 初始化

1. 复制 `templates/remotion-app` 到自己的项目目录
2. 根据 `config/brand.example.json` 创建本地品牌配置
3. 把脚本、配音、timing manifest 和素材放到对应目录
4. 运行 `scripts/check-public-release.ps1`，检查密钥和本地路径泄露
5. 先预览白底页、黑底卡、过渡页和字幕，再渲染完整视频

## 发布前检查

- 项目可以在没有私有文件的情况下安装和构建
- 每种场景都有首帧和稳定帧预览
- 配音、字幕、BGM 和画面变化共用同一条时间线
- 黑底卡的重要文字都由 Remotion 图层渲染
- 最终视频时长与 narration 一致，字幕不抢跑，BGM 明显低于人声
- 仓库中没有 API key、个人音色、私有截图和本地绝对路径

## English quick reference

This Skill builds reusable Chinese AI-explainer videos with Remotion. Keep Chinese as the default language while preserving technical names such as Agent, Skill, Workflow, Tool, Memory, TTS and Remotion in their original spelling. Never commit API keys, private recordings, cloned voices, signed URLs, local paths or private screenshots. Use white scenes for concrete examples and black grid cards for concepts, lists and technical structures. Derive captions and scene timing from real narration timestamps, keep captions phrase-level, keep BGM quiet, and rebuild the timing manifest whenever narration changes.

