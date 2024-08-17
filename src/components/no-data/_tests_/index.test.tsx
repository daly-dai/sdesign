import { render } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';

import SNoData from '../index';

describe('SNoData', () => {
  it('should render correctly', () => {
    const { container } = render(<SNoData />);
    expect(container).toMatchSnapshot();
  });

  it('should render different width componentName icon', () => {
    let componentName = 'Table';
    render(<SNoData componentName={componentName} />);

    const svgTitleElement = document.querySelector('svg > title');

    expect(svgTitleElement).not.toBeNull();
    expect(svgTitleElement?.textContent).toBe('noData');

    const svgElement = svgTitleElement?.parentElement;
    expect(svgElement).not.toBeNull();
    expect(svgElement?.tagName).toBe('svg');
  });

  it('should render  icon without componentName', () => {
    render(<SNoData />);

    const svgTitleElement = document.querySelector('svg > title');

    expect(svgTitleElement).not.toBeNull();
    expect(svgTitleElement?.textContent).toBe('noData');

    const svgElement = svgTitleElement?.parentElement;
    expect(svgElement).not.toBeNull();
    expect(svgElement?.tagName).toBe('svg');
  });

  it('should render different width componentName text', () => {
    let componentName = 'Select';
    render(<SNoData componentName={componentName} />);
    const svgTitleElement = document.querySelector('svg > title');

    expect(svgTitleElement).toBeNull();
  });
});
