---
  toc: content
  group:
    title: 数据录入
    order: 2
---

# SInput 输入框

## 介绍

### 输入框组件

**支持回车键回调，过滤空格等功能**

<code src="./demos/base.tsx"></code>

[更多属性请查看 Input 文档](https://ant-design.antgroup.com/components/input-cn#input)

## API

| 属性名   | 描述             | 类型                   | 默认值 |
| -------- | ---------------- | ---------------------- | ------ |
| trim     | 是否移除前后空格 | boolean                | false  |
| onEnter  | 回车键回调函数   | (data?:string) => void |        |
| onChange | 输入框值回调     | (data?:string) => void |        |
