import { Space } from 'antd';
import React, { FC } from 'react';

import SButton from './instance';
import { SButtonsProps } from './types';

const SButtonGroup: FC<SButtonsProps> = ({
  items = [],
  size = 'middle',
  disabled = false,
  loading = false,
  spaceProps,
}) => {
  return (
    <Space size={8} {...spaceProps}>
      {items.map((btn, idx) => {
        if (btn.visible) {
          return null;
        }

        if (btn.render) {
          return typeof btn.render === 'function' ? btn.render() : btn.render;
        }

        const { key, ...rest } = btn as any;

        return (
          <SButton
            key={key ?? idx}
            size={size}
            disabled={disabled}
            loading={loading}
            {...rest}
          />
        );
      })}
    </Space>
  );
};

export default SButtonGroup;
