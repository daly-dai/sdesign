import { Flex } from 'antd';
import React from 'react';

import { SButton } from '@dalydb/sdesign';

// 基本用法
export default () => {
  return (
    <div>
      <Flex gap={12}>
        <strong>基础使用</strong>
        <SButton.Group
          items={[
            { type: 'save' },
            { type: 'cancel' },
            { type: 'reset' },
            { type: 'upload' },
            { type: 'delete' },
            {
              type: 'create',
            },
            { type: 'download' },
          ]}
        />
      </Flex>
    </div>
  );
};
