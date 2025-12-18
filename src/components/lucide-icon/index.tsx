import * as LucideIcons from 'lucide-react';
import React from 'react';

import { AntdLucideIconProps, LucideIconName } from './types';

import type { LucideIcon } from 'lucide-react';
import type { CSSProperties } from 'react';

// 2. 修复：对齐 antd 样式的基础样式（类型明确）
const antdIconBaseStyle: CSSProperties = {
  verticalAlign: '-0.125em',
  display: 'inline-block',
  flexShrink: 0,
};

/**
 * 适配 antd 组件的 lucide 图标组件
 * 解决 antd 组件 icon 属性的尺寸/对齐/样式问题
 */
const SLucideIcon = ({
  name,
  size = '1em',
  strokeWidth = 2,
  color = 'currentColor',
  style,
  className,
  ...props
}: AntdLucideIconProps) => {
  // 4. 修复：类型断言为 LucideIcon 组件，解决 TS 无法识别组件类型的问题
  const IconComponent = (
    LucideIcons as unknown as Record<LucideIconName, LucideIcon>
  )?.[name];

  // 兜底：图标名称不存在时返回 null
  if (!IconComponent) {
    console.warn(`Lucide 图标 ${name} 不存在，请检查名称是否正确`);
    return null;
  }

  return (
    <IconComponent
      size={size}
      strokeWidth={strokeWidth}
      color={color}
      className={className}
      // 合并基础样式 + 自定义样式，解决样式覆盖报错
      style={{ ...antdIconBaseStyle, ...style }}
      // 透传剩余属性，确保类型兼容
      {...props}
    />
  );
};

export default SLucideIcon;
