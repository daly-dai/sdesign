/**
 * title: 关闭前拦截
 * description: 通过 beforeClose 守卫，在关闭前进行拦截（如未保存提示）
 */
import { Button, Drawer, Form, Input, Modal, message } from 'antd';
import React, { useRef } from 'react';

import { createDrawer, type DrawerContainerRef } from '@dalydb/sdesign';

interface EditParams {
  id: string;
  name: string;
}

const EditFormDrawer = createDrawer<EditParams>(
  ({ params, open, onClose, afterClose, onSuccess }) => {
    const [form] = Form.useForm();

    return (
      <Drawer
        open={open}
        title="编辑用户"
        onClose={onClose}
        afterOpenChange={(open) => {
          if (!open) afterClose?.();
        }}
        width={500}
        extra={
          <Button
            type="primary"
            onClick={() => {
              form.validateFields().then(() => {
                message.success('保存成功');
                onSuccess?.();
              });
            }}
          >
            保存
          </Button>
        }
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item label="ID">
            <Input value={params.id} disabled />
          </Form.Item>
          <Form.Item label="名称" name="name" initialValue={params.name}>
            <Input placeholder="请输入名称" />
          </Form.Item>
        </Form>
      </Drawer>
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
    destroyAfterClose: true,
  },
);

const Demo = () => {
  const drawerRef = useRef<DrawerContainerRef<EditParams>>(null);

  return (
    <div>
      <Button
        type="primary"
        onClick={() => drawerRef.current?.open({ id: '001', name: '示例用户' })}
      >
        编辑用户（关闭前确认 + 动画保留）
      </Button>
      <EditFormDrawer ref={drawerRef} />
    </div>
  );
};

export default Demo;
