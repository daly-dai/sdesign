import { Checkbox } from 'antd';
import { ComponentProps, HTMLAttributes, ReactNode } from 'react';

import { ExtraComType } from '@dalydb/sdesign/types/base';

export type CheckboxGroupType = HTMLAttributes<object> &
  Omit<ComponentProps<typeof Checkbox.Group>, 'onChange' | 'value'>;
export type CheckboxValueType = any;

export type SCheckGroupProps = CheckboxGroupType &
  ExtraComType & {
    value?: CheckboxValueType[] | undefined | string;
    onChange?: (value: string | undefined) => void;
    children?: ReactNode;
  };
