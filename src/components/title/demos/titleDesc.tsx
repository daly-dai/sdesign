/**
 * title: 标题后面展示内容
 * description: 通过**titleDesc**字段可自定义title后面的内容
 */

import { Tag } from 'antd';
import React from 'react';

import { STitle } from '@daly/sdesign';

export default () => {
  return (
    <STitle titleDesc={<Tag color="processing">processing</Tag>}>
      页面标题
    </STitle>
  );
};
