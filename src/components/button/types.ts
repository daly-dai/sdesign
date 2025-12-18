import { ButtonProps } from 'antd';

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
