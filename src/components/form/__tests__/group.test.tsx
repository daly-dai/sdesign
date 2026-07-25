import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

// ---- Mock 依赖 ----
vi.mock('../components/item-render', () => ({
  default: ({ label, type, name, readonly, hidden, formName }: any) => {
    if (hidden) return null;
    return (
      <div
        data-testid={`group-item-${name || 'no-name'}`}
        data-form-name={formName || ''}
        data-readonly={String(!!readonly)}
      >
        {label && <span className="item-label">{label}</span>}
        <span className="item-type">{type}</span>
      </div>
    );
  },
}));

vi.mock('@dalydb/sdesign/components/dynamic-container', () => ({
  default: ({ children, CustomContainer }: any) => {
    if (CustomContainer) {
      // 让 CustomContainer 自身的 data-testid 生效，不被覆盖
      return (
        <CustomContainer data-has-custom="true">{children}</CustomContainer>
      );
    }
    return (
      <div data-testid="group-container" data-has-custom="false">
        {children}
      </div>
    );
  },
}));

vi.mock('@dalydb/sdesign/components/title', () => ({
  default: ({ children, type }: any) => (
    <h3 data-testid="group-title" data-type={type}>
      {children}
    </h3>
  ),
}));

import Group from '../components/group';

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
describe('SForm.Group — 基础渲染', () => {
  it('单分组 → items 渲染', () => {
    const groupItems = [
      {
        title: '基本信息',
        items: [
          { type: 'input', label: '姓名', name: 'name' },
          { type: 'input', label: '年龄', name: 'age' },
        ],
      },
    ];
    render(<Group groupItems={groupItems as any} />);
    expect(screen.getByTestId('group-item-name')).toBeTruthy();
    expect(screen.getByTestId('group-item-age')).toBeTruthy();
  });

  it('分组标题渲染为 STitle', () => {
    const groupItems = [
      {
        title: '基本信息',
        items: [{ type: 'input', label: '姓名', name: 'name' }],
      },
    ];
    render(<Group groupItems={groupItems as any} />);
    expect(screen.getByTestId('group-title')).toBeTruthy();
    expect(screen.getByText('基本信息')).toBeTruthy();
  });

  it('无标题 → 不渲染 STitle', () => {
    const groupItems = [
      { items: [{ type: 'input', label: '无标题', name: 'nt' }] },
    ];
    render(<Group groupItems={groupItems as any} />);
    expect(screen.queryByTestId('group-title')).toBeNull();
    expect(screen.getByTestId('group-item-nt')).toBeTruthy();
  });
});

// ============================================================
describe('SForm.Group — 多分组', () => {
  it('多个分组 → 全部渲染', () => {
    const groupItems = [
      { title: '分组A', items: [{ type: 'input', label: 'A1', name: 'a1' }] },
      { title: '分组B', items: [{ type: 'input', label: 'B1', name: 'b1' }] },
    ];
    render(<Group groupItems={groupItems as any} />);
    expect(screen.getByText('分组A')).toBeTruthy();
    expect(screen.getByText('分组B')).toBeTruthy();
    expect(screen.getByTestId('group-item-a1')).toBeTruthy();
    expect(screen.getByTestId('group-item-b1')).toBeTruthy();
  });
});

// ============================================================
describe('SForm.Group — hidden', () => {
  it('hidden: true 的项不渲染', () => {
    const groupItems = [
      {
        items: [
          { type: 'input', label: '可见', name: 'v' },
          { type: 'input', label: '隐藏', name: 'hid', hidden: true },
        ],
      },
    ];
    render(<Group groupItems={groupItems as any} />);
    expect(screen.getByTestId('group-item-v')).toBeTruthy();
    expect(screen.queryByTestId('group-item-hid')).toBeNull();
  });
});

// ============================================================
describe('SForm.Group — formName 嵌套', () => {
  it('formName 透传到 ItemRender', () => {
    const groupItems = [
      {
        formName: 'address',
        items: [{ type: 'input', label: '城市', name: 'city' }],
      },
    ];
    render(<Group groupItems={groupItems as any} />);
    const el = screen.getByTestId('group-item-city');
    expect(el.dataset.formName).toBe('address');
  });

  it('顶层 formName + 分组 formName → 分组级优先', () => {
    const groupItems = [
      {
        formName: 'inner',
        items: [{ type: 'input', label: '字段', name: 'field' }],
      },
    ];
    render(<Group groupItems={groupItems as any} formName="outer" />);
    const el = screen.getByTestId('group-item-field');
    // 分组自己的 formName 优先
    expect(el.dataset.formName).toBe('inner');
  });

  it('仅顶层 formName → item 收到顶层 formName', () => {
    const groupItems = [
      {
        items: [{ type: 'input', label: '字段', name: 'topField' }],
      },
    ];
    render(<Group groupItems={groupItems as any} formName="topLevel" />);
    const el = screen.getByTestId('group-item-topField');
    expect(el.dataset.formName).toBe('topLevel');
  });
});

// ============================================================
describe('SForm.Group — 列布局', () => {
  it('columns 不传 → 默认 span=24', () => {
    const groupItems = [
      { items: [{ type: 'input', label: '单列', name: 'single' }] },
    ];
    const { container } = render(<Group groupItems={groupItems as any} />);
    // 默认 columns=1 → span=24 → ant-col-24
    expect(container.querySelector('.ant-col-24')).toBeTruthy();
  });

  it('columns=2 → span=12', () => {
    const groupItems = [
      {
        columns: 2,
        items: [{ type: 'input', label: '双列', name: 'double' }],
      },
    ];
    const { container } = render(<Group groupItems={groupItems as any} />);
    expect(container.querySelector('.ant-col-12')).toBeTruthy();
  });

  it('columns=3 → span=8', () => {
    const groupItems = [
      {
        columns: 3,
        items: [{ type: 'input', label: '三列', name: 'triple' }],
      },
    ];
    const { container } = render(<Group groupItems={groupItems as any} />);
    expect(container.querySelector('.ant-col-8')).toBeTruthy();
  });
});

// ============================================================
describe('SForm.Group — 自定义容器', () => {
  it('groupItem.container → 优先级高于顶层 container', () => {
    const CustomInner = ({ children }: any) => (
      <fieldset data-testid="custom-inner">{children}</fieldset>
    );
    const CustomOuter = ({ children }: any) => (
      <div data-testid="custom-outer">{children}</div>
    );
    const groupItems = [
      {
        container: CustomInner,
        items: [{ type: 'input', label: '内层', name: 'in' }],
      },
    ];
    render(<Group groupItems={groupItems as any} container={CustomOuter} />);
    // 分组级 container 被 DynamicContainer mock 渲染
    expect(screen.getByTestId('custom-inner')).toBeTruthy();
    expect(screen.getByTestId('group-item-in')).toBeTruthy();
  });

  it('顶层 container → 所有分组共用', () => {
    const CustomContainer = ({ children }: any) => (
      <section data-testid="shared-container">{children}</section>
    );
    const groupItems = [
      { items: [{ type: 'input', label: '段1', name: 's1' }] },
      { items: [{ type: 'input', label: '段2', name: 's2' }] },
    ];
    render(
      <Group groupItems={groupItems as any} container={CustomContainer} />,
    );
    // DynamicContainer mock 渲染 CustomContainer + data-testid
    const containers = screen.getAllByTestId('shared-container');
    expect(containers.length).toBe(2);
  });
});

// ============================================================
describe('SForm.Group — readonly', () => {
  it('readonly 透传到所有 ItemRender', () => {
    const groupItems = [{ items: [{ type: 'input', label: 'R', name: 'r' }] }];
    render(<Group groupItems={groupItems as any} readonly />);
    expect(screen.getByTestId('group-item-r').dataset.readonly).toBe('true');
  });
});

// ============================================================
describe('SForm.Group — 事件回调', () => {
  it('onFinish → 提交触发', () => {
    let fired: any = null;
    const { container } = render(
      <Group
        groupItems={
          [{ items: [{ type: 'input', label: 'F', name: 'f' }] }] as any
        }
        onFinish={(v) => {
          fired = v;
        }}
      />,
    );
    fireEvent.submit(container.querySelector('form')!);
    expect(fired).toBeDefined();
  });

  it('onReset → reset 触发', () => {
    let fired = false;
    const { container } = render(
      <Group
        groupItems={
          [{ items: [{ type: 'input', label: 'R', name: 'r' }] }] as any
        }
        onReset={() => {
          fired = true;
        }}
      />,
    );
    fireEvent.reset(container.querySelector('form')!);
    expect(fired).toBe(true);
  });
});

// ============================================================
describe('SForm.Group — children', () => {
  it('children 渲染在分组之后', () => {
    render(
      <Group
        groupItems={
          [{ items: [{ type: 'input', label: '项', name: 'item' }] }] as any
        }
      >
        <div data-testid="after-children">尾部内容</div>
      </Group>,
    );
    expect(screen.getByTestId('group-item-item')).toBeTruthy();
    expect(screen.getByTestId('after-children')).toBeTruthy();
  });
});

// ============================================================
describe('SForm.Group — 空/边界', () => {
  it('空 groupItems 不报错', () => {
    const { container } = render(<Group groupItems={[]} />);
    expect(container.querySelector('form')).toBeTruthy();
  });

  it('无 groupItems prop 不报错', () => {
    const { container } = render(<Group groupItems={undefined as any} />);
    expect(container.querySelector('form')).toBeTruthy();
  });

  it('分组 items 为空 → 不报错', () => {
    const { container } = render(
      <Group groupItems={[{ title: '空分组', items: [] }] as any} />,
    );
    expect(container.querySelector('form')).toBeTruthy();
    expect(screen.getByText('空分组')).toBeTruthy();
  });
});
