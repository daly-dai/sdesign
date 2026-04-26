import { CascaderProps } from 'antd';

export type SingleValueType = (string | number)[];
export type ValueType = SingleValueType | SingleValueType[] | undefined;

/** SCascader 增强级联选择器 Props */
export interface SCascaderProps
  extends Omit<
    CascaderProps<any>,
    'onChange' | 'value' | 'defaultValue' | 'multiple'
  > {
  /** onChange 直接返回字符串值 */
  onChange?: (value: string, selectOptions?: any[]) => void;
  value?: string | null | ValueType;
  options?: any[];
  defaultValue?: string | ValueType;
  multiple?: boolean;
}
