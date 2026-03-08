import { CSSProperties, ReactNode } from 'react';

import { tuple } from '@dalydb/sdesign/utils/types';

const TitleTypes = tuple('page', 'table', 'form');

/**
 * 标题类型
 * - `'page'` — 页面级标题（较大字号）
 * - `'table'` — 表格区域标题
 * - `'form'` — 表单区域标题
 */
export type TitleType = (typeof TitleTypes)[number];

/**
 * STitle 标题组件 Props
 *
 * @example
 * ```tsx
 * <STitle type="page" goBack onBackClick={() => navigate(-1)}>
 *   用户详情
 * </STitle>
 * ```
 */
export interface STitleProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'prefix'> {
  /** 标题前缀自定义内容 */
  prefix?: ReactNode;
  /** 标题与内容的间距 */
  gap?: number | string;
  /** 是否显示返回按钮 */
  goBack?: boolean;
  /**
   * 标题类型，影响字号和样式
   * @default 'page'
   */
  type?: TitleType;
  /** 描述文字 */
  desc?: ReactNode;
  /** 右侧操作区 */
  actionNode?: ReactNode;
  style?: React.CSSProperties;
  /** 底部间距 */
  hasBottomMargin?: boolean | number | string;
  fontSize?: CSSProperties['fontSize'];
  /** 返回按钮点击回调 */
  onBackClick?: () => void;
  /** 标题文字 */
  children?: ReactNode;
}
