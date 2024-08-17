import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import useDispatchDict from '../useDispatchDict';

describe('useDispatchDict hook', () => {
  it('should return an empty array when dict is not provided', () => {
    // @ts-ignore
    const { result } = renderHook(() => useDispatchDict({}));
    expect(result.current.dOptions).toEqual([]);
  });

  it('should return the options when provided', () => {
    const mockOptions = [{ label: 'Option 1', value: '1' }];
    const { result } = renderHook(() =>
      // @ts-ignore
      useDispatchDict({ options: mockOptions }),
    );
    expect(result.current.dOptions).toEqual(mockOptions);
  });

  it('should return an array of objects from dict (string keys)', () => {
    const mockDict = { a: 'Apple', b: 'Banana' };
    // @ts-ignore
    const { result } = renderHook(() => useDispatchDict({ dict: mockDict }));

    expect(result.current.dOptions).toEqual([
      { label: 'Apple', value: 'a', disabled: false },
      { label: 'Banana', value: 'b', disabled: false },
    ]);
  });

  it('should disable keys when disableKeys is a string', () => {
    const mockDict = { a: 'Apple', b: 'Banana' };
    const { result } = renderHook(() =>
      // @ts-ignore
      useDispatchDict({ dict: mockDict, disableKeys: 'a' }),
    );

    expect(result.current.dOptions).toEqual([
      { label: 'Apple', value: 'a', disabled: true },
      { label: 'Banana', value: 'b', disabled: false },
    ]);
  });

  it('should disable keys when disableKeys is an array', () => {
    const mockDict = { a: 'Apple', b: 'Banana', c: 'Cherry' };
    const { result } = renderHook(() =>
      // @ts-ignore
      useDispatchDict({ dict: mockDict, disableKeys: ['a', 'c'] }),
    );

    expect(result.current.dOptions).toEqual([
      { label: 'Apple', value: 'a', disabled: true },
      { label: 'Banana', value: 'b', disabled: false },
      { label: 'Cherry', value: 'c', disabled: true },
    ]);
  });

  // ... 其他测试用例 ...
});
