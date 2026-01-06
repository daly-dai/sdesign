import { Button } from 'antd';
import React, { CSSProperties, FC, useMemo } from 'react';

import defaultConfig, { tLinkStyle } from './constant';
import { SButtonProps } from './types';

const InstanceButton: FC<SButtonProps> = ({
  type = 'default',
  size = 'middle',
  tLink = false,
  ...restProps
}) => {
  const config = type ? defaultConfig[type] : {};

  const btnStyle = useMemo<CSSProperties>(() => {
    return {
      ...(tLink ? tLinkStyle : {}),
      ...config.style,
      ...restProps.style,
    };
  }, [config, tLink, restProps.style]);

  const btnType = useMemo(() => {
    if (tLink) {
      return 'link';
    }

    if (config.type) {
      return config.type;
    }
  }, [tLink, config.type]);

  return (
    <Button
      size={size}
      {...config}
      type={btnType}
      {...restProps}
      style={btnStyle}
    />
  );
};

export default InstanceButton;
