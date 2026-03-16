# SFrameAnimation — 帧动画

## 使用边界

**适用场景:**

- 精灵图帧动画（Loading 动效、交互动画）
  **不适用:**
- 简单 Loading 状态，使用 antd Spin
- CSS 动画可实现的效果，不需要帧动画组件

## 类型定义

**FrameAnimationProps**

- direction?: 'vertical' | 'horizontal' — 帧动画方向
- imgNumber: number — 图片的数量
- frameNumber?: number — 一秒钟的动画量默认为 60
- width: React.CSSProperties['width']
- height: React.CSSProperties['height']
- icon: string — icon 地址
- style?: React.CSSProperties
