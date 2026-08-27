# 导演分镜到 Remotion 的执行契约

## 本质

“白底人物”“黑底知识卡”“逐项点亮”只是方向，不能直接变成好看的成片。如果导演分镜和组件分别决定坐标、停留和高亮，画面会不丰富、排版会依赖临时微调、词已经念完但元素仍在亮。

每条视频需要一份 `director-runtime-spec.json`，让导演、组件和检查脚本使用同一份数据。

## 最小规格

```json
{
  "fps": 60,
  "stage": {"left": 310, "top": 174, "width": 1940, "height": 1091, "captionTop": 1284},
  "scenes": [{
    "id": "workflow",
    "startFrame": 8725,
    "endFrame": 9704,
    "visualType": "black-step-flow",
    "composition": "centered-horizontal-flow",
    "assets": ["workflow-icons"],
    "highlightAnchors": ["workflow-1", "workflow-2", "workflow-3", "workflow-4", "workflow"],
    "beats": ["workflow-1", "workflow-2", "workflow-3", "workflow-4", "workflow"],
    "rectangles": [
      {"id": "title", "x": 680, "y": 260, "width": 1200, "height": 180},
      {"id": "steps", "x": 350, "y": 650, "width": 1860, "height": 190}
    ]
  }]
}
```

`highlightAnchors` 和 `beats` 的起止帧只来自 ASR 强制对齐。`rectangles` 是可测的排版登记，用来在渲染前发现重叠，而不是靠事后肉眼找问题。

## 落地规则

1. 主体区由 `stage` 决定。主要坐标、卡片宽度和间距由主体区、列数和卡片数量推导；不要散落手写 `-50`、补偿式 `top` 和额外帧数。
2. 一个场景只承担一个理解任务。生活例子用白底 16:9 画框和连续人物动作；四项以上结构、流程或关系用黑底知识卡；具体产品和操作优先使用裁切后的截图或录屏焦点。
3. `beats` 必须表达画面推进。连续口播不能只换字幕：每个关键短语至少对应素材切换、局部焦点、关系线推进、卡片状态变化或镜头内动作。
4. 当前项严格使用 `startFrame <= frame && frame < endFrame`；已讲项只可变暗留在原位。只有单一截图目标、按钮或文件需要细看时，才做中央聚焦。
5. 每页先审首帧、每个 beat 帧和结束前一秒；整片再按每秒一帧审查。

## 渲染前必须失败的情况

- 引用了不存在的 ASR 锚点，或锚点不在所属页面出现期间。
- 场景没有视觉类型、版式或画面变化节拍。
- 主要文字、卡片、按钮和截图焦点互相压住，或离开主体区。
- 同一个视觉对象同时从场景时长和 ASR 锚点取得时间，导致两个时间来源互相打架。

这些情况必须在渲染前停止，而不是把渲染后的错位留给下一轮修改。
