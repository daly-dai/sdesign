import { ButtonProps, Space } from 'antd';
import { ReactNode } from 'react';

import { tuple } from '@dalydb/sdesign/utils';

// 操作按钮类型
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

export type SButtonActionType = (typeof SButtonActionTypes)[number];

// 标准按钮类型 (antd Button的type类型)
// export const SButtonStandardTypes = tuple(
//   'default',
//   'primary',
//   'dashed',
//   'link',
//   'text',

// );

// export type SButtonStandardType = (typeof SButtonStandardTypes)[number];

// // 所有可能的按钮类型 (用于向后兼容)
// export const SButtonTypes = tuple(
//   ...SButtonActionTypes,
//   ...SButtonStandardTypes,
// );

// export type SButtonType = (typeof SButtonTypes)[number];

export interface SButtonProps extends ButtonProps {
  // 使用antd的ButtonType作为type类型
  type?: ButtonProps['type'];
  // 添加actionType属性用于操作按钮类型
  actionType?: SButtonActionType;
  // 紧凑模式，当为true时按钮样式与t-link相同
  compact?: boolean;
}

export interface SButtonsItem extends Partial<SButtonProps> {
  key?: React.Key;
  visible?: boolean;
  render?: ReactNode | (() => ReactNode);
}

export interface SButtonsProps {
  items?: SButtonsItem[];
  size?: SButtonProps['size'];
  spaceProps?: React.ComponentProps<typeof Space>;
  disabled?: boolean;
  loading?: boolean;
}
