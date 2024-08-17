import { DatePicker } from 'antd';
import { Dayjs } from 'dayjs';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import keys from 'lodash/keys';
import React, { FC, useEffect, useState } from 'react';

import {
  RangeDateValueType,
  RangeFormatString,
  RangeValueTuple,
  SDatePickerRangeProps,
} from './types';

import { getDateVal } from '@daly/sdesign/utils/date';

const SDatePickerRange: FC<SDatePickerRangeProps> = (props) => {
  const [dateValue, setDateValue] = useState<RangeDateValueType>(null);

  const {
    value,
    onChange,
    rangeKeys,
    allowClear = true,
    ...rangeOpinions
  } = props;

  // 初始化组件值
  const initValue = () => {
    if (!value) {
      setDateValue(null);
      return;
    }

    // 传进来是个数组时
    if (isArray(value) && value.length === 2) {
      // 清空时传入的是长度为2的空数组，会引起异常
      const dateList = value.map((item) => getDateVal(item));

      setDateValue(dateList as RangeDateValueType);
      return;
    }

    if (isObject(value) && keys(value).length === 2) {
      const dateList = keys(value).map((key) => {
        const date = (value as Record<string, string | Dayjs>)[key];

        return getDateVal(date);
      });

      setDateValue(dateList as RangeDateValueType);
      return;
    }
  };

  useEffect(() => {
    initValue();
  }, [value]);

  // 处理最后的返回值
  const dispatchValueData = (
    dateString: RangeValueTuple,
  ): RangeFormatString => {
    if (rangeKeys?.length !== 2) return dateString;

    if (!dateString[0] || !dateString[1]) return dateString;

    return {
      [`${rangeKeys[0]}`]: dateString[0] ?? null,
      [`${rangeKeys[1]}`]: dateString[1] ?? null,
    };
  };

  const handleChange = (
    date: RangeDateValueType,
    dateString: [string, string],
  ) => {
    setDateValue(date);

    const rangeData = dispatchValueData(dateString);

    onChange?.(rangeData, date);
  };

  return (
    <>
      <DatePicker.RangePicker
        allowClear={allowClear}
        {...rangeOpinions}
        value={dateValue}
        onChange={handleChange}
      ></DatePicker.RangePicker>
    </>
  );
};

export default SDatePickerRange;
