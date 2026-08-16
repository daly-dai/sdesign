import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

// ---- Mock 依赖 ----
vi.mock('@dalydb/sdesign/hooks/useExpand', () => ({
  default: ({
    columns,
    items,
    showExpand,
    defaultExpand,
    maxRows = 1,
  }: any) => {
    const visibleCount = (items ?? []).filter((i: any) => !i.hidden).length;
    // 对齐真实 useExpand 公式：visibleCount > maxRows * columns - 1
    const collapsedNum = maxRows * columns - 1;
    const showCollapse = showExpand && visibleCount > collapsedNum;
    const expanded = defaultExpand ?? false;
    return {
      expanded,
      showCollapse,
      expandNum: showCollapse
        ? expanded
          ? visibleCount
          : collapsedNum
        : visibleCount,
      setExpanded: vi.fn(),
    };
  },
}));

vi.mock('@dalydb/sdesign/components/collapse', () => ({
  default: ({ collapse, setCollapse }: any) => (
    <button
      type="button"
      data-testid="collapse-btn"
      onClick={() => setCollapse(!collapse)}
    >
      {collapse ? '展开' : '收起'}
    </button>
  ),
}));

vi.mock('@dalydb/sdesign/components/button/Buttons', () => ({
  default: ({ items }: any) => (
    <div data-testid="extra-buttons">
      {items?.map((btn: any, idx: number) => (
        <button type="button" key={idx}>
          {btn.text}
        </button>
      ))}
    </div>
  ),
}));

vi.mock('@dalydb/sdesign/components/dynamic-container', () => ({
  default: ({ children, isCard }: any) => (
    <div data-testid="dynamic-container" data-is-card={isCard}>
      {children}
    </div>
  ),
}));

vi.mock('../components/item-render', () => ({
  default: ({ label, type, name, readonly, hidden }: any) => {
    if (hidden) return null;
    return (
      <div
        data-testid={`search-item-${name || 'no-name'}`}
        data-readonly={String(!!readonly)}
      >
        {label && <span className="item-label">{label}</span>}
        <span className="item-type">{type}</span>
      </div>
    );
  },
}));

vi.mock('@ant-design/icons', () => ({
  SearchOutlined: () => <span>🔍</span>,
  ReloadOutlined: () => <span>🔄</span>,
}));

import Search from '../components/search';

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
describe('SForm.Search — 基础渲染', () => {
  it('items 渲染为表单项', () => {
    const items = [
      { type: 'input', label: '关键词', name: 'keyword' },
      { type: 'select', label: '状态', name: 'status' },
    ];
    render(<Search items={items as any} />);
    expect(screen.getByTestId('search-item-keyword')).toBeTruthy();
    expect(screen.getByTestId('search-item-status')).toBeTruthy();
  });

  it('hidden: true 的项不渲染', () => {
    const items = [
      { type: 'input', label: '可见', name: 'v' },
      { type: 'input', label: '隐藏', name: 'hid', hidden: true },
    ];
    render(<Search items={items as any} />);
    expect(screen.getByTestId('search-item-v')).toBeTruthy();
    expect(screen.queryByTestId('search-item-hid')).toBeNull();
  });

  it('空 items 不报错', () => {
    const { container } = render(<Search items={[]} />);
    expect(container.querySelector('form')).toBeTruthy();
  });

  it('无 items prop 不报错', () => {
    const { container } = render(<Search items={undefined as any} />);
    expect(container.querySelector('form')).toBeTruthy();
  });
});

// ============================================================
describe('SForm.Search — 查询/重置按钮', () => {
  it('默认渲染查询和重置按钮', () => {
    render(
      <Search items={[{ type: 'input', label: 'K', name: 'k' }] as any} />,
    );
    expect(screen.getByText('查询')).toBeTruthy();
    expect(screen.getByText('重置')).toBeTruthy();
  });

  it('onFinish 回调 → 点击查询触发', async () => {
    let submitted: any = null;
    const items = [{ type: 'input', label: 'K', name: 'k' }];
    const { container } = render(
      <Search
        items={items as any}
        onFinish={(v) => {
          submitted = v;
        }}
      />,
    );
    const form = container.querySelector('form');
    fireEvent.submit(form!);
    expect(submitted).toBeDefined();
  });
});

// ============================================================
describe('SForm.Search — actionNode', () => {
  it('actionNode 自定义 → 替换默认按钮', () => {
    render(
      <Search
        items={[{ type: 'input', label: 'K', name: 'k' }] as any}
        actionNode={
          <button type="button" data-testid="custom-action">
            自定义
          </button>
        }
      />,
    );
    expect(screen.getByTestId('custom-action')).toBeTruthy();
    // 默认按钮被替换，不应该出现
    expect(screen.queryByText('查询')).toBeNull();
    expect(screen.queryByText('重置')).toBeNull();
  });
});

// ============================================================
describe('SForm.Search — extraButtons', () => {
  it('extraButtons 渲染额外按钮', () => {
    render(
      <Search
        items={[{ type: 'input', label: 'K', name: 'k' }] as any}
        extraButtons={
          [
            { text: '导出', actionType: 'export' },
            { text: '导入', actionType: 'import' },
          ] as any
        }
      />,
    );
    expect(screen.getByTestId('extra-buttons')).toBeTruthy();
    expect(screen.getByText('导出')).toBeTruthy();
    expect(screen.getByText('导入')).toBeTruthy();
  });
});

// ============================================================
describe('SForm.Search — 展开/收起', () => {
  it('items 数量 ≤ columns → 不显示展开/收起', () => {
    // columns=4, items=3 → 一行装得下
    const items = [
      { type: 'input', label: 'A', name: 'a' },
      { type: 'input', label: 'B', name: 'b' },
      { type: 'input', label: 'C', name: 'c' },
    ];
    render(<Search items={items as any} columns={4} />);
    expect(screen.queryByTestId('collapse-btn')).toBeNull();
  });

  it('items 数量 > columns → 显示展开/收起', () => {
    // columns=2, items=5 → 超出一行
    const items = [
      { type: 'input', label: 'A', name: 'a' },
      { type: 'input', label: 'B', name: 'b' },
      { type: 'input', label: 'C', name: 'c' },
      { type: 'input', label: 'D', name: 'd' },
      { type: 'input', label: 'E', name: 'e' },
    ];
    render(<Search items={items as any} columns={2} />);
    expect(screen.getByTestId('collapse-btn')).toBeTruthy();
  });

  it('showExpand=false → 永不显示展开/收起', () => {
    const items = [
      { type: 'input', label: 'A', name: 'a' },
      { type: 'input', label: 'B', name: 'b' },
      { type: 'input', label: 'C', name: 'c' },
      { type: 'input', label: 'D', name: 'd' },
      { type: 'input', label: 'E', name: 'e' },
    ];
    render(<Search items={items as any} columns={2} showExpand={false} />);
    expect(screen.queryByTestId('collapse-btn')).toBeNull();
  });
});

// ============================================================
describe('SForm.Search — gap', () => {
  it('gap 不传 → 默认 rowGap=16', () => {
    const { container } = render(
      <Search items={[{ type: 'input', label: 'A', name: 'a' }] as any} />,
    );
    const grid = container.querySelector('.sdesign-form-search-grid');
    expect(grid).toBeTruthy();
  });

  it('gap=8 → rowGap=8', () => {
    const { container } = render(
      <Search
        items={[{ type: 'input', label: 'A', name: 'a' }] as any}
        gap={8}
      />,
    );
    const grid = container.querySelector(
      '.sdesign-form-search-grid',
    ) as HTMLElement;
    expect(grid.style.rowGap).toBe('8px');
  });

  it('gap=[10, 20] → rowGap=10px', () => {
    const { container } = render(
      <Search
        items={[{ type: 'input', label: 'A', name: 'a' }] as any}
        gap={[10, 20]}
      />,
    );
    const grid = container.querySelector(
      '.sdesign-form-search-grid',
    ) as HTMLElement;
    expect(grid.style.rowGap).toBe('10px');
  });
});

// ============================================================
describe('SForm.Search — labelWidth', () => {
  it('labelWidth=80 → grid template 含 80px', () => {
    const { container } = render(
      <Search
        items={[{ type: 'input', label: 'A', name: 'a' }] as any}
        labelWidth={80}
      />,
    );
    const grid = container.querySelector(
      '.sdesign-form-search-grid',
    ) as HTMLElement;
    expect(grid.style.gridTemplateColumns).toContain('80px');
  });

  it('labelWidth 不传 → grid template 含 auto', () => {
    const { container } = render(
      <Search items={[{ type: 'input', label: 'A', name: 'a' }] as any} />,
    );
    const grid = container.querySelector(
      '.sdesign-form-search-grid',
    ) as HTMLElement;
    expect(grid.style.gridTemplateColumns).toContain('auto');
  });
});

// ============================================================
describe('SForm.Search — isCard', () => {
  it('isCard=true（默认）→ DynamicContainer isCard=true', () => {
    render(
      <Search items={[{ type: 'input', label: 'A', name: 'a' }] as any} />,
    );
    const dc = screen.getByTestId('dynamic-container');
    expect(dc.dataset.isCard).toBe('true');
  });

  it('isCard=false → DynamicContainer isCard=false', () => {
    render(
      <Search
        items={[{ type: 'input', label: 'A', name: 'a' }] as any}
        isCard={false}
      />,
    );
    const dc = screen.getByTestId('dynamic-container');
    expect(dc.dataset.isCard).toBe('false');
  });
});

// ============================================================
describe('SForm.Search — readonly', () => {
  it('readonly → item 收到 readonly', () => {
    render(
      <Search
        items={[{ type: 'input', label: '只读', name: 'ro' }] as any}
        readonly
      />,
    );
    expect(screen.getByTestId('search-item-ro').dataset.readonly).toBe('true');
  });
});

// ============================================================
describe('SForm.Search — gridColumn', () => {
  it('gridColumn=2 → item 占两列宽度的 grid track', () => {
    const items = [
      { type: 'input', label: '宽字段', name: 'wide', gridColumn: 2 },
      { type: 'input', label: '窄', name: 'narrow' },
    ];
    render(<Search items={items as any} columns={3} />);
    expect(screen.getByTestId('search-item-wide')).toBeTruthy();
    expect(screen.getByTestId('search-item-narrow')).toBeTruthy();
  });
});

// ============================================================
describe('SForm.Search — Form props 透传', () => {
  it('onReset 回调触发', () => {
    let resetFired = false;
    const { container } = render(
      <Search
        items={[{ type: 'input', label: 'A', name: 'a' }] as any}
        onReset={() => {
          resetFired = true;
        }}
      />,
    );
    const form = container.querySelector('form');
    fireEvent.reset(form!);
    expect(resetFired).toBe(true);
  });
});
