import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

import SCheckGroup from '../index';

const options = [
  { label: 'A', value: 'a' },
  { label: 'B', value: 'b' },
  { label: 'C', value: 'c' },
];

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: () => ({
      matches: false,
      media: '',
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
});

afterAll(() => {
  (window.matchMedia as any) = undefined;
});

describe('SCheckGroup — 半受控', () => {
  it('受控 value="a,b" → 反序列化并选中对应项', () => {
    render(<SCheckGroup value="a,b" options={options} />);
    const [a, b, c] = screen.getAllByRole('checkbox');
    expect(a).toBeChecked();
    expect(b).toBeChecked();
    expect(c).not.toBeChecked();
  });

  it('受控 value 为数组 → 直接作为选中值', () => {
    render(<SCheckGroup value={['a', 'c']} options={options} />);
    const [a, b, c] = screen.getAllByRole('checkbox');
    expect(a).toBeChecked();
    expect(b).not.toBeChecked();
    expect(c).toBeChecked();
  });

  it('非受控点击后 onChange 返回逗号分隔字符串', () => {
    const onChange = vi.fn();
    render(<SCheckGroup onChange={onChange} options={options} />);
    fireEvent.click(screen.getAllByRole('checkbox')[0]);
    expect(onChange).toHaveBeenCalledWith('a');
  });
});
