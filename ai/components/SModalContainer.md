# SModalContainer — 弹窗容器工厂函数 createModal，通过 ref 命令式打开/关闭，支持关闭前拦截和动画保留

## 使用边界

**适用场景:**

- 需要通过 ref 命令式打开弹窗（如表格行操作触发编辑弹窗）
- 弹窗内含有表单等有状态组件，关闭后需要自动重置
- 多个入口复用同一个弹窗逻辑
  **不适用:**
- 简单的确认弹窗，使用 SConfirm 组件
- 弹窗内容为纯展示，无需参数传递
- 需要同时打开多个相同弹窗的场景

## 类型定义

**ModalWrapperProps** — createModal 返回的 Wrapper 组件 Props

- onSuccess?: () => void — 操作成功后的回调（弹窗关闭后触发）
- onClose?: () => void — 弹窗关闭后的回调（无论是否成功都会触发）

**CreateModalOptions** — createModal 工厂函数的 Options 配置

- beforeClose?: () => boolean | Promise<boolean> — 关闭前守卫，返回 false 可阻止关闭 常见场景：表单脏检查、未保存提示 `tsx createModal(Content, { beforeClose: () => { if (form.isFieldsTouched()) { return window.confirm('有未保存的修改，确认关闭？'); } return true; }, }) `
- destroyAfterClose?: boolean — 关闭后是否延迟卸载内容组件，等待动画结束后再销毁 适用于 antd Modal/Drawer 的退出动画，避免动画未播放完就被卸载

## 使用示例

```tsx
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
```
