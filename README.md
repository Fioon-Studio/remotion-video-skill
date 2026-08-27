# Remotion Video Skill

把一篇中文口播稿，做成一条可继续编辑的 Remotion 视频。

它适合 AI 教程、工具演示、知识讲解这类内容：人物场景讲例子，黑底知识卡讲概念，字幕、重点词和音效跟着真实配音时间走。

> 中文优先，适用于 Codex、WorkBuddy、DeepSeek Harness 等能读取本地项目的 Agent。

## 你会得到什么

- 可复制的 Remotion 项目模板
- 白底人物页、黑底知识卡、章节进度条、截图聚焦和固定字幕区
- 以真实配音的词级对齐驱动字幕、画面切换、逐项点亮、人物动作与音效；每个视觉变化都可追溯到口播词组
- 品牌、角色、音频和素材的示例配置，方便替换成自己的内容

这里提供的是可改的制作基础，不是只能导出一次的成片工具。换文案、配音和素材后，Agent 可以继续在同一项目里完成下一条。

## 三分钟开始

准备好三样东西：一份口播稿、一条配音，以及图片或截图素材。

```powershell
git clone https://github.com/Fioon-Studio/remotion-video-skill.git
Copy-Item .\remotion-video-skill\templates\remotion-app .\my-video -Recurse
Copy-Item .\remotion-video-skill\SKILL.md .\my-video\SKILL.md
Copy-Item .\remotion-video-skill\config .\my-video\config -Recurse
Set-Location .\my-video
npm install
npm run dev
```

打开 Remotion 后先看 `StyleSystemDemo`。接着：

1. 复制 `config/brand.example.json`，改成自己的本地品牌配置。
2. 把配音和图片放进 `public/audio`、`public/images`。
3. 根据配音生成 `timing.json` 和词级对齐结果；用 `visual-anchor-spec.json` 声明所有视觉变化，再运行 `scripts/build-visual-anchors.mjs` 回写同一份时间线。
4. 把项目交给 Agent，并让它阅读根目录的 `SKILL.md` 后再开始制作。

开始制作前，先完成一张章节分镜：哪段讲例子、哪段讲概念、哪段展示产品或截图，以及每次转场的理由。完整表格和审片方法见 [导演分镜与版面检查](references/director-preflight.md)。这一步能避免把文案、方框和装饰随机叠在一张图上。

词级对齐、页面可见期、等距版式、白底卡组、截图聚焦和碰撞检查的完整复盘见 [制作复盘与强制检查](references/production-retrospective.md)。它把已经出现过的问题变成每条视频都要执行的检查。

可直接这样说：

```text
请阅读这个项目的 SKILL.md。根据 script.txt、narration.mp3 和 timing.json，
把口播稿制作成一条中文讲解视频。先给出分镜和关键画面预览，确认后再渲染。
```

## 怎么选画面

| 文案内容 | 推荐画面 |
| --- | --- |
| 一个生活例子或具体操作 | 白底人物场景 |
| 四项以上的列表、流程、对比或定义 | 黑底知识卡 |
| 需要观众看清一个按钮、文件或界面区域 | 裁切截图并聚焦目标 |
| 真正进入新主题 | 简短章节页 |

画面变化应由口播内容触发：说到哪个选项，哪个选项才亮；截图只展示需要看的局部；不是每一页都要用同一种转场。

固定片头负责在开场收益讲完前交代主题和章节轮廓。白底场景用于具体例子，黑底知识卡用于四项以上的概念、流程或关系；白底场景超过约五秒时，使用同场景的连续动作变化，而不是静止讲完整段。

## 目录一览

| 位置 | 用途 |
| --- | --- |
| `SKILL.md` | 给 Agent 的制作规则与工作方式 |
| `templates/remotion-app` | 可直接复制的 Remotion 模板 |
| `config` | 品牌、角色与素材的示例配置 |
| `references` | 时间轴、音频和组件实现说明 |
| `scripts` | 初始化与时间线辅助脚本 |

## 你需要自己准备

- 文案与最终配音
- 自己有权使用的 Logo、人物图、截图、字体、音乐和音效
- 本地的 API 配置（如果你使用云端 TTS 或图像生成）

仓库不包含真实品牌素材、克隆音色、个人录音、客户截图或 API Key。

## English

An English overview is available in [README.en.md](./README.en.md).

## License

[MIT License](./LICENSE) · Copyright (c) 2026 Fioon-Studio
