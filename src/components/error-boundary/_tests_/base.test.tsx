import { render } from '@testing-library/react';
import { Button } from 'antd';
import React from 'react';
import { describe, expect, it } from 'vitest';

import SErrorBoundary from '../index';

import mountTest from '@dalydb/sdesign/tests/mountTest';

describe('error-boundary', () => {
  mountTest(SErrorBoundary);
  mountTest(() => <SErrorBoundary />);

  it('should render current', () => {
    const { container } = render(
      <SErrorBoundary>
        <Button type="primary">取消</Button>
        <Button type="primary">提交</Button>
      </SErrorBoundary>,
    );

    expect(container).toMatchSnapshot();
  });
});
