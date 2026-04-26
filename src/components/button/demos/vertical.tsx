import React from 'react';

import { SButton } from '@dalydb/sdesign';

// 垂直排列
export default () => {
  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <strong>基础类型 - 垂直排列：</strong>
        <SButton.Group
          spaceProps={{ direction: 'vertical' }}
          items={[
            { children: '按钮1', type: 'primary' },
            { children: '按钮2' },
            { children: '按钮3' },
          ]}
        />
      </div>
      <div>
        <strong>自定义类型 - 垂直排列：</strong>
        <SButton.Group
          spaceProps={{ direction: 'vertical' }}
          items={[
            { actionType: 'save' },
            { actionType: 'cancel' },
            { actionType: 'reset' },
          ]}
        />
      </div>
    </div>
  );
};
