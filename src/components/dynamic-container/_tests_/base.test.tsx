import { render } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, test } from 'vitest';

import DynamicContainer from '../index';

import mountTest from '@dalydb/sdesign/tests/mountTest';

describe('DynamicContainer', () => {
  mountTest(DynamicContainer);
  mountTest(() => <DynamicContainer />);

  // 模拟一个自定义的容器组件
  const CustomContainer = ({ children }: any) => (
    <div className="custom-container">{children}</div>
  );

  // 测试默认渲染情况（没有 CustomContainer，但有 isCard）
  it('renders with default props', () => {
    const { container } = render(
      <DynamicContainer>Default Content</DynamicContainer>,
    );

    expect(container).toMatchSnapshot(); // 你可以使用 snapshot testing 来验证输出
  });

  // 测试使用 CustomContainer 的情况
  it('should support customChildren', () => {
    const { container, getByText } = render(
      <DynamicContainer CustomContainer={CustomContainer}>
        Custom Content
      </DynamicContainer>,
    );

    expect(container).toMatchSnapshot();
    const customChildren = getByText('Custom Content');
    expect(customChildren).toBeInTheDocument();
  });

  // 测试没有 isCard 的情况
  test('renders without isCard', () => {
    const { container, queryAllByRole } = render(
      <DynamicContainer isCard={false}>No Card Content</DynamicContainer>,
    );
    expect(container).toMatchSnapshot();
    const divEle = queryAllByRole('div');
    expect(divEle).toEqual([]);
  });

  // 测试使用 SCard 的情况（确保 SCard 组件按预期工作）
  it('support render customContainer', () => {
    const { container, getByText } = render(
      <DynamicContainer CustomContainer={CustomContainer}>
        Card Content
      </DynamicContainer>,
    );

    expect(container).toMatchSnapshot();
    const custom = getByText('Card Content');

    expect(custom).toHaveClass('custom-container');
  });
});
