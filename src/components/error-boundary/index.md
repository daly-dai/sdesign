---
toc: content
group:
  title: 基础组件
  order: 2
---

# SErrorBoundary 错误边界

## 介绍

### 错误边界组件

<code src="./demo/index.tsx"></code>

| 属性名         | 描述         | 类型                      | 默认值 |
| -------------- | ------------ | ------------------------- | ------ |
| children       | 子组件       | ReactNode                 |        |
| fallbackRender | 错误回显组件 | (props: any) => ReactNode |        |
