import { useRequest } from 'ahooks';
import { Form, TablePaginationConfig, TableProps } from 'antd';
import { useCallback, useEffect, useMemo, useRef } from 'react';

import { useSearchTableOptions, useSearchTableReturnType } from './types';

// 默认分页字段配置
const defaultPaginationFields = {
  current: 'pageNum',
  pageSize: 'pageSize',
  total: 'totalSize',
  list: 'dataList',
};

function useSearchTable(
  requestFn: (data?: any) => Promise<any>,
  options: useSearchTableOptions = {},
): useSearchTableReturnType {
  const {
    form: externalForm,
    extraParams,
    manual = false, // 默认自动请求
    dispatchParams,
    serviceProps,
    paginationFields,
    transformRequestParams,
    transformResponseData,
  } = options;

  // 如果没有传入外部 form，自动创建一个
  const [internalForm] = Form.useForm();
  const form = externalForm || internalForm;

  // 合并分页字段配置
  const mergedPaginationFields = useMemo(
    () => ({
      ...defaultPaginationFields,
      ...paginationFields,
    }),
    [paginationFields],
  );

  // 使用 useRef 来跟踪是否是首次加载
  const isFirstLoad = useRef(true);

  // 包装请求函数，添加参数转换和数据转换
  const wrappedRequestFn = useCallback(
    async (params: any) => {
      let requestParams = params;

      // 请求参数转换
      if (transformRequestParams) {
        requestParams = transformRequestParams(params);
      }

      // 调用原始请求函数
      const response = await requestFn(requestParams);

      let processedResponse = response;

      // 响应数据转换
      if (transformResponseData) {
        processedResponse = transformResponseData(response);
      }

      return processedResponse;
    },
    [requestFn, transformRequestParams, transformResponseData],
  );

  // 请求体
  const {
    run: getListData,
    data: resultData = {} as any,
    loading,
    error,
    ...rest
  } = useRequest(wrappedRequestFn, {
    ...(serviceProps ?? {}),
    manual,
  });

  // 获取页面数据
  const getPageData = useCallback(
    (params: any = {}) => {
      const options = form?.getFieldsValue() ?? {};

      // 验证参数，确保分页参数是有效的数字
      const pageNum = Number(params[mergedPaginationFields.current] ?? 1);
      const pageSize = Number(params[mergedPaginationFields.pageSize] ?? 10);

      const paramsData: Record<string, any> = {
        [mergedPaginationFields.current]:
          isNaN(pageNum) || pageNum < 1 ? 1 : pageNum,
        [mergedPaginationFields.pageSize]:
          isNaN(pageSize) || pageSize < 1 ? 10 : pageSize,
        ...(extraParams || {}),
        ...options,
        ...params,
      };

      let requestParams = paramsData;

      if (typeof dispatchParams === 'function') {
        requestParams = dispatchParams?.(paramsData);
      }

      getListData(requestParams);
    },
    [form, extraParams, dispatchParams, getListData, mergedPaginationFields],
  );

  // 重置数据
  const handleReset = useCallback(() => {
    form?.resetFields();
    getPageData();
  }, [form, getPageData]);

  // 初始化请求 - 当组件挂载时自动加载数据
  useEffect(() => {
    if (!manual) {
      // 延迟一点执行，确保 form 初始化完成
      const timer = setTimeout(() => {
        getPageData();
        isFirstLoad.current = false;
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [manual, getPageData]);

  // 表格相关数据
  const dataSource = useMemo(() => {
    if (!resultData) return [];

    return resultData?.[mergedPaginationFields.list] ?? [];
  }, [resultData, mergedPaginationFields.list]);

  const handleTableChange = useCallback(
    (pageNum: number, pageSize: number) => {
      getPageData({
        [mergedPaginationFields.current]: pageNum,
        [mergedPaginationFields.pageSize]: pageSize,
      });
    },
    [getPageData, mergedPaginationFields],
  );

  // 分页相关配置
  const pagination = useMemo<false | TablePaginationConfig>(() => {
    if (!resultData) return false;

    return {
      current: resultData?.[mergedPaginationFields.current],
      pageSize: resultData?.[mergedPaginationFields.pageSize],
      total: resultData?.[mergedPaginationFields.total],
      showSizeChanger: true,
      showQuickJumper: true,
      onChange: handleTableChange,
      hideOnSinglePage: true,
    };
  }, [resultData, mergedPaginationFields, handleTableChange]);

  // 整合的 tableProps，便于直接用于 Ant Design Table 组件
  const tableProps = useMemo<TableProps<any>>(() => {
    return {
      dataSource,
      pagination,
      loading,
    };
  }, [dataSource, pagination, loading]);

  // 专门为 SForm.Search 设计的配置对象
  const formConfig = useMemo(() => {
    return {
      onFinish: getPageData,
      onReset: handleReset,
    };
  }, [getPageData, handleReset]);

  return {
    getPageData,
    dataSource,
    handleReset,
    pagination,
    loading,
    error, // 返回错误信息
    tableProps, // 新增：整合的 table props
    form, // 返回 form 实例供外部使用
    formConfig, // 新增：专门为 SForm.Search 设计的配置
    ...rest,
  };
}

export default useSearchTable;
