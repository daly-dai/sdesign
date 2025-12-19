import React from 'react';

import { SButtonGroup } from '@dalydb/sdesign';

// 基本用法
export default () => {
  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <strong>基础类型：</strong>
        <SButtonGroup
          items={[
            {
              children: '按钮1',
              type: 'primary',
            },
            {
              children: '按钮2',
              type: 'dashed',
            },
            {
              children: '按钮3',
              type: 'default',
            },
            {
              children: '按钮4',
              type: 'link',
            },
            {
              children: '按钮5',
              type: 'text',
            },
          ]}
        />
      </div>
      <div>
        <strong>扩展类型：</strong>
        <SButtonGroup
          items={[
            { type: 'save' },
            { type: 'cancel' },
            { type: 'reset' },
            { type: 'upload' },
            { type: 'download' },
          ]}
        />
      </div>
    </div>
  );
};
