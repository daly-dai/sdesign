import { Button } from 'antd';
import React, { CSSProperties, FC, useMemo } from 'react';

import defaultConfig from './constant';
import { SButtonProps } from './types';

const InstanceButton: FC<SButtonProps> = ({
  type = 'default',
  size = 'middle',
  ...restProps
}) => {
  const config = type ? defaultConfig[type] : {};

  const btnStyle = useMemo<CSSProperties>(() => {
    return {
      ...config.style,
      ...restProps.style,
    };
  }, [config, restProps.style]);

  return <Button size={size} {...config} style={btnStyle} {...restProps} />;
};

export default InstanceButton;
