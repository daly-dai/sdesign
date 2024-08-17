import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';

import SForm from '../index';
import { SFormItems } from '../types';

describe('SForm.Search', () => {
  /**
   * TODO: 测试用例
   * - 测试props
   * 支持默认设置是否展示展开收起按钮showExpand
   * 支持设置默认是展开还是收起的状态 defaultExpand
   *  支持自定义容器 container
   *  支持动态计算列数
   *
   */

  const items: SFormItems[] = [
    {
      type: 'input',
      label: '查询输入框',
      name: 'key',
    },
    {
      type: 'select',
      label: '查询下拉框',
      name: 'key1',
    },
    {
      type: 'input',
      label: '查询输入框',
      name: 'key3',
    },
    {
      type: 'select',
      label: '查询下拉框',
      name: 'key4',
    },
    {
      type: 'select',
      label: '查询下拉框',
      name: 'key5',
    },
  ];

  it('should support config showExpand', () => {
    const { getByText } = render(<SForm.Search items={items} />);

    const expandBtn = getByText('展开');

    expect(expandBtn).toBeInTheDocument();
  });

  it('should support config showExpand false', () => {
    render(<SForm.Search showExpand={false} items={items} />);

    expect(screen.queryByText('展开')).not.toBeInTheDocument();
  });

  it('should support config defaultExpand', () => {
    render(<SForm.Search defaultExpand={false} items={items} />);
    expect(screen.queryByText('收起')).toBeInTheDocument();
  });

  it('should support config container', () => {
    const Container = ({ children }: any) => {
      return <div>222{children}</div>;
    };
    render(<SForm.Search items={items} container={Container} />);
    expect(screen.queryByText('222')).toBeInTheDocument();
  });

  it('should  support config dynamicColumns with showExpand true', () => {
    const { container } = render(<SForm.Search items={items} />);
    expect(container).toMatchSnapshot();

    const columnsItems = container.querySelectorAll('.ant-col-8');

    expect(columnsItems.length).toBe(3);
  });

  it('should  support config dynamicColumns with showExpand false', () => {
    const { container } = render(
      <SForm.Search showExpand={false} items={items} />,
    );

    const columnsItems = container.querySelectorAll('.ant-col-8');

    expect(columnsItems.length).toBe(6);
  });
});
