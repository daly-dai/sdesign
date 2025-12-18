import { Button } from 'antd';
import React, { FC } from 'react';

import defaultConfig from './constant';
import { SButtonProps } from './types';

const SButton: FC<SButtonProps> = ({
  type = 'default',
  size = 'middle',
  ...restProps
}) => {
  const config = type ? defaultConfig[type] : {};

  return <Button size={size} {...config} {...restProps} />;
};

export default SButton;
