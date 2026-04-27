import { Options } from 'ahooks/lib/useRequest/src/types';
import { FormInstance, TablePaginationConfig, TableProps } from 'antd';

/**
 * 分页字段映射配置
 *
 * 用于适配后端接口的分页字段名，默认值对应常见的后端接口规范。
 */
export interface PaginationFields {
  /**
   * 当前页码字段名
   * @default 'pageIndex'
   */
  current?: string;
  /**
   * 每页条数字段名
   * @default 'pageSize'
   */
  pageSize?: string;
  /**
   * 总条数字段名
   * @default 'total'
   */
  total?: string;
  /**
   * 数据列表字段名
   * @default 'list'
   */
  list?: string;
}

/**
 * useSearchTable Hook 配置选项
 *
 * @example
 * ```tsx
 * const { tableProps, formConfig, form } = useSearchTable(
 *   (params) => api.getList(params),
 *   {
 *     manual: false,
 *     paginationFields: { list: 'records', total: 'total' },
 *     extraParams: { orgId: '123' },
 *   }
 * );
 * ```
 */
export interface useSearchTableOptions {
  /** 外部传入的表单实例 */
  form?: FormInstance<any>;
  /** 额外请求参数，每次请求都会携带 */
  extraParams?: Record<string, any>;
  /**
   * 是否手动触发首次请求
   * @default false
   */
  manual?: boolean;
  /** 请求前参数处理 */
  dispatchParams?: (params?: any) => any;
  /** ahooks useRequest 配置 */
  serviceProps?: Options<any, any>;
  /** 分页字段映射 */
  paginationFields?: PaginationFields;
  /** 请求参数转换函数 */
  transformRequestParams?: (params: any) => any;
  /** 响应数据转换函数 */
  transformResponseData?: (data: any) => any;
}

export interface useSearchTableProps extends useSearchTableOptions {
  /** 数据请求函数 */
  requestFn: (data?: any) => Promise<any>;
}

/**
 * useSearchTable 返回值
 *
 * @example
 * ```tsx
 * const { tableProps, formConfig, form } = useSearchTable(requestFn, options);
 *
 * // 搜索表单
 * <SForm.Search form={form} items={searchItems} {...formConfig} />
 *
 * // 数据表格
 * <STable {...tableProps} columns={columns} />
 * ```
 */
export interface useSearchTableReturnType {
  /** 手动触发数据加载 */
  getPageData: (params?: any) => void;
  /** 重置搜索并刷新 */
  handleReset: () => void;
  /**
   * 直接传给 STable/antd Table 的 props
   * 包含 dataSource、pagination、loading
   */
  tableProps: TableProps<any>;
  /** 表格数据 */
  dataSource: any[];
  /** 分页配置 */
  pagination?: false | TablePaginationConfig;
  /** 加载状态 */
  loading?: boolean;
  /** 错误信息 */
  error?: any;
  /** 表单实例 */
  form: FormInstance<any>;
  /**
   * 搜索表单配置，直接展开传给 SForm.Search
   * 包含 onFinish 和 onReset
   */
  formConfig: {
    onFinish: (params?: any) => void;
    onReset: () => void;
  };
}
