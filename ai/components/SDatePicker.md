# SDatePicker — 增强日期选择器，onChange 直接返回字符串

## 使用边界

**适用场景:**

- 日期选择，onChange 需要直接返回格式化字符串而非 Dayjs 对象
- 表单中的日期字段，简化值处理
  **不适用:**
- 需要日期范围选择，应使用 SDatePickerRange
- 需要 Dayjs 对象做复杂日期计算，直接用 antd DatePicker

## 类型定义

**SDatePickerType** — SDatePicker 增强日期选择器 Props 与 antd DatePicker 不同，onChange 直接返回格式化后的字符串， value 支持字符串/Date/Dayjs 等多种格式，简化表单集成。 `tsx <SDatePicker onChange={(dateStr) => console.log(dateStr)} /> `: `Omit<DatePickerProps, 'onChange' | 'value'> & { onChange?: ( dateString?: string | string[] | null, date?: Dayjs | string | null, ) => void`

**PanelMode**: `| 'time'`

**PickerMode**: `Exclude<PanelMode, 'datetime' | 'decade'>`
