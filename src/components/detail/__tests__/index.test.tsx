import { render, screen } from '@testing-library/react';
import React from 'react';
import { beforeAll, describe, expect, it } from 'vitest';

import { ConfigContext } from '../../config-provider';
import SDetail from '../index';

// antd 依赖 window.matchMedia（responsiveObserver）
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

function Wrapper({
  children,
  dict,
}: {
  children: React.ReactNode;
  dict?: Record<string, any>;
}) {
  return (
    <ConfigContext.Provider
      value={{
        globalDict: dict ?? {},
        getPrefixCls: (s?: string) => (s ? `ant-${s}` : 'ant'),
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
}

describe('SDetail', () => {
  it('基础渲染：label + text value', () => {
    render(
      <Wrapper>
        <SDetail
          items={[{ label: '姓名', name: 'name' }]}
          dataSource={{ name: '张三' }}
        />
      </Wrapper>,
    );
    expect(screen.getByText('姓名')).toBeInTheDocument();
    expect(screen.getByText('张三')).toBeInTheDocument();
  });

  it('name 为字符串数组时取多个顶层字段（rangeTime）', () => {
    render(
      <Wrapper>
        <SDetail
          items={[
            { label: '有效期', type: 'rangeTime', name: ['start', 'end'] },
          ]}
          dataSource={{ start: '2024-01-01', end: '2024-12-31' }}
        />
      </Wrapper>,
    );
    // rangeTime 渲染为 "start - end"
    expect(screen.getByText('2024-01-01 - 2024-12-31')).toBeInTheDocument();
  });

  it('type=dict 通过 dictKey + globalDict 映射', () => {
    render(
      <Wrapper dict={{ status: { 1: '启用', 0: '禁用' } }}>
        <SDetail
          items={[
            { label: '状态', name: 'status', type: 'dict', dictKey: 'status' },
          ]}
          dataSource={{ status: 1 }}
        />
      </Wrapper>,
    );
    expect(screen.getByText('启用')).toBeInTheDocument();
  });

  it('text 空值显示默认 "-"', () => {
    render(
      <Wrapper>
        <SDetail
          items={[{ label: '备注', name: 'remark' }]}
          dataSource={{ remark: null }}
        />
      </Wrapper>,
    );
    expect(screen.getByText('-')).toBeInTheDocument();
  });

  it('text 值为 false 显示默认 "-"（而非空白）', () => {
    render(
      <Wrapper>
        <SDetail
          items={[{ label: '标志', name: 'flag' }]}
          dataSource={{ flag: false }}
        />
      </Wrapper>,
    );
    expect(screen.getByText('-')).toBeInTheDocument();
  });

  it('label 为 undefined 时不渲染空 label 单元格', () => {
    const { container } = render(
      <Wrapper>
        <SDetail items={[{ name: 'name' }]} dataSource={{ name: '张三' }} />
      </Wrapper>,
    );
    // label 缺省时不应渲染 .sdetail-label
    expect(container.querySelector('.sdetail-label')).toBeNull();
  });

  it('detailName 点号路径取嵌套数据', () => {
    render(
      <Wrapper>
        <SDetail
          detailName="user.profile"
          items={[{ label: '姓名', name: 'name' }]}
          dataSource={{ user: { profile: { name: '李四' } } }}
        />
      </Wrapper>,
    );
    expect(screen.getByText('李四')).toBeInTheDocument();
  });

  it('items 含 null 元素时不抛错', () => {
    expect(() =>
      render(
        <Wrapper>
          <SDetail
            items={[{ label: '姓名', name: 'name' }, null as any]}
            dataSource={{ name: '张三' }}
          />
        </Wrapper>,
      ),
    ).not.toThrow();
    expect(screen.getByText('张三')).toBeInTheDocument();
  });

  it('透传 data-testid 到根元素（restProps 透传）', () => {
    const { container } = render(
      <Wrapper>
        <SDetail
          data-testid="detail-root"
          items={[{ label: '姓名', name: 'name' }]}
          dataSource={{ name: '张三' }}
        />
      </Wrapper>,
    );
    expect(
      container.querySelector('[data-testid="detail-root"]'),
    ).not.toBeNull();
  });
});

describe('SDetail.Group', () => {
  it('分组渲染：组内 items + 组数据源', () => {
    render(
      <Wrapper>
        <SDetail.Group
          items={[
            {
              groupTitle: '基本信息',
              items: [{ label: '姓名', name: 'name' }],
            },
          ]}
          dataSource={{ name: '张三' }}
        />
      </Wrapper>,
    );
    expect(screen.getByText('基本信息')).toBeInTheDocument();
    expect(screen.getByText('张三')).toBeInTheDocument();
  });

  it('hidden 分组不渲染', () => {
    const { container } = render(
      <Wrapper>
        <SDetail.Group
          items={[
            {
              groupTitle: '隐藏组',
              hidden: true,
              items: [{ label: '姓名', name: 'name' }],
            },
          ]}
          dataSource={{ name: '张三' }}
        />
      </Wrapper>,
    );
    expect(screen.queryByText('隐藏组')).toBeNull();
    expect(container.firstChild).toBeNull();
  });
});
