import { Flex, Segmented } from 'antd';
import React, { useState } from 'react';

import { SButton } from '@dalydb/sdesign';

// 禁用状态，添加一键启动，禁用
export default () => {
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  return (
    <Flex vertical gap={20}>
      <Flex vertical gap={12}>
        <Segmented
          options={[
            {
              label: '禁用状态',
              value: 'disabled',
            },
            {
              label: '启动状态',
              value: 'enabled',
            },
          ]}
          style={{ width: 160 }}
          value={disabled ? 'disabled' : 'enabled'}
          onChange={(value) => setDisabled(value === 'disabled')}
        />

        <Segmented
          options={[
            {
              label: '默认状态',
              value: 'default',
            },
            {
              label: '加载中',
              value: 'loading',
            },
          ]}
          style={{ width: 140 }}
          value={loading ? 'loading' : 'default'}
          onChange={(value) => setLoading(value === 'loading')}
        />
      </Flex>
      <div>
        <strong>禁用状态 - 扩展类型：</strong>
        <SButton.Group
          disabled={disabled}
          loading={loading}
          items={[
            { type: 'save' },
            { type: 'cancel' },
            { type: 'reset' },
            { type: 'upload' },
          ]}
        />
      </div>
    </Flex>
  );
};
