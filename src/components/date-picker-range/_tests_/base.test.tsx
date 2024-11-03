import { render } from '@testing-library/react';
import dayjs from 'dayjs';
import React from 'react';
import { describe, expect, it } from 'vitest';

import SDatePickerRange from '../index';

import mountTest from '@dalydb/sdesign/tests/mountTest';

describe('SDatePickerRange', () => {
  mountTest(SDatePickerRange);

  mountTest(() => <SDatePickerRange />);

  it('renders correctly', () => {
    const { getByPlaceholderText } = render(
      <SDatePickerRange onChange={() => {}} />,
    );
    const inputElement = getByPlaceholderText('Start date');
    expect(inputElement).toBeInTheDocument();
  });

  it('render correctly with default value width string', () => {
    const { container, getByPlaceholderText } = render(
      <SDatePickerRange open value={['2000-01-01', '2000-01-02']} />,
    );

    const inputElement = getByPlaceholderText('Start date');
    // @ts-ignore
    expect(inputElement.value).toBe('2000-01-01');

    const inputEndElement = getByPlaceholderText('End date');
    // @ts-ignore
    expect(inputEndElement.value).toBe('2000-01-02');

    expect(
      container.querySelector('div.ant-picker-dropdown')?.parentNode,
    ).toMatchSnapshot();
  });

  it('should render correctly with default value width Dayjs value', () => {
    const startDate = dayjs('2000-01-01');
    const endDate = dayjs('2000-01-02');

    const { getByPlaceholderText } = render(
      <SDatePickerRange value={[startDate, endDate]} />,
    );

    const inputElement = getByPlaceholderText('Start date');
    // @ts-ignore
    expect(inputElement.value).toBe('2000-01-01');

    const inputEndElement = getByPlaceholderText('End date');
    // @ts-ignore
    expect(inputEndElement.value).toBe('2000-01-02');
  });

  it('should render correctly with default value width object', () => {
    const date = {
      key1: '2022-02-18',
      key2: '2022-03-23',
    };

    const { getByPlaceholderText } = render(<SDatePickerRange value={date} />);

    const inputElement = getByPlaceholderText('Start date');
    // @ts-ignore
    expect(inputElement.value).toBe('2022-02-18');

    const inputEndElement = getByPlaceholderText('End date');
    // @ts-ignore
    expect(inputEndElement.value).toBe('2022-03-23');
  });

  it('should support custom date format', () => {
    const { getByPlaceholderText } = render(
      <SDatePickerRange
        format={'YYYY/MM/DD'}
        value={['2000-01-01', '2000-01-02']}
      />,
    );

    const inputElement = getByPlaceholderText('Start date');
    // @ts-ignore
    expect(inputElement.value).toBe('2000/01/01');

    const inputEndElement = getByPlaceholderText('End date');
    // @ts-ignore
    expect(inputEndElement.value).toBe('2000/01/02');
  });
});
