# SDatePickerRange — 日期范围选择器，支持 rangeKeys 拆分字段

## 使用边界

**适用场景:**

- 日期范围选择，需要 rangeKeys 将范围拆分为两个独立字段提交
- onChange 需要直接返回格式化字符串
  **不适用:**
- 单日期选择，应使用 SDatePicker
- 不需要拆分字段，直接用 antd RangePicker

## 类型定义

**SDatePickerRangeProps** — SDatePickerRange 增强日期范围选择器 Props 相比 antd RangePicker，支持 rangeKeys 将日期范围拆分为两个独立字段， 方便表单提交。onChange 直接返回格式化字符串。 `tsx // 拆分为 startDate 和 endDate 两个字段 <SDatePickerRange rangeKeys={['startDate', 'endDate']} /> `: `Omit< RangePickerProps, 'value' | 'onChange' > & { value?: RangeValueValuesType; formatKeys?: RangeValueTuple; onChange?: ( formatString: RangeFormatString, values: RangeValueValuesType, ) => void`

**RangeValueType**: `string | string[] | number | Date | Dayjs | null`

**RangeValueValuesType**: `| RangeValueType[]`

**RangeDateType**: `Dayjs | null`

**RangeDateValueType**: `[RangeDateType, RangeDateType] | null`

**RangeValueTuple**: `[string, string]`

**RangeFormatString**: `RangeValueTuple | RangeValueObjectType`
