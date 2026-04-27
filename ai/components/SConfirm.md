# SConfirm — 确认组件，支持 Popconfirm 和 Modal 两种模式

## 使用边界

**适用场景:**

- 操作前需要二次确认（删除、提交等危险操作）
- 需要 Popconfirm 气泡确认或 Modal 对话框确认
  **不适用:**
- 不需要确认的普通操作，直接用 SButton onClick
- 需要复杂表单输入的确认弹窗，使用 antd Modal + SForm

## 类型定义

**SConfirmProps** — SConfirm 确认组件 Props 统一封装了 Popconfirm 和 Modal.confirm 两种确认交互。 `tsx <SConfirm type="pop" onConfirm={handleDelete}> <SButton actionType="delete" /> </SConfirm> <SConfirm type="modal" title="确认删除？" onConfirm={handleDelete}> <SButton actionType="delete" /> </SConfirm> `

- onConfirm?: () => void — 确认回调
- onCancel?: () => void — 取消回调
- type?: ConfirmType — 确认方式
- text?: string — 确认提示文字
- title?: React.ReactNode — 标题
- description?: React.ReactNode — 描述
- children?: React.ReactNode — 触发元素
- popConfirmProps?: PopconfirmProps — Popconfirm 额外属性
- buttonProps?: ButtonProps — 按钮额外属性
- disabled?: boolean — 是否禁用
- eventStop?: boolean — 是否阻止事件冒泡
- modalProps?: ModalFuncProps — Modal.confirm 额外属性

**ConfirmType** — 确认方式类型 - `'pop'` — 气泡确认框 (Popconfirm) - `'modal'` — 模态对话框 (Modal.confirm): `(typeof ConfirmTypes)[number]`

## 使用示例

```tsx
import React from 'react';
import { SButton, SConfirm } from '@dalydb/sdesign';

export default () => (
  <div>
    <SConfirm type="pop" onConfirm={() => alert('确认')}>
      <SButton actionType="delete" />
    </SConfirm>
  </div>
);
```
