import { Space } from 'antd';
import React, { FC, memo, useCallback } from 'react';

import SButton from './instance';
import { SButtonsProps } from './types';

const SButtonGroup: FC<SButtonsProps> = ({
  items = [],
  size = 'middle',
  disabled = false,
  loading = false,
  spaceProps,
}) => {
  const renderButtonItem = useCallback(
    (btn: any, idx: number) => {
      // 如果visible为false或undefined，则不显示该按钮
      if (btn.visible === false) {
        return null;
      }

      if (btn.render) {
        return typeof btn.render === 'function' ? btn.render() : btn.render;
      }

      const { key, ...rest } = btn;

      return (
        <SButton
          key={key ?? idx}
          size={size}
          disabled={disabled}
          loading={loading}
          {...rest}
        />
      );
    },
    [size, disabled, loading],
  );

  return (
    <Space size={8} {...spaceProps}>
      {items.map(renderButtonItem)}
    </Space>
  );
};

export default memo(SButtonGroup);
