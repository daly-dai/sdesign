import { Typography } from 'antd';
import React from 'react';

import { SCheckGroup } from '@dalydb/sdesign';

const dict = {
  frontend: '前端',
  backend: '后端',
  fullstack: '全栈',
  devops: '运维',
};

export default () => (
  <div>
    <SCheckGroup dict={dict} defaultValue={['frontend']} />
    <br />
    <Typography.Text type="secondary">禁用选项：</Typography.Text>
    <br />
    <SCheckGroup
      dict={dict}
      disableKeys={['devops']}
      defaultValue={['frontend', 'backend']}
    />
  </div>
);
