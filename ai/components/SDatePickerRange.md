# SDatePickerRange — 日期范围选择器，支持 rangeKeys 拆分字段

## 使用边界

**适用场景:**

- 日期范围选择，需要 rangeKeys 将范围拆分为两个独立字段提交
- onChange 需要直接返回格式化字符串
  **不适用:**
- 单日期选择，应使用 SDatePicker
- 不需要拆分字段，直接用 antd RangePicker

## 继承关系

继承自 **antd DatePicker.RangePicker** 的全部属性，以下属性已被覆盖：value, onChange

其他 antd DatePicker.RangePicker 属性均可直接使用。

## 类型定义

**SDatePickerRangeProps** extends Omit<RangePickerProps, 'value' | 'onChange'> (继承自 antd DatePicker.RangePicker，覆盖: value, onChange) — SDatePickerRange 增强日期范围选择器 Props 相比 antd RangePicker，支持 rangeKeys 将日期范围拆分为两个独立字段， 方便表单提交。onChange 直接返回格式化字符串。 `tsx // 拆分为 startDate 和 endDate 两个字段 <SDatePickerRange rangeKeys={['startDate', 'endDate']} /> `

- value?: RangeValueValuesType — 支持多种输入格式
- formatKeys?: RangeValueTuple — 将范围值拆分为两个字段的 key，如 ['startDate', 'endDate']
- onChange?: ( formatString: RangeFormatString, values: RangeValueValuesType, ) => void — onChange 第一个参数为格式化后的值
- rangeKeys?: string[] — 与 formatKeys 功能相同的别名

**RangeValueType**: `string | string[] | number | Date | Dayjs | null`

**RangeValueValuesType**: `| RangeValueType[]`

**RangeDateType**: `Dayjs | null`

**RangeDateValueType**: `[RangeDateType, RangeDateType] | null`

**RangeValueTuple**: `[string, string]`

**RangeFormatString**: `RangeValueTuple | RangeValueObjectType`
