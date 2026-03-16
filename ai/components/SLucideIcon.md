# SLucideIcon — Lucide 图标

## 使用边界

**适用场景:**

- 需要 Lucide 风格图标
  **不适用:**
- 项目已使用 @ant-design/icons 体系，保持一致性优先用 antd 图标
- 仅需少量图标，评估是否值得引入 lucide-react 依赖

## 类型定义

**AntdLucideIconProps**

- name: LucideIconName — lucide 图标名称（自动提示所有可选值）
- size?: number | string — 尺寸（默认 1em 对齐 antd，支持数字/字符串）
- strokeWidth?: number — 线条粗细（默认 2 对齐 antd Outlined）
- color?: string — 颜色（默认继承父元素 currentColor）

**LucideIconName**: `keyof typeof LucideIcons`
