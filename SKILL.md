---
name: remotion-video-skill
description: 用 Remotion 将中文口播稿、配音和素材制作成可继续编辑的讲解视频。适用于教程、工具演示和知识型短视频，不用于生成品牌私有素材。
---

# Remotion Video Skill

## 目标

根据文案、最终配音、素材和时间线，制作一条可预览、可修改、可渲染的中文讲解视频。中文为主；Agent、Skill、Workflow、Tool、Memory、TTS、Remotion 等技术名称保留原拼写，并按对应语言自然朗读。

## 开始前

先确认以下输入：

- 口播稿
- 最终版 narration 音频
- 图片、截图或录屏素材
- `timing.json`，或能够从最终配音生成它的字幕时间戳

缺少最终配音或时间戳时，可以先做分镜和预览，但不要把字数估算出的时长当成最终时间线。

## 制作规则

1. 用白底人物或场景页讲具体例子和操作；用黑底网格卡讲四项以上的列表、定义、流程或对比。
2. 三项以内的短重点可以写在图片留白处；文字必须大、清楚，并避开复杂背景。
3. 字幕、画面、人物动作、截图框选、重点点亮和音效都从同一份真实时间线读取。每个变化以对应口播词或短句的起始帧为锚点，不按场景平均分配。
4. 为每条片建立 `visual-anchor-spec.json`，逐项写出需要出现、点亮、放大、淡下、换动作或触发音效的词组；从最终 narration 的词级 ASR/强制对齐结果运行 `scripts/build-visual-anchors.mjs`，输出 `visual-anchors.json` 并回写 `timing.json`。组件只读取这些锚点，不能手填 frame。
5. 渲染前运行 `scripts/check-visual-anchors.mjs`、`scripts/check-visual-bindings.mjs` 和 `scripts/check-anchor-scene-windows.mjs`。任一视觉对象缺失词级来源、组件引用未声明锚点、锚点落在页面可见期外、页面内没有足够阅读时间，或 `timing.json` 与 `visual-anchors.json` 的起止帧不一致，必须先修正。
6. 普通步骤、选项和文件夹保持原位。只有口播说到该项时才点亮它。只有需要观众检查单一按钮、文件或截图区域时，才将目标移到中心放大并压低其他内容。
7. 截图只展示相关区域；将目标放在裁切画面中心，可使用局部暗化、框选或放大镜。不要整张界面铺满画面。
8. 字幕按自然停顿和完整词组切分，屏幕上隐藏 `，。？！`。固定字幕基线，绝不拆开一个词。
9. 将画面分为顶部进度区、主体区和底部字幕区。主体的视觉重量在主体区居中；左右分屏要平衡图像、文字和留白。
10. 章节进度条、完成段和行走角色的位置必须来自完整配音中的真实章节帧。角色在进度线上方移动，圆点中心与线中心重合，章节文字不换行。
11. 背景音乐只做衬底；点击、确认和转场音效必须对应看得见的动作。
12. 不添加没有叙事职责的外框、小方块、星号或一秒闪过的页面。固定片头、章节页和每一次转场都必须对应一个完整的口播意图。

## 工作顺序

1. 读口播稿，标出开头收益、生活例子、概念、操作、章节和结尾行动。
2. 先写 `director-plan.md`：每个章节要有口播锚点、观众收益、白底/黑底/截图类型、画面主体、动效、转场理由和禁止项。格式见 [references/director-preflight.md](references/director-preflight.md)。未完成分镜，不开始编码或生图。
3. 为每个片段选择画面，并为所有会变化的元素记录口播锚点；产品出现时优先使用官方高清 Logo、公开产品页截图或有权使用的录屏。
4. 使用最终 narration 生成或导入 `timing.json`；清洗字幕标点。
5. 用 `src/LayoutGuard.ts` 检查文字、卡片、外框和按钮的矩形是否相撞，再预览固定片头、白底动作页、黑底卡、章节页和截图页，确认布局和字幕基线，再渲染完整视频。
6. narration 改动后，重新生成时间线和字幕，不复用旧时间戳。

## 隐私

品牌 Logo、人物素材、配音、截图、字体授权文件、API Key、签名链接和本地绝对路径只保留在使用者自己的项目中。公开仓库只应保留可替换的示例、占位文件和通用组件。

## 可用资源

- 组件使用方式：[references/implementation-recipes.md](references/implementation-recipes.md)
- 导演分镜、节奏和版面检查：[references/director-preflight.md](references/director-preflight.md)
- 已发现问题与强制检查：[references/production-retrospective.md](references/production-retrospective.md)
- 时间线与音频：[references/timing-and-audio.md](references/timing-and-audio.md)
- TTS、音乐与音效替换：[references/tts-and-assets.md](references/tts-and-assets.md)
- 渲染前运行：`node scripts/check-timeline.mjs <timing.json>`

不要假设用户的盘符、用户名、代理、音色、品牌或素材授权。缺少素材时明确列出缺项，不用私有文件替代。
