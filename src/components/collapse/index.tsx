import { CaretDownFilled } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

import { SCollapseProps } from './types';

const SCollapse = ({
  collapse,
  setCollapse,
  onExpand,
  disabled,
  ...props
}: SCollapseProps) => {
  // 处理展开收起功能
  const handleExpand = () => {
    if (disabled) return;

    setCollapse?.(!collapse);
    onExpand?.(!collapse);
  };

  return (
    <Button
      type="link"
      style={{ fontSize: 14, padding: '4px 0' }}
      onClick={handleExpand}
      disabled={disabled}
      {...props}
    >
      {collapse ? '展开' : '收起'}
      <CaretDownFilled rotate={collapse ? 0 : 180} />
    </Button>
  );
};

export default SCollapse;
