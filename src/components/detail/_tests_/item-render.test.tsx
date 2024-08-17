import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, test } from 'vitest';

import DetailItem from '../components/item-render';

import mountTest from '@daly/sdesign/tests/mountTest';

describe('DetailItem', () => {
  mountTest(DetailItem);

  mountTest(() => <DetailItem />);

  test('renders text value correctly', () => {
    render(<DetailItem type="text" value="Test Text" />);
    const textElement = screen.getByText('Test Text');
    expect(textElement).toBeInTheDocument();
  });

  test('renders empty value correctly', () => {
    render(<DetailItem type="empty" value={null} />);
    const emptyElement = screen.getByText('-');
    expect(emptyElement).toBeInTheDocument();
  });

  test('renders placeholder value correctly', () => {
    const { container } = render(
      <DetailItem type="placeholder" value={null} />,
    );

    const textElement = container.querySelector('div');
    // const placeholderElement = screen.getByText('');
    expect(textElement?.nodeValue).toEqual(null);
  });

  test('renders dict value correctly', () => {
    const dictMap = { '1': 'One', '2': 'Two' };
    const value = '1';
    render(<DetailItem type="dict" value={value} dictMap={dictMap} />);
    const dictElement = screen.getByText('One');
    expect(dictElement).toBeInTheDocument();
  });

  test('renders file value correctly', () => {
    const value = {
      fileName: 'TestFile.pdf',
      fileUrl: 'https://example.com/test-file.pdf',
    };

    render(<DetailItem type="file" value={value} />);
    const dictElement = screen.getByText('TestFile.pdf');
    expect(dictElement).toBeInTheDocument();
  });

  test('renders rangeTime value correctly', () => {
    const value = ['2021-02-26', '2021-02-27'];
    render(<DetailItem type="rangeTime" value={value} />);
    const rangeTimeElement = screen.getByText('2021-02-26 - 2021-02-27');
    expect(rangeTimeElement).toBeInTheDocument();
  });

  test('renders checkbox value correctly', () => {
    const dictMap = { '1': 'One', '2': 'Two' };

    const value = '1';
    render(<DetailItem type="checkbox" value={value} dictMap={dictMap} />);
    const checkboxElement = screen.getByText('One');
    expect(checkboxElement).toBeInTheDocument();
  });

  test('renders checkbox  value correctly', () => {
    const dictMap = { '1': 'One', '2': 'Two' };

    const value = '1,2';
    render(<DetailItem type="checkbox" value={value} dictMap={dictMap} />);
    const checkboxElement = screen.getByText('One/Two');
    expect(checkboxElement).toBeInTheDocument();
  });
});
