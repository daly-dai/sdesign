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
            { actionType: 'save' },
            { actionType: 'cancel' },
            { actionType: 'reset' },
            { actionType: 'upload' },
            { actionType: 'delete' },
            {
              actionType: 'create',
            },
            { actionType: 'download' },
          ]}
        />
      </Flex>
    </div>
  );
};
