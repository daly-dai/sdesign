import { Button } from 'antd';
import React from 'react';

import { SButton } from '@dalydb/sdesign';

// 自定义渲染
export default () => {
  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <strong>基础类型与自定义渲染：</strong>
        <SButton.Group
          items={[
            { children: '普通按钮', type: 'primary' },
            {
              render: () => (
                <Button
                  style={{
                    padding: '4px 15px',
                    background: '#1890ff',
                    color: 'white',
                    border: '1px solid #1890ff',
                    borderRadius: '2px',
                    cursor: 'pointer',
                  }}
                >
                  自定义按钮
                </Button>
              ),
            },
            { children: '普通按钮' },
          ]}
        />
      </div>
      <div>
        <strong>自定义类型与自定义渲染：</strong>
        <SButton.Group
          items={[
            { actionType: 'save' },
            {
              render: () => (
                <Button
                  style={{
                    padding: '4px 15px',
                    background: '#52c41a',
                    color: 'white',
                    border: '1px solid #52c41a',
                    borderRadius: '2px',
                    cursor: 'pointer',
                  }}
                >
                  自定义确认按钮
                </Button>
              ),
            },
            { actionType: 'cancel' },
          ]}
        />
      </div>
    </div>
  );
};
