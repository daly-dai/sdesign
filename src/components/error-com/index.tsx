import React, { FC } from 'react';

import useStyles from './index.style';
import { SErrorComProps } from './types';

import useComStyle from '@daly/sdesign/hooks/useComStyle';
import { LoadErrorIcon } from '@daly/sdesign/icons';

const SErrorCom: FC<SErrorComProps> = ({
  text,
  style = {},
  iconStyle = {},
}) => {
  const { styles, prefixCls } = useComStyle({
    prefixCls: 'error-com',
    useStylesHook: useStyles,
  });

  return (
    <div style={{ ...style }} className={styles[`${prefixCls}`]}>
      <LoadErrorIcon
        style={{ ...iconStyle }}
        className={styles[`${prefixCls}-img`]}
      />

      <p className={styles[`${prefixCls}-desc`]}>
        {text || '加载异常，请稍后重试'}
      </p>
    </div>
  );
};

export default SErrorCom;
