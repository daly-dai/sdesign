import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import SCollapse from '../index';

describe('SCollapse', () => {
  it('collapse=true（收起态）点击展开 → onExpand 收到 true（展开状态）', () => {
    const onExpand = vi.fn();
    render(
      <SCollapse collapse={true} setCollapse={() => {}} onExpand={onExpand} />,
    );

    fireEvent.click(screen.getByText('展开'));

    // 修复前 onExpand(!collapse) 传点击前旧值 false；应为点击后的展开状态 true
    expect(onExpand).toHaveBeenCalledWith(true);
  });

  it('collapse=false（展开态）点击收起 → onExpand 收到 false', () => {
    const onExpand = vi.fn();
    render(
      <SCollapse collapse={false} setCollapse={() => {}} onExpand={onExpand} />,
    );

    fireEvent.click(screen.getByText('收起'));

    expect(onExpand).toHaveBeenCalledWith(false);
  });

  it('setCollapse 收到切换后的折叠状态', () => {
    const setCollapse = vi.fn();
    render(<SCollapse collapse={true} setCollapse={setCollapse} />);

    fireEvent.click(screen.getByText('展开'));

    expect(setCollapse).toHaveBeenCalledWith(false);
  });

  it('disabled 时不触发任何回调', () => {
    const onExpand = vi.fn();
    const setCollapse = vi.fn();
    render(
      <SCollapse
        collapse={true}
        setCollapse={setCollapse}
        onExpand={onExpand}
        disabled
      />,
    );

    fireEvent.click(screen.getByText('展开'));

    expect(onExpand).not.toHaveBeenCalled();
    expect(setCollapse).not.toHaveBeenCalled();
  });
});
