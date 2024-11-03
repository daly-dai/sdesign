/**
 * title: disableKeys 属性
 * description: 可禁用指定的key值
 */
import React from 'react';

import { SCheckGroup } from '@dalydb/sdesign';

const dictData = {
  L1: '不敏感',
  L2: '低敏感',
  L3: '较敏感',
  L4: '敏感',
  L5: '极敏感',
};

export default () => {
  return (
    <>
      <h3>禁用单个选择数据</h3>
      <SCheckGroup dict={dictData} disableKeys={'L1'} />
      <h3>禁用多个选择数据</h3>
      <SCheckGroup dict={dictData} disableKeys={['L1', 'L2']} />
    </>
  );
};
