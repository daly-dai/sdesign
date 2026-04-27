import { SInput } from '@dalydb/sdesign';
import React from 'react';

export default () => (
  <SInput
    placeholder="自动 trim 空格，回车触发 onEnter"
    onEnter={() => alert('回车确认')}
  />
);
