import React from 'react';

import { SButton } from '@dalydb/sdesign';

// 自定义按钮显示
export default () => {
  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <strong>基础类型 - 可见性控制：</strong>
        <SButton.Group
          items={[
            { children: '显示按钮', type: 'primary' },
            { children: '隐藏按钮', visible: false },
            { children: '显示按钮' },
          ]}
        />
      </div>
      <div>
        <strong>自定义类型 - 可见性控制：</strong>
        <SButton.Group
          items={[
            { type: 'save' },
            { type: 'cancel', visible: false },
            { type: 'reset' },
          ]}
        />
      </div>
    </div>
  );
};
