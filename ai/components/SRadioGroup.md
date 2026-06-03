# SRadioGroup — 单选框组

## 使用边界

**适用场景:**

- 单选场景，选项较少（<= 5 个）且需要全部可见
- 按钮式单选或标准单选
  **不适用:**
- 多选场景，应使用 SCheckGroup
- 选项很多（> 5 个），应使用 SSelect
- SForm items 中使用时通过 type: 'radioGroup' 引用，无需直接使用

## 继承关系

继承自 **antd Radio.Group** 的全部属性。

其他 antd Radio.Group 属性均可直接使用。

## 类型定义

**SRadioGroupProps** extends RadioType (继承自 antd Radio.Group) — SRadioGroup 单选框组 Props

- dictKey?: string — 字典映射 key，从 SConfigProvider 全局字典中读取
- dict?: Record<string, string> — 字典数据，优先级高于 dictKey
- disableKeys?: string | string[] — 禁用指定选项的 key

**RadioType**: `ComponentProps<typeof Radio.Group>`

## 使用示例

```tsx
import { Flex, Typography } from 'antd';
import React from 'react';

import { SRadioGroup } from '@dalydb/sdesign';

const dictData = {
  L1: '不敏感',
  L2: '低敏感',
  L3: '较敏感',
  L4: '敏感',
  L5: '极敏感',
};

export default () => {
  return (
    <div>
      <Flex gap={24} vertical>
        <section>
          <Typography.Title level={5}>dict 生成选项</Typography.Title>
          <SRadioGroup dict={dictData} defaultValue="L3" />
        </section>

        <section>
          <Typography.Title level={5}>
            disableKeys 禁用单个选项
          </Typography.Title>
          <SRadioGroup dict={dictData} disableKeys="L1" defaultValue="L3" />
        </section>

        <section>
          <Typography.Title level={5}>
            disableKeys 禁用多个选项
          </Typography.Title>
          <SRadioGroup
            dict={dictData}
            disableKeys={['L1', 'L5']}
            defaultValue="L3"
          />
        </section>

        <section>
          <Typography.Title level={5}>
            配合 antd Radio.Group 原生属性
          </Typography.Title>
          <SRadioGroup
            dict={dictData}
            optionType="button"
            buttonStyle="solid"
            size="small"
            defaultValue="L3"
          />
        </section>
      </Flex>
    </div>
  );
};
```
