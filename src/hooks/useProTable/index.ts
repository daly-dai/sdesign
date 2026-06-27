import { useRequest, useUpdateEffect } from 'ahooks';
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
    defaultParams,
    ready = true,
    manual = false,
    paginationFields,
    refreshDeps = [],
    extraParams,
    dispatchParams,
    transformResponseData,
    ...serviceProps
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
      if (dispatchParamsRef.current) p = dispatchParamsRef.current(p);
      const res = await requestFn(p as TParams);
      if (transformResponseData)
        return transformResponseData(res as Record<string, unknown>);
      return res;
    },
    { ...serviceProps, manual: true },
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
        run(params);
      },
    };
  }, [raw, pf, form, run]);

  // ---- 初始化（仅一次）----
  const hasAutoRunRef = useRef(false);

  useEffect(() => {
    // 写入表单初始值（优先于自动搜索，避免 antd initialValues 被 form 实例忽略）
    if (defaultParams && form) {
      form.setFieldsValue(defaultParams);
    }

    if (!manual && ready) {
      hasAutoRunRef.current = true;
      const t = setTimeout(() => searchRef.current(), 0);
      return () => clearTimeout(t);
    }
  }, []);

  // ---- ready 响应式：false → true 时自动搜（仅首次）----
  useUpdateEffect(() => {
    if (!manual && ready && !hasAutoRunRef.current) {
      hasAutoRunRef.current = true;
      // 恢复 defaultParams（如果 mount 时 ready 为 false，此时才写入）
      if (defaultParams && form) {
        form.setFieldsValue(defaultParams);
      }
      searchRef.current();
    }
  }, [ready, manual]);

  // ---- refreshDeps 响应式：依赖变化时重置到第一页 -------
  useUpdateEffect(() => {
    if (!ready) return;
    hasAutoRunRef.current = true;
    searchRef.current();
  }, [...refreshDeps]);

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
