import { ReactNode } from 'react';

export type sizeType = 'small' | 'middle' | 'large';

export interface NotDataProps {
  text?: ReactNode;
  type?: sizeType;
  className?: string;
  componentName?: string;
  imgProps?: React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >;
}

export type NoDataTypes = NotDataProps &
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
