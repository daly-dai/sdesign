import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import useSearchLayout from '../useSearchLayout'; // 假设你的Hook在这个文件中

describe('useSearchLayout', () => {
  it('should calculate dynamicSpan correctly', () => {
    const { result } = renderHook(() =>
      useSearchLayout({ columns: 3, items: [], prefixCls: 'test' }),
    );
    expect(result.current.dynamicSpan).toBe(8); // 24 / 3
  });

  it('should calculate dynamicOffset correctly when items length is 1 and columns are 4', () => {
    const { result } = renderHook(() =>
      useSearchLayout({ columns: 4, items: ['item'], prefixCls: 'test' }),
    );
    expect(result.current.dynamicOffset).toBe(8); // 因为formItemListLength === 1 并且 columns === 4
  });

  it('should calculate dynamicOffset correctly when items length is not divisible by columns', () => {
    const { result } = renderHook(() =>
      useSearchLayout({
        columns: 3,
        items: ['item1', 'item2', 'item3', 'item4'],
        prefixCls: 'test',
      }),
    );

    expect(result.current.dynamicOffset).toBe(8); // 因为formItemListLength % columns = 1, columns - 1 - 1 = 2, 2 * dynamicSpan = 6
  });

  it('should return a prefixCls-based actionAlign', () => {
    const { result } = renderHook(() =>
      useSearchLayout({ columns: 2, items: [], prefixCls: 'myPrefix' }),
    );
    expect(result.current.actionAlign).toContain('myPrefix-action-right');
  });
});
