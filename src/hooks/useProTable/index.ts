import { useRequest } from 'ahooks';
import { Form, type TablePaginationConfig } from 'antd';
import { useCallback, useEffect, useMemo, useRef } from 'react';

import type {
  ProService,
  UseProTableOptions,
  UseProTableReturn,
} from './types';

const DEFAULTS = {
  current: 'pageIndex',
  pageSize: 'pageSize',
  total: 'total',
  list: 'list',
};

function useProTable<TParams = any>(
  requestFn: ProService<TParams>,
  options: UseProTableOptions = {},
): UseProTableReturn {
  const {
    form: externalForm,
    ready = true,
    manual = false,
    paginationFields,
    extraParams,
    dispatchParams,
    transformRequestParams,
    transformResponseData,
    serviceProps,
  } = options;

  const searchRef = useRef<() => void>(() => {});

  // Store latest values in refs — these are consumed at call-time (inside
  // search / pagination.onChange), so including them as useCallback/useMemo
  // dependencies only causes unnecessary re-creation for no behavioral gain.
  const extraParamsRef = useRef(extraParams);
  extraParamsRef.current = extraParams;
  const dispatchParamsRef = useRef(dispatchParams);
  dispatchParamsRef.current = dispatchParams;

  const [internalForm] = Form.useForm();
  const form = externalForm || internalForm;

  const pf = useMemo(
    () => ({ ...DEFAULTS, ...paginationFields }),
    [paginationFields],
  );

  // ---- 请求 ----
  const {
    run,
    mutate,
    data: raw = {} as Record<string, unknown>,
    loading,
  } = useRequest(
    async (params: Record<string, unknown>) => {
      let p = params;
      if (transformRequestParams) p = transformRequestParams(p);
      const res = await requestFn(p as TParams);
      if (transformResponseData)
        return transformResponseData(res as Record<string, unknown>);
      return res;
    },
    { ...(serviceProps ?? {}), manual: true },
  );

  // ---- 搜索 ----
  const search = useCallback(() => {
    const formVals = form.getFieldsValue() ?? {};
    let params: Record<string, unknown> = {
      [pf.current]: 1,
      [pf.pageSize]: 10,
      ...extraParamsRef.current,
      ...formVals,
    };
    if (dispatchParamsRef.current) params = dispatchParamsRef.current(params);
    run(params);
  }, [form, pf, run]);

  searchRef.current = search;

  const reset = useCallback(() => {
    form.resetFields();
    search();
  }, [form, search]);

  // ---- 分页 ----
  const pagination = useMemo<TablePaginationConfig | false>(() => {
    if (!raw || Object.keys(raw).length === 0) return false;
    return {
      showTotal: (total: number) => `共 ${total} 条`,
      current: raw[pf.current] as number,
      pageSize: raw[pf.pageSize] as number,
      total: raw[pf.total] as number,
      showSizeChanger: true,
      pageSizeOptions: [10, 15, 20, 50, 100],
      onChange: (pageNum: number, pageSize: number) => {
        const formVals = form.getFieldsValue() ?? {};
        let params: Record<string, unknown> = {
          [pf.current]: pageNum,
          [pf.pageSize]: pageSize,
          ...extraParamsRef.current,
          ...formVals,
        };
        if (dispatchParamsRef.current)
          params = dispatchParamsRef.current(params);
        run(params);
      },
    };
  }, [raw, pf, form, run]);

  // ---- 初始化（仅一次）----
  useEffect(() => {
    if (!manual && ready) {
      const t = setTimeout(() => searchRef.current(), 0);
      return () => clearTimeout(t);
    }
  }, []);

  // ---- 聚合 ----
  const tableProps = useMemo(
    () => ({
      dataSource: (raw[pf.list] as any[]) ?? [],
      pagination,
      loading,
    }),
    [raw, pf.list, pagination, loading],
  );

  return { tableProps, search, reset, form, mutate };
}

export default useProTable;
