import { Button } from 'antd';
import React, { CSSProperties, FC, useMemo } from 'react';

import defaultConfig from './constant';
import { SButtonProps } from './types';

const InstanceButton: FC<SButtonProps> = ({
  type,
  actionType,
  size = 'middle',
  ...restProps
}) => {
  // 获取操作按钮配置
  const actionConfig = actionType ? defaultConfig[actionType] : {};
  // 获取标准按钮配置（用于向后兼容）
  const typeConfig = type && !actionType ? defaultConfig[type] : {};
  // 合并配置，actionType优先级高于type
  const config = { ...typeConfig, ...actionConfig };

  const btnStyle = useMemo<CSSProperties>(() => {
    return {
      ...config.style,
      ...restProps.style,
    };
  }, [config, restProps.style]);

  // const btnType = useMemo<ButtonType | undefined>(() => {
  //   // 优先使用用户直接传递的type
  //   if (type) {
  //     return type;
  //   }

  //   // 然后使用配置中的type
  //   if (config.type) {
  //     return config.type;
  //   }

  //   // 默认类型
  //   return 'default';
  // }, [type, config.type]);

  return <Button size={size} {...config} {...restProps} style={btnStyle} />;
};

export default InstanceButton;
