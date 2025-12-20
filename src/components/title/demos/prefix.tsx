/**
 * title: 标题自定义前缀
 * description: 可以自定义标题前缀图标或组件
 */
import { BarChartOutlined } from '@ant-design/icons';
import React from 'react';

import { STitle } from '@dalydb/sdesign';

const prefixDemo = () => {
  return <STitle prefix={<BarChartOutlined />}>前缀标题</STitle>;
};

export default prefixDemo;
