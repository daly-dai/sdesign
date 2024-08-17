import { render } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';

import SSpin from '../index';

import mountTest from '@daly/sdesign/tests/mountTest';

describe('SSpin', () => {
  mountTest(SSpin);
  mountTest(() => <SSpin />);

  it('should render correctly', () => {
    const { container } = render(<SSpin />);
    expect(container).toMatchSnapshot();
  });

  it("should render correctly with 'size' prop", () => {
    const { container } = render(<SSpin size="small" />);

    expect(container).toMatchSnapshot();
  });

  it('should render loadingIcon width spinning true', () => {
    const { container } = render(<SSpin spinning />);
    expect(container).toMatchSnapshot();
  });
});
