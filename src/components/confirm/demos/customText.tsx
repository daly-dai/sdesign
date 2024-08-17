/**
 * title: 确认信息
 * description: 可以修改自定义标题与提示信息
 */

import React from 'react';

import { SConfirm } from '@daly/sdesign';

const customText = () => {
  const confirm = () => {
    console.log('data');
  };

  return (
    <SConfirm
      title="标题提示"
      description="确认信息描述"
      onConfirm={confirm}
    ></SConfirm>
  );
};

export default customText;
