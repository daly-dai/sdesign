import { render } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';

import SCard from '../index';

import mountTest from '@dalydb/sdesign/tests/mountTest';

describe('SCard', () => {
  // 测试组件
  mountTest(SCard);
  mountTest(() => <SCard />);

  it('should render correctly', () => {
    const { container } = render(<SCard />);
    expect(container).toMatchSnapshot();
  });

  it('should support props style', () => {
    const { container } = render(<SCard style={{ backgroundColor: 'red' }} />);
    expect(container).toMatchSnapshot();
  });

  it('should support custom className', () => {
    const { container } = render(<SCard className="test-class" />);

    expect(container.querySelectorAll('.test-class').length).toBe(1);
    expect(container).toMatchSnapshot();
  });

  it('should support hasBottomPadding props', () => {
    const { container } = render(
      <SCard className="s-card-jest" hasBottomPadding />,
    );

    const el = container.querySelector('.s-card-jest');

    expect(el).toHaveStyle({ marginBottom: '16px' });
    expect(container).toMatchSnapshot();
  });

  it('should support props extends Card Props', () => {
    const { container } = render(
      <SCard
        className="s-card-jest"
        title="test-title"
        extra={<div>test-extra</div>}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render children correctly', () => {
    const { container } = render(
      <SCard>
        <div>test-children</div>
      </SCard>,
    );

    expect(container).toMatchSnapshot();
  });
});
