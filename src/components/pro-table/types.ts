import type { FormInstance } from 'antd';
import type React from 'react';

import type {
  ProService,
  UseProTableOptions,
} from '@dalydb/sdesign/hooks/useProTable/types';
import type { SearchProps } from '../form/types';
import type { STableProps } from '../table/types';

/**
 * SProTable Ref 方法
 */
export interface SProTableRef {
  /** 刷新当前页（携带当前表单值） */
  refresh: () => void;
  /** 重置搜索条件并刷新 */
  reset: () => void;
  /** 获取内部表单实例 */
  getForm: () => FormInstance<any>;
  /** 清空表格数据（不触发请求） */
  clearData: () => void;
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
 *   searchProps={{ items: searchItems, columns: 3 }}
 *   tableProps={{ columns, rowKey: 'id', pagination: { showQuickJumper: false } }}
 *   title="用户管理"
 *   ref={tableRef}
 * />
 * ```
 */
export interface SProTableProps<RecordType = Record<string, unknown>> {
  // ========== 核心 ==========
  /** 请求配置 */
  request: RequestConfig;

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
  // ========== 搜索 ==========
  /**
   * 透传 SForm.Search 全部属性。
   * form / onFinish / onReset：传了用外部，不传走内置默认。
   */
  searchProps?: SearchProps;

  // ========== 表格 ==========
  /**
   * 透传 STable 全部属性。不传走 hook 内置，传了覆盖内置。
   * pagination 做 deep-merge：current/pageSize/total/onChange 也参与合并。
   */
  tableProps?: STableProps<RecordType>;

  // ========== 样式 ==========
  style?: React.CSSProperties;
  className?: string;
}
