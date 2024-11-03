import { Select } from 'antd';
import { ComponentProps, HTMLAttributes } from 'react';

import { ExtraComType } from '@dalydb/sdesign/types/base';

export type SelectType = HTMLAttributes<object> & ComponentProps<typeof Select>;

export type SSelectProps = SelectType & ExtraComType;
