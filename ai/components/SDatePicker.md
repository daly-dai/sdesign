# SDatePicker — 增强日期选择器，onChange 直接返回字符串

## 使用边界

**适用场景:**

- 日期选择，onChange 需要直接返回格式化字符串而非 Dayjs 对象
- 表单中的日期字段，简化值处理
  **不适用:**
- 需要日期范围选择，应使用 SDatePickerRange
- 需要 Dayjs 对象做复杂日期计算，直接用 antd DatePicker

## 继承关系

继承自 **antd DatePicker** 的全部属性，以下属性已被覆盖：onChange, value

其他 antd DatePicker 属性均可直接使用。

## 类型定义

**SDatePickerProps** extends Omit<DatePickerProps, 'onChange' | 'value'> (继承自 antd DatePicker，覆盖: onChange, value) — SDatePicker 增强日期选择器 Props 与 antd DatePicker 不同，onChange 直接返回格式化后的字符串， value 支持字符串/Date/Dayjs 等多种格式，简化表单集成。 `tsx <SDatePicker onChange={(dateStr) => console.log(dateStr)} /> `

- onChange?: ( dateString?: string | string[] | null, date?: Dayjs | string | null, ) => void — onChange 第一个参数直接为格式化后的字符串
- value?: string | string[] | null | Date | Dayjs — 支持 string/Date/Dayjs 等多种输入格式

**SDatePickerType**: `SDatePickerProps`

**PanelMode**: `| 'time'`

**PickerMode**: `Exclude<PanelMode, 'datetime' | 'decade'>`

## 使用示例

```tsx
import React from 'react';

import { SDatePicker } from '@dalydb/sdesign';

export default () => (
  <div>
    <SDatePicker placeholder="基础日期" />
    <br />
    <SDatePicker
      showTime
      format="YYYY-MM-DD HH:mm:ss"
      placeholder="日期时间"
      style={{ marginTop: 16 }}
    />
    <br />
    <SDatePicker
      picker="month"
      placeholder="月份选择"
      style={{ marginTop: 16 }}
    />
  </div>
);
```
