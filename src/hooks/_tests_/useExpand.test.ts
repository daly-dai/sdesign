import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import useExpand from '../useExpand';

describe('useExpand', () => {
  it('should set default collapse state to true if not provided', () => {
    const { result } = renderHook(() =>
      useExpand({
        columns: 3,
        // @ts-ignore
        items: [{ id: 1 }, { id: 2 }, { id: 3 }],
        showExpand: true,
      }),
    );

    expect(result.current.collapse).toBe(true);
  });

  it('should set collapse state to false if defaultExpand is false', () => {
    const { result } = renderHook(() =>
      useExpand({
        columns: 3,
        // @ts-ignore
        items: [{ id: 1 }, { id: 2 }, { id: 3 }],
        showExpand: true,
        defaultExpand: false,
      }),
    );

    expect(result.current.collapse).toBe(false);
  });

  it('should not show collapse button if showExpand is false', () => {
    const { result } = renderHook(() =>
      useExpand({
        columns: 3,
        // @ts-ignore
        items: [{ id: 1 }, { id: 2 }, { id: 3 }],
        showExpand: false,
      }),
    );

    expect(result.current.showCollapse).toBe(false);
  });

  it('should not show collapse button if items length is less than columns', () => {
    const { result } = renderHook(() =>
      useExpand({
        columns: 3,
        // @ts-ignore
        items: [{ id: 1 }],
        showExpand: true,
      }),
    );

    expect(result.current.showCollapse).toBe(false);
  });

  it('should show collapse button if showExpand is true and items length is greater than or equal to columns', () => {
    const { result } = renderHook(() =>
      useExpand({
        columns: 3,
        // @ts-ignore
        items: [{ id: 1 }, { id: 2 }, { id: 3 }],
        showExpand: true,
      }),
    );

    expect(result.current.showCollapse).toBe(true);
  });

  it('should set expandNum to items length if showCollapse is false', () => {
    const { result } = renderHook(() =>
      useExpand({
        columns: 3,
        // @ts-ignore
        items: [{ id: 1 }, { id: 2 }, { id: 3 }],
        showExpand: true,
      }),
    );

    expect(result.current.expandNum).toBe(2);
  });

  it('should set expandNum to items length if collapse is false and items length is less than columns', () => {
    const { result } = renderHook(() =>
      useExpand({
        columns: 3,
        // @ts-ignore
        items: [{ id: 1 }, { id: 2 }],
        showExpand: true,
      }),
    );

    expect(result.current.expandNum).toBe(2);
  });

  it('should set expandNum to columns - 1 if collapse is true and items length is greater than or equal to columns', () => {
    const { result } = renderHook(() =>
      useExpand({
        columns: 3,
        // @ts-ignore
        items: [{ id: 1 }, { id: 2 }, { id: 3 }],
        showExpand: true,
        defaultExpand: false,
      }),
    );

    expect(result.current.expandNum).toBe(3);
  });
});
