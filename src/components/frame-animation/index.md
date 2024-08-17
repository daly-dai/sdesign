---
toc: content
group:
  title: 动画
  order: 2
---

# SFrameAnimation 帧动画

## 帧动画组件

<code src="./demo/index.tsx"></code>

## API

| 属性名      | 描述           | 类型                          | 默认值     |
| ----------- | -------------- | ----------------------------- | ---------- |
| direction   | 帧动画的方向   | 'vertical'、'horizontal'      | "vertical" |
| imgNumber   | 图片的数量     | number                        |            |
| frameNumber | 一秒钟的动画量 | number                        | 60         |
| width       | 图片的宽度     | React.CSSProperties['width']  |            |
| height      | 图片的高度     | React.CSSProperties['height'] |            |
| icon        | 图片的地址     | string                        |            |
| style       | 样式           | React.CSSProperties           |            |
