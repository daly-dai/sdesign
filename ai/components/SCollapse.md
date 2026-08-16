# SCollapse — 折叠面板

## 使用边界

**适用场景:**

- 需要折叠/展开内容区域
- 外部控制折叠状态
  **不适用:**
- 多个折叠面板组（手风琴模式），直接用 antd Collapse
- 简单的显示/隐藏切换，用条件渲染即可

## 继承关系

继承自 **antd Button** 的全部属性。

其他 antd Button 属性均可直接使用。

## 类型定义

**SCollapseProps** extends ButtonProps (继承自 antd Button) — SCollapse 折叠面板 Props 用于控制内容区域的展开/折叠。

- collapse?: boolean — 当前折叠状态
- setCollapse?: (collapse: boolean) => void — 设置折叠状态
- onExpand?: (expand: boolean) => void — 展开/折叠回调，参数为「展开状态」（true=展开，false=收起）

## 使用示例

```tsx
import { SCollapse } from '@dalydb/sdesign';
import React, { useState } from 'react';

export default () => {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <div>
      <SCollapse collapse={collapsed} setCollapse={setCollapsed} />
      {!collapsed && (
        <div style={{ padding: 16, background: '#f5f5f5' }}>折叠内容</div>
      )}
    </div>
  );
};
```
