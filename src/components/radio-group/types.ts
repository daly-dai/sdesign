import { Radio } from 'antd';
import type { ComponentProps } from 'react';

export type RadioType = ComponentProps<typeof Radio.Group>;

/** SRadioGroup 单选框组 Props */
export interface SRadioGroupProps extends RadioType {
  /** 字典映射 key，从 SConfigProvider 全局字典中读取 */
  dictKey?: string;
  /** 字典数据，优先级高于 dictKey */
  dict?: Record<string, string>;
  /** 禁用指定选项的 key */
  disableKeys?: string | string[];
}
