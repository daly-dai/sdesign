import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import SDetail from '../index';
import { SDetailItem } from '../types';

import mountTest from '@daly/sdesign/tests/mountTest';

describe('SDetail', () => {
  mountTest(SDetail);

  mountTest(() => <SDetail />);

  it('renders detail instance with title', () => {
    render(
      <Router>
        <SDetail title="User Detail" />
      </Router>,
    );

    const titleElement = screen.getByText('User Detail');
    expect(titleElement).toBeInTheDocument();
  });

  it('renders detail label & dataSource by name', () => {
    const items: SDetailItem[] = [
      {
        label: 'Name',
        name: 'Item',
      },
      {
        label: 'Name1',
        name: 'Item1',
      },
    ];

    const dataSource = {
      Item: 'John Doe',
      Item1: '111',
    };

    render(
      <Router>
        <SDetail items={items} dataSource={dataSource} />
      </Router>,
    );

    const dataElement = screen.queryByText('John Doe');
    expect(dataElement).toBeInTheDocument();
    const dataElement1 = screen.queryByText('111');
    expect(dataElement1).toBeInTheDocument();

    const labelElement = screen.queryByText('Name');
    expect(labelElement).toBeInTheDocument();
    const labelElement1 = screen.queryByText('Name1');
    expect(labelElement1).toBeInTheDocument();
  });

  it('render Nested data structures by detailData', () => {
    const items: SDetailItem[] = [
      {
        label: 'Name',
        name: 'Item',
      },
    ];

    const dataSource = {
      base: { Item: 'John Doe' },
    };

    render(
      <Router>
        <SDetail items={items} detailName="base" dataSource={dataSource} />
      </Router>,
    );

    const dataElement = screen.queryByText('John Doe');
    expect(dataElement).toBeInTheDocument();

    const labelElement = screen.queryByText('Name');
    expect(labelElement).toBeInTheDocument();
  });
});
