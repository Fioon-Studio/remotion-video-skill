# 资产库与按帧同步

## 项目目录

复制模板后，按以下结构维护。不要让组件代码里散落素材绝对路径或临时文件名。

```text
project/
  content/
    2026-08-topic/
      script.txt
      tts.txt
      narration.mp3
      timing.json
      asset-map.json
  public/
    images/
      characters/host/
      scenes/
      screenshots/
      brand/
    audio/
      narration/
      bgm/
      sfx/
  src/
    VideoSystem.tsx
    MotionLibrary.tsx
    Timing.ts
    FrameTimeline.ts
```

`config/asset-library.example.json` 是素材索引示例。每条视频的 `asset-map.json` 只登记实际使用的角色动作、场景、截图、配音、BGM 和音效。素材变更时更新索引，再渲染，不在组件中临时猜文件。

## 同一份 timing.json 驱动四条轨道

最终配音是时间轴起点。先对最终音频进行 ASR 或字词级对齐，再写帧级 `timing.json`。章节、视频的四条轨道必须读取它：

| 轨道 | 读取内容 | 要求 |
| --- | --- | --- |
| 配音 | `narration` | 作为实际时长来源 |
| 章节与进度条 | `chapters` | 文案章节、口播章节、画面章节、节点、小人位置共用开始/结束帧 |
| 字幕 | `captions` | 从 spoken phrase 开始到结束，不显示句末标点 |
| 画面与人物 | `segments` 和 `cues` | 换场、动作、截图、点亮均从对应锚点帧发生 |
| 动效与音效 | `cues` | 点击、确认、连线、框选、淡化与可见动作同帧开始 |

不要让字幕按字符数排、画面按平均场景时间排、音效按“感觉差不多”放置。这三种做法都会与配音漂移。

## 实施步骤

1. 锁定最终配音文件；如果换了声音、删了停顿、调整语速，旧 `timing.json` 立即作废。
2. 从最终音频取得句级或词级时间戳，按目标 `fps` 换算为整数帧。
3. 先依据真正主题变化建立 `chapters`，再依据自然停顿建立 `segments` 与 `captions`；章节不是平均切时长，渲染字幕时使用 `cleanCaption` 去掉标点。
4. 为每一个人物换动作、重点点亮、卡片出现、截图框选、音效写一个 cue，`anchorText` 对应真实口播短语。
5. 使用 `FrameTimeline.ts` 的 `getActiveCaption`、`getActiveCue` 和 `cueProgress`，禁止在不同组件里各自计算一套时间。
6. 每次渲染前运行：

```powershell
node ./scripts/check-timeline.mjs ./content/2026-08-topic/timing.json
```

脚本会拦下：章节没有口播段、字幕标点未清理、字幕超出口播段、cue 没有锚点或 cue 起始帧跑到锚点段之外。它不能替代人工抽听，所以仍要按“前一帧、首帧、后一条 cue”查看预览。

## 资产调用检查

- 角色动作、背景图、截图、BGM、音效都登记进 `asset-map.json`，并以相对路径访问。
- 调用前检查文件是否存在、角色图的角色 ID 是否相同、行走帧数量和尺寸是否一致。
- 截图先存原图，再在视频组件中裁切；不要保存一张来源不明的重复截图。
- 公开版保留目录、占位文件、索引样例和使用方法；私有品牌素材放到本地忽略目录。
