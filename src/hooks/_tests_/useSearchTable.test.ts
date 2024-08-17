import { act, renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import useSearchTable from '../useSearchTable';

describe('useSearchTable', () => {
  let queryArgs: any;

  const asyncFn = async (query: any) => {
    queryArgs = query;
    return new Promise((resolve) => {
      // 后端返回的公共响应
      resolve({
        pageNum: query.pageNum,
        pageSize: query.pageSize,
        dataList: [],
        totalSize: 55,
      });
    });
  };

  const formInstance = {
    getFieldsValue: () => {
      return {
        name: '张三',
        age: 18,
      };
    },
    resetFieldsValue: () => ({}),
  };

  const setUp = (service: any, options = {} as any) =>
    renderHook(() =>
      useSearchTable({
        requestFn: service,
        ...options,
      }),
    );

  let hook: any;

  it('should fetch after first render', async () => {
    queryArgs = undefined;

    act(() => {
      hook = setUp(asyncFn, {});
    });

    expect(hook.result.current.loading).toBe(true);
    expect(queryArgs.pageNum).toBe(1);
    expect(queryArgs.pageSize).toBe(10);

    await waitFor(() => expect(hook.result.current.loading).toBe(false));

    expect(hook.result.current.pagination.pageNum).toBe(1);
    expect(hook.result.current.pagination.pageSize).toBe(10);
    expect(hook.result.current.pagination.total).toBe(55);
  });

  // 支持额外的传参
  it('should fetch with extra params', async () => {
    queryArgs = undefined;
    act(() => {
      hook = setUp(asyncFn, {
        extraParams: {
          isCode: true,
        },
      });
    });

    expect(hook.result.current.loading).toBe(true);
    expect(queryArgs.pageNum).toBe(1);
    expect(queryArgs.pageSize).toBe(10);
    expect(queryArgs.isCode).toBe(true);
    await waitFor(() => expect(hook.result.current.loading).toBe(false));
  });

  it('should support  dispatchParams', async () => {
    queryArgs = undefined;

    const dispatchParams = (params: Record<string, any>) => {
      params.isCode = true;
      params.pageNum = 100;
      return params;
    };

    act(() => {
      hook = setUp(asyncFn, {
        dispatchParams,
      });
    });

    expect(hook.result.current.loading).toBe(true);
    expect(queryArgs.pageNum).toBe(100);
    expect(queryArgs.pageSize).toBe(10);
    expect(queryArgs.isCode).toBe(true);

    await waitFor(() => expect(hook.result.current.loading).toBe(false));
  });

  it('should support antd formInstance', async () => {
    queryArgs = undefined;
    act(() => {
      hook = setUp(asyncFn, {
        form: formInstance,
      });
    });

    expect(queryArgs.name).toBe('张三');
    expect(queryArgs.age).toBe(18);
  });

  it('should support pagination change', async () => {
    queryArgs = undefined;

    act(() => {
      hook = setUp(asyncFn, {});
    });

    expect(queryArgs.pageNum).toBe(1);
    expect(queryArgs.pageSize).toBe(10);

    act(() => {
      hook.result.current.pagination.onChange(2, 20);
    });

    expect(queryArgs.pageNum).toBe(2);
    expect(queryArgs.pageSize).toBe(20);
  });
});
