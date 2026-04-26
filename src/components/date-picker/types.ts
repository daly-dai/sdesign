import { DatePickerProps } from 'antd';

import type { Dayjs } from 'dayjs';

/**
 * SDatePicker 增强日期选择器 Props
 *
 * 与 antd DatePicker 不同，onChange 直接返回格式化后的字符串，
 * value 支持字符串/Date/Dayjs 等多种格式，简化表单集成。
 *
 * @example
 * ```tsx
 * <SDatePicker onChange={(dateStr) => console.log(dateStr)} />
 * ```
 */
export interface SDatePickerProps
  extends Omit<DatePickerProps, 'onChange' | 'value'> {
  /** onChange 第一个参数直接为格式化后的字符串 */
  onChange?: (
    dateString?: string | string[] | null,
    date?: Dayjs | string | null,
  ) => void;
  /** 支持 string/Date/Dayjs 等多种输入格式 */
  value?: string | string[] | null | Date | Dayjs;
}

/** @deprecated 使用 SDatePickerProps */
export type SDatePickerType = SDatePickerProps;

export type PanelMode =
  | 'time'
  | 'date'
  | 'week'
  | 'month'
  | 'quarter'
  | 'year'
  | 'decade';

export type PickerMode = Exclude<PanelMode, 'datetime' | 'decade'>;

export type CustomFormat<DateType> = (value: DateType) => string;
