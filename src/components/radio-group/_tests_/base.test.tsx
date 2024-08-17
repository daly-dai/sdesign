import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import SRadioGroup from '../index';

import SConfigProvider from '@daly/sdesign/components/config-provider';
import mountTest from '@daly/sdesign/tests/mountTest';
import { waitFakeTimer } from '@daly/sdesign/tests/utils';

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

describe('SRadioGroup', () => {
  mountTest(SRadioGroup);
  mountTest(() => <SRadioGroup options={[]} />);
  it('should render correctly', () => {
    const { container } = render(<SRadioGroup />);
    expect(container).toMatchSnapshot();
  });

  it('should render dictKey', () => {
    const { container, getByText } = render(
      <SConfigProvider globalDict={globalDict}>
        <SRadioGroup dictKey="level" />
      </SConfigProvider>,
    );

    expect(container).toMatchSnapshot();

    waitFakeTimer();

    expect(getByText('不敏感')).toBeInTheDocument();
  });

  it('should options props priority dict props', () => {
    const onChange = vi.fn();

    const { container, getByText } = render(
      <SRadioGroup
        dict={globalDict.level}
        onChange={onChange}
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

  it('should work basically', () => {
    const onChange = vi.fn();

    const { container } = render(
      <SRadioGroup dict={globalDict.level} onChange={onChange} />,
    );

    waitFakeTimer();

    fireEvent.click(container.querySelectorAll('.ant-radio-wrapper')[0]);
    expect(onChange).toHaveBeenCalledWith('L1');
    fireEvent.click(container.querySelectorAll('.ant-radio-wrapper')[1]);
    expect(onChange).toHaveBeenCalledWith('L2');
    fireEvent.click(container.querySelectorAll('.ant-radio-wrapper')[2]);
    expect(onChange).toHaveBeenCalledWith('L3');
    fireEvent.click(container.querySelectorAll('.ant-radio-wrapper')[1]);
    expect(onChange).toHaveBeenCalledWith('L1');
  });

  it('should support disableKeys', () => {
    const onChangeGroup = vi.fn();

    const { container } = render(
      <SConfigProvider globalDict={globalDict}>
        <SRadioGroup dictKey="level" disableKeys={['L1']} />
      </SConfigProvider>,
    );

    fireEvent.click(
      container.querySelectorAll('.ant-radio-wrapper-disabled')[0],
    );
    expect(onChangeGroup).not.toHaveBeenCalled();
  });
});
