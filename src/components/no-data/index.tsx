import React, { FC } from 'react';

import './index.css';
import { NoDataTypes } from './types';

import { NoDataIcon } from '@dalydb/sdesign/icons';

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
  const base = 'sdesign-no-data';

  if (componentName && TEXT_COM_MAP?.[componentName]) {
    return (
      <div
        className={[base, `${base}-${type}`, className]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        <div className={`${base}-title ${base}-text-title`}>
          {text || '暂无数据'}
        </div>
      </div>
    );
  }

  return (
    <div className={[base, className].filter(Boolean).join(' ')} {...props}>
      <NoDataIcon
        className={`${base}-img ${base}-${type}`}
        {...imgProps}
      ></NoDataIcon>
      <div className={`${base}-title ${base}-${type}-title`}>
        {text || '暂无数据'}
      </div>
    </div>
  );
};

export default SNoData;
