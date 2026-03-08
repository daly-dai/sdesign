import { CardProps } from 'antd';
import { ReactNode } from 'react';

/**
 * SCard 卡片容器 Props
 *
 * 继承 antd Card，内置错误边界，内容出错时不影响整体页面。
 */
export interface SCardProps extends Omit<CardProps, 'children'> {
  children?: ReactNode;
  /**
   * 底部是否包含边距
   * @default true
   */
  hasBottomPadding?: boolean;
}
