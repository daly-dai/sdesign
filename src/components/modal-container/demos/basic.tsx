import { createModal, type ModalContainerRef } from '@dalydb/sdesign';
import { Button, Modal } from 'antd';
import React, { useRef } from 'react';

const DemoModal = createModal<{ id: string }>(({ params, open, onClose }) => (
  <Modal open={open} title="确认" onCancel={onClose} onOk={onClose}>
    <p>ID: {params.id}</p>
  </Modal>
));

export default () => {
  const ref = useRef<ModalContainerRef<{ id: string }>>(null);
  return (
    <div>
      <Button type="primary" onClick={() => ref.current?.open({ id: '001' })}>
        打开弹窗
      </Button>
      <DemoModal ref={ref} />
    </div>
  );
};
