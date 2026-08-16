import { useRequest, useUpdateEffect } from 'ahooks';
import { Form, type TablePaginationConfig } from 'antd';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type {
  ProListItems,
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

function useProTable<TParams = any, TResponse = any>(
  requestFn: ProService<TParams, TResponse>,
  options: UseProTableOptions = {},
): UseProTableReturn<TResponse> {
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

  // 当前 pageSize 状态：search 保持用户上次选择的 pageSize，而非硬编码重置回 10
  const [pageSize, setPageSize] = useState(10);

  // ---- 请求 ----
  const { run, mutate, data, loading } = useRequest(
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

  // 解构默认值 `= {}` 只对 undefined 生效；接口返回 null / mutate(null) 时
  // data 为 null，统一兜底避免后续 raw[pf.list] 抛 TypeError
  const raw = (data ?? {}) as Record<string, unknown>;

  // ---- 搜索 ----
  const search = useCallback(() => {
    const formVals = form.getFieldsValue() ?? {};
    let params: Record<string, unknown> = {
      [pf.current]: 1,
      [pf.pageSize]: pageSize,
      ...extraParamsRef.current,
      ...formVals,
    };
    run(params);
  }, [form, pf, pageSize, run]);

  searchRef.current = search;

  const reset = useCallback(() => {
    form.resetFields();
    search();
  }, [form, search]);

  // ---- 分页回调（提取为 useCallback 避免 pagination 内联函数导致级联重渲染）----
  const handlePageChange = useCallback(
    (pageNum: number, pageSizeVal: number) => {
      const formVals = form.getFieldsValue() ?? {};
      setPageSize(pageSizeVal);
      let params: Record<string, unknown> = {
        [pf.current]: pageNum,
        [pf.pageSize]: pageSizeVal,
        ...extraParamsRef.current,
        ...formVals,
      };
      run(params);
    },
    [form, pf, run],
  );

  // ---- 分页配置 ----
  const pagination = useMemo<TablePaginationConfig | false>(() => {
    if (!raw || Object.keys(raw).length === 0) return false;
    return {
      showTotal: (total: number) => `共 ${total} 条`,
      current: raw[pf.current] as number,
      pageSize: raw[pf.pageSize] as number,
      total: raw[pf.total] as number,
      showSizeChanger: true,
      pageSizeOptions: [10, 15, 20, 50, 100],
      onChange: handlePageChange,
    };
  }, [raw, pf, handlePageChange]);

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
    if (!ready || manual) return;
    hasAutoRunRef.current = true;
    searchRef.current();
  }, [...refreshDeps]);

  // ---- 聚合 ----
  const tableProps = useMemo(
    () => ({
      dataSource: ((raw[pf.list] as any[]) ??
        []) as unknown as ProListItems<TResponse>,
      pagination,
      loading,
    }),
    [raw, pf.list, pagination, loading],
  );

  return { tableProps, search, reset, form, mutate };
}

export default useProTable;
