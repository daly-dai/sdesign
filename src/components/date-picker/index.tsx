import { DatePicker } from 'antd';
import React, { FC } from 'react';

import { SDatePickerProps } from './types';

import { getDateVal } from '@dalydb/sdesign/utils/date';

import type { Dayjs } from 'dayjs';

const SDatePicker: FC<SDatePickerProps> = (props) => {
  const {
    value,
    onChange,
    allowClear = true,
    placeholder = '请选择',
    style,
    ...dateProps
  } = props;

  const dateValue = getDateVal(value);

  const handleChange = (date: Dayjs, dateString: string | string[] | null) => {
    onChange?.(dateString, date);
  };

  return (
    <DatePicker
      style={{ width: '100%', ...style }}
      allowClear={allowClear}
      value={dateValue as Dayjs | null}
      placeholder={placeholder}
      onChange={handleChange as any}
      {...dateProps}
    ></DatePicker>
  );
};

export default SDatePicker;
