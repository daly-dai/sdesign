import Icon from '@ant-design/icons';
import React from 'react';

import IconComponent from './Loading';

import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import type { HTMLAttributes } from 'react';

export default (
  props: Partial<CustomIconComponentProps> & HTMLAttributes<HTMLSpanElement>,
) => <Icon component={IconComponent} {...props} />;
