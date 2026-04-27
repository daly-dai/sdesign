import { Card, Flex, Typography } from 'antd';
import React from 'react';

import { SNoData } from '@dalydb/sdesign';

const { Text } = Typography;

export default () => {
  return (
    <div>
      <Flex vertical gap={24}>
        <Card title="不同尺寸">
          <Flex gap={16} align="flex-start">
            <div style={{ textAlign: 'center' }}>
              <Text type="secondary">small</Text>
              <SNoData type="small" />
            </div>
            <div style={{ textAlign: 'center' }}>
              <Text type="secondary">middle（默认）</Text>
              <SNoData type="middle" />
            </div>
            <div style={{ textAlign: 'center' }}>
              <Text type="secondary">large</Text>
              <SNoData type="large" />
            </div>
          </Flex>
        </Card>

        <Card title="自定义文案">
          <SNoData text="暂无订单记录" />
        </Card>

        <Card title="默认文案">
          <SNoData />
        </Card>
      </Flex>
    </div>
  );
};
