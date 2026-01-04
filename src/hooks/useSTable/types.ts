import type {
  AntdTableOptions,
  AntdTableResult,
  Data,
  Params,
} from 'ahooks/es/useAntdTable/types';

export interface STableOptions<TData extends Data, TParams extends Params>
  extends AntdTableOptions<TData, TParams> {
  /**
   * 自定义分页参数转换函数
   */
  transformPaginationParams?: (pagination: any) => any;

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
