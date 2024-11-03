/**
 * title: 确认信息
 * description: 可以修改中心区内容
 */

import { Button } from 'antd';
import React from 'react';

import { SConfirm } from '@dalydb/sdesign';

const customChildren = () => {
  const confirm = () => {
    console.log('data');
  };

  return (
    <SConfirm title="标题提示" description="确认信息描述" onConfirm={confirm}>
      <Button type="primary">自定义内容</Button>
    </SConfirm>
  );
};

export default customChildren;
