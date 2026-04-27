import React from 'react';

import { SDatePicker } from '@dalydb/sdesign';

export default () => (
  <div>
    <SDatePicker placeholder="基础日期" />
    <br />
    <SDatePicker
      showTime
      format="YYYY-MM-DD HH:mm:ss"
      placeholder="日期时间"
      style={{ marginTop: 16 }}
    />
    <br />
    <SDatePicker
      picker="month"
      placeholder="月份选择"
      style={{ marginTop: 16 }}
    />
  </div>
);
