import { render } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';

import STextEllipsis from '../index';

import mountTest from '@daly/sdesign/tests/mountTest';

describe('STextEllipsis', () => {
  mountTest(STextEllipsis.Single);
  mountTest(() => <STextEllipsis.Single />);
  mountTest(STextEllipsis.Multi);
  mountTest(() => <STextEllipsis.Multi />);
  it('should render correctly', () => {
    const { container } = render(<STextEllipsis.Single />);
    expect(container).toMatchSnapshot();
  });
  it('should render Multi correctly', () => {
    const { container } = render(<STextEllipsis.Multi />);
    expect(container).toMatchSnapshot();
  });
});
