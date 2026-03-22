import { Divider } from 'antd';
import React from 'react';

import { SButton } from '@dalydb/sdesign';

// 按钮组组件演示
export default () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>按钮组组件演示</h2>

      <h3>基本用法</h3>
      <SButton.Group
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

      <SButton.Group
        items={[
          {
            actionType: 'view',
            compact: true,
          },
          {
            actionType: 'edit',
            compact: true,
          },
          {
            compact: true,
            children: '重置密码',
            actionType: 'reset',
          },
          {
            actionType: 'delete',
            compact: true,
          },
        ]}
      />
    </div>
  );
};
