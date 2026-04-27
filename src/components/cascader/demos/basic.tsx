import React from 'react';

import { SCascader } from '@dalydb/sdesign';

const options = [
  {
    value: 'china',
    label: '中国',
    children: [
      { value: 'beijing', label: '北京' },
      { value: 'shanghai', label: '上海' },
    ],
  },
  {
    value: 'usa',
    label: '美国',
    children: [
      { value: 'ny', label: '纽约' },
      { value: 'la', label: '洛杉矶' },
    ],
  },
];

export default () => (
  <div>
    <SCascader
      options={options}
      placeholder="请选择地区"
      style={{ width: 200 }}
    />
    <br />
    <SCascader
      options={options}
      multiple
      showSearch
      placeholder="多选搜索"
      style={{ width: 200, marginTop: 16 }}
    />
  </div>
);
