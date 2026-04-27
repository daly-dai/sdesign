import React from 'react';

import { SDatePickerRange } from '@dalydb/sdesign';

export default () => (
  <div>
    <SDatePickerRange />
    <br />
    <SDatePickerRange
      showTime
      format="YYYY-MM-DD HH:mm:ss"
      style={{ marginTop: 16 }}
    />
  </div>
);
