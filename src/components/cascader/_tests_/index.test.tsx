import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';

import SCascader from '../index';

import mountTest from '@daly/sdesign/tests/mountTest';

function toggleOpen(container: ReturnType<typeof render>['container']) {
  fireEvent.mouseDown(container.querySelector('.ant-select-selector')!);
}

function getDropdown(container: ReturnType<typeof render>['container']) {
  return container.querySelector('.ant-select-dropdown');
}

function isOpen(container: ReturnType<typeof render>['container']) {
  return container
    .querySelector('.ant-cascader')
    ?.className.includes('ant-select-open');
}

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

describe('SCascader', () => {
  // 测试组件
  mountTest(SCascader);
  mountTest(() => <SCascader />);

  it('should render correctly', () => {
    const { container } = render(<SCascader />);
    expect(container).toMatchSnapshot();
  });

  it('support controlled mode', () => {
    const { rerender, asFragment } = render(<SCascader options={options} />);

    rerender(
      <SCascader options={options} value={['zhejiang', 'hangzhou', 'xihu']} />,
    );

    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('support defaultValue by String', () => {
    const { container } = render(
      <SCascader options={options} defaultValue={'zhejiang,hangzhou'} />,
    );
    toggleOpen(container);
    expect(getDropdown(container)).toMatchSnapshot();
  });

  it('support value by String', () => {
    const { container } = render(
      <SCascader options={options} value={'zhejiang,hangzhou'} />,
    );

    toggleOpen(container);

    expect(getDropdown(container)).toMatchSnapshot();
  });

  it('popup correctly with defaultValue', () => {
    const { container } = render(
      <SCascader options={options} defaultValue={['zhejiang', 'hangzhou']} />,
    );
    toggleOpen(container);
    expect(getDropdown(container)).toMatchSnapshot();
  });

  it('should support popupVisible', () => {
    const { container } = render(
      <SCascader options={options} defaultValue={['zhejiang', 'hangzhou']} />,
    );

    expect(isOpen(container)).toBeFalsy();
  });

  it('should support undefined value', () => {
    const { container } = render(
      <SCascader options={options} value={undefined} />,
    );
    toggleOpen(container);

    expect(getDropdown(container)).toMatchSnapshot();
  });
});
