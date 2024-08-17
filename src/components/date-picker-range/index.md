---
toc: content
group:
  title: 基础组件
  order: 2
---

# SDatePickerRange 时间范围选择

## 介绍

## 时间范围选择器

### 设置默认值

<code src="./demos/default.tsx"></code>

### 格式化返回值

<code src="./demos/index.tsx"></code>

### 指定返回 key 值

<code src="./demos/rangeKeys.tsx"></code>

### form 表单使用

<code src="./demos/form.tsx"></code>

### form 设置默认值

<code src="./demos/formSet.tsx"></code>

[DatePickerRange 更多属性](https://ant-design.antgroup.com/components/date-picker-cn#api)

## API

| 属性名    | 描述                            | 类型                                                                                                                     | 默认值 |
| --------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------ |
| format    | 格式化                          | string                                                                                                                   |        |
| onChange  | 改变时触发                      | (formatString: [RangeFormatString](/components/S-date-picker-range#rangeformatstring-类型), date: [dayjs,dayjs]) => void |        |
| rangeKeys | 给定 key 值，可直接返回相应对象 | [string,string]                                                                                                          |        |

### RangeFormatString 类型

```typescript
type RangeFormatString = [string, string] | { [key: string]: string | null };
```
