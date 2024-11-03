/**
 * title: disableKeys 属性
 * description: 可禁用指定的key值
 */
import { Typography } from 'antd';
import React, { useState } from 'react';

import { SRadioGroup } from '@dalydb/sdesign';

const dictData = {
  L1: '不敏感',
  L2: '低敏感',
  L3: '较敏感',
  L4: '敏感',
  L5: '极敏感',
};

export default () => {
  const [value, setValue] = useState('L3');
  const onChange = (e: any) => {
    setValue(e);
  };

  return (
    <>
      <h3>禁用单个选择数据</h3>
      <SRadioGroup
        value={value}
        onChange={onChange}
        dict={dictData}
        disableKeys={'L1'}
      />
      <Typography>
        <p>单选框组值为</p>
        <pre>{JSON.stringify(value, null, 2)}</pre>
      </Typography>
      <h3>禁用多个选择数据</h3>
      <SRadioGroup dict={dictData} disableKeys={['L1', 'L2']} />
    </>
  );
};
