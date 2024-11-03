import { render } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';

import SFile from '../index';

import mountTest from '@dalydb/sdesign/tests/mountTest';

const fileData = {
  fileName: 'test.png',
  fileUrl: 'https://test.com',
};
describe('file', () => {
  mountTest(SFile);
  mountTest(() => <SFile />);

  it('should render current', () => {
    const { container } = render(<SFile fileData={fileData} />);

    expect(container).toMatchSnapshot();
  });
});
