import { CSSProperties, ReactNode } from 'react';

import { tuple } from '@dalydb/sdesign/utils/types';

const TitleTypes = tuple('page', 'table', 'form');

export type TitleType = (typeof TitleTypes)[number];

export interface PageTitleProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'prefix'> {
  // 前缀
  prefix?: ReactNode;
  // 间距
  gap?: number | string;
  goBack?: boolean;
  type?: TitleType;
  titleDesc?: ReactNode;
  actionNode?: ReactNode;
  style?: React.CSSProperties;
  hasBottomMargin?: boolean | number | string;
  fontSize?: CSSProperties['fontSize'];
  onBackClick?: () => void;
  children?: ReactNode;
}
