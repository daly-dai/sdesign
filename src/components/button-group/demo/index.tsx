import { Divider } from 'antd';
import React from 'react';

import { SButtonGroup } from '@dalydb/sdesign';

// 按钮组组件演示
export default () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>按钮组组件演示</h2>

      <h3>基本用法</h3>
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
      <Divider />
    </div>
  );
};
