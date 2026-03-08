import { DescriptionsProps } from 'antd';
import { DescriptionsItemType } from 'antd/es/descriptions';
import React, { ReactNode } from 'react';

import { FileListProps, STitleProps } from '@dalydb/sdesign';
import { tuple } from '@dalydb/sdesign/utils/types';

const ItemTypes = tuple(
  'text',
  'empty',
  'file',
  'dict',
  'img',
  'rangeTime',
  'checkbox',
  'placeholder',
);

/**
 * 详情项渲染类型
 *
 * - `'text'` — 纯文本
 * - `'dict'` — 字典映射，自动从 globalDict 转换
 * - `'file'` — 文件列表展示
 * - `'img'` — 图片展示
 * - `'rangeTime'` — 时间范围
 * - `'checkbox'` — 多选值展示
 * - `'empty'` — 空占位
 * - `'placeholder'` — 占位符
 */
export type ItemType = (typeof ItemTypes)[number];

export interface DictReflect {
  label?: string;
  name?: string;
}

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
  /** 数据源中的字段名，支持嵌套 ['a', 'b'] */
  name?: string | string[];
  /** 自定义渲染 */
  render?: (value?: any, dataSource?: any) => ReactNode;
  /** 栅格占位 */
  span?: number;
  /** 是否隐藏 */
  hidden?: boolean;
};

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
  render?: (value?: any, dataSource?: any) => ReactNode;
  dataSource?: Record<string, any>;
};

export type SDetailItem = SDetailItemType &
  Omit<DescriptionsItemType, 'children' | 'key'>;

/**
 * SDetail 详情展示组件 Props
 *
 * 基于 antd Descriptions 封装，支持 8 种数据类型自动渲染。
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
 *   column={2}
 * />
 * ```
 */
export interface SDetailProps
  extends Omit<DescriptionsProps, 'items' | 'title'> {
  /** 描述文字 */
  desc?: ReactNode;
  /** 标题右侧操作区 */
  titleAction?: ReactNode;
  /** 数据源对象 */
  dataSource?: Record<string, any>;
  /** 详情项配置数组 */
  items?: SDetailItem[];
  labelStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  /** 是否显示卡片背景 */
  hasCardBg?: boolean;
  /** 自定义容器组件 */
  container?: React.ComponentType<any>;
  /** 标题 */
  title?: string | ReactNode;
  /** 从 dataSource 中取值的 key 前缀 */
  detailName?: string;
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
