# SInput — 增强输入框，支持 trim、onEnter

## 使用边界

**适用场景:**

- 文本输入，需要自动 trim 去除首尾空格
- 需要 onEnter 回车触发回调
- onChange 需要直接返回 string 值而非 event
  **不适用:**
- 多行文本输入，使用 antd Input.TextArea
- 密码输入，使用 antd Input.Password
- SForm items 中使用时通过 type: 'input' 引用，无需直接使用 SInput

## 继承关系

继承自 **antd Input** 的全部属性，以下属性已被覆盖：onChange

其他 antd Input 属性均可直接使用。

## 类型定义

**SInputProps** extends Omit<InputProps, 'onChange'> (继承自 antd Input，覆盖: onChange) — SInput 增强输入框 Props 继承 antd Input，增加了 trim 和 onEnter 便捷功能。 `tsx <SInput trim onEnter={(val) => search(val)} placeholder="搜索" /> `

- value?: string
- onChange?: (value: string) => void — onChange 直接返回 string 值（非 event）
- trim?: boolean — 是否自动去除首尾空格
- onEnter?: (value?: string) => void — 按回车键触发的回调

## 使用示例

```tsx
import { SInput } from '@dalydb/sdesign';
import React from 'react';

export default () => (
  <SInput
    placeholder="自动 trim 空格，回车触发 onEnter"
    onEnter={() => alert('回车确认')}
  />
);
```
