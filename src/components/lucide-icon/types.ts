import * as LucideIcons from 'lucide-react';

import type { LucideProps } from 'lucide-react';
import type { ComponentPropsWithoutRef } from 'react';

// 1. 修复：正确提取 lucide 所有图标名称的类型（解决 keyof typeof 报错）
export type LucideIconName = keyof typeof LucideIcons;

// 3. 修复：Props 类型严格兼容 LucideProps，避免属性冲突
export type AntdLucideIconProps = {
  /** lucide 图标名称（自动提示所有可选值） */
  name: LucideIconName;
  /** 尺寸（默认 1em 对齐 antd，支持数字/字符串） */
  size?: number | string;
  /** 线条粗细（默认 2 对齐 antd Outlined） */
  strokeWidth?: number;
  /** 颜色（默认继承父元素 currentColor） */
  color?: string;
} & Omit<LucideProps, 'size' | 'strokeWidth' | 'color'> &
  ComponentPropsWithoutRef<'svg'>; // 兼容 SVG 原生属性
