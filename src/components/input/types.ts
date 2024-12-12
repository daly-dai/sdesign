import { InputProps } from 'antd';

export interface SInputProps extends Omit<InputProps, 'onChange'> {
  value?: string;
  onChange?: (value: string) => void;
  trim?: boolean; // 是否去除前后空格
  onEnter?: (value?: string) => void; // 回车事件
}
