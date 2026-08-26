# Remotion Video Skill

## 公开包里有什么

这个仓库不包含任何 Fioon 角色、Logo、配音、截图或 API 配置，但包含可直接复制的制作方法和运行模板：

- 顶部章节进度条、已完成段变色、SVG 占位行走小人与替换为帧动画的做法
- 白底主体区、加粗圆角画框、黑底网格知识卡、截图裁切聚焦
- 字幕淡入、固定字幕区、基于真实口播锚点的点亮规则
- TTS、双语术语、背景音乐、音效、背景和角色素材的替换方向
- 画面变化库、布局/聚焦限制、字幕断句、音画锚点、审片规则与禁忌
- 主角 IP 设定图、四视图、动作/表情、行走循环与素材入库要求
- 完整资产库目录、每条视频的素材索引，以及配音/画面/动画/字幕/音效同一帧级时间轴

安装后运行 `npm run dev`，选择 `StyleSystemDemo`，就能先看到这套通用结构。详细替换方式见 [references/implementation-recipes.md](references/implementation-recipes.md)、[references/tts-and-assets.md](references/tts-and-assets.md)、[references/production-spec.md](references/production-spec.md)、[references/character-and-visual-spec.md](references/character-and-visual-spec.md) 与 [references/asset-library-and-frame-sync.md](references/asset-library-and-frame-sync.md)。

> 中文优先的 Remotion 短视频制作 Skill，给 Codex、WorkBuddy 和 DeepSeek Harness 读取、执行与复用。

把一份口播稿，整理成一条可继续修改的短视频：画面、配音、字幕、重点词、知识卡和音效都围绕同一份时间线工作。

English version: [README.en.md](./README.en.md)

## 这套 Skill 能做什么

- 人物讲解、屏幕录制穿插、黑底知识卡三类画面按文案内容切换
- 用真实配音时间戳对齐字幕、画面停留、重点词和音效
- 复用账号的字体、Logo、人物构图、章节进度条与画面排版
- 适合 AI 小白教程、企业 AI 解释、工具实操和知识型短视频

## 先看这一张路线图

```text
口播稿 + 连续配音 + 素材
          ↓
按时间线拆成画面段落
          ↓
人物讲解 / 截图聚焦 / 黑底知识卡
          ↓
Remotion 预览与渲染
```

## 第一次怎么用

1. 复制 `templates/remotion-app` 到你自己的项目目录。
2. 复制 `config/brand.example.json`，在本地创建只属于自己的品牌配置。
3. 准备口播稿、一条连续配音、字幕或时间线数据，以及你想使用的图片和截图。
4. 把素材放进新项目的 `public/images`、`public/audio` 等目录。
5. 把 `SKILL.md` 交给 Codex、WorkBuddy 或 DeepSeek Harness，让它先解释目录，再按稿子生成分镜和场景。
6. 先抽看几种关键画面，确认字幕、音频和重点内容对齐后，再渲染整条视频。

如果你第一次看到 GitHub 项目：先读这份 README；看不懂的地方，把整个文件夹交给 Agent，让它用自己的话解释“它做什么、需要准备什么、第一步怎么开始”。

## 目录说明

| 目录 | 作用 |
| --- | --- |
| `agents` | 给 Codex、WorkBuddy、DeepSeek Harness 的初始化说明 |
| `config` | 账号品牌配置示例，不放私密信息 |
| `references` | 画面、声音、字幕和时间线规则 |
| `scripts` | 初始化、检查和辅助脚本 |
| `templates` | 可复制的 Remotion 项目模板 |
| `SKILL.md` | 整套制作流程的入口说明 |

## 画面与节奏原则

- 讲生活化案例时，用人物与场景承接；一个场景可用符合文案的动作变化，而不是机械换图。
- 讲概念、步骤或对比时，用黑底网格知识卡；一组同类内容按文案到达的顺序点亮。
- 需要观众看清某个截图区域时，裁切并居中框选目标，而不是整张截图铺满画面。
- 不把所有画面都做成同一种动效；强调只发生在真的需要强调的内容上。
- 渲染前以真实音频为准校对：配音说到哪里，字幕、画面和重点就跟到哪里。

## 隐私与发布前检查

这个公开仓库不包含 API Key、克隆音色、个人录音、企业截图、客户资料、本地绝对路径或其他私密内容。

公开前运行：

```powershell
pwsh ./scripts/check-public-release.ps1
```

## License

[MIT License](./LICENSE) · Copyright (c) 2026 Fioon-Studio

