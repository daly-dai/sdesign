# SCard — 卡片容器，内置错误边界

## 使用边界

**适用场景:**

- 需要卡片容器包裹内容区域
- 需要内置错误边界，内容出错时不影响整体页面
  **不适用:**
- 不需要错误边界的简单容器，直接用 div 或 antd Card
- 列表项卡片（循环渲染大量卡片），性能敏感场景直接用 antd Card

## 继承关系

继承自 **antd Card** 的全部属性，以下属性已被覆盖：children

其他 antd Card 属性均可直接使用。

## 类型定义

**SCardProps** extends Omit<CardProps, 'children'> (继承自 antd Card，覆盖: children) — SCard 卡片容器 Props 继承 antd Card，内置错误边界，内容出错时不影响整体页面。

- children?: ReactNode
- hasBottomPadding?: boolean — 底部是否包含边距

## 使用示例

```tsx
import { Button } from 'antd';
import React from 'react';
import { SCard } from '@dalydb/sdesign';

export default () => (
  <SCard title="基础使用" extra={<Button type="link">操作</Button>}>
    内置错误边界，继承 antd Card 全部属性
  </SCard>
);
```
