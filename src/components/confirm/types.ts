import { ButtonProps, PopconfirmProps } from 'antd';

import { tuple } from '@dalydb/sdesign/utils/types';

const ConfirmTypes = tuple('pop', 'modal');
export type ConfirmType = (typeof ConfirmTypes)[number];

export interface SConfirmProps {
  onConfirm?: () => void; // 确认的回调函数
  onCancel?: () => void; // 取消的回调函数
  type?: ConfirmType;
  text?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  popConfirmProps?: PopconfirmProps; // 弹出框的属性传参
  buttonProps?: ButtonProps; // 按钮的属性传参
  disabled?: boolean;
}
