import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import SCollapse from '../index';

import mountTest from '@daly/sdesign/tests/mountTest';

describe('SCollapse', () => {
  mountTest(SCollapse);

  mountTest(() => <SCollapse />);

  it('should render correctly', () => {
    const { container } = render(<SCollapse />);
    expect(container).toMatchSnapshot();
  });

  it('should toggle collapse state on click', () => {
    const setCollapseMock = vi.fn();
    const onExpandMock = vi.fn();

    const { getByText } = render(
      <SCollapse
        collapse={false}
        setCollapse={setCollapseMock}
        onExpand={onExpandMock}
      />,
    );

    const button = getByText('收起');
    fireEvent.click(button);
    expect(setCollapseMock).toHaveBeenCalledWith(true);
    expect(onExpandMock).toHaveBeenCalledWith(true);
  });

  it('should toggle collapse state on button click', () => {
    const setCollapseMock = vi.fn();
    const onExpandMock = vi.fn();
    const { getByText } = render(
      <SCollapse
        collapse={false}
        setCollapse={setCollapseMock}
        onExpand={onExpandMock}
      />,
    );

    // 初始状态应该是“展开”和图标没有旋转
    expect(getByText('收起')).toBeInTheDocument();

    // 点击按钮
    fireEvent.click(getByText('收起'));

    // 验证 setCollapse 和 onExpand 被调用，并且状态变为“收起”
    expect(setCollapseMock).toHaveBeenCalledTimes(1);
    expect(setCollapseMock).toHaveBeenCalledWith(true);
    expect(onExpandMock).toHaveBeenCalledTimes(1);
    expect(onExpandMock).toHaveBeenCalledWith(true);
    expect(getByText('收起')).toBeInTheDocument();
  });
});
