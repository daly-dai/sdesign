import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import useNumInput from '../useNumInput';

describe('useNumInput', () => {
  it('should initialize with default value', () => {
    // Arrange
    const defaultVal = '';

    // Act
    const { result } = renderHook(() => useNumInput(defaultVal));

    // Assert
    expect(result.current[0]).toBe(defaultVal);
  });

  it('should update state when input is a number', () => {
    // Arrange
    const defaultVal = '';
    const newValue = '123';

    // Act
    const { result } = renderHook(() => useNumInput(defaultVal));
    act(() => {
      result.current[1]({ target: { value: newValue } });
    });

    // Assert
    expect(result.current[0]).toBe(newValue);
  });

  it('should remove leading zeros from input', () => {
    // Arrange
    const defaultVal = '';
    const newValue = '000123';

    // Act
    const { result } = renderHook(() => useNumInput(defaultVal));
    act(() => {
      result.current[1]({ target: { value: newValue } });
    });

    // Assert
    expect(result.current[0]).toBe('123');
  });

  it('should not allow non-numeric characters in input', () => {
    // Arrange
    const defaultVal = '';
    const newValue = '123abc';

    // Act
    const { result } = renderHook(() => useNumInput(defaultVal));
    act(() => {
      result.current[1]({ target: { value: newValue } });
    });

    // Assert
    expect(result.current[0]).toBe('123');
  });
});
