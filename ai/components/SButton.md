# SButton — 增强按钮，支持 actionType 预设操作类型和按钮组

## 子组件与静态方法

- SButton.Group

## 使用边界

**适用场景:**

- 页面中需要操作按钮（新增、编辑、删除、导出等）
- 需要 actionType 预设按钮文字和样式
- 需要按钮组（SButton.Group）批量配置按钮
  **不适用:**
- 导航链接跳转，应使用 react-router Link
- 图标按钮无文字无操作语义，直接用 antd Button + icon
  **优先使用:**
- SButton.Group → 多个操作按钮并排时，不要手动排列多个 SButton

## 继承关系

继承自 **antd Button** 的全部属性。

其他 antd Button 属性均可直接使用。

## 类型定义

**SButtonProps** extends ButtonProps (继承自 antd Button) — SButton 增强按钮 Props 继承 antd Button，增加了 actionType 预设类型和 compact 紧凑模式。 `tsx <SButton actionType="save" onClick={handleSave} /> <SButton actionType="delete" onClick={handleDelete} /> <SButton type="primary">自定义文字</SButton> `

- type?: ButtonProps['type'] — antd 按钮类型
- actionType?: SButtonActionType — 预设操作类型，自动设置文字和样式
- compact?: boolean — 紧凑模式，样式与 t-link 相同

**SButtonsItem** extends Partial<SButtonProps> — SButton.Group 中单个按钮的配置

- key?: React.Key
- visible?: boolean — 是否可见
- render?: ReactNode | (() => ReactNode) — 自定义渲染

**SButtonsProps** — SButton.Group 按钮组 Props `tsx <SButton.Group items={[ { actionType: 'create', onClick: handleAdd }, { actionType: 'export', onClick: handleExport }, { actionType: 'delete', visible: hasSelected, onClick: handleBatchDelete }, ]} /> `

- items?: SButtonsItem[] — 按钮配置数组
- size?: SButtonProps['size'] — 统一尺寸
- spaceProps?: React.ComponentProps<typeof Space> — Space 组件属性
- disabled?: boolean — 统一禁用
- loading?: boolean — 统一 loading

**SButtonActionType** — 预设操作按钮类型 可选值: `'add'` | `'save'` | `'cancel'` | `'reset'` | `'upload'` | `'download'` | `'export'` | `'import'` | `'delete'` | `'view'` | `'back'` | `'next'` | `'previous'` | `'finish'` | `'create'` | `'edit'` | `'confirm'` | `'close'` | `'refresh'` | `'search'` | `'t-link'`: `(typeof SButtonActionTypes)[number]`

## 使用示例

```tsx
import { Flex } from 'antd';
import React from 'react';

import { SButton } from '@dalydb/sdesign';

// 基本用法
export default () => {
  return (
    <div>
      <Flex gap={12}>
        <strong>基础使用</strong>
        <SButton.Group
          items={[
            { actionType: 'save' },
            { actionType: 'cancel' },
            { actionType: 'reset' },
            { actionType: 'upload' },
            { actionType: 'delete' },
            {
              actionType: 'create',
            },
            { actionType: 'download' },
          ]}
        />
      </Flex>
    </div>
  );
};
```
