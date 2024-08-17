import React, { FC } from 'react';

import useStyles from './index.style';
import { NoDataTypes } from './types';

import { useComStyle } from '@daly/sdesign/hooks';
import { NoDataIcon } from '@daly/sdesign/icons';

const TEXT_COM_MAP: Record<string, boolean> = {
  Dropdown: true,
  AutoComplete: true,
  Cascader: true,
  Select: true,
  TreeSelect: true,
};

const SNoData: FC<NoDataTypes> = ({
  text,
  type = 'large',
  className,
  imgProps,
  componentName,
  ...props
}) => {
  const { styles, cx, prefixCls } = useComStyle({
    prefixCls: 'no-data',
    useStylesHook: useStyles,
  });

  if (componentName && TEXT_COM_MAP?.[componentName]) {
    return (
      <div
        className={cx(
          styles[prefixCls],
          styles[`${prefixCls}-${type}`],
          className,
        )}
        {...props}
      >
        <div
          className={cx(
            styles[`${prefixCls}-title`],
            styles[`${prefixCls}-text-title`],
          )}
        >
          {text || '暂无数据'}
        </div>
      </div>
    );
  }

  return (
    <div className={cx(styles[prefixCls], className)} {...props}>
      <NoDataIcon
        className={cx(
          styles[`${prefixCls}-img`],
          styles[`${prefixCls}-${type}`],
        )}
        {...imgProps}
      ></NoDataIcon>
      <div
        className={cx(
          styles[`${prefixCls}-title`],
          styles[`${prefixCls}-${type}-title`],
        )}
      >
        {text || '暂无数据'}
      </div>
    </div>
  );
};

export default SNoData;
