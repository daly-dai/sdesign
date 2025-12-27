import { ButtonProps, Space } from 'antd';
import { ReactNode } from 'react';

import { tuple } from '@dalydb/sdesign/utils';

const SButtonTypes = tuple(
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
  'default',
  'primary',
  'dashed',
  'link',
  'text',
  'search',
);

export type SButtonType = (typeof SButtonTypes)[number];

export interface SButtonProps extends Omit<ButtonProps, 'type'> {
  type?: SButtonType;
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
