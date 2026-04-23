/**
 * title: 配合表单使用
 * description: 弹窗关闭时内部状态自动销毁，无需手动重置表单
 */
import { Button, Form, Input, Modal, message } from 'antd';
import React, { useRef } from 'react';

import { createModal, type ModalContainerRef } from '@dalydb/sdesign';

interface EditParams {
  id: string;
  name: string;
}

const EditFormModal = createModal<EditParams>(
  ({ params, open, onClose, onSuccess }) => {
    const [form] = Form.useForm();

    return (
      <Modal
        open={open}
        title="编辑信息"
        onCancel={onClose}
        onOk={() => {
          form.validateFields().then(() => {
            message.success('保存成功');
            onSuccess?.();
          });
        }}
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item label="ID">
            <Input value={params.id} disabled />
          </Form.Item>
          <Form.Item label="名称" name="name" initialValue={params.name}>
            <Input placeholder="请输入名称" />
          </Form.Item>
        </Form>
      </Modal>
    );
  },
);

const Demo = () => {
  const modalRef = useRef<ModalContainerRef<EditParams>>(null);

  return (
    <div>
      <Button
        type="primary"
        onClick={() => modalRef.current?.open({ id: '001', name: '示例数据' })}
      >
        编辑信息
      </Button>
      <EditFormModal
        ref={modalRef}
        onSuccess={() => message.success('操作成功，列表已刷新')}
      />
    </div>
  );
};

export default Demo;
