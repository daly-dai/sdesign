/**
 * title: 标题自定义前缀
 * description: 可以自定义标题前缀图标或组件
 */
import React from 'react';

import { SLucideIcon, STitle } from '@dalydb/sdesign';

const prefixDemo = () => {
  return <STitle prefix={<SLucideIcon name="BarChart" />}>前缀标题</STitle>;
};

export default prefixDemo;
