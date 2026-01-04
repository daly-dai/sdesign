import { useAntdTable, useMemoizedFn } from 'ahooks';

import type { Data, Params, Service } from 'ahooks/es/useAntdTable/types';
import type { STableOptions, STableResult } from './types';

const useSTable = <TData extends Data, TParams extends Params>(
  service: Service<TData, TParams>,
  options: STableOptions<TData, TParams> = {},
): STableResult<TData, TParams> => {
  const {
    transformPaginationParams,
    transformRequestParams,
    transformResponseData,
    ...restOptions
  } = options;

  // 包装 service 函数，添加参数转换和数据转换
  const wrappedService: Service<TData, TParams> = async (...args: TParams) => {
    // 应用请求参数转换
    const transformedArgs = transformRequestParams
      ? transformRequestParams(args as any)
      : args;

    // 调用原始 service
    const response = await service(...transformedArgs);

    // 应用响应数据转换
    return transformResponseData ? transformResponseData(response) : response;
  };

  // 调用原始 useAntdTable
  const result = useAntdTable<TData, TParams>(wrappedService, restOptions);

  // 重写 onTableChange 方法，添加分页参数转换
  const onTableChange = useMemoizedFn(
    (pagination: any, filters: any, sorter: any, extra?: any) => {
      const [oldPaginationParams, ...restParams] = result.params || [];

      // 应用分页参数转换
      const transformedPagination = transformPaginationParams
        ? transformPaginationParams({
            ...oldPaginationParams,
            current: pagination.current,
            pageSize: pagination.pageSize,
            filters,
            sorter,
            extra,
          })
        : {
            ...oldPaginationParams,
            current: pagination.current,
            pageSize: pagination.pageSize,
            filters,
            sorter,
            extra,
          };

      (result.run as any)(transformedPagination, ...restParams);
    },
  );

  // 返回扩展后的结果，替换 tableProps 中的 onChange
  return {
    ...result,
    tableProps: {
      ...result.tableProps,
      onChange: onTableChange,
    },
  };
};

export default useSTable;
