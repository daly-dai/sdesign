import { Radio } from 'antd';
import { ComponentProps, HTMLAttributes } from 'react';

import { ExtraComType } from '@daly/sdesign/types/base';

export type RadioType = HTMLAttributes<object> &
  ComponentProps<typeof Radio.Group>;

export type SRadioGroupProps = RadioType & ExtraComType;
