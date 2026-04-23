/**
 * title: 配合表单使用
 * description: 抽屉关闭时内部状态自动销毁，无需手动重置表单
 */
import { Button, Drawer, Form, Input, message } from 'antd';
import React, { useRef } from 'react';

import { createDrawer, type DrawerContainerRef } from '@dalydb/sdesign';

interface EditParams {
  id: string;
  name: string;
}

const EditFormDrawer = createDrawer<EditParams>(
  ({ params, open, onClose, onSuccess }) => {
    const [form] = Form.useForm();

    return (
      <Drawer
        open={open}
        title="编辑信息"
        onClose={onClose}
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
);

const Demo = () => {
  const drawerRef = useRef<DrawerContainerRef<EditParams>>(null);

  return (
    <div>
      <Button
        type="primary"
        onClick={() => drawerRef.current?.open({ id: '001', name: '示例数据' })}
      >
        编辑信息
      </Button>
      <EditFormDrawer
        ref={drawerRef}
        onSuccess={() => message.success('操作成功，列表已刷新')}
      />
    </div>
  );
};

export default Demo;
