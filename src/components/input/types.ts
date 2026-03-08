import { InputProps } from 'antd';

/**
 * SInput 增强输入框 Props
 *
 * 继承 antd Input，增加了 trim 和 onEnter 便捷功能。
 *
 * @example
 * ```tsx
 * <SInput trim onEnter={(val) => search(val)} placeholder="搜索" />
 * ```
 */
export interface SInputProps extends Omit<InputProps, 'onChange'> {
  value?: string;
  /** onChange 直接返回 string 值（非 event） */
  onChange?: (value: string) => void;
  /**
   * 是否自动去除首尾空格
   * @default false
   */
  trim?: boolean;
  /** 按回车键触发的回调 */
  onEnter?: (value?: string) => void;
}
