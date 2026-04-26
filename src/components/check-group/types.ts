import { Checkbox } from 'antd';
import { ComponentProps, HTMLAttributes, ReactNode } from 'react';

export type CheckboxGroupType = HTMLAttributes<object> &
  Omit<ComponentProps<typeof Checkbox.Group>, 'onChange' | 'value'>;
export type CheckboxValueType = any;

/** SCheckGroup 复选框组 Props */
export interface SCheckGroupProps
  extends Omit<CheckboxGroupType, 'onChange' | 'value'> {
  value?: CheckboxValueType[] | undefined | string;
  onChange?: (value: string | undefined) => void;
  children?: ReactNode;
  /** 字典映射 key，从 SConfigProvider 全局字典中读取 */
  dictKey?: string;
  /** 字典数据，优先级高于 dictKey */
  dict?: Record<string, string>;
  /** 禁用指定选项的 key */
  disableKeys?: string | string[];
}
