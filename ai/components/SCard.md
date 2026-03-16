# SCard — 卡片容器，内置错误边界

## 使用边界

**适用场景:**

- 需要卡片容器包裹内容区域
- 需要内置错误边界，内容出错时不影响整体页面
  **不适用:**
- 不需要错误边界的简单容器，直接用 div 或 antd Card
- 列表项卡片（循环渲染大量卡片），性能敏感场景直接用 antd Card

## 类型定义

**SCardProps** extends Omit<CardProps, 'children'> — SCard 卡片容器 Props 继承 antd Card，内置错误边界，内容出错时不影响整体页面。

- children?: ReactNode
- hasBottomPadding?: boolean — 底部是否包含边距
