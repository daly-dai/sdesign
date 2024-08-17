import { renderHook } from '@testing-library/react';
import { createContext } from 'react';
import { describe, expect, it, vi } from 'vitest';

import useGetDict from '../useGetDictData'; // 假设这是你的 hook 文件路径

// 模拟 ConfigContext
vi.mock('../../components/config-provider/contexts', () => {
  const mockGlobalDict = {
    'dict-key-1': {
      '1': 'Option 1',
      '2': 'Option 2',
    },
    'dict-key-2': {
      a: 'Apple',
      b: 'Banana',
    },
  };

  const Context = createContext<any>({
    globalDict: mockGlobalDict,
    // 其他你需要的 Context 属性
  });

  return {
    ConfigContext: Context,
    useContext: vi.fn().mockImplementation((context) => {
      if (context === Context) {
        return {
          globalDict: mockGlobalDict,
        };
      }
      throw new Error('Invalid context');
    }),
  };
});

// 模拟 useMemo

// 测试用例
describe('useGetDict hook', () => {
  it('should return empty object when no dictKey and empty dict are provided', () => {
    const { result } = renderHook(() =>
      useGetDict({ dictKey: undefined, dict: {} }),
    );
    expect(result.current.dictData).toEqual({});
  });

  it('should return local dict when provided', () => {
    const dict = { '1': 'One', '2': 'Two' };
    const { result } = renderHook(() =>
      useGetDict({ dictKey: undefined, dict }),
    );
    expect(result.current.dictData).toEqual(dict);
  });

  it('should return global dict when dictKey is provided', () => {
    const { result } = renderHook(() =>
      useGetDict({ dictKey: 'dict-key-1', dict: undefined }),
    );
    expect(result.current.dictData).toEqual({
      '1': 'Option 1',
      '2': 'Option 2',
    });
  });

  it('should return empty object when dictKey is not found in globalDict', () => {
    const { result } = renderHook(() =>
      useGetDict({ dictKey: 'non-existing-key', dict: undefined }),
    );
    expect(result.current.dictData).toEqual({});
  });
});
