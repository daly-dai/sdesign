import { useAntdTable, useMemoizedFn } from 'ahooks';

import type { Data, Params, Service } from 'ahooks/es/useAntdTable/types';
import type { STableOptions, STableResult } from './types';

// 默认分页字段映射
const defaultPaginationFields = {
  current: 'current',
  pageSize: 'pageSize',
  total: 'total',
};

const useSTable = <TData extends Data, TParams extends Params>(
  service: Service<TData, TParams>,
  options: STableOptions<TData, TParams> = {},
): STableResult<TData, TParams> => {
  const {
    paginationFields,
    transformRequestParams,
    transformResponseData,
    ...restOptions
  } = options;

  // 合并分页字段配置
  const mergedPaginationFields = {
    ...defaultPaginationFields,
    ...paginationFields,
  };

  // 包装 service 函数，添加参数转换和数据转换
  const wrappedService: Service<TData, TParams> = async (...args: TParams) => {
    let transformedArgs = args;

    // 仅在转换函数存在时才执行转换
    if (transformRequestParams) {
      transformedArgs = transformRequestParams(args);
    }

    // 调用原始 service
    const response = await service(...transformedArgs);

    let processedResponse = response;

    // 仅在转换函数存在时才执行转换
    if (transformResponseData) {
      processedResponse = transformResponseData(response);
    }

    // 如果有分页字段映射且响应数据包含分页信息，进行字段映射
    if (
      paginationFields &&
      processedResponse &&
      processedResponse.list &&
      processedResponse.total !== undefined
    ) {
      // 根据paginationFields配置重新映射分页字段
      const {
        current: currentField,
        pageSize: pageSizeField,
        total: totalField,
      } = mergedPaginationFields;

      // 如果默认字段名和配置字段名不同，进行重映射
      if (
        currentField !== 'current' ||
        pageSizeField !== 'pageSize' ||
        totalField !== 'total'
      ) {
        const newResponse: any = { ...processedResponse };

        // 重映射字段
        if (totalField && totalField !== 'total') {
          newResponse[totalField] = newResponse.total;
          delete newResponse.total;
        }

        return newResponse;
      }
    }

    return processedResponse;
  };

  // 调用原始 useAntdTable
  const result = useAntdTable<TData, TParams>(wrappedService, restOptions);

  // 重写 onTableChange 方法，添加分页参数转换
  const onTableChange = useMemoizedFn(
    (pagination: any, filters: any, sorter: any, extra?: any) => {
      // 安全地处理参数数组
      const params = result.params || [];

      if (params.length === 0) {
        // 如果没有参数，直接调用 run 方法
        if (result.run) {
          (result.run as any)({
            [mergedPaginationFields.current]: pagination?.current,
            [mergedPaginationFields.pageSize]: pagination?.pageSize,
            filters,
            sorter,
            extra,
          });
        }
        return;
      }

      const [oldPaginationParams, ...restParams] = params;

      // 确保 oldPaginationParams 是对象类型
      const basePagination =
        oldPaginationParams && typeof oldPaginationParams === 'object'
          ? oldPaginationParams
          : {};

      // 应用分页参数转换
      const transformedPagination = {
        ...basePagination,
        [mergedPaginationFields.current]: pagination?.current,
        [mergedPaginationFields.pageSize]: pagination?.pageSize,
        filters,
        sorter,
        extra,
      };

      // 确保 result.run 存在后再调用
      if (result.run) {
        (result.run as any)(transformedPagination, ...restParams);
      }
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
