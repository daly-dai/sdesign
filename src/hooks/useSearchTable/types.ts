import { Options } from 'ahooks/lib/useRequest/src/types';
import { FormInstance, TablePaginationConfig, TableProps } from 'antd';

export interface PaginationFields {
  /**
   * 当前页码字段名，默认为 'pageNum'
   */
  current?: string;
  /**
   * 每页条数字段名，默认为 'pageSize'
   */
  pageSize?: string;
  /**
   * 总条数字段名，默认为 'totalSize'
   */
  total?: string;
  /**
   * 数据列表字段名，默认为 'dataList'
   */
  list?: string;
}

export interface useSearchTableOptions {
  form?: FormInstance<any>;
  extraParams?: Record<string, any>;
  manual?: boolean;
  dispatchParams?: (params?: any) => any;
  serviceProps?: Options<any, any>;
  /**
   * 分页参数字段映射配置
   */
  paginationFields?: PaginationFields;
  /**
   * 请求参数转换函数
   */
  transformRequestParams?: (params: any) => any;
  /**
   * 响应数据转换函数
   */
  transformResponseData?: (data: any) => any;
}

export interface useSearchTableProps extends useSearchTableOptions {
  requestFn: (data?: any) => Promise<any>;
}

export interface useSearchTableReturnType {
  getPageData: (params?: any) => void;
  handleReset: () => void;
  /**
   * 直接用于 Ant Design Table 组件的 props
   * 包含 dataSource、pagination、loading 等属性
   */
  tableProps: TableProps<any>;
  // 为了向后兼容，仍然保留单独的属性
  dataSource: any[];
  pagination?: false | TablePaginationConfig;
  loading?: boolean;
  error?: any; // 错误信息
  /**
   * 表单实例，用于外部组件挂载
   */
  form: FormInstance<any>;
  /**
   * 专门为 SForm.Search 设计的配置对象
   * 包含 onFinish 和 onReset 方法
   */
  formConfig: {
    onFinish: (params?: any) => void;
    onReset: () => void;
  };
}
