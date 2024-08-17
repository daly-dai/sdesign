import { CascaderProps } from 'antd';

export type SingleValueType = (string | number)[];
export type ValueType = SingleValueType | SingleValueType[] | undefined;

export type SCascaderProps = Omit<
  CascaderProps<any>,
  'onChange' | 'value' | 'defaultValue' | 'multiple'
> & {
  onChange?: (value: string, selectOptions?: any[]) => void;
  value?: string | null | ValueType;
  options?: any[];
  defaultValue?: string | ValueType;
  multiple?: boolean;
};
