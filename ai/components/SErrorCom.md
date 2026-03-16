# SErrorCom — 错误展示

## 使用边界

**适用场景:**

- 展示错误状态提示 UI（配合错误边界使用）
  **不适用:**
- 表单校验错误提示，使用 SForm 内置校验
- API 请求错误提示，使用 message.error

## 类型定义

**SErrorComProps**

- text?: string
- style?: React.CSSProperties
- iconStyle?: React.CSSProperties
