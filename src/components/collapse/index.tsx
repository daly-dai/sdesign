import { Button } from 'antd';
import React from 'react';

import { SCollapseProps } from './types';

import { SLucideIcon } from '@dalydb/sdesign';

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

    const nextCollapse = !collapse;
    setCollapse?.(nextCollapse);
    // onExpand 传「展开状态」（!折叠状态）；传 nextCollapse 的取反即点击后的展开状态，
    // 否则会拿到点击前的旧值（反向 bug）
    onExpand?.(!nextCollapse);
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
      <SLucideIcon
        name="ChevronDown"
        style={{ transform: `rotate(${collapse ? 0 : 180}deg)` }}
      />
    </Button>
  );
};

export default SCollapse;
