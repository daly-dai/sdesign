/**
 * title: 值初始值
 * description: 默认值支持 string[], Date[],时间戳， null,等类型
 */
import dayjs from 'dayjs';
import React from 'react';

import { SDatePickerRange } from '@dalydb/sdesign';

export default () => {
  const stringDefault = ['2022-01-01', '2022-01-05'];
  const dayjsDefault = [dayjs('2022-01-01'), dayjs('2022-01-05')];

  const objDefault = {
    key1: '2022-02-18',
    key2: '2022-03-23',
  };

  return (
    <>
      <h4>字符串时间回显</h4>
      <h5>字符串初始值为：{JSON.stringify(stringDefault)}</h5>
      <SDatePickerRange value={stringDefault}></SDatePickerRange>

      <h4>对象值回显()</h4>
      <h5>字符串初始值为：{JSON.stringify(objDefault)}</h5>
      <SDatePickerRange value={objDefault}></SDatePickerRange>

      <h4>dayjs时间回显</h4>
      <h5>
        初始值为：{JSON.stringify([dayjs('2022-01-01'), dayjs('2022-01-05')])}
      </h5>
      <SDatePickerRange value={dayjsDefault}></SDatePickerRange>
    </>
  );
};
