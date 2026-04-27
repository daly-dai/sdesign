import { createDrawer, type DrawerContainerRef } from '@dalydb/sdesign';
import { Button, Drawer } from 'antd';
import React, { useRef } from 'react';

const DemoDrawer = createDrawer<{ id: string; name: string }>(
  ({ params, open, onClose }) => (
    <Drawer open={open} title="用户详情" onClose={onClose} width={500}>
      <p>ID: {params.id}</p>
      <p>名称: {params.name}</p>
    </Drawer>
  ),
);

export default () => {
  const ref = useRef<DrawerContainerRef<{ id: string; name: string }>>(null);
  return (
    <div>
      <Button
        type="primary"
        onClick={() => ref.current?.open({ id: '001', name: '张三' })}
      >
        查看详情
      </Button>
      <DemoDrawer ref={ref} />
    </div>
  );
};
