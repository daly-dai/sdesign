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

export type SDatePickerRangeProps = Omit<
  RangePickerProps,
  'value' | 'onChange'
> & {
  value?: RangeValueValuesType;
  formatKeys?: RangeValueTuple;
  onChange?: (
    formatString: RangeFormatString,
    values: RangeValueValuesType,
  ) => void;
  rangeKeys?: string[];
};
