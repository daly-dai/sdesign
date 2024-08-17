/**
 * title: 操作按钮配置
 * description: actionNode字段展示自定义内容,column控制布局
 */

import { Button } from 'antd';
import React from 'react';

import { STitle } from '@daly/sdesign';

export default () => {
  return (
    <STitle actionNode={<Button type="primary">操作按钮</Button>}>
      页面标题
    </STitle>
  );
};
