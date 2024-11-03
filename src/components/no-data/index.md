---
toc: content
group:
  title: 图标
  order: 3
---

# SNoData 暂无数据

## 介绍

### 暂无数据组件

<code src="./demos/base.tsx"></code>

```jsx
/**
 * title: componentName
 * description: 当该字段为Dropdown，AutoComplete，Cascader，Select等渲染文案
 */

import { SNoData } from '@dalydb/sdesign';

export default () => {
  return <SNoData componentName="Select" type="middle" />;
};
```

## API

| 属性名        | 描述       | 类型               | 默认值 |
| ------------- | ---------- | ------------------ | ------ |
| type          | 组件大小   | small middle large | large  |
| text          | 自定义文案 | string             | ''     |
| componentName | 组件名称   | string             | ''     |
