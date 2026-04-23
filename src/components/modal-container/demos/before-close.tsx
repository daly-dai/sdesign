/**
 * title: 关闭前拦截
 * description: 通过 beforeClose 守卫，在关闭前进行拦截（如未保存提示）
 */
import { Button, Form, Input, Modal, message } from 'antd';
import React, { useRef } from 'react';

import { createModal, type ModalContainerRef } from '@dalydb/sdesign';

interface EditParams {
  id: string;
  name: string;
}

const EditFormModal = createModal<EditParams>(
  ({ params, open, onClose, afterClose, onSuccess }) => {
    const [form] = Form.useForm();

    return (
      <Modal
        open={open}
        title="编辑用户"
        onCancel={onClose}
        afterClose={afterClose}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          style={{ marginTop: 16 }}
          onFinish={() => {
            message.success('保存成功');
            onSuccess?.();
          }}
        >
          <Form.Item label="ID">
            <Input value={params.id} disabled />
          </Form.Item>
          <Form.Item label="名称" name="name" initialValue={params.name}>
            <Input placeholder="请输入名称" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  },
  {
    beforeClose: () => {
      return new Promise((resolve) => {
        Modal.confirm({
          title: '确认关闭？',
          content: '你有未保存的修改，关闭后数据将丢失',
          okText: '确认关闭',
          cancelText: '取消',
          onOk: () => resolve(true),
          onCancel: () => resolve(false),
        });
      });
    },
  },
);

const Demo = () => {
  const modalRef = useRef<ModalContainerRef<EditParams>>(null);

  return (
    <div>
      <Button
        type="primary"
        onClick={() => modalRef.current?.open({ id: '001', name: '示例用户' })}
      >
        编辑用户（关闭前确认）
      </Button>
      <EditFormModal ref={modalRef} />
    </div>
  );
};

export default Demo;
