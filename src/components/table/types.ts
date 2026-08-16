import { TableProps } from 'antd';
import type { ColumnType } from 'antd/es/table';

import { tuple } from '@dalydb/sdesign/utils';

const RenderTypes = tuple('datetime', 'date', 'ellipsis', 'index');

/**
 * 列 render 快捷类型
 *
 * 在 columns 的 render 中可直接传字符串：
 * - `'datetime'` — 渲染为日期时间格式
 * - `'date'` — 渲染为日期格式
 * - `'ellipsis'` — 超出省略显示
 * - `'index'` — 行索引序号
 */
export type RenderType = (typeof RenderTypes)[number];

/**
 * STable 列定义
 *
 * 继承 antd ColumnType（排除 render），扩展字典映射、快捷渲染和列分组能力。
 * 使用 interface 消除联合类型推断问题，确保 fixed/render 等属性字面量正确推断。
 */
export interface SColumn<RecordType = Record<string, unknown>>
  extends Omit<ColumnType<RecordType>, 'render'> {
  /** 字典映射 key，配合 SConfigProvider 的 globalDict 自动转换 */
  dictKey?: string;
  /**
   * 列渲染器
   *
   * 除标准 render 函数外，支持字符串快捷类型:
   * - `'datetime'` — 渲染为日期时间
   * - `'date'` — 渲染为日期
   * - `'ellipsis'` — 超出省略
   * - `'index'` — 行索引序号
   */
  render?: ColumnType<RecordType>['render'] | RenderType;
  /** 子列定义（列分组） */
  children?: SColumn<RecordType>[];
}

/** STable 列定义类型 */
export type SColumnsType<RecordType> = SColumn<RecordType>[];

/**
 * STable 增强表格 Props
 *
 * 继承 antd Table 全部属性，扩展了字典映射、序号列、快捷 render 等能力。
 *
 * @example
 * ```tsx
 * <STable
 *   columns={[
 *     { title: '姓名', dataIndex: 'name' },
 *     { title: '状态', dataIndex: 'status', dictKey: 'userStatus' },
 *     { title: '时间', dataIndex: 'createTime', render: 'datetime' },
 *   ]}
 *   dataSource={data}
 * />
 * ```
 */
export interface STableProps<RecordType = Record<string, unknown>>
  extends Omit<TableProps<RecordType>, 'columns'> {
  /** 列定义，支持 dictKey 和字符串 render */
  columns?: SColumnsType<RecordType>;
}
