import { SSelect } from '@dalydb/sdesign';
import React from 'react';

const dict = { active: '活跃', inactive: '未激活' };

export default () => (
  <div>
    <SSelect dict={dict} placeholder="基础选择" style={{ width: 200 }} />
    <br />
    <SSelect
      dict={dict}
      mode="multiple"
      placeholder="多选"
      style={{ width: 200, marginTop: 16 }}
    />
  </div>
);
