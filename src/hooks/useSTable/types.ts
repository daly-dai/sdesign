import type {
  AntdTableOptions,
  AntdTableResult,
  Data,
  Params,
} from 'ahooks/es/useAntdTable/types';

export interface STableOptions<TData extends Data, TParams extends Params>
  extends AntdTableOptions<TData, TParams> {
  /**
   * 分页参数字段映射，默认为 { current: 'current', pageSize: 'pageSize' }
   */
  paginationFields?: {
    current?: string;
    pageSize?: string;
    total?: string;
  };

  /**
   * 对所有请求参数进行二次处理
   */
  transformRequestParams?: (params: TParams) => TParams;

  /**
   * 对返回数据进行二次处理
   */
  transformResponseData?: (data: TData) => TData;
}

export type STableResult<
  TData extends Data,
  TParams extends Params,
> = AntdTableResult<TData, TParams>;
