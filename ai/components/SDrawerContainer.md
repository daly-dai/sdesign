# SDrawerContainer — 抽屉容器工厂函数 createDrawer，通过 ref 命令式打开/关闭，支持关闭前拦截和动画保留

## 使用边界

**适用场景:**

- 需要通过 ref 命令式打开抽屉（如表格行操作触发详情抽屉）
- 抽屉内含有表单等有状态组件，关闭后需要自动重置
- 多个入口复用同一个抽屉逻辑
  **不适用:**
- 简单的确认弹窗，使用 SConfirm 组件
- 抽屉内容为纯展示且无需参数传递
- 需要同时打开多个相同抽屉的场景

## 类型定义

**DrawerWrapperProps** — createDrawer 返回的 Wrapper 组件 Props

- onSuccess?: () => void — 操作成功后的回调（抽屉关闭后触发）
- onClose?: () => void — 抽屉关闭后的回调（无论是否成功都会触发）

**CreateDrawerOptions** — createDrawer 工厂函数的 Options 配置

- beforeClose?: () => boolean | Promise<boolean> — 关闭前守卫，返回 false 可阻止关闭 常见场景：表单脏检查、未保存提示
- destroyAfterClose?: boolean — 关闭后是否延迟卸载内容组件，等待动画结束后再销毁 适用于 antd Modal/Drawer 的退出动画，避免动画未播放完就被卸载

## 使用示例

```tsx
import { Button, Drawer } from 'antd';
import React, { useRef } from 'react';
import { createDrawer, type DrawerContainerRef } from '@dalydb/sdesign';

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
```
