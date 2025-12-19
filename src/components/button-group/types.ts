import { Space } from 'antd';
import { ReactNode } from 'react';

import { SButtonProps } from '@dalydb/sdesign';

export interface SButtonsItem extends Partial<SButtonProps> {
  key?: React.Key;
  visible?: boolean;
  render?: ReactNode | (() => ReactNode);
}

export interface SButtonGroupProps {
  items?: SButtonsItem[];
  size?: SButtonProps['size'];
  spaceProps?: React.ComponentProps<typeof Space>;
  disabled?: boolean;
  loading?: boolean;
}
