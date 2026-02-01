import { Button } from 'antd';
import React, { CSSProperties, FC, memo, useMemo } from 'react';

import defaultConfig from './constant';
import { SButtonProps } from './types';

const InstanceButton: FC<SButtonProps> = ({
  type,
  actionType,
  compact,
  size = 'middle',
  ...restProps
}) => {
  // 获取操作按钮配置
  const actionConfig = actionType ? defaultConfig[actionType] : {};
  // 获取标准按钮配置（用于向后兼容）
  const typeConfig = type && !actionType ? defaultConfig[type] : {};
  // 合并配置，actionType优先级高于type
  const config = { ...typeConfig, ...actionConfig };

  // 如果启用紧凑模式，应用 t-link 配置
  const finalConfig = compact
    ? { ...config, ...defaultConfig['t-link'] }
    : config;

  const mergedStyle = useMemo<CSSProperties>(() => {
    return {
      ...finalConfig.style,
      ...restProps.style,
    };
  }, [finalConfig, restProps.style]);

  return (
    <Button size={size} {...finalConfig} {...restProps} style={mergedStyle} />
  );
};

export default memo(InstanceButton);
