import { DatePicker } from 'antd';
import { Dayjs } from 'dayjs';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import keys from 'lodash/keys';
import React, { FC, useMemo, useState } from 'react';

import {
  RangeDateValueType,
  RangeFormatString,
  RangeValueTuple,
  RangeValueValuesType,
  SDatePickerRangeProps,
} from './types';

import { getDateVal } from '@dalydb/sdesign/utils/date';

// 将外部 value 归一化为 RangePicker 需要的 Dayjs 元组（纯函数）
function toRangeDateValue(
  value: RangeValueValuesType | undefined,
): RangeDateValueType {
  if (!value) return null;

  // 数组形态：取前两项并转换为 Dayjs（清空时为长度 2 的空值数组）
  if (isArray(value) && value.length === 2) {
    return value.map((item) => getDateVal(item)) as RangeDateValueType;
  }

  // 对象形态（rangeKeys 拆分场景）：按 key 顺序取两项
  if (isObject(value) && keys(value).length === 2) {
    const dateList = keys(value).map((key) =>
      getDateVal((value as Record<string, string | Dayjs>)[key]),
    );

    return dateList as RangeDateValueType;
  }

  return null;
}

// 处理返回值（rangeKeys 拆分）
function dispatchRangeValue(
  dateString: RangeValueTuple,
  rangeKeys?: string[],
): RangeFormatString {
  if (rangeKeys?.length !== 2) return dateString;

  if (!dateString[0] || !dateString[1]) return dateString;

  return {
    [`${rangeKeys[0]}`]: dateString[0] ?? null,
    [`${rangeKeys[1]}`]: dateString[1] ?? null,
  };
}

const SDatePickerRange: FC<SDatePickerRangeProps> = (props) => {
  const {
    value,
    onChange,
    rangeKeys,
    allowClear = true,
    ...rangeOpinions
  } = props;

  // 半受控：有 value 时派生，无 value 时使用内部状态（保持非受控可用）
  const isControlled = value !== undefined;
  const [innerValue, setInnerValue] = useState<RangeDateValueType>(null);

  const dateValue = useMemo(
    () => (isControlled ? toRangeDateValue(value) : innerValue),
    [isControlled, value, innerValue],
  );

  const handleChange = (
    date: RangeDateValueType,
    dateString: [string, string],
  ) => {
    if (!isControlled) setInnerValue(date);

    onChange?.(dispatchRangeValue(dateString, rangeKeys), date);
  };

  return (
    <DatePicker.RangePicker
      allowClear={allowClear}
      {...rangeOpinions}
      value={dateValue}
      onChange={handleChange}
    />
  );
};

export default SDatePickerRange;
