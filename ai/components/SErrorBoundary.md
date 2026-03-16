# SErrorBoundary — 错误边界

## 使用边界

**适用场景:**

- React 组件树需要捕获渲染异常，防止整页白屏
- 需要自定义错误降级 UI（fallbackRender）
  **不适用:**
- 已使用 SCard（内置错误边界），无需再套一层
- 异步错误处理（API 请求失败），用 try-catch 或 useRequest onError
  **优先使用:**
- SCard → 卡片区域的错误隔离，SCard 已内置错误边界

## 类型定义

**SErrorBoundaryTypes**

- children?: ReactNode
- fallbackRender?: (props: FallbackProps) => ReactNode
