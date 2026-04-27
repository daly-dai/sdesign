import { Card, Flex } from 'antd';
import React from 'react';

import { SNoPage } from '@dalydb/sdesign';

export default () => {
  return (
    <div>
      <Flex vertical gap={24}>
        <Card title="基本使用">
          <SNoPage />
        </Card>

        <Card title="自定义文案">
          <SNoPage text="页面建设中，敬请期待..." />
        </Card>
      </Flex>
    </div>
  );
};
