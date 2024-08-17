---
toc: content
group:
  title: 基础组件
  order: 2
---

# SSelect 选择器

## 介绍

### 基础功能同 antd Select，新增了 dict 功能

<code src="./demos/index.tsx"></code>

<code src="./demos/disable.tsx"></code>

## API

[antd select 更多属性](https://ant-design.antgroup.com/components/select-cn#select-props)

| 属性名      | 描述                                | 类型                  | 默认值 |
| ----------- | ----------------------------------- | --------------------- | ------ |
| dict        | 字典值                              | Record<string,string> |        |
| disableKeys | 禁用的 key 值                       | string,string[]       |        |
| dictKey     | 字典 key SConfigProvider 存在时生效 | string                |        |
