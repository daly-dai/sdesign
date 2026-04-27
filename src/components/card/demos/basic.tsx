import { SCard } from '@dalydb/sdesign';
import { Button } from 'antd';
import React from 'react';

export default () => (
  <SCard title="基础使用" extra={<Button type="link">操作</Button>}>
    内置错误边界，继承 antd Card 全部属性
  </SCard>
);
