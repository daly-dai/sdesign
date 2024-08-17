import { renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import useResize from '../useResize';

import { isBrowser } from '@daly/sdesign/utils';

describe('useResize', () => {
  const defaultWidth = isBrowser() ? document?.body?.clientWidth : 1024;

  beforeEach(() => {
    // Mock isBrowser() function
    // jest.spyOn(window, 'isBrowser').mockImplementation(() => true);

    // Mock document.body.clientWidth
    Object.defineProperty(document.body, 'clientWidth', {
      value: 1024,
      writable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should set the initial width to defaultWidth', () => {
    const { result } = renderHook(() => useResize());

    expect(result.current.width).toBe(defaultWidth);
  });
});
