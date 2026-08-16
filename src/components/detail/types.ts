import React, { CSSProperties, ReactNode } from 'react';

import { FileListProps, STitleProps } from '@dalydb/sdesign';
import { tuple } from '@dalydb/sdesign/utils/types';

const ItemTypes = tuple(
  'text',
  'empty',
  'file',
  'dict',
  'rangeTime',
  'checkbox',
  'placeholder',
  'tag',
);

/**
 * 详情项渲染类型
 *
 * - `'text'` — 纯文本
 * - `'dict'` — 字典映射，自动从 globalDict 转换
 * - `'file'` — 文件列表展示
 * - `'rangeTime'` — 时间范围
 * - `'checkbox'` — 多选值展示
 * - `'empty'` — 空占位
 * - `'placeholder'` — 占位符（有意留空标记）
 * - `'tag'` — 标签渲染
 */
export type ItemType = (typeof ItemTypes)[number];

export interface DictReflect {
  label?: string;
  name?: string;
}

export type DetailItemType = {
  /**
   * 渲染类型
   * @default 'text'
   */
  type?: ItemType;
  /** 文件展示配置，type='file' 时有效 */
  fileProps?: Partial<FileListProps>;
  /** 字典映射关系 */
  dictReflect?: DictReflect;
  /** 字典 key，配合 SConfigProvider globalDict */
  dictKey?: string;
  value?: any;
  /** 字典数据源 */
  dictMap?: Record<string, string> | any[] | null;
  /** tag 类型颜色映射（值 → antd Tag color） */
  tagColorMap?: Record<string, string>;
  render?: (value?: any, dataSource?: any) => ReactNode;
  dataSource?: Record<string, any>;
};

/**
 * SDetail 单个详情项配置
 *
 * @example
 * ```tsx
 * const items: SDetailItem[] = [
 *   { label: '姓名', name: 'name' },
 *   { label: '状态', name: 'status', type: 'dict', dictKey: 'userStatus' },
 *   { label: '附件', name: 'files', type: 'file' },
 *   { label: '自定义', render: (val, data) => <Tag>{val}</Tag> },
 * ];
 * ```
 */
export type SDetailItemType = DetailItemType & {
  /** 详情项标签 */
  label?: ReactNode;
  /** 数据源中的字段名；数组表示取多个顶层字段组成数组（如 rangeTime 的 ['start','end']），非嵌套路径 */
  name?: string | string[];
  /** 栅格占位（映射为 grid-column: span N） */
  span?: number;
  /** 是否隐藏 */
  hidden?: boolean;
  /** 是否可复制（仅 text/dict 类型生效） */
  copyable?: boolean;
  /**
   * 长文本省略
   * - `true`: 单行省略
   * - `{ rows: 3 }`: 三行省略 + 展开按钮
   */
  ellipsis?: boolean | { rows: number };
  /** label 悬浮提示 */
  tooltip?: ReactNode;
};

/**
 * SDetail 单个详情项（完整类型）
 *
 * 包含 SDetailItemType 的所有字段 + 从原 antd DescriptionsItemType
 * 中显式继承的样式/类名相关字段
 */
export type SDetailItem = SDetailItemType & {
  /** 样式前缀 */
  prefixCls?: string;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** label 样式 */
  labelStyle?: CSSProperties;
  /** 内容区样式 */
  contentStyle?: CSSProperties;
};

/**
 * SDetail 详情展示组件 Props
 *
 * CSS Grid 自渲染，支持 7 种数据类型自动渲染。
 * 配合 SConfigProvider 可自动进行字典映射。
 *
 * @example
 * ```tsx
 * <SDetail
 *   title="用户详情"
 *   dataSource={userData}
 *   items={[
 *     { label: '姓名', name: 'name' },
 *     { label: '状态', name: 'status', type: 'dict', dictKey: 'userStatus' },
 *   ]}
 *   columns={2}
 * />
 * ```
 */
export interface SDetailProps {
  /** 描述文字 */
  desc?: ReactNode;
  /** 标题右侧操作区 */
  titleAction?: ReactNode;
  /** 数据源对象 */
  dataSource?: Record<string, any>;
  /** 详情项配置数组 */
  items?: SDetailItem[];
  /** 统一 label 样式 */
  labelStyle?: CSSProperties;
  /** 统一内容区样式 */
  contentStyle?: CSSProperties;
  /** 是否显示卡片背景 */
  hasCardBg?: boolean;
  /** 自定义容器组件 */
  container?: React.ComponentType<any>;
  /** 标题 */
  title?: string | ReactNode;
  /** 从 dataSource 中取值的 key 前缀，支持嵌套路径如 "user.profile" */
  detailName?: string;
  /** 组件样式 */
  style?: CSSProperties;
  /** 组件类名 */
  className?: string;

  // ========== Grid 布局相关 ==========

  /**
   * 列数或 grid-template-columns 值
   *
   * - `number`: 等分列数，如 `3` → `repeat(3, max-content 1fr)`
   * - `string`: 按空格拆分后每组前加 `max-content` label 轨道，如 `"300px 1fr"` → `"max-content 300px max-content 1fr"`
   *
   * @default 3
   */
  columns?: number | string;
  /**
   * 【已废弃】列数，请改用 `columns`
   *
   * 传入时内部映射为 `columns`，`columns` 优先级更高
   */
  column?: number;
  /** Grid 间距，对应 CSS `gap` 属性 @default 16 */
  gap?: number | string;
  /** label 列宽度，作用于每个 Grid item 内部的 label 子元素 @default 'auto' */
  labelWidth?: number | string;

  // ========== 布局/显示 ==========

  /**
   * 布局方式
   *
   * - `'horizontal'`: label 与 value 同行（默认）
   * - `'vertical'`: label 与 value 各占一行
   *
   * @default 'horizontal'
   */
  layout?: 'horizontal' | 'vertical';
  /** 是否在 label 后显示冒号 @default true */
  colon?: boolean;
  /** 全局空值占位文案 @default '-' */
  emptyText?: ReactNode;
  /** 加载中骨架屏 */
  loading?: boolean;
  /** 透传任意 data-* 属性（如 data-testid） */
  [key: `data-${string}`]: unknown;
  /** 透传任意 aria-* 属性 */
  [key: `aria-${string}`]: unknown;
}

/**
 * SDetail.Group 分组配置项
 */
export interface SDetailGroupItem {
  /** 分组标题 */
  groupTitle?: string | ReactNode;
  /** 分组标题 Props */
  groupTitleProps?: Omit<STitleProps, 'title'>;
  /** 分组容器组件 */
  groupContainer?: React.ComponentType<any>;
  /** 分组内的多个详情面板 */
  groupItems?: SDetailProps[];
  /** 分组内的详情项 */
  items?: SDetailItem[];
  /** 面板公共配置 */
  itemProps?: Omit<SDetailProps, 'items' | 'dataSource'>;
  /** 分组数据源 */
  dataSource?: Record<string, any>;
  /** 是否隐藏该分组 */
  hidden?: boolean;
}

/**
 * SDetail.Group 分组详情 Props
 *
 * 将详情按分组展示，每组可有独立标题和数据源。
 *
 * @example
 * ```tsx
 * <SDetail.Group
 *   dataSource={data}
 *   items={[
 *     { groupTitle: '基本信息', items: [...] },
 *     { groupTitle: '扩展信息', items: [...] },
 *   ]}
 * />
 * ```
 */
export interface SDetailGroupProps {
  /** 分组配置数组 */
  items?: SDetailGroupItem[];
  /** 全局数据源 */
  dataSource?: Record<string, any>;
}
