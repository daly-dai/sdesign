import { render } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import SSelect from '../index';

import SConfigProvider from '@dalydb/sdesign/components/config-provider';
import mountTest from '@dalydb/sdesign/tests/mountTest';
import { waitFakeTimer } from '@dalydb/sdesign/tests/utils';

const globalDict = {
  level: {
    L1: '不敏感',
    L2: '低敏感',
    L3: '较敏感',
    L4: '敏感',
    L5: '极敏感',
  },
  type: {
    app_link: '存量应用关联',
    register: '发布注册',
  },
};

describe('SSelect', () => {
  mountTest(SSelect);
  mountTest(() => <SSelect options={[]} />);
  it('should render correctly', () => {
    const { container } = render(<SSelect />);
    expect(container).toMatchSnapshot();
  });

  it('should render dictKey', () => {
    const { container, getByText } = render(
      <SConfigProvider globalDict={globalDict}>
        <SSelect defaultOpen dictKey="level" />
      </SConfigProvider>,
    );

    expect(container).toMatchSnapshot();

    waitFakeTimer();

    expect(getByText('不敏感')).toBeInTheDocument();
  });

  it('should options props priority dict props', () => {
    const onChange = vi.fn();

    const { container, getByText } = render(
      <SSelect
        dict={globalDict.level}
        onChange={onChange}
        defaultOpen
        options={[
          {
            label: '存量应用关联',
            value: 'app_link',
          },
          {
            label: '发布注册',
            value: 'register',
          },
        ]}
      />,
    );

    expect(container).toMatchSnapshot();

    waitFakeTimer();

    expect(getByText('存量应用关联')).toBeInTheDocument();
  });
});
