/**
 * title: modal确认框
 * description: type为modal时启用
 */
import { Space } from 'antd';
import React from 'react';

import { SConfirm } from '@dalydb/sdesign';

const ModalConfirm = () => {
  const confirm = () => {
    console.log(66666);
  };
  return (
    <Space>
      <SConfirm
        type="modal"
        description="这是自定义的删除文案"
        onConfirm={confirm}
      ></SConfirm>
      <SConfirm
        type="modal"
        description="这是自定义的删除文案"
        disabled={true}
        onConfirm={confirm}
      ></SConfirm>
    </Space>
  );
};

export default ModalConfirm;
