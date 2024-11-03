import React, { FC } from 'react';

import useStyles from './index.style';
import { SLoadingProps } from './types';

import { useComStyle } from '@dalydb/sdesign/hooks';
import { LoadingIcon } from '@dalydb/sdesign/icons';

const SLoading: FC<SLoadingProps> = ({ size = 'large', ...props }) => {
  const { styles, cx, prefixCls } = useComStyle({
    prefixCls: 'loading',
    useStylesHook: useStyles,
  });

  return (
    <div className={styles[prefixCls]} {...props}>
      <LoadingIcon
        className={cx(
          styles[`${prefixCls}-img`],
          styles?.[`${prefixCls}-${size}`],
        )}
      ></LoadingIcon>
    </div>
  );
};

export default SLoading;
