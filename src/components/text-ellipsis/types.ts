import { TooltipProps } from 'antd';
import { CSSProperties, RefObject } from 'react';

import Multi from './components/multi';
import Single from './components/single';

export interface TextEllipsisProps {
  maxChars?: number | undefined;
  maxWidth?: number;
  maxLines?: number | undefined;
  showTooltip?: boolean;
  tooltipProps?: TooltipProps;
  text?: string;
  style?: CSSProperties;
  className?: string;
  width?: string | undefined;
  prefixCls?: string;
  fontSize?: string;
}

export type SingleEllipsisProps = {
  maxChars?: number | undefined;
  width?: string | undefined;
  maxWidth?: number;
  style?: CSSProperties;
  text?: string;
  fontSize?: string;
  tooltipProps?: TooltipProps;
  className?: string;
  showTooltip?: boolean;
};

export type MultiEllipsisProps = SingleEllipsisProps & {
  line?: number;
};

export type SingleHookType = Partial<MultiEllipsisProps> & {
  ref: RefObject<HTMLDivElement>;
};

export type STextEllipsisType = {
  Single: typeof Single;
  Multi: typeof Multi;
};
