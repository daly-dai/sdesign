import { render } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';

import { SUpload } from '@daly/sdesign';
import mountTest from '@daly/sdesign/tests/mountTest';

describe('SUpload', () => {
  mountTest(SUpload.Dragger);
  mountTest(() => <SUpload.Dragger />);
  mountTest(SUpload.Picture);
  mountTest(() => <SUpload.Picture />);
  it('should render correctly', () => {
    const { container } = render(<SUpload.Dragger />);
    expect(container).toMatchSnapshot();
  });

  it('should render Multi correctly', () => {
    const { container } = render(<SUpload.Picture />);
    expect(container).toMatchSnapshot();
  });

  it('should support children', () => {
    const { container } = render(<SUpload.Dragger></SUpload.Dragger>);

    expect(container).toMatchSnapshot();
  });
});
