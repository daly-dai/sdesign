# SCollapse — 折叠面板

## 使用边界

**适用场景:**

- 需要折叠/展开内容区域
- 外部控制折叠状态
  **不适用:**
- 多个折叠面板组（手风琴模式），直接用 antd Collapse
- 简单的显示/隐藏切换，用条件渲染即可

## 类型定义

**SCollapseProps** extends ButtonProps — SCollapse 折叠面板 Props 用于控制内容区域的展开/折叠。

- collapse?: boolean — 当前折叠状态
- setCollapse?: (collapse: boolean) => void — 设置折叠状态
- onExpand?: (collapse: boolean) => void — 展开/折叠回调
