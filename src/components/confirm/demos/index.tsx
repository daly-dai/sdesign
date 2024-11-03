/**
 * title: 二次确认
 * description: 默认为删除按钮,可设置disable属性
 */

import React from 'react';

import { SConfirm } from '@dalydb/sdesign';

const DeleteButton = () => {
  const confirm = () => {
    console.log('data');
  };

  return (
    <>
      <SConfirm onConfirm={confirm}></SConfirm>
      <SConfirm disabled={true} onConfirm={confirm}></SConfirm>
    </>
  );
};

export default DeleteButton;
