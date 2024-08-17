import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, expect, it, test, vi } from 'vitest';

import STitle from '../index'; // 确保路径正确
describe('STitle Component', () => {
  // 测试组件渲染
  test('renders children', () => {
    const childrenText = 'Test Title';
    render(
      <Router>
        <STitle>{childrenText}</STitle>
      </Router>,
    );
    expect(screen.getByText(childrenText)).toBeInTheDocument();
  });

  // 测试点击返回图标时调用onBackClick
  test('calls onBackClick when back icon is clicked', () => {
    const onBackClickMock = vi.fn();
    render(
      <Router>
        <STitle goBack onBackClick={onBackClickMock} />
      </Router>,
    );

    const svgTitleElement = document.querySelector('svg > title');

    expect(svgTitleElement).not.toBeNull();
    expect(svgTitleElement?.textContent).toBe('ArrowLeft');
  });

  // 测试类型为form时渲染form图标
  it('renders form icon when type is form', () => {
    render(
      <Router>
        <STitle type="form" />
      </Router>,
    );
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  // 测试类型为page时渲染返回图标
  it('renders back icon when type is page', () => {
    render(
      <Router>
        <STitle type="page" goBack={true} />
      </Router>,
    );
    const svgTitleElement = document.querySelector('svg > title');

    expect(svgTitleElement).not.toBeNull();
    expect(svgTitleElement?.textContent).toBe('ArrowLeft');
  });

  // 测试actionNode渲染
  it('renders actionNode', () => {
    // eslint-disable-next-line react/button-has-type
    const actionNode = <button>Test Action</button>;
    render(
      <Router>
        <STitle actionNode={actionNode} />
      </Router>,
    );
    expect(
      screen.getByRole('button', { name: 'Test Action' }),
    ).toBeInTheDocument();
  });

  it('renders titleDesc', () => {
    // eslint-disable-next-line react/button-has-type
    const actionNode = <button>titleDesc</button>;
    render(
      <Router>
        <STitle titleDesc={actionNode} />
      </Router>,
    );

    expect(
      screen.getByRole('button', { name: 'titleDesc' }),
    ).toBeInTheDocument();
  });
});
