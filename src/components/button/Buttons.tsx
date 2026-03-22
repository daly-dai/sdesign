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
  const showItems = items.filter((item) => item.visible !== false);

  const renderButtonItem = useCallback(
    (btn: any, idx: number) => {
      if (btn.render) {
        return typeof btn.render === 'function' ? btn.render() : btn.render;
      }

      const { key, ...rest } = btn;

      return (
        <SButton
          key={key ?? idx}
          size={size}
          disabled={disabled || rest.disabled}
          loading={loading || rest.loading}
          {...rest}
        />
      );
    },
    [size, disabled, loading],
  );

  return (
    <Space size={8} {...spaceProps}>
      {showItems.map(renderButtonItem)}
    </Space>
  );
};

export default memo(SButtonGroup);
