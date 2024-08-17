import { render } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';

import SNoPage from '../index';

describe('SNoPage', () => {
  it('should render correctly', () => {
    const { container } = render(<SNoPage />);
    expect(container).toMatchSnapshot();
  });

  it('should support custom text', () => {
    const { container, getByText } = render(<SNoPage text="自定义文本" />);
    expect(container).toMatchSnapshot();
    expect(getByText('自定义文本')).toBeInTheDocument();
  });
});
