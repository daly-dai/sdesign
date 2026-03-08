import { ButtonProps, Space } from 'antd';
import { ReactNode } from 'react';

import { tuple } from '@dalydb/sdesign/utils';

/**
 * 预设操作按钮类型
 *
 * 每种 actionType 预设了按钮文字、图标和样式，无需手动设置 children。
 */
export const SButtonActionTypes = tuple(
  'save',
  'cancel',
  'reset',
  'upload',
  'download',
  'export',
  'import',
  'delete',
  'view',
  'back',
  'next',
  'previous',
  'finish',
  'create',
  'edit',
  'confirm',
  'close',
  'refresh',
  'search',
  't-link',
);

/**
 * 预设操作按钮类型
 *
 * 可选值: `'save'` | `'cancel'` | `'reset'` | `'upload'` | `'download'` | `'export'` |
 * `'import'` | `'delete'` | `'view'` | `'back'` | `'next'` | `'previous'` |
 * `'finish'` | `'create'` | `'edit'` | `'confirm'` | `'close'` | `'refresh'` |
 * `'search'` | `'t-link'`
 */
export type SButtonActionType = (typeof SButtonActionTypes)[number];

/**
 * SButton 增强按钮 Props
 *
 * 继承 antd Button，增加了 actionType 预设类型和 compact 紧凑模式。
 *
 * @example
 * ```tsx
 * <SButton actionType="save" onClick={handleSave} />
 * <SButton actionType="delete" onClick={handleDelete} />
 * <SButton type="primary">自定义文字</SButton>
 * ```
 */
export interface SButtonProps extends ButtonProps {
  /** antd 按钮类型 */
  type?: ButtonProps['type'];
  /** 预设操作类型，自动设置文字和样式 */
  actionType?: SButtonActionType;
  /** 紧凑模式，样式与 t-link 相同 */
  compact?: boolean;
}

/**
 * SButton.Group 中单个按钮的配置
 */
export interface SButtonsItem extends Partial<SButtonProps> {
  key?: React.Key;
  /** 是否可见 */
  visible?: boolean;
  /** 自定义渲染 */
  render?: ReactNode | (() => ReactNode);
}

/**
 * SButton.Group 按钮组 Props
 *
 * @example
 * ```tsx
 * <SButton.Group
 *   items={[
 *     { actionType: 'create', onClick: handleAdd },
 *     { actionType: 'export', onClick: handleExport },
 *     { actionType: 'delete', visible: hasSelected, onClick: handleBatchDelete },
 *   ]}
 * />
 * ```
 */
export interface SButtonsProps {
  /** 按钮配置数组 */
  items?: SButtonsItem[];
  /** 统一尺寸 */
  size?: SButtonProps['size'];
  /** Space 组件属性 */
  spaceProps?: React.ComponentProps<typeof Space>;
  /** 统一禁用 */
  disabled?: boolean;
  /** 统一 loading */
  loading?: boolean;
}
