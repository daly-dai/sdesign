import { render, screen } from '@testing-library/react';
import mockdate from 'mockdate';
import React from 'react';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { ConfigContext } from '../../config-provider';
import STable from '../index';

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

afterAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: undefined,
  });
});

const mockGlobalDict = {
  userStatus: { '0': '禁用', '1': '启用' },
};

function Wrapper({
  children,
  dict,
}: {
  children: React.ReactNode;
  dict?: Record<string, Record<string, string>>;
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

const columns = [
  { title: '姓名', dataIndex: 'name' },
  { title: '年龄', dataIndex: 'age' },
];
const dataSource = [
  { key: '1', name: '张三', age: 25 },
  { key: '2', name: '李四', age: 30 },
];

describe('STable', () => {
  it('基础渲染：columns + dataSource', () => {
    render(
      <Wrapper>
        <STable columns={columns} dataSource={dataSource} />
      </Wrapper>,
    );
    expect(screen.getByText('张三')).toBeInTheDocument();
    expect(screen.getByText('李四')).toBeInTheDocument();
  });

  it('render: "datetime" 渲染为日期时间', () => {
    const timeColumns = [
      {
        title: '创建时间',
        dataIndex: 'createTime',
        render: 'datetime' as const,
      },
    ];
    const timeData = [{ key: '1', createTime: '2025-01-15 10:30:00' }];
    render(
      <Wrapper>
        <STable columns={timeColumns} dataSource={timeData} />
      </Wrapper>,
    );
    // dayjs 格式化后显示
    expect(screen.getByText('2025-01-15 10:30:00')).toBeInTheDocument();
  });

  it('dictKey 字典映射：文本被翻译', () => {
    const dictColumns = [
      { title: '状态', dataIndex: 'status', dictKey: 'userStatus' },
    ];
    const dictData = [{ key: '1', status: '0' }];
    render(
      <Wrapper dict={mockGlobalDict}>
        <STable columns={dictColumns} dataSource={dictData} />
      </Wrapper>,
    );
    expect(screen.getByText('禁用')).toBeInTheDocument();
  });

  it('dictKey + render: "ellipsis" 组合：先字典后省略', () => {
    const comboColumns = [
      {
        title: '状态',
        dataIndex: 'status',
        render: 'ellipsis' as const,
        dictKey: 'userStatus',
        width: 100,
      },
    ];
    const comboData = [{ key: '1', status: '1' }];
    render(
      <Wrapper dict={mockGlobalDict}>
        <STable columns={comboColumns} dataSource={comboData} />
      </Wrapper>,
    );
    // 先字典映射 '1' → '启用'，再省略渲染
    expect(screen.getByText('启用')).toBeInTheDocument();
  });

  it('空数据不报错', () => {
    render(
      <Wrapper>
        <STable columns={columns} dataSource={[]} />
      </Wrapper>,
    );
    expect(screen.getAllByText('No data').length).toBeGreaterThanOrEqual(1);
  });
});

describe('STable 字符串快捷渲染', () => {
  it('render: "date" 渲染为日期', () => {
    const cols = [{ title: '日期', dataIndex: 'd', render: 'date' as const }];
    render(
      <Wrapper>
        <STable
          columns={cols}
          dataSource={[{ key: '1', d: '2025-06-15 09:00:00' }]}
        />
      </Wrapper>,
    );
    expect(screen.getByText('2025-06-15')).toBeInTheDocument();
  });

  it('render: "index" 渲染行索引', () => {
    const cols = [{ title: '#', dataIndex: 'name', render: 'index' as const }];
    render(
      <Wrapper>
        <STable columns={cols} dataSource={dataSource} pagination={false} />
      </Wrapper>,
    );
    // 无分页干扰，可以精确匹配序号 1、2
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('render: "ellipsis" 无 width 退化为纯文本', () => {
    const cols = [
      { title: '备注', dataIndex: 'remark', render: 'ellipsis' as const },
    ];
    render(
      <Wrapper>
        <STable
          columns={cols}
          dataSource={[
            { key: '1', remark: '一段很长很长很长很长很长很长很长的文本' },
          ]}
        />
      </Wrapper>,
    );
    expect(
      screen.getByText('一段很长很长很长很长很长很长很长的文本'),
    ).toBeInTheDocument();
  });

  it('非法日期时间值原样返回', () => {
    const cols = [
      { title: '时间', dataIndex: 't', render: 'datetime' as const },
    ];
    render(
      <Wrapper>
        <STable columns={cols} dataSource={[{ key: '1', t: 'not-a-date' }]} />
      </Wrapper>,
    );
    expect(screen.getByText('not-a-date')).toBeInTheDocument();
  });

  it('未知字符串 render 走默认文本渲染', () => {
    const cols = [
      { title: '名称', dataIndex: 'name', render: 'unknown' as any },
    ];
    render(
      <Wrapper>
        <STable columns={cols} dataSource={[{ key: '1', name: '张三' }]} />
      </Wrapper>,
    );
    expect(screen.getByText('张三')).toBeInTheDocument();
  });
});

describe('STable dictKey 组合场景', () => {
  it('dictKey + render: "datetime"', () => {
    const cols = [
      {
        title: '时间',
        dataIndex: 't',
        render: 'datetime' as const,
        dictKey: 'userStatus',
      },
    ];
    render(
      <Wrapper dict={mockGlobalDict}>
        <STable columns={cols} dataSource={[{ key: '1', t: '0' }]} />
      </Wrapper>,
    );
    // '0' 先被 convertToText 保留为 '0'，查字典得 '禁用'，再传入 datetime render
    // datetime render 接收 '禁用'，dayjs 无法解析 → 原样返回
    expect(screen.getByText('禁用')).toBeInTheDocument();
  });

  it('dictKey 字典无对应 key 时回退原值', () => {
    const cols = [
      { title: '状态', dataIndex: 'status', dictKey: 'userStatus' },
    ];
    render(
      <Wrapper dict={mockGlobalDict}>
        <STable columns={cols} dataSource={[{ key: '1', status: '999' }]} />
      </Wrapper>,
    );
    expect(screen.getByText('999')).toBeInTheDocument();
  });

  it('dictKey 为 0 的字典值正常显示', () => {
    const dict = { score: { a: '0' } };
    const cols = [{ title: '分数', dataIndex: 'val', dictKey: 'score' }];
    render(
      <Wrapper dict={dict}>
        <STable columns={cols} dataSource={[{ key: '1', val: 'a' }]} />
      </Wrapper>,
    );
    // 字典值为 '0' 时应显示 '0' 而非回退
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('dictKey 字典值为数字 0（falsy）时正常显示，不因 || 回退', () => {
    const dict = { score: { a: 0 } } as any;
    const cols = [{ title: '分数', dataIndex: 'val', dictKey: 'score' }];
    render(
      <Wrapper dict={dict}>
        <STable columns={cols} dataSource={[{ key: '1', val: 'a' }]} />
      </Wrapper>,
    );
    // 字典值为 0（falsy）时，|| 会回退成 'a'，?? 应显示 '0'
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});

describe('STable 自定义 render', () => {
  it('自定义 render 函数正常工作', () => {
    const cols = [
      {
        title: '姓名',
        dataIndex: 'name',
        render: (t: string) => <span data-testid="custom">[{t}]</span>,
      },
    ];
    render(
      <Wrapper>
        <STable columns={cols} dataSource={[{ key: '1', name: '张三' }]} />
      </Wrapper>,
    );
    expect(screen.getByText('[张三]')).toBeInTheDocument();
  });
});

describe('STable 边界场景', () => {
  it('render:"datetime" 空值(undefined)不渲染成当前时间', () => {
    mockdate.set('2026-06-15 12:00:00');
    const cols = [
      { title: '时间', dataIndex: 't', render: 'datetime' as const },
    ];
    render(
      <Wrapper>
        <STable columns={cols} dataSource={[{ key: '1', t: undefined }]} />
      </Wrapper>,
    );
    // 修复前 dayjs(undefined) 返回当前时间，这里不应出现 mockdate 的当前时间
    expect(screen.queryByText('2026-06-15 12:00:00')).not.toBeInTheDocument();
    mockdate.reset();
  });

  it('render:"datetime" 13 位数字字符串时间戳正确解析（非 1681 年）', () => {
    const cols = [
      { title: '时间', dataIndex: 't', render: 'datetime' as const },
    ];
    render(
      <Wrapper>
        <STable
          columns={cols}
          dataSource={[{ key: '1', t: '1678447600000' }]}
        />
      </Wrapper>,
    );
    // 1678447600000 = 2023-03-10 19:26:40
    expect(screen.getByText('2023-03-10 19:26:40')).toBeInTheDocument();
  });
});
