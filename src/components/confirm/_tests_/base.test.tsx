import { fireEvent, render } from '@testing-library/react';
import { Button } from 'antd';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import SConfirm from '../index'; // 假设这是你的SConfirm组件的路径

import mountTest from '@dalydb/sdesign/tests/mountTest';
import { waitFakeTimer } from '@dalydb/sdesign/tests/utils';

describe('SConfirm component', () => {
  mountTest(SConfirm);

  mountTest(() => <SConfirm type="modal" />);
  it('should render  custom content', () => {
    const { getByText, container } = render(
      <SConfirm type="modal">
        <Button type="primary">Open Modal</Button>
      </SConfirm>,
    );

    expect(getByText('Open Modal')).toBeInTheDocument();
    expect(container.querySelector('.ant-btn-primary')).toBeInTheDocument();
  });

  it('should support modal type', () => {
    const { getByText } = render(
      <SConfirm type="modal">
        <Button>Open Modal</Button>
      </SConfirm>,
    );

    expect(getByText('Open Modal')).toBeInTheDocument();

    fireEvent.click(document.body.querySelectorAll('.ant-btn')[0]);

    expect(
      document.body.querySelectorAll('.ant-modal-root')[0],
    ).toMatchSnapshot();
  });

  it('should type default Popconfirm', () => {
    const { getByText, container } = render(
      <SConfirm>
        <Button className="PopconfirmBtn">Open Modal</Button>
      </SConfirm>,
    );

    expect(getByText('Open Modal')).toBeInTheDocument();

    fireEvent.click(container.querySelectorAll('.PopconfirmBtn')[0]);

    expect(
      document.body.querySelectorAll('.ant-popover-content')[0],
    ).toMatchSnapshot();
  });

  // 应该支持点击确认按钮，关闭弹窗，并调用confirm回调函数
  it('should support click confirm button and close modal', async () => {
    const handleConfirm = vi.fn();
    const handleCancel = vi.fn();

    const { getByText, container } = render(
      <SConfirm onConfirm={handleConfirm} onCancel={handleCancel}>
        <Button className="PopconfirmBtn">Open Modal</Button>
      </SConfirm>,
    );

    expect(container.querySelector('.ant-popover')).toBe(null);

    expect(getByText('Open Modal')).toBeInTheDocument();

    fireEvent.click(container.querySelectorAll('.PopconfirmBtn')[0]);

    await waitFakeTimer(100);

    expect(document.body.querySelector('.ant-popover')).not.toBeNull();
    expect(document.body.querySelector('.ant-popover')?.className).toContain(
      'ant-popover-placement-top',
    );
    expect(document.body.querySelector('.ant-popover')).toMatchSnapshot();
  });

  it('should support custom title and description', async () => {
    const { getByText, container } = render(
      <SConfirm title="自定义标题" description="自定义描述">
        <Button className="PopconfirmBtn">Open Modal</Button>
      </SConfirm>,
    );

    expect(container.querySelector('.ant-popover')).toBe(null);

    expect(getByText('Open Modal')).toBeInTheDocument();

    fireEvent.click(container.querySelectorAll('.PopconfirmBtn')[0]);

    await waitFakeTimer(100);

    expect(
      document.body.querySelector('.ant-popconfirm-title')?.textContent,
    ).toBe('自定义标题');
    expect(
      document.body.querySelector('.ant-popconfirm-description')?.textContent,
    ).toBe('自定义描述');
  });
});
