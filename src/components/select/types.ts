import type { SelectProps } from 'antd';

/** SSelect 增强选择器 Props */
export interface SSelectProps extends SelectProps {
  /** 字典映射 key，从 SConfigProvider 全局字典中读取 */
  dictKey?: string;
  /** 字典数据，优先级高于 dictKey */
  dict?: Record<string, string>;
  /** 禁用指定选项的 key */
  disableKeys?: string | string[];
}
