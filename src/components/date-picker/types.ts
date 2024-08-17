import { DatePickerProps } from 'antd';

import type { Dayjs } from 'dayjs';

export type SDatePickerType = Omit<DatePickerProps, 'onChange' | 'value'> & {
  onChange?: (
    dateString?: string | string[] | null,
    date?: Dayjs | string | null,
  ) => void;
  value?: string | string[] | null | Date | Dayjs;
};

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
