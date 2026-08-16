import type { Options } from 'ahooks/lib/useRequest/src/types';
import type { FormInstance, TablePaginationConfig } from 'antd';

/** 分页字段映射 */
export interface ProPaginationFields {
  current?: string;
  pageSize?: string;
  total?: string;
  list?: string;
}

/** useProTable 配置 */
export interface UseProTableOptions
  extends Omit<
    Options<any, any>,
    'manual' | 'ready' | 'refreshDeps' | 'defaultParams'
  > {
  /** 外部表单实例，不传则内部创建 */
  form?: FormInstance<any>;
  /**
   * 表单初始值，mount 时写入表单。
   * 适用场景：详情页返回时恢复上次的查询条件。
   * 注意：此值仅在 mount 时生效一次，不会跟随外部变化自动更新。
   */
  defaultParams?: Record<string, unknown>;
  /**
   * 是否准备好，默认 true。
   * false 时跳过初始化请求；变为 true 后自动触发搜索（仅首次）。
   * 常用于等待字典接口等依赖返回后再请求列表。
   */
  ready?: boolean;
  /** 是否手动触发首次请求，默认 false */
  manual?: boolean;
  /** 分页字段映射 */
  paginationFields?: ProPaginationFields;
  /**
   * 依赖刷新数组。当数组内任意值变化时，自动重置到第一页并刷新。
   * 适用场景：外部 tab / 筛选条件变化后自动更新列表。
   */
  refreshDeps?: any[];
  /** 额外请求参数，每次请求都会携带 */
  extraParams?: Record<string, unknown>;
  /** 请求前参数处理（合并 form + 分页 + extraParams 后） */
  dispatchParams?: (params: Record<string, unknown>) => Record<string, unknown>;
  /** 响应数据二次转换 */
  transformResponseData?: (
    data: Record<string, unknown>,
  ) => Record<string, unknown>;
}

/** useProTable 返回值 */
/**
 * 数据请求函数
 *
 * 默认 data / 返回值为 any，兼容任意查询参数形态和响应结构。
 * 需要类型安全时显式传入泛型：
 * ```ts
 * const service: ProService<MyQuery, PageResult<User>> = (data) => api.getList(data);
 * ```
 */
export type ProService<TParams = any, TResponse = any> = (
  data: TParams,
) => Promise<TResponse>;

/** 从分页响应中提取列表项类型（默认 list 字段；自定义 list 字段名时回退 any[]） */
export type ProListItems<TResponse> = TResponse extends {
  list?: (infer L)[];
}
  ? L[]
  : any[];

/** useProTable 返回值 */
export interface UseProTableReturn<TResponse = any> {
  /** 表格 props：聚合 dataSource、pagination、loading */
  tableProps: {
    dataSource: ProListItems<TResponse>;
    pagination: TablePaginationConfig | false;
    loading: boolean;
  };
  /** 搜索（重新查询，回第一页，携带表单值） */
  search: () => void;
  /** 重置搜索并刷新 */
  reset: () => void;
  /** 表单实例 */
  form: FormInstance<any>;
  /** 直接修改数据，不触发请求。传 undefined 清空 */
  mutate: (data?: TResponse) => void;
}
