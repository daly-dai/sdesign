/**
 * title: 基础用法
 * description: 通过 createModal 创建弹窗容器，使用 ref 调用 open 方法打开弹窗
 */
import { Button, Modal, message } from 'antd';
import React, { useRef } from 'react';

import { createModal, type ModalContainerRef } from '@dalydb/sdesign';

interface UserFormParams {
  mode: 'create' | 'edit';
  id?: string;
}

const UserFormModal = createModal<UserFormParams>(
  ({ params, open, onClose, onSuccess }) => {
    return (
      <Modal
        open={open}
        title={params.mode === 'create' ? '新建用户' : '编辑用户'}
        onCancel={onClose}
        footer={null}
      >
        <div style={{ padding: '16px 0' }}>
          <p>当前模式：{params.mode}</p>
          {params.id && <p>用户 ID：{params.id}</p>}
          <Button type="primary" onClick={onSuccess}>
            提交
          </Button>
        </div>
      </Modal>
    );
  },
);

const Demo = () => {
  const modalRef = useRef<ModalContainerRef<UserFormParams>>(null);

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <Button
        type="primary"
        onClick={() => modalRef.current?.open({ mode: 'create' })}
      >
        新建
      </Button>
      <Button
        onClick={() => modalRef.current?.open({ mode: 'edit', id: '123' })}
      >
        编辑
      </Button>
      <UserFormModal
        ref={modalRef}
        onSuccess={() => message.success('操作成功')}
      />
    </div>
  );
};

export default Demo;
