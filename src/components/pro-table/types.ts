import type { FormInstance } from 'antd';
import type { TableRowSelection } from 'antd/es/table/interface';
import type React from 'react';

import type {
  ProService,
  UseProTableOptions,
} from '@dalydb/sdesign/hooks/useProTable/types';
import type { SFormItems } from '../form/types';
import type { SColumnsType } from '../table/types';

/**
 * SProTable Ref 方法
 */
export interface SProTableRef {
  /** 刷新当前页 */
  refresh: () => void;
  /** 重置搜索条件并刷新 */
  reset: () => void;
}

/** 请求配置，service + options 收拢到一处 */
export interface RequestConfig {
  /** 数据请求函数（必填） */
  service: ProService;
  /** useProTable 请求配置 */
  options?: Omit<UseProTableOptions, 'form'>;
}

/**
 * SProTable Props
 *
 * @example
 * ```tsx
 * <SProTable<User>
 *   request={{ service: userApi.getListByGet, options: { paginationFields: { current: 'pageNum' } } }}
 *   searchItems={searchItems}
 *   columns={columns}
 *   rowKey="id"
 *   title="用户管理"
 *   ref={tableRef}
 * />
 * ```
 */
export interface SProTableProps<RecordType = Record<string, unknown>> {
  // ========== 核心 ==========
  /** 请求配置 */
  request: RequestConfig;
  /** 搜索项配置 */
  searchItems?: SFormItems[];
  /** 表格列配置 */
  columns?: SColumnsType<RecordType>;
  /** 行 key */
  rowKey?: string | ((record: RecordType) => string);

  // ========== 展示 ==========
  /**
   * 页面标题栏
   * - 传字符串 / ReactNode：只显示标题
   * - 传对象 `{ children, actionNode }`：标题（左）+ 操作按钮（右）
   */
  title?:
    | React.ReactNode
    | { children?: React.ReactNode; actionNode?: React.ReactNode };
  /**
   * 表格标题栏
   * - `children`: 标题文字（左侧）
   * - `actionNode`: 操作按钮（右侧）
   */
  tableTitle?: {
    children?: React.ReactNode;
    actionNode?: React.ReactNode;
  };
  /** 搜索栏右侧自定义操作节点 */
  searchActions?: React.ReactNode;
  /** 搜索栏列数，默认 3 */
  searchColumns?: number;

  // ========== 配置 ==========
  /**
   * 外部传入的表单实例，用于跨组件共享表单状态。
   * 不传则由 SProTable 内部自动创建。
   */
  form?: FormInstance<any>;

  // ========== 表格功能 ==========
  /** 行选择，透传给 antd Table */
  rowSelection?: TableRowSelection<RecordType>;

  // ========== 样式 ==========
  style?: React.CSSProperties;
  className?: string;
}
