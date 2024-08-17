import React from 'react';

import useStyles from './index.style';

import { useComStyle } from '@daly/sdesign/hooks';
import { NoPageIcon } from '@daly/sdesign/icons';

const SNoPage = ({ text }: { text?: any }) => {
  const { styles, prefixCls } = useComStyle({
    prefixCls: 'no-page',
    useStylesHook: useStyles,
  });

  return (
    <div className={styles[prefixCls]}>
      <NoPageIcon className={styles[`${prefixCls}-img`]} />
      <p className={styles[`${prefixCls}-desc`]}>
        {text || '页面失效或不存在'}
      </p>
    </div>
  );
};

export default SNoPage;
