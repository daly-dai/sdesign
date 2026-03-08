import { RangePickerProps } from 'antd/es/date-picker';

import type { Dayjs } from 'dayjs';

export type RangeValueType = string | string[] | number | Date | Dayjs | null;

export type RangeValueValuesType =
  | RangeValueType[]
  | null
  | RangeValueObjectType;

export type RangeDateType = Dayjs | null;

export type RangeDateValueType = [RangeDateType, RangeDateType] | null;

export type RangeValueObjectType = {
  [key: string]: string | null;
} & {
  [key: string]: string | null;
};

export type RangeValueTuple = [string, string];

export type RangeFormatString = RangeValueTuple | RangeValueObjectType;

/**
 * SDatePickerRange 增强日期范围选择器 Props
 *
 * 相比 antd RangePicker，支持 rangeKeys 将日期范围拆分为两个独立字段，
 * 方便表单提交。onChange 直接返回格式化字符串。
 *
 * @example
 * ```tsx
 * // 拆分为 startDate 和 endDate 两个字段
 * <SDatePickerRange rangeKeys={['startDate', 'endDate']} />
 * ```
 */
export type SDatePickerRangeProps = Omit<
  RangePickerProps,
  'value' | 'onChange'
> & {
  /** 支持多种输入格式 */
  value?: RangeValueValuesType;
  /** 将范围值拆分为两个字段的 key，如 ['startDate', 'endDate'] */
  formatKeys?: RangeValueTuple;
  /** onChange 第一个参数为格式化后的值 */
  onChange?: (
    formatString: RangeFormatString,
    values: RangeValueValuesType,
  ) => void;
  /** 与 formatKeys 功能相同的别名 */
  rangeKeys?: string[];
};
