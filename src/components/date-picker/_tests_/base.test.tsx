import { fireEvent, render } from '@testing-library/react';
import dayjs from 'dayjs';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import SDatePicker from '../index';

import mountTest from '@daly/sdesign/tests/mountTest';

describe('SDatePicker', () => {
  mountTest(SDatePicker);

  mountTest(() => <SDatePicker />);

  it('renders correctly', () => {
    const { getByPlaceholderText } = render(
      <SDatePicker onChange={() => {}} />,
    );
    const inputElement = getByPlaceholderText('请选择');
    expect(inputElement).toBeInTheDocument();
  });

  it('render correctly with default value width string', () => {
    const { container } = render(<SDatePicker open value={'2000-01-01'} />);

    expect(
      container.querySelector('div.ant-picker-dropdown')?.parentNode,
    ).toMatchSnapshot();
  });

  it('render correctly with default value width dayjs', () => {
    const birthday = dayjs('2000-01-01');
    // @ts-ignore
    const { container } = render(<SDatePicker open value={birthday} />);

    expect(
      container.querySelector('div.ant-picker-dropdown')?.parentNode,
    ).toMatchSnapshot();
  });

  it('calls onChange when the date is selected', () => {
    const handleChange = vi.fn();
    const { getByPlaceholderText } = render(
      <SDatePicker popupClassName="custom-popup" onChange={handleChange} />,
    );
    const inputElement = getByPlaceholderText('请选择');
    const popupElement = document.body.querySelector('.custom-popup');
    expect(popupElement).toMatchSnapshot();

    fireEvent.change(inputElement);
  });

  it('disables clear button when allowClear is false', () => {
    const { getByPlaceholderText, queryByRole } = render(
      <SDatePicker allowClear={false} onChange={() => {}} />,
    );
    const inputElement = getByPlaceholderText('请选择');
    fireEvent.click(inputElement);
    const clearButton = queryByRole('button', { name: /清除/i });
    expect(clearButton).toBeNull();
  });
});
