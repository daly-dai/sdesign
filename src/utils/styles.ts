import { CSSProperties } from 'react';

/**
 * 统一组件样式前缀
 * @param className
 * @returns
 */
export const getPrefixCls = (className: string) => {
  return `sd-${className}`;
};

/**
 *
 * @param key
 * @param value
 * @returns
 */
export function getStyle(key: keyof CSSProperties, value: any) {
  if (!key) return {};

  if (!value) return {};

  return {
    [key]: value,
  };
}
