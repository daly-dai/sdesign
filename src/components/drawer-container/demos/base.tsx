/**
 * title: 基础用法
 * description: 通过 createDrawer 创建抽屉容器，使用 ref 调用 open 方法打开抽屉
 */
import { Button, Descriptions, Drawer, message } from 'antd';
import React, { useRef } from 'react';

import { createDrawer, type DrawerContainerRef } from '@dalydb/sdesign';

interface UserDetailParams {
  id: string;
  name: string;
}

const UserDetailDrawer = createDrawer<UserDetailParams>(
  ({ params, open, onClose }) => {
    return (
      <Drawer open={open} title="用户详情" onClose={onClose} width={500}>
        <Descriptions column={1}>
          <Descriptions.Item label="用户 ID">{params.id}</Descriptions.Item>
          <Descriptions.Item label="用户名称">{params.name}</Descriptions.Item>
        </Descriptions>
      </Drawer>
    );
  },
);

const Demo = () => {
  const drawerRef = useRef<DrawerContainerRef<UserDetailParams>>(null);

  return (
    <div>
      <Button
        type="primary"
        onClick={() => drawerRef.current?.open({ id: '001', name: '张三' })}
      >
        查看详情
      </Button>
      <UserDetailDrawer
        ref={drawerRef}
        onSuccess={() => message.success('操作成功')}
      />
    </div>
  );
};

export default Demo;
