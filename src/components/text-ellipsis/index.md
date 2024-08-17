---
toc: content
group:
  title: 基础组件
  order: 1
---

# STextEllipsis 文字截断

## 介绍

### 文本省略组件

<code src="./demos/single.tsx"></code>

<code src="./demos/multi.tsx"></code>

## API

| 属性名       | 描述                              | 类型    | 默认值 |
| ------------ | --------------------------------- | ------- | ------ |
| text         | 内容                              | string  | ''     |
| maxChars     | 最大展示字数(优先级高于 maxLines) | number  | ''     |
| maxLines     | 最大展示行数                      | number  | ''     |
| showTooltip  | 强制展示 tooltip                  | boolean | false  |
| width        | 组件的宽度                        | string  | ''     |
| fontSize     | 字体的大小                        | string  | '14px' |
| tooltipProps | tooltip 组件相关配置              | Object  | ''     |
