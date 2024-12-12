import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, test, vi } from 'vitest';

import { SInput } from '@dalydb/sdesign';

describe('SInput', () => {
  test('renders input with trimmed value when trim prop is true', () => {
    const mockOnChange = vi.fn();
    render(<SInput value="" onChange={mockOnChange} trim={true} />);
    // 获取 input 元素
    const inputElement = screen.getByRole('textbox');

    // 模拟输入值
    fireEvent.change(inputElement, { target: { value: '  test  ' } });

    expect(mockOnChange).toHaveBeenCalledWith('test');
  });

  test('calls onEnter callback when Enter key is pressed', () => {
    const mockOnEnter = vi.fn();
    render(<SInput value="test" onEnter={mockOnEnter} />);
    const input = screen.getByDisplayValue('test');
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(mockOnEnter).toHaveBeenCalledWith('test');
  });

  // Add more tests here
});
