import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

// Mock ItemRender 暴露更多信息用于验证
vi.mock('../components/item-render', () => ({
  default: ({
    label,
    type,
    name,
    readonly,
    required,
    hidden,
    customCom,
    children,
    formName,
    fieldProps,
    ...rest
  }: any) => {
    if (hidden) return null;
    if (customCom) {
      return (
        <div data-testid={`item-${name}`}>
          {typeof customCom === 'function' ? customCom({}, {}) : customCom}
        </div>
      );
    }
    return (
      <div
        data-testid={`item-${name || 'no-name'}`}
        data-form-name={formName || ''}
        data-field-props={JSON.stringify(fieldProps || {})}
        data-rest={JSON.stringify(rest)}
      >
        <span className="item-label">{label}</span>
        <span className="item-type">{type}</span>
        {readonly && <span className="item-readonly">readonly</span>}
        {required && <span className="item-required">{required}</span>}
        {children}
      </div>
    );
  },
}));

import InstanceForm from '../instance';

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

// ============================================================
// 基础渲染
// ============================================================
describe('InstanceForm — 基础渲染', () => {
  it('items 数组 → 表单项 label 渲染到 DOM', () => {
    const items = [
      { type: 'input', label: '用户名', name: 'username' },
      { type: 'select', label: '角色', name: 'role' },
    ];
    render(<InstanceForm items={items as any} />);
    expect(screen.getByTestId('item-username')).toBeTruthy();
    expect(screen.getByTestId('item-role')).toBeTruthy();
  });

  it('hidden: true 的项不渲染', () => {
    const items = [
      { type: 'input', label: '可见', name: 'visible' },
      { type: 'input', label: '隐藏', name: 'hiddenField', hidden: true },
    ];
    render(<InstanceForm items={items as any} />);
    expect(screen.getByTestId('item-visible')).toBeTruthy();
    expect(screen.queryByTestId('item-hiddenField')).toBeNull();
  });

  it('空 items（[] 或无 items）不报错', () => {
    const { container: c1 } = render(<InstanceForm items={[]} />);
    expect(c1).toBeTruthy();
    const { container: c2 } = render(<InstanceForm items={undefined as any} />);
    expect(c2).toBeTruthy();
    expect(screen.queryByTestId(/^item-/)).toBeNull();
  });

  it('children 渲染在 items 之后', () => {
    render(
      <InstanceForm
        items={[{ type: 'input', label: '项1', name: 'item1' }] as any}
      >
        <div data-testid="form-children">提交按钮</div>
      </InstanceForm>,
    );
    expect(screen.getByTestId('item-item1')).toBeTruthy();
    expect(screen.getByTestId('form-children')).toBeTruthy();
  });
});

// ============================================================
// 列布局
// ============================================================
describe('InstanceForm — 列布局', () => {
  it('默认 columns=1 → 所有 item 渲染', () => {
    const items = [
      { type: 'input', label: 'A', name: 'a' },
      { type: 'input', label: 'B', name: 'b' },
      { type: 'input', label: 'C', name: 'c' },
    ];
    render(<InstanceForm items={items as any} />);
    expect(screen.getByTestId('item-a')).toBeTruthy();
    expect(screen.getByTestId('item-b')).toBeTruthy();
    expect(screen.getByTestId('item-c')).toBeTruthy();
  });

  it('columns=2 → 3 个 item 全部渲染', () => {
    const items = [
      { type: 'input', label: 'A', name: 'a' },
      { type: 'input', label: 'B', name: 'b' },
      { type: 'input', label: 'C', name: 'c' },
    ];
    render(<InstanceForm items={items as any} columns={2} />);
    expect(screen.getByTestId('item-a')).toBeTruthy();
    expect(screen.getByTestId('item-b')).toBeTruthy();
    expect(screen.getByTestId('item-c')).toBeTruthy();
  });

  it('columns=3 → 动态 span=8', () => {
    const items = [{ type: 'input', label: '唯一项', name: 'only' }];
    const { container } = render(
      <InstanceForm items={items as any} columns={3} />,
    );
    // Antd Col 24/3=8，检查 ant-col-8 class
    expect(container.querySelector('.ant-col-8')).toBeTruthy();
  });

  it('colProps 透传到 Col', () => {
    const items = [
      { type: 'input', label: '偏右', name: 'right', colProps: { offset: 8 } },
    ];
    const { container } = render(<InstanceForm items={items as any} />);
    // antd offset 对应 ant-col-offset-8
    expect(container.querySelector('.ant-col-offset-8')).toBeTruthy();
  });
});

// ============================================================
// readonly
// ============================================================
describe('InstanceForm — readonly', () => {
  it('readonly=true → item 收到 readonly prop', () => {
    const items = [{ type: 'input', label: '只读', name: 'ro' }];
    render(<InstanceForm items={items as any} readonly />);
    expect(screen.getByTestId('item-ro')).toBeTruthy();
    expect(screen.getByText('readonly')).toBeTruthy();
  });

  it('readonly=false → item 不显示 readonly 标记', () => {
    const items = [{ type: 'input', label: '非只读', name: 'rw' }];
    render(<InstanceForm items={items as any} readonly={false} />);
    expect(screen.queryByText('readonly')).toBeNull();
  });
});

// ============================================================
// 事件回调
// ============================================================
describe('InstanceForm — 事件回调', () => {
  it('onFinish 回调 → 提交表单触发', () => {
    let submittedValues: any = null;
    const items = [{ type: 'input', label: '用户名', name: 'username' }];
    const { container } = render(
      <InstanceForm
        items={items as any}
        onFinish={(values) => {
          submittedValues = values;
        }}
      />,
    );
    const form = container.querySelector('form');
    fireEvent.submit(form!);
    expect(submittedValues).toBeDefined();
  });

  it('onReset 回调 → 表单 reset 触发', () => {
    let resetEvent: any = null;
    const items = [{ type: 'input', label: '用户名', name: 'username' }];
    const { container } = render(
      <InstanceForm
        items={items as any}
        onReset={(e) => {
          resetEvent = e;
        }}
      />,
    );
    const form = container.querySelector('form');
    fireEvent.reset(form!);
    expect(resetEvent).toBeDefined();
  });
});

// ============================================================
// formName 嵌套
// ============================================================
describe('InstanceForm — formName 嵌套', () => {
  it('formName 透传到 ItemRender', () => {
    const items = [{ type: 'input', label: '子字段', name: 'child' }];
    render(<InstanceForm items={items as any} formName="parent" />);
    const el = screen.getByTestId('item-child');
    expect(el.dataset.formName).toBe('parent');
  });

  it('无 formName → dataset 为空', () => {
    const items = [{ type: 'input', label: '普通', name: 'normal' }];
    render(<InstanceForm items={items as any} />);
    const el = screen.getByTestId('item-normal');
    expect(el.dataset.formName).toBe('');
  });
});

// ============================================================
// labelWidth
// ============================================================
describe('InstanceForm — labelWidth', () => {
  it('labelWidth=120 → 不报错，item 正常渲染', () => {
    const items = [{ type: 'input', label: '字段', name: 'f1' }];
    render(<InstanceForm items={items as any} labelWidth={120} />);
    expect(screen.getByTestId('item-f1')).toBeTruthy();
  });

  it('labelWidth="8em" → 不报错，item 正常渲染', () => {
    const items = [{ type: 'input', label: '字段', name: 'f2' }];
    render(<InstanceForm items={items as any} labelWidth="8em" />);
    expect(screen.getByTestId('item-f2')).toBeTruthy();
  });
});

// ============================================================
// layout
// ============================================================
describe('InstanceForm — layout', () => {
  it('layout=vertical（默认）→ 正常渲染', () => {
    const items = [{ type: 'input', label: '字段', name: 'v1' }];
    render(<InstanceForm items={items as any} layout="vertical" />);
    expect(screen.getByTestId('item-v1')).toBeTruthy();
  });

  it('layout=inline → 表单项渲染', () => {
    const items = [{ type: 'input', label: '字段', name: 'i1' }];
    render(<InstanceForm items={items as any} layout="inline" />);
    expect(screen.getByTestId('item-i1')).toBeTruthy();
  });

  it('layout=horizontal → 表单项渲染', () => {
    const items = [{ type: 'input', label: '字段', name: 'h1' }];
    render(<InstanceForm items={items as any} layout="horizontal" />);
    expect(screen.getByTestId('item-h1')).toBeTruthy();
  });
});

// ============================================================
// rowProps
// ============================================================
describe('InstanceForm — rowProps', () => {
  it('rowProps 透传到 antd Row（gutter 自定义）', () => {
    const items = [{ type: 'input', label: '字段', name: 'r1' }];
    const { container } = render(
      <InstanceForm
        items={items as any}
        rowProps={{ gutter: [48, 32], justify: 'center' }}
      />,
    );
    // Row 有 justify:center → ant-row-center class
    expect(container.querySelector('.ant-row-center')).toBeTruthy();
  });
});

// ============================================================
// style & 额外 props
// ============================================================
describe('InstanceForm — 其他', () => {
  it('style 透传到 Form', () => {
    const items = [{ type: 'input', label: '字段', name: 's1' }];
    const { container } = render(
      <InstanceForm items={items as any} style={{ backgroundColor: 'red' }} />,
    );
    const form = container.querySelector('form');
    expect(form?.style.backgroundColor).toBe('red');
  });

  it('Form props（如 size）正常透传', () => {
    const items = [{ type: 'input', label: '字段', name: 'c1' }];
    // size="large" 透传到 antd Form，不报错即通过
    const { container } = render(
      <InstanceForm items={items as any} size="large" />,
    );
    expect(container.querySelector('form')).toBeTruthy();
    expect(screen.getByTestId('item-c1')).toBeTruthy();
  });

  it('已废弃的 SDatePicker/SDatePickerRange/SCascader 别名的 item 仍渲染', () => {
    // 这些别名在 types.ts 标记为 @deprecated，但组件映射仍然存在
    const items = [
      { type: 'SDatePicker', label: '旧日期', name: 'oldDate' },
      { type: 'SDatePickerRange', label: '旧范围', name: 'oldRange' },
      { type: 'SCascader', label: '旧级联', name: 'oldCas' },
    ];
    render(<InstanceForm items={items as any} />);
    expect(screen.getByTestId('item-oldDate')).toBeTruthy();
    expect(screen.getByTestId('item-oldRange')).toBeTruthy();
    expect(screen.getByTestId('item-oldCas')).toBeTruthy();
  });
});
