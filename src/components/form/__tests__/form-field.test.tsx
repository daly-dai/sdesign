import { render, screen } from '@testing-library/react';
import React from 'react';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

// matchMedia mock（antd 组件需要）
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
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

import FormField from '../components/form-field';

// ============================================================
describe('FormField — 基本 type 映射（轻量组件直接引用）', () => {
  it('type="input" → 渲染不报错', () => {
    render(<FormField type="input" placeholder="请输入" />);
    expect(screen.queryByText(/未知组件类型/)).toBeNull();
  });

  it('type="select" → 渲染不报错', () => {
    render(<FormField type="select" />);
    expect(screen.queryByText(/未知组件类型/)).toBeNull();
  });

  it('type="datePicker" → 渲染不报错', () => {
    render(<FormField type="datePicker" />);
    expect(screen.queryByText(/未知组件类型/)).toBeNull();
  });

  it('type="switch" → 渲染不报错', () => {
    render(<FormField type="switch" />);
    expect(screen.queryByText(/未知组件类型/)).toBeNull();
  });

  it('type="radioGroup" → 渲染不报错', () => {
    render(<FormField type="radioGroup" />);
    expect(screen.queryByText(/未知组件类型/)).toBeNull();
  });

  it('type="checkGroup" → 渲染不报错', () => {
    render(<FormField type="checkGroup" />);
    expect(screen.queryByText(/未知组件类型/)).toBeNull();
  });

  it('type="treeSelect" → 直接引用（非懒加载）渲染不报错', () => {
    render(<FormField type="treeSelect" />);
    expect(screen.queryByText(/未知组件类型/)).toBeNull();
  });

  it('type="inputNumber" → 渲染不报错', () => {
    render(<FormField type="inputNumber" />);
    expect(screen.queryByText(/未知组件类型/)).toBeNull();
  });

  it('type="textarea" → 渲染不报错', () => {
    render(<FormField type="textarea" />);
    expect(screen.queryByText(/未知组件类型/)).toBeNull();
  });
});

// ============================================================
describe('FormField — type fallback', () => {
  it('type 未传 → fallback 到 input', () => {
    render(<FormField type={undefined as any} />);
    expect(screen.queryByText(/未知组件类型/)).toBeNull();
  });
});

// ============================================================
describe('FormField — 未知 type', () => {
  it('不存在于 FORM_ITEM_COM_MAP 的 type → 显示"未知组件类型"', () => {
    render(<FormField type={'nonexistent' as any} />);
    expect(screen.getByText(/未知组件类型/)).toBeTruthy();
  });
});

// ============================================================
describe('FormField — 组件映射与废弃别名兼容', () => {
  it('type="cascader" → 渲染不报错', () => {
    render(<FormField type="cascader" />);
    expect(screen.queryByText(/未知组件类型/)).toBeNull();
  });

  it('type="table" → 渲染不报错', () => {
    render(<FormField type="table" />);
    expect(screen.queryByText(/未知组件类型/)).toBeNull();
  });

  it('type="SCascader"（废弃别名）→ 渲染不报错', () => {
    render(<FormField type="SCascader" />);
    expect(screen.queryByText(/未知组件类型/)).toBeNull();
  });

  it('type="SDatePicker"（废弃别名）→ 渲染不报错', () => {
    render(<FormField type="SDatePicker" />);
    expect(screen.queryByText(/未知组件类型/)).toBeNull();
  });

  it('type="SDatePickerRange"（废弃别名）→ 渲染不报错', () => {
    render(<FormField type="SDatePickerRange" />);
    expect(screen.queryByText(/未知组件类型/)).toBeNull();
  });
});
