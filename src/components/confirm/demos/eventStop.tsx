import React from 'react';

import { SConfirm } from '@dalydb/sdesign';

const EventStop = () => {
  return (
    <div>
      <SConfirm
        title="标题提示"
        description="确认信息描述"
        onConfirm={confirm}
      ></SConfirm>
    </div>
  );
};

export default EventStop;
