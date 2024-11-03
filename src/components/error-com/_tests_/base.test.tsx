import { render } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';

import SErrorCom from '../index';

import mountTest from '@dalydb/sdesign/tests/mountTest';

describe('error-boundary', () => {
  mountTest(SErrorCom);
  mountTest(() => <SErrorCom />);

  it('should render current', () => {
    const { container } = render(<SErrorCom></SErrorCom>);

    expect(container).toMatchSnapshot();
  });
});
