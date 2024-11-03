/**
 * title: dateFormate属性基础使用
 * description: 选择框内部的值通过formate属性进行格式化，值由dateFormate进行格式化
 */
import React, { useState } from 'react';

import { SDatePicker } from '@dalydb/sdesign';

export default () => {
  const [dateValue, setDateValue] = useState();
  const [dateFormateValue, setDateFormateValue] = useState('');

  const handleChange = (value: any) => {
    setDateValue(value);
  };

  const handleFormateChange = (data: any) => {
    setDateFormateValue(data);
  };

  return (
    <>
      <h4>默认格式</h4>
      <SDatePicker
        popupClassName="custom-popup"
        value={dateValue}
        onChange={handleChange}
      ></SDatePicker>
      <h5>时间结果</h5>
      {JSON.stringify(dateValue)}

      <h4>指定格式化 YYYY/MM/DD</h4>
      <SDatePicker
        value={dateFormateValue}
        onChange={handleFormateChange}
        format="YYYY/MM/DD"
      ></SDatePicker>
      <h5>时间结果</h5>
      {dateFormateValue}
    </>
  );
};
