import { CardProps } from 'antd';
import { ReactNode } from 'react';

export interface SCardProps extends Omit<CardProps, 'children'> {
  children?: ReactNode;
  hasBottomPadding?: boolean; // 底部是否包含边距
}
