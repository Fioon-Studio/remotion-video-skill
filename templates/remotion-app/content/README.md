# 内容与时间轴

每条视频建立独立目录，例如 `content/2026-08-ai-terms/`，最低包含：

```text
script.txt             原始口播稿
tts.txt                实际送入 TTS 的文本
narration.mp3          最终配音
timing.json            唯一时间轴来源
asset-map.json         本条视频使用了哪些素材
```

所有字幕、场景切换、人物动作、点亮、框选和音效都读取同一个 `timing.json`。先由最终音频得到时间戳，再写 `timing.json`；不要先按文字长度估时。
