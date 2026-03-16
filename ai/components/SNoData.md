# SNoData — 无数据占位

## 使用边界

**适用场景:**

- 数据为空时的友好占位提示
- 列表、表格、卡片等容器内无数据时展示
  **不适用:**
- STable 已内置空状态，无需额外使用
- 页面级 404，应使用 SNoPage

## 类型定义

**NotDataProps**

- text?: ReactNode
- type?: sizeType
- className?: string
- componentName?: string
- imgProps?: React.DetailedHTMLProps< React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement >

**sizeType**: `'small' | 'middle' | 'large'`

**NoDataTypes**: `NotDataProps &`
