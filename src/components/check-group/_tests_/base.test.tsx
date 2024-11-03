import { fireEvent, render } from '@testing-library/react';
import { Checkbox } from 'antd';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import SConfigProvider from '../../config-provider';
import SCheckGroup from '../index';

import mountTest from '@dalydb/sdesign/tests/mountTest';

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

describe('checkBoxGroup', () => {
  mountTest(SCheckGroup);

  mountTest(() => <SCheckGroup />);

  it('should render correctly', () => {
    const { container } = render(<SCheckGroup />);
    expect(container).toMatchSnapshot();
  });

  it('should support dictKey', () => {
    const { container } = render(
      <SConfigProvider globalDict={globalDict}>
        <SCheckGroup dictKey="level" />
      </SConfigProvider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should options props > dict props', () => {
    const onChange = vi.fn();

    const { container } = render(
      <SCheckGroup
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

    fireEvent.click(container.querySelectorAll('.ant-checkbox-input')[0]);
    expect(onChange).toHaveBeenCalledWith('app_link');
  });

  it('should work basically', () => {
    const onChange = vi.fn();

    const { container } = render(
      <SCheckGroup
        dict={globalDict.level}
        onChange={onChange}
        dictKey="level"
      />,
    );

    fireEvent.click(container.querySelectorAll('.ant-checkbox-input')[0]);
    expect(onChange).toHaveBeenCalledWith('L1');
    fireEvent.click(container.querySelectorAll('.ant-checkbox-input')[1]);
    expect(onChange).toHaveBeenCalledWith('L1,L2');
    fireEvent.click(container.querySelectorAll('.ant-checkbox-input')[2]);
    expect(onChange).toHaveBeenCalledWith('L1,L2,L3');
    fireEvent.click(container.querySelectorAll('.ant-checkbox-input')[1]);
    expect(onChange).toHaveBeenCalledWith('L1,L3');
  });

  it('should support dict', () => {
    const { container } = render(<SCheckGroup dict={globalDict.level} />);

    expect(container).toMatchSnapshot();
  });

  it('should support disableKeys', () => {
    const onChangeGroup = vi.fn();

    const { container } = render(
      <SConfigProvider globalDict={globalDict}>
        <SCheckGroup dictKey="level" disableKeys={['L1']} />
      </SConfigProvider>,
    );

    fireEvent.click(container.querySelectorAll('.ant-checkbox-input')[0]);
    expect(onChangeGroup).not.toHaveBeenCalled();
  });

  it('should support children', () => {
    const onChange = vi.fn();

    const { container } = render(
      <SCheckGroup onChange={onChange}>
        <Checkbox value={'L1'} />
        <Checkbox value={'L2'} />
      </SCheckGroup>,
    );

    fireEvent.click(container.querySelectorAll('.ant-checkbox-input')[0]);
    expect(onChange).toHaveBeenCalledWith('L1');
    fireEvent.click(container.querySelectorAll('.ant-checkbox-input')[1]);
    expect(onChange).toHaveBeenCalledWith('L1,L2');
  });
});
