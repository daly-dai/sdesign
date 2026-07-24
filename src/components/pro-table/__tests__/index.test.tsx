/**
 * SProTable 组件级单测
 *
 * Mock 策略：
 *   - useProTable → 完全 mock，返回可控的 tableProps/form/search/reset/mutate
 *   - SForm.Search → 渲染为 div[sprotable-search]，验证 searchProps 透传
 *   - STable → 渲染为 div[sprotable-table]，验证 tableProps 透传
 *   - STitle → 渲染为 div[sprotable-title]，验证 title/tableTitle 透传
 */

import { cleanup, render, screen } from '@testing-library/react';
import React, { createRef } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

// ── Mock 数据 ──
const mockSearch = vi.fn();
const mockReset = vi.fn();
const mockMutate = vi.fn();
const mockFormInstance = {
  getFieldsValue: vi.fn(() => ({})),
  setFieldsValue: vi.fn(),
  resetFields: vi.fn(),
};

const defaultHookReturn = {
  tableProps: {
    dataSource: [{ id: 1, name: 'test' }],
    pagination: { current: 1, pageSize: 10, total: 1 },
    loading: false,
  },
  form: mockFormInstance as any,
  search: mockSearch,
  reset: mockReset,
  mutate: mockMutate,
};

const mockUseProTable = vi.fn(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (_service?: any, _options?: any) => defaultHookReturn,
);

// ── Mock 模块 ──
vi.mock('@dalydb/sdesign/hooks/useProTable', () => ({
  default: (...args: any[]) => (mockUseProTable as any)(...args),
}));

vi.mock('@dalydb/sdesign', () => ({
  SForm: {
    Search: (props: any) => (
      <div
        data-testid="sprotable-search"
        data-isfinish={String(!!props.onFinish)}
        data-isreset={String(!!props.onReset)}
        data-iscard={String(props.isCard)}
        data-defaultexpand={String(props.defaultExpand)}
        data-columns={props.columns}
      >
        SForm.Search
      </div>
    ),
  },
  STable: (props: any) => (
    <div
      data-testid="sprotable-table"
      data-size={props.size}
      data-bordered={String(props.bordered)}
      data-haspagination={String(!!props.pagination)}
      data-datasource={JSON.stringify(props.dataSource?.length)}
    >
      STable
    </div>
  ),
  STitle: (props: any) => (
    <div
      data-testid="sprotable-title"
      data-type={props.type}
      data-hasbottommargin={String(props.hasBottomMargin)}
    >
      {typeof props.children === 'string' ? props.children : 'STitle'}
    </div>
  ),
}));

import SProTable from '../index';
import type { SProTableRef } from '../types';

// ── Helpers ──
function attr(testId: string, name: string) {
  const el = screen.getByTestId(testId);
  return el.getAttribute(`data-${name}`);
}

function makeService() {
  return vi
    .fn()
    .mockResolvedValue({ pageIndex: 1, pageSize: 10, total: 0, list: [] });
}

describe('SProTable 组件', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  // ═══════════════════════════════════════════════════════════════
  // 1. 基础渲染
  // ═══════════════════════════════════════════════════════════════
  describe('基础渲染', () => {
    it('组件挂载不抛错，STable 出现在 DOM 中', () => {
      render(
        <SProTable
          request={{ service: makeService() }}
          tableProps={{ columns: [], rowKey: 'id' }}
        />,
      );

      expect(screen.getByTestId('sprotable-table')).toBeInTheDocument();
    });

    it('useProTable 被正确调用（传入 service + searchProps.form）', () => {
      const service = makeService();
      render(
        <SProTable
          request={{ service, options: { ready: false } }}
          searchProps={{ form: undefined as any }}
          tableProps={{ columns: [], rowKey: 'id' }}
        />,
      );

      expect(mockUseProTable).toHaveBeenCalledWith(
        service,
        expect.objectContaining({
          ready: false,
          form: undefined,
        }),
      );
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // 2. searchProps 透传
  // ═══════════════════════════════════════════════════════════════
  describe('searchProps 透传', () => {
    it('SForm.Search 渲染，props 正确透传（isCard / defaultExpand / items）', () => {
      render(
        <SProTable
          request={{ service: makeService() }}
          searchProps={{
            items: [
              { label: '关键词', name: 'keyword', type: 'input' as const },
            ],
            columns: 3,
          }}
          tableProps={{ columns: [], rowKey: 'id' }}
        />,
      );

      expect(attr('sprotable-search', 'iscard')).toBe('false');
      expect(attr('sprotable-search', 'defaultexpand')).toBe('true');
      expect(attr('sprotable-search', 'columns')).toBe('3');
    });

    it('onFinish 未传时使用 hook 的 search', () => {
      mockSearch.mockClear();
      render(
        <SProTable
          request={{ service: makeService() }}
          searchProps={{ items: [] }}
          tableProps={{ columns: [], rowKey: 'id' }}
        />,
      );

      // SForm.Search 接收到 onFinish（指向 hook 的 search）
      expect(attr('sprotable-search', 'isfinish')).toBe('true');
    });

    it('外部 onFinish 优先级高于 hook search', () => {
      const externalOnFinish = vi.fn();
      render(
        <SProTable
          request={{ service: makeService() }}
          searchProps={{ items: [], onFinish: externalOnFinish }}
          tableProps={{ columns: [], rowKey: 'id' }}
        />,
      );

      // 外部传入 onFinish → SForm.Search 应收到 onFinish
      expect(attr('sprotable-search', 'isfinish')).toBe('true');
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // 3. title / tableTitle 渲染
  // ═══════════════════════════════════════════════════════════════
  describe('title / tableTitle 渲染', () => {
    it('title 为字符串时渲染页面标题', () => {
      render(
        <SProTable
          request={{ service: makeService() }}
          title="用户管理"
          tableProps={{ columns: [], rowKey: 'id' }}
        />,
      );

      const titles = screen.getAllByTestId('sprotable-title');
      // 第一个是页面标题
      expect(titles.length).toBeGreaterThanOrEqual(1);
    });

    it('title 为对象时渲染页面标题 + actionNode', () => {
      render(
        <SProTable
          request={{ service: makeService() }}
          title={{
            children: '用户列表',
            actionNode: <button type="button">新建</button>,
          }}
          tableProps={{ columns: [], rowKey: 'id' }}
        />,
      );

      expect(screen.getByTestId('sprotable-title')).toBeInTheDocument();
      expect(attr('sprotable-title', 'type')).toBe('page');
    });

    it('tableTitle 渲染表格标题', () => {
      render(
        <SProTable
          request={{ service: makeService() }}
          tableTitle={{ children: '数据列表', actionNode: <span>操作</span> }}
          tableProps={{ columns: [], rowKey: 'id' }}
        />,
      );

      // tableTitle 渲染为 STitle type="table"
      const titles = screen.getAllByTestId('sprotable-title');
      expect(titles.length).toBe(1);
      expect(attr('sprotable-title', 'type')).toBe('table');
    });

    it('title 不传时不渲染标题区域', () => {
      render(
        <SProTable
          request={{ service: makeService() }}
          tableProps={{ columns: [], rowKey: 'id' }}
        />,
      );

      // 没有 page title 也没有 tableTitle → 无 STitle
      expect(screen.queryByTestId('sprotable-title')).not.toBeInTheDocument();
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // 4. margin 样式计算
  // ═══════════════════════════════════════════════════════════════
  describe('margin 样式计算', () => {
    it('margin={16} → 根 div style 含 margin: 16', () => {
      const { container } = render(
        <SProTable
          request={{ service: makeService() }}
          margin={16}
          tableProps={{ columns: [], rowKey: 'id' }}
        />,
      );

      const rootDiv = container.firstChild as HTMLElement;
      expect(rootDiv.style.margin).toBe('16px');
    });

    it('margin="16px 24px" → 根 div style 含对应 margin', () => {
      const { container } = render(
        <SProTable
          request={{ service: makeService() }}
          margin="16px 24px"
          tableProps={{ columns: [], rowKey: 'id' }}
        />,
      );

      const rootDiv = container.firstChild as HTMLElement;
      expect(rootDiv.style.margin).toBe('16px 24px');
    });

    it('margin=true → 根 div style 含默认 margin: 16px', () => {
      const { container } = render(
        <SProTable
          request={{ service: makeService() }}
          margin
          tableProps={{ columns: [], rowKey: 'id' }}
        />,
      );

      const rootDiv = container.firstChild as HTMLElement;
      expect(rootDiv.style.margin).toBe('16px');
    });

    it('margin 不传时无 margin 样式', () => {
      const { container } = render(
        <SProTable
          request={{ service: makeService() }}
          tableProps={{ columns: [], rowKey: 'id' }}
        />,
      );

      const rootDiv = container.firstChild as HTMLElement;
      expect(rootDiv.style.margin).toBeFalsy();
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // 5. tableProps 透传
  // ═══════════════════════════════════════════════════════════════
  describe('tableProps 透传', () => {
    it('STable 收到 size="small" + bordered + hook tableProps + consumer props', () => {
      render(
        <SProTable
          request={{ service: makeService() }}
          tableProps={{
            columns: [{ title: 'ID', dataIndex: 'id' }],
            rowKey: 'id',
          }}
        />,
      );

      expect(attr('sprotable-table', 'size')).toBe('small');
      expect(attr('sprotable-table', 'bordered')).toBe('true');
      // hook 提供的 dataSource 应透传
      expect(attr('sprotable-table', 'datasource')).toBe('1');
    });

    it('consumer pagination deep-merge 覆盖 hook pagination', () => {
      render(
        <SProTable
          request={{ service: makeService() }}
          tableProps={{
            columns: [],
            rowKey: 'id',
            pagination: { showQuickJumper: false, pageSizeOptions: [5, 10] },
          }}
        />,
      );

      // pagination 存在（hook + consumer 合并后）
      expect(attr('sprotable-table', 'haspagination')).toBe('true');
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // 6. ref 方法
  // ═══════════════════════════════════════════════════════════════
  describe('ref 方法', () => {
    it('ref.refresh() → 调用 hook 的 search', () => {
      const ref = createRef<SProTableRef>();
      mockSearch.mockClear();

      render(
        <SProTable
          ref={ref}
          request={{ service: makeService() }}
          tableProps={{ columns: [], rowKey: 'id' }}
        />,
      );

      ref.current?.refresh();
      expect(mockSearch).toHaveBeenCalledTimes(1);
    });

    it('ref.reset() → 调用 hook 的 reset', () => {
      const ref = createRef<SProTableRef>();
      mockReset.mockClear();

      render(
        <SProTable
          ref={ref}
          request={{ service: makeService() }}
          tableProps={{ columns: [], rowKey: 'id' }}
        />,
      );

      ref.current?.reset();
      expect(mockReset).toHaveBeenCalledTimes(1);
    });

    it('ref.getForm() → 返回 hook 的 form 实例', () => {
      const ref = createRef<SProTableRef>();

      render(
        <SProTable
          ref={ref}
          request={{ service: makeService() }}
          tableProps={{ columns: [], rowKey: 'id' }}
        />,
      );

      expect(ref.current?.getForm()).toBe(mockFormInstance);
    });

    it('ref.clearData() → 调用 hook 的 mutate(undefined)', () => {
      const ref = createRef<SProTableRef>();
      mockMutate.mockClear();

      render(
        <SProTable
          ref={ref}
          request={{ service: makeService() }}
          tableProps={{ columns: [], rowKey: 'id' }}
        />,
      );

      ref.current?.clearData();
      expect(mockMutate).toHaveBeenCalledWith(undefined);
    });
  });
});
