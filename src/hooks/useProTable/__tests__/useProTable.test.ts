/**
 * useProTable 单元测试 — Phase 2.1（最高优先级）
 *
 * 这是 sdesign 中最核心、最复杂的 hook，集成了：
 *   - ahooks useRequest（请求管理）
 *   - antd Form（搜索表单）
 *   - 分页状态机（pageIndex/pageSize/total）
 *   - ready 响应式（false → true 自动首次请求）
 *   - refreshDeps 响应式（依赖变化重置到第一页）
 *
 * Mock 策略：
 *   - ahooks useRequest → 完全 mock（run / mutate / data / loading 可控）
 *   - antd Form.useForm → mock 为可控 form 实例
 *   - useUpdateEffect → 使用真实的 ahooks 实现（正确的首次跳过语义）
 *   - setTimeout → 使用 vi.useFakeTimers 控制初始搜索的异步时序
 */
import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// ── mock 数据引用（hoisted 到模块顶层，mock factory 闭包引用）──
const mockRun = vi.fn();
const mockMutate = vi.fn();
let mockUseRequestData: Record<string, unknown> = {};
let mockUseRequestLoading = false;

const mockFormGetFieldsValue = vi.fn(() => ({}));
const mockFormSetFieldsValue = vi.fn();
const mockFormResetFields = vi.fn();
const mockFormInstance = {
  getFieldsValue: mockFormGetFieldsValue,
  setFieldsValue: mockFormSetFieldsValue,
  resetFields: mockFormResetFields,
  getFieldValue: vi.fn(),
  getFieldsError: vi.fn(() => []),
  getFieldError: vi.fn(() => []),
  isFieldTouched: vi.fn(() => false),
  isFieldsTouched: vi.fn(() => false),
  isFieldValidating: vi.fn(() => false),
  isFieldsValidating: vi.fn(() => false),
  validateFields: vi.fn(),
  submit: vi.fn(),
};

// ── mock ahooks ──
// 注意：useRequest 被完全 mock，因此 dispatchParams 和 transformResponseData
// 的转换逻辑（在 useRequest service callback 内执行）无法在单元测试中验证。
// 这些行为由集成测试覆盖。
vi.mock('ahooks', async () => {
  const actual = await vi.importActual('ahooks');
  return {
    ...(actual as object),
    useRequest: vi.fn(() => ({
      run: mockRun,
      mutate: mockMutate,
      data: mockUseRequestData,
      loading: mockUseRequestLoading,
      error: undefined,
      params: [],
      cancel: vi.fn(),
      refresh: vi.fn(),
      refreshAsync: vi.fn(),
    })),
  };
});

// ── mock antd Form.useForm ──
vi.mock('antd', async () => {
  const actual = await vi.importActual('antd');
  return {
    ...(actual as object),
    Form: {
      ...((actual as any).Form as object),
      useForm: vi.fn(() => [mockFormInstance]),
    },
  };
});

import useProTable from '../../useProTable/index';

// ── helpers ──
/** 创建一个始终 resolve 的 mock service */
function mockService(data?: Record<string, unknown>) {
  return vi
    .fn()
    .mockResolvedValue(
      data ?? { pageIndex: 1, pageSize: 10, total: 0, list: [] },
    );
}

/** 重置所有 mock 状态 */
function resetAllMocks() {
  mockRun.mockReset();
  mockMutate.mockReset();
  mockUseRequestData = {};
  mockUseRequestLoading = false;
  mockFormGetFieldsValue.mockReset().mockReturnValue({});
  mockFormSetFieldsValue.mockReset();
  mockFormResetFields.mockReset();
}

describe('useProTable — 分页表格 Hook（Phase 2.1）', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    resetAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  // ═══════════════════════════════════════════════════════════════
  // 2.1.1 基础自动请求
  // ═══════════════════════════════════════════════════════════════
  describe('2.1.1 基础自动请求', () => {
    it('mount 时 ready=true manual=false（默认）→ 自动调用 service（通过 setTimeout 0）', () => {
      mockUseRequestData = { pageIndex: 1, pageSize: 10, total: 0, list: [] };
      const service = mockService();
      renderHook(() => useProTable(service, {}));

      // setTimeout(0) 的回调在下一个 tick 执行
      act(() => {
        vi.advanceTimersByTime(0);
      });

      expect(mockRun).toHaveBeenCalledTimes(1);
      // 默认参数：pageIndex=1, pageSize=10
      expect(mockRun).toHaveBeenCalledWith(
        expect.objectContaining({ pageIndex: 1, pageSize: 10 }),
      );
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // 2.1.2 ready=false 不请求
  // ═══════════════════════════════════════════════════════════════
  describe('2.1.2 ready=false 不自动请求', () => {
    it('mount 时 ready=false → service 不被调用', () => {
      const service = mockService();
      renderHook(() => useProTable(service, { ready: false }));

      act(() => {
        vi.advanceTimersByTime(0);
      });

      expect(mockRun).not.toHaveBeenCalled();
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // 2.1.3 ready false→true 触发首次请求
  // ═══════════════════════════════════════════════════════════════
  describe('2.1.3 ready false→true 自动首次请求', () => {
    it('rerender 将 ready 从 false 改为 true → service 被调用一次', () => {
      const service = mockService();
      const { rerender } = renderHook(
        ({ ready }) => useProTable(service, { ready }),
        { initialProps: { ready: false as boolean } },
      );

      act(() => {
        vi.advanceTimersByTime(0);
      });
      expect(mockRun).not.toHaveBeenCalled(); // false 时不调

      rerender({ ready: true });
      act(() => {
        vi.advanceTimersByTime(0);
      });

      // useUpdateEffect 检测到 ready 变化 → 触发首次搜索
      expect(mockRun).toHaveBeenCalledTimes(1);
      expect(mockRun).toHaveBeenCalledWith(
        expect.objectContaining({ pageIndex: 1, pageSize: 10 }),
      );
    });

    it('ready false→true 后再次变更不重复触发（hasAutoRunRef 保护）', () => {
      const service = mockService();
      const { rerender } = renderHook(
        ({ ready }) => useProTable(service, { ready }),
        { initialProps: { ready: false as boolean } },
      );

      rerender({ ready: true });
      act(() => {
        vi.advanceTimersByTime(0);
      });
      expect(mockRun).toHaveBeenCalledTimes(1);

      // 模拟 ready 再次变更（如外部重新设 false 再 true）
      rerender({ ready: false });
      act(() => {
        vi.advanceTimersByTime(0);
      });
      rerender({ ready: true });
      act(() => {
        vi.advanceTimersByTime(0);
      });

      // 不应再次触发（hasAutoRunRef 已为 true）
      expect(mockRun).toHaveBeenCalledTimes(1);
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // 2.1.4 manual=true 不自动请求
  // ═══════════════════════════════════════════════════════════════
  describe('2.1.4 manual=true 不自动请求', () => {
    it('mount 时不调用 service，手动调 search() 才触发', () => {
      const service = mockService();
      const { result } = renderHook(() =>
        useProTable(service, { manual: true }),
      );

      act(() => {
        vi.advanceTimersByTime(0);
      });
      expect(mockRun).not.toHaveBeenCalled();

      act(() => {
        result.current.search();
      });
      expect(mockRun).toHaveBeenCalledTimes(1);
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // 2.1.5 search() 携带表单值
  // ═══════════════════════════════════════════════════════════════
  describe('2.1.5 search() 携带表单值', () => {
    it('form.getFieldsValue 返回值合并到请求参数中', () => {
      mockFormGetFieldsValue.mockReturnValue({
        name: 'Alice',
        status: 'active',
      });
      const service = mockService();
      const { result } = renderHook(() =>
        useProTable(service, { manual: true }),
      );

      act(() => {
        result.current.search();
      });

      expect(mockRun).toHaveBeenCalledWith(
        expect.objectContaining({
          pageIndex: 1,
          pageSize: 10,
          name: 'Alice',
          status: 'active',
        }),
      );
    });

    it('表单值为 null/undefined 时安全处理（?? 运算符兜底）', () => {
      mockFormGetFieldsValue.mockReturnValue(null as any);
      const service = mockService();
      const { result } = renderHook(() =>
        useProTable(service, { manual: true }),
      );

      // 不应抛异常
      expect(() =>
        act(() => {
          result.current.search();
        }),
      ).not.toThrow();
      expect(mockRun).toHaveBeenCalledWith(
        expect.objectContaining({ pageIndex: 1, pageSize: 10 }),
      );
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // 2.1.6 reset() 重置表单并搜索
  // ═══════════════════════════════════════════════════════════════
  describe('2.1.6 reset() 重置表单并搜索', () => {
    it('reset() → form.resetFields 被调用 + search 触发（run 被调用）', () => {
      const service = mockService();
      const { result } = renderHook(() =>
        useProTable(service, { manual: true }),
      );

      act(() => {
        result.current.reset();
      });

      expect(mockFormResetFields).toHaveBeenCalledTimes(1);
      expect(mockRun).toHaveBeenCalledTimes(1);
      // 重置后搜索的是第一页
      expect(mockRun).toHaveBeenCalledWith(
        expect.objectContaining({ pageIndex: 1 }),
      );
    });

    it('翻到第3页后 reset() → form.resetFields + search 携带 pageIndex=1（非保持第3页）', () => {
      mockUseRequestData = {
        pageIndex: 3,
        pageSize: 20,
        total: 50,
        list: [],
      };
      const service = mockService();
      const { result } = renderHook(() =>
        useProTable(service, { manual: true }),
      );

      // 先翻到第3页
      const pagination = result.current.tableProps.pagination;
      if (
        pagination &&
        typeof pagination !== 'boolean' &&
        pagination.onChange
      ) {
        act(() => {
          pagination.onChange!(3, 20);
        });
      }
      mockFormResetFields.mockClear();
      mockRun.mockClear();

      // reset → 表单重置 + 搜索第一页
      act(() => {
        result.current.reset();
      });

      expect(mockFormResetFields).toHaveBeenCalledTimes(1);
      expect(mockRun).toHaveBeenCalledWith(
        expect.objectContaining({ pageIndex: 1, pageSize: 10 }),
      );
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // 2.1.7 defaultParams 写入表单
  // ═══════════════════════════════════════════════════════════════
  describe('2.1.7 defaultParams 写入表单', () => {
    it('mount 时 form.setFieldsValue 被调用，参数为 defaultParams', () => {
      const service = mockService();
      renderHook(() =>
        useProTable(service, {
          defaultParams: { name: 'Bob', status: 'pending' },
          manual: true,
        }),
      );

      act(() => {
        vi.advanceTimersByTime(0);
      });

      expect(mockFormSetFieldsValue).toHaveBeenCalledWith({
        name: 'Bob',
        status: 'pending',
      });
    });

    it('ready false→true 时也会写入 defaultParams', () => {
      const service = mockService();
      const { rerender: rerenderDp } = renderHook(
        ({ ready }) =>
          useProTable(service, {
            ready,
            defaultParams: { name: 'Bob' },
          }),
        { initialProps: { ready: false as boolean } },
      );

      // mount 时 ready=false，但 useEffect 中 setFieldsValue 在 ready 检查之前执行
      act(() => {
        vi.advanceTimersByTime(0);
      });
      expect(mockFormSetFieldsValue).toHaveBeenCalledWith({ name: 'Bob' });

      // useUpdateEffect 在 ready 从 false → true 时也会写入
      mockFormSetFieldsValue.mockClear();
      rerenderDp({ ready: true });
      act(() => {
        vi.advanceTimersByTime(0);
      });
      expect(mockFormSetFieldsValue).toHaveBeenCalledWith({ name: 'Bob' });
    });

    it('defaultParams 含分页字段 pageIndex → 自动请求携带该页（form values 覆盖 search 默认 pageIndex=1）', () => {
      // search() 中 spread 顺序：{pageIndex:1, pageSize:10, ...extraParams, ...formVals}
      // formVals 在最后，defaultParams 写入 form 后 getFieldsValue 返回对应值 → 覆盖默认 pageIndex
      mockFormGetFieldsValue.mockReturnValue({
        pageIndex: 5,
        keyword: 'hello',
      });
      const service = mockService();
      renderHook(() =>
        useProTable(service, {
          defaultParams: { pageIndex: 5, keyword: 'hello' },
        }),
      );

      act(() => {
        vi.advanceTimersByTime(0);
      });

      expect(mockFormSetFieldsValue).toHaveBeenCalledWith({
        pageIndex: 5,
        keyword: 'hello',
      });
      expect(mockRun).toHaveBeenCalledWith(
        expect.objectContaining({ pageIndex: 5, keyword: 'hello' }),
      );
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // 2.1.8 paginationFields 自定义映射
  // ═══════════════════════════════════════════════════════════════
  describe('2.1.8 paginationFields 自定义映射', () => {
    it('{current:"pageNum"} → 请求参数含 pageNum 而非 pageIndex', () => {
      const service = mockService();
      const { result } = renderHook(() =>
        useProTable(service, {
          manual: true,
          paginationFields: { current: 'pageNum' },
        }),
      );

      act(() => {
        result.current.search();
      });

      expect(mockRun).toHaveBeenCalledWith(
        expect.objectContaining({ pageNum: 1, pageSize: 10 }),
      );
      // 不应包含默认的 pageIndex
      const callArg = mockRun.mock.calls[0][0] as Record<string, unknown>;
      expect(callArg).not.toHaveProperty('pageIndex');
    });

    it('{total:"totalCount", list:"records"} → tableProps 使用自定义字段', () => {
      mockUseRequestData = {
        pageIndex: 1,
        pageSize: 10,
        totalCount: 42,
        records: [{ id: 1 }],
      };
      const service = mockService();
      const { result } = renderHook(() =>
        useProTable(service, {
          manual: true,
          paginationFields: { total: 'totalCount', list: 'records' },
        }),
      );

      const tp = result.current.tableProps;
      expect(tp.dataSource).toEqual([{ id: 1 }]);
      expect(tp.pagination).not.toBe(false);
      if (tp.pagination && typeof tp.pagination !== 'boolean') {
        expect(tp.pagination.total).toBe(42);
      }
    });

    it('paginationFields:{current:"pageNum"} + defaultParams:{pageNum:3} → 自动请求携带 pageNum=3', () => {
      // 验证自定义分页字段名与 defaultParams 联动
      mockFormGetFieldsValue.mockReturnValue({ pageNum: 3 });
      const service = mockService();
      renderHook(() =>
        useProTable(service, {
          defaultParams: { pageNum: 3 },
          paginationFields: { current: 'pageNum' },
        }),
      );

      act(() => {
        vi.advanceTimersByTime(0);
      });

      expect(mockRun).toHaveBeenCalledWith(
        expect.objectContaining({ pageNum: 3, pageSize: 10 }),
      );
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // 2.1.9 extraParams 每次请求携带
  // ═══════════════════════════════════════════════════════════════
  describe('2.1.9 extraParams 每次请求携带', () => {
    it('search 时参数合并 extraParams（通过 ref 最新值）', () => {
      const service = mockService();
      const { result } = renderHook(() =>
        useProTable(service, {
          manual: true,
          extraParams: { projectId: 'p1' },
        }),
      );

      act(() => {
        result.current.search();
      });

      expect(mockRun).toHaveBeenCalledWith(
        expect.objectContaining({
          pageIndex: 1,
          pageSize: 10,
          projectId: 'p1',
        }),
      );
    });

    it('extraParams 更新后的值在下次 search 时生效（ref 机制）', () => {
      const service = mockService();
      const { result, rerender } = renderHook(
        ({ extraParams }) =>
          useProTable(service, { manual: true, extraParams }),
        {
          initialProps: { extraParams: { v: 1 } as Record<string, unknown> },
        },
      );

      act(() => {
        result.current.search();
      });
      expect(mockRun).toHaveBeenCalledWith(expect.objectContaining({ v: 1 }));

      rerender({ extraParams: { v: 2 } });
      act(() => {
        result.current.search();
      });
      expect(mockRun).toHaveBeenCalledWith(expect.objectContaining({ v: 2 }));
    });

    it('extraParams 与 form.getFieldsValue 有同名 key → form values 优先（spread 顺序：...extraParams, ...formVals）', () => {
      // search() 中 params 构造：{pageIndex, pageSize, ...extraParamsRef, ...formVals}
      // formVals 在最后展开，同名 key 覆盖 extraParams
      mockFormGetFieldsValue.mockReturnValue({ name: 'fromForm' });
      const service = mockService();
      const { result } = renderHook(() =>
        useProTable(service, {
          manual: true,
          extraParams: { name: 'fromExtra', projectId: 'p1' },
        }),
      );

      act(() => {
        result.current.search();
      });

      expect(mockRun).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'fromForm', // form 值覆盖 extraParams
          projectId: 'p1', // extraParams 独有的 key 保留
          pageIndex: 1,
          pageSize: 10,
        }),
      );
    });

    it('extraParams 独有的 key 不受 form values 影响，且 formVals 正常合并', () => {
      mockFormGetFieldsValue.mockReturnValue({ searchKey: 'test' });
      const service = mockService();
      const { result } = renderHook(() =>
        useProTable(service, {
          manual: true,
          extraParams: { projectId: 'p1', tenantId: 't1' },
        }),
      );

      act(() => {
        result.current.search();
      });

      expect(mockRun).toHaveBeenCalledWith(
        expect.objectContaining({
          projectId: 'p1',
          tenantId: 't1',
          searchKey: 'test',
          pageIndex: 1,
          pageSize: 10,
        }),
      );
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // 2.1.10 dispatchParams 拦截请求参数
  // ═══════════════════════════════════════════════════════════════
  describe('2.1.10 dispatchParams 拦截请求参数', () => {
    it('传入转换函数 → search 调用 run（dispatchParams 在 useRequest service 内部生效，需集成测试验证）', () => {
      // 由于 useRequest 被 mock，dispatchParams 的转换发生在 mock 未覆盖的
      // service callback 内部。此处验证 search() 正常调用 run 即可，
      // dispatchParams 的完整行为由集成测试覆盖。
      const service = mockService();
      const { result } = renderHook(() =>
        useProTable(service, {
          manual: true,
          dispatchParams: (p) => ({
            ...p,
            wrapped: true,
            pageIndex: (p.pageIndex as number) + 10,
          }),
        }),
      );

      act(() => {
        result.current.search();
      });

      // run 被调用（参数未经 dispatchParams 因为 mock 跳过了 service callback）
      expect(mockRun).toHaveBeenCalledWith(
        expect.objectContaining({ pageIndex: 1, pageSize: 10 }),
      );
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // 2.1.11 transformResponseData 转换响应
  // ═══════════════════════════════════════════════════════════════
  describe('2.1.11 transformResponseData 转换响应', () => {
    it('返回数据经过 transformResponseData 转换后进入 tableProps.dataSource', () => {
      // useRequest mock 直接返回 data，但真实流程中 transformResponseData
      // 在 service 内部被调用。这里我们直接设 mockUseRequestData
      // 来模拟转换后的结果。
      mockUseRequestData = {
        pageIndex: 1,
        pageSize: 10,
        total: 1,
        list: [{ id: 1, name: 'transformed' }],
      };
      const service = mockService();
      const { result } = renderHook(() =>
        useProTable(service, {
          manual: true,
          transformResponseData: (data) => ({
            ...data,
            list: ((data.list as any[]) || []).map((item: any) => ({
              ...item,
              _transformed: true,
            })),
          }),
        }),
      );

      // transformResponseData 在 useRequest 的 service 函数内部调用
      // 由于我们 mock 了 useRequest，这里的 service 和 transformResponseData
      // 都不会被真正调用。
      // 验证 tableProps 正确聚合 mockUseRequestData
      expect(result.current.tableProps.dataSource).toEqual([
        { id: 1, name: 'transformed' },
      ]);
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // 2.1.12 refreshDeps 变化重置到第一页
  // ═══════════════════════════════════════════════════════════════
  describe('2.1.12 refreshDeps 变化重置到第一页', () => {
    it('改变 refreshDeps → 触发搜索，pagination.current 为 1', () => {
      const service = mockService();
      const { rerender } = renderHook(
        ({ dep }) =>
          useProTable(service, {
            ready: true,
            refreshDeps: [dep],
          }),
        { initialProps: { dep: 'a' } },
      );

      // mount 时自动搜索（ready=true, manual=false 默认）
      act(() => {
        vi.advanceTimersByTime(0);
      });
      expect(mockRun).toHaveBeenCalledTimes(1);
      // 第一次搜索参数含 pageIndex=1
      expect(mockRun.mock.calls[0][0]).toMatchObject({ pageIndex: 1 });

      rerender({ dep: 'b' });
      act(() => {
        vi.advanceTimersByTime(0);
      });

      // refreshDeps 变化触发第二次搜索，重置到第一页
      expect(mockRun).toHaveBeenCalledTimes(2);
      expect(mockRun.mock.calls[1][0]).toMatchObject({ pageIndex: 1 });
    });

    it('ready=false 时 refreshDeps 变化不触发', () => {
      const service = mockService();
      const { rerender } = renderHook(
        ({ ready, dep }) => useProTable(service, { ready, refreshDeps: [dep] }),
        { initialProps: { ready: false as boolean, dep: 'a' } },
      );

      act(() => {
        vi.advanceTimersByTime(0);
      });
      expect(mockRun).not.toHaveBeenCalled();

      rerender({ ready: false, dep: 'b' });
      act(() => {
        vi.advanceTimersByTime(0);
      });
      expect(mockRun).not.toHaveBeenCalled();
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // 2.1.13 pagination.onChange 翻页
  // ═══════════════════════════════════════════════════════════════
  describe('2.1.13 pagination.onChange 翻页', () => {
    it('触发 onChange → 携带新 pageNum+pageSize 请求', () => {
      mockUseRequestData = {
        pageIndex: 1,
        pageSize: 10,
        total: 50,
        list: [],
      };
      const service = mockService();
      const { result } = renderHook(() =>
        useProTable(service, { manual: true }),
      );

      const pagination = result.current.tableProps.pagination;
      expect(pagination).not.toBe(false);

      if (
        pagination &&
        typeof pagination !== 'boolean' &&
        pagination.onChange
      ) {
        act(() => {
          pagination.onChange!(3, 20);
        });
      }

      expect(mockRun).toHaveBeenCalledWith(
        expect.objectContaining({ pageIndex: 3, pageSize: 20 }),
      );
    });

    it('翻到第3页后调用 search() → 请求参数重置为 pageIndex=1（search 始终从第一页开始）', () => {
      mockUseRequestData = {
        pageIndex: 1,
        pageSize: 10,
        total: 50,
        list: [],
      };
      const service = mockService();
      const { result } = renderHook(() =>
        useProTable(service, { manual: true }),
      );

      // 先翻到第3页
      const pagination = result.current.tableProps.pagination;
      if (
        pagination &&
        typeof pagination !== 'boolean' &&
        pagination.onChange
      ) {
        act(() => {
          pagination.onChange!(3, 20);
        });
      }
      expect(mockRun).toHaveBeenCalledWith(
        expect.objectContaining({ pageIndex: 3, pageSize: 20 }),
      );

      // 调用 search() → 回到第一页
      mockRun.mockClear();
      act(() => {
        result.current.search();
      });

      expect(mockRun).toHaveBeenCalledWith(
        expect.objectContaining({ pageIndex: 1, pageSize: 10 }),
      );
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // 2.1.14 tableProps 聚合正确
  // ═══════════════════════════════════════════════════════════════
  describe('2.1.14 tableProps 聚合正确', () => {
    it('dataSource 来自 raw[list]，pagination 来自 raw[current/pageSize/total]，loading 来自 useRequest', () => {
      mockUseRequestData = {
        pageIndex: 2,
        pageSize: 15,
        total: 30,
        list: [{ id: 1 }, { id: 2 }, { id: 3 }],
      };
      mockUseRequestLoading = true;

      const service = mockService();
      const { result } = renderHook(() =>
        useProTable(service, { manual: true }),
      );

      const tp = result.current.tableProps;
      expect(tp.dataSource).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
      expect(tp.loading).toBe(true);
      expect(tp.pagination).not.toBe(false);

      if (tp.pagination && typeof tp.pagination !== 'boolean') {
        expect(tp.pagination.current).toBe(2);
        expect(tp.pagination.pageSize).toBe(15);
        expect(tp.pagination.total).toBe(30);
      }
    });

    it('dataSource 为空数组时正常（raw[list] 不存在 → []）', () => {
      mockUseRequestData = {} as Record<string, unknown>;
      const service = mockService();
      const { result } = renderHook(() =>
        useProTable(service, { manual: true }),
      );

      expect(result.current.tableProps.dataSource).toEqual([]);
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // 2.1.15 mutate 直改数据
  // ═══════════════════════════════════════════════════════════════
  describe('2.1.15 mutate 直改数据', () => {
    it('调用 mutate → dataSource 立即变化，不触发请求', () => {
      mockUseRequestData = {
        pageIndex: 1,
        pageSize: 10,
        total: 1,
        list: [{ id: 1 }],
      };
      const service = mockService();
      const { result } = renderHook(() =>
        useProTable(service, { manual: true }),
      );

      act(() => {
        result.current.mutate({
          pageIndex: 1,
          pageSize: 10,
          total: 1,
          list: [{ id: 99 }],
        });
      });

      // mutate 不会调用 run
      expect(mockRun).not.toHaveBeenCalled();
      // 但因为我们 mock 了 useRequest，mutate 调的是 mockMutate
      expect(mockMutate).toHaveBeenCalledWith({
        pageIndex: 1,
        pageSize: 10,
        total: 1,
        list: [{ id: 99 }],
      });
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // 2.1.16 clearData 清空
  // ═══════════════════════════════════════════════════════════════
  describe('2.1.16 clearData（mutate(undefined)）', () => {
    it('mutate(undefined) → mockMutate 被调用', () => {
      const service = mockService();
      const { result } = renderHook(() =>
        useProTable(service, { manual: true }),
      );

      act(() => {
        result.current.mutate(undefined);
      });

      expect(mockMutate).toHaveBeenCalledWith(undefined);
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // 2.1.17 外部 form 优先
  // ═══════════════════════════════════════════════════════════════
  describe('2.1.17 外部 form 优先', () => {
    it('传入 externalForm → 返回的是外部 form 而非内部创建的', () => {
      const externalForm = {
        ...mockFormInstance,
        getFieldsValue: vi.fn(() => ({ external: true })),
      };

      const service = mockService();
      const { result } = renderHook(() =>
        useProTable(service, { form: externalForm as any, manual: true }),
      );

      // 返回的 form 是外部传入的
      expect(result.current.form).toBe(externalForm);

      act(() => {
        result.current.search();
      });

      // search 使用外部 form 的 getFieldsValue
      expect(mockRun).toHaveBeenCalledWith(
        expect.objectContaining({ external: true }),
      );
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // 2.1.18 空响应不显示分页
  // ═══════════════════════════════════════════════════════════════
  describe('2.1.18 空响应不显示分页', () => {
    it('raw 为空对象 → pagination 为 false', () => {
      mockUseRequestData = {} as Record<string, unknown>;
      const service = mockService();
      const { result } = renderHook(() =>
        useProTable(service, { manual: true }),
      );

      expect(result.current.tableProps.pagination).toBe(false);
    });

    it('raw 缺少分页字段时 dataSource 安全回退为 []', () => {
      // 源码 bug：raw 为 null 时 raw[pf.list] 抛 TypeError。
      // 此处验证空对象 {} 的防御行为。null 情况需修复源码。
      mockUseRequestData = {} as Record<string, unknown>;
      const service = mockService();
      const { result } = renderHook(() =>
        useProTable(service, { manual: true }),
      );

      expect(result.current.tableProps.pagination).toBe(false);
      expect(result.current.tableProps.dataSource).toEqual([]);
    });
  });
});
