import { render } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';

import SLoading from '../index';

describe('SLoading', () => {
  it('should render correctly', () => {
    const { container } = render(<SLoading />);
    expect(container).toMatchSnapshot();
  });
});
