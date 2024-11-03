/**
 * title: dateFormate属性基础使用
 * description: 选择框内部的值通过formate属性进行格式化，值由dateFormate进行格式化
 */
import dayjs from 'dayjs';
import React, { useState } from 'react';

import { SDatePickerRange } from '@dalydb/sdesign';

const defaultValue = [dayjs('2000-01-01'), dayjs('2000-01-02')];

export default () => {
  const [dateValue, setDateValue] = useState();
  const [dateFormateValue, setDateFormateValue] = useState();

  const handleChange = (value: any) => {
    setDateValue(value);
  };

  const handleFormateChange = (data: any) => {
    setDateFormateValue(data);
  };

  return (
    <>
      <h4>默认格式</h4>
      <SDatePickerRange
        value={dateValue}
        onChange={handleChange}
      ></SDatePickerRange>
      <h5>时间结果</h5>
      {JSON.stringify(dateValue)}

      <h4>支持dayjs格式化的数据</h4>
      <SDatePickerRange
        popupClassName="custom-popup"
        value={defaultValue}
      ></SDatePickerRange>

      <h4>指定格式化 YYYY/MM/DD</h4>
      <SDatePickerRange
        value={dateFormateValue}
        onChange={handleFormateChange}
        format="YYYY/MM/DD"
      ></SDatePickerRange>
      <h5>时间结果</h5>
      {JSON.stringify(dateFormateValue)}
    </>
  );
};
