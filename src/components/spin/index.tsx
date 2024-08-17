import { Spin } from 'antd';
import React, { FC } from 'react';

import useStyles from './index.style';
import { LoadingProps } from './types';

import { useComStyle } from '@daly/sdesign/hooks';
import LoadingIcon from '@daly/sdesign/icons/LoadingIcon';

const SSpin: FC<LoadingProps> = ({ size = 'small', indicator, ...props }) => {
  const { styles, cx, prefixCls } = useComStyle({
    prefixCls: 'spin',
    useStylesHook: useStyles,
  });

  const indicatorIcon = indicator ?? (
    <LoadingIcon
      className={cx(styles[`${prefixCls}-img`], styles[`${prefixCls}-${size}`])}
    />
  );

  return <Spin indicator={indicatorIcon} size={size} {...props} />;
};

export default SSpin;
