# SDependency — 字段依赖联动组件

## 使用边界

**适用场景:**

- SForm 内表单字段依赖联动
- 某个字段的显示/值/选项依赖其他字段的变化
  **不适用:**
- 独立使用，必须在 SForm 的 items 中通过 type: 'dependency' 使用
- 简单的字段监听，使用 SForm.useWatch 即可

## 类型定义

**RenderChildren**: `( values: Record<string, any>, form: ProFormInstance<Values>, ) => React.ReactNode; export type SDependencyProps<T = Record<string, any>> = Omit<`
