import { CSSProperties } from 'react';

export interface ScrollbarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /** @description 容器类名 */
  wrapClass?: string;

  wrapStyle?: CSSProperties;
  height: string | number;
  maxHeight?: string | number;
  onScrollTop?: (data?: number | string) => void;
  onScrollLeft?: (data?: number | string) => void;
  always?: boolean;

  /** @description 是否使用原生滚动  */
  native?: boolean;
}

export interface ThumbProps {
  vertical?: boolean;
  size?: string;
  move?: number;
  ratio: number;
  always: boolean;
}
