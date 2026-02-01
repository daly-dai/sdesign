import React from 'react';

import { SButton } from '@dalydb/sdesign';

// 自定义间距
export default () => {
  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <strong>基础类型 - 自定义间距：</strong>
        <SButton.Group
          spaceProps={{ size: 20 }}
          items={[
            { children: '按钮1', type: 'primary' },
            { children: '按钮2' },
            { children: '按钮3' },
          ]}
        />
      </div>
      <div>
        <strong>自定义类型 - 自定义间距：</strong>
        <SButton.Group
          spaceProps={{ size: 20 }}
          items={[{ type: 'save' }, { type: 'cancel' }, { type: 'reset' }]}
        />
      </div>
    </div>
  );
};
