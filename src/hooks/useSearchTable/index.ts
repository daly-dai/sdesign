import { useRequest } from 'ahooks';
import { TablePaginationConfig } from 'antd';
import { isBoolean } from 'lodash';
import { useCallback, useEffect, useMemo } from 'react';

import { useSearchTableProps, useSearchTableReturnType } from './types';

function useSearchTable({
  requestFn,
  form,
  extraParams,
  manual = true,
  dispatchParams,
  serviceProps,
}: useSearchTableProps): useSearchTableReturnType {
  // 请求体
  const {
    run: getListData,
    data: resultData = {} as any,
    loading,
  } = useRequest(requestFn, {
    ...(serviceProps ?? {}),
    manual,
  });

  // 获取页面数据
  const getPageData = useCallback(
    (params = {}) => {
      const options = form?.getFieldsValue() ?? {};

      const paramsData = {
        pageNum: 1,
        pageSize: 10,
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
    [form, extraParams, dispatchParams, getListData],
  );

  // 重置数据
  const handleReset = useCallback(() => {
    form?.resetFields();
    getPageData();
  }, [form, getPageData]);

  // 初始化请求
  useEffect(() => {
    if (!isBoolean(serviceProps?.ready)) {
      getPageData();
      return;
    }

    if (serviceProps?.ready) {
      getPageData();
    }
  }, [serviceProps?.ready]);

  // 表格相关数据
  const dataSource = useMemo(() => {
    if (!resultData) return [];

    return resultData?.dataList ?? [];
  }, [resultData]);

  const handleTableChange = (pageNum: number, pageSize: number) => {
    getPageData({ pageNum, pageSize });
  };

  // 分页相关配置
  const pagination = useMemo<false | TablePaginationConfig>(() => {
    if (!resultData) return false;

    return {
      pageNum: resultData?.pageNum,
      pageSize: resultData?.pageSize,
      total: resultData?.totalSize,
      showSizeChanger: true,
      showQuickJumper: true,
      onChange: handleTableChange,
      hideOnSinglePage: true,
    };
  }, [resultData]);

  return {
    getPageData,
    dataSource,
    handleReset,
    pagination,
    loading,
  };
}

export default useSearchTable;
