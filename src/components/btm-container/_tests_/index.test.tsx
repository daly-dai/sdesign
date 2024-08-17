import { render } from '@testing-library/react';
import { Button } from 'antd';
import React from 'react';
import { describe, expect, it } from 'vitest';

import mountTest from '../../../tests/mountTest';
import SBtmContainer from '../index'; // 假设这是你的组件文件路径

describe('SBtmContainer', () => {
  mountTest(SBtmContainer);
  mountTest(() => <SBtmContainer />);

  it('should support custom style', () => {
    const { container } = render(
      <SBtmContainer style={{ background: '#333' }} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should support props full', () => {
    const { container } = render(<SBtmContainer full />);

    expect(container).toMatchSnapshot();
  });

  it('should render children correctly', () => {
    const { container } = render(
      <SBtmContainer>
        <Button type="primary">取消</Button>
        <Button type="primary">提交</Button>
      </SBtmContainer>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should support custom icon className', () => {
    const { container } = render(
      <SBtmContainer className="custom-SBtmContainer" />,
    );
    expect(container.querySelectorAll('.custom-SBtmContainer').length).toBe(1);
    expect(container).toMatchSnapshot();
  });

  it('fix renders {0} , 0 and {false}', () => {
    expect(
      render(<SBtmContainer>{0}</SBtmContainer>).container.firstChild,
    ).toMatchSnapshot();
    expect(
      render(<SBtmContainer>0</SBtmContainer>).container.firstChild,
    ).toMatchSnapshot();
    expect(
      render(<SBtmContainer>{false}</SBtmContainer>).container.firstChild,
    ).toMatchSnapshot();
  });

  it('should merge text if children using variable', () => {
    const wrapper = render(
      <SBtmContainer>
        {/* eslint-disable-next-line react/jsx-curly-brace-presence */}
        This {'is'} a test {1}
      </SBtmContainer>,
    );
    expect(wrapper.container.firstChild).toMatchSnapshot();
  });

  it('should render width empty children', () => {
    const { container } = render(
      <SBtmContainer>
        <span />
        <span />
      </SBtmContainer>,
    );

    expect(
      container.querySelector<HTMLDivElement>('div.ant-space'),
      // @ts-ignore
    ).toHaveClass('ant-space-gap-row-small');
    expect(
      container.querySelector<HTMLDivElement>('div.ant-space'),
      // @ts-ignore
    ).toHaveClass('ant-space-gap-col-small');
  });

  // 你可以添加更多测试用例来覆盖不同的 props 和场景
});
