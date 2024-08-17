import { render, screen } from '@testing-library/react';
import React, { useContext } from 'react';
import { describe, expect, it } from 'vitest';

import { ConfigContext } from '../../config-provider/contexts';
import SConfigProvider from '../index';

describe('SConfigProvider', () => {
  it('renders children with globalDict and uploadUrl', () => {
    const dictionaryMap = { testKey: 'testValue' };
    const uploadUrl = 'https://example.com/upload';
    const TestComponent = () => {
      const { globalDict, uploadUrl } = useContext(ConfigContext);
      return (
        <div>
          <div data-testid="globalDict">{JSON.stringify(globalDict)}</div>
          <div data-testid="uploadUrl">{uploadUrl}</div>
        </div>
      );
    };

    render(
      <SConfigProvider globalDict={dictionaryMap} uploadUrl={uploadUrl}>
        <TestComponent />
      </SConfigProvider>,
    );

    const globalDictElement = screen.getByTestId('globalDict');
    expect(globalDictElement).toHaveTextContent(JSON.stringify(dictionaryMap));

    const uploadUrlElement = screen.getByTestId('uploadUrl');
    expect(uploadUrlElement).toHaveTextContent(uploadUrl);
  });

  it('updates globalDict when dictionaryMap changes', () => {
    const initialDictionaryMap = { testKey: 'initialValue' };
    const updatedDictionaryMap = { testKey: 'updatedValue' };
    const TestComponent = () => {
      const { globalDict } = useContext(ConfigContext);
      return <div data-testid="globalDict">{JSON.stringify(globalDict)}</div>;
    };

    const { rerender } = render(
      <SConfigProvider
        globalDict={initialDictionaryMap}
        uploadUrl="https://example.com/upload"
      >
        <TestComponent />
      </SConfigProvider>,
    );

    const globalDictElement = screen.getByTestId('globalDict');
    expect(globalDictElement).toHaveTextContent(
      JSON.stringify(initialDictionaryMap),
    );

    rerender(
      <SConfigProvider
        globalDict={updatedDictionaryMap}
        uploadUrl="https://example.com/upload"
      >
        <TestComponent />
      </SConfigProvider>,
    );

    expect(globalDictElement).toHaveTextContent(
      JSON.stringify(updatedDictionaryMap),
    );
  });

  it('sets an empty globalDict when dictionaryMap is not provided', () => {
    const TestComponent = () => {
      const { globalDict } = useContext(ConfigContext);
      return <div data-testid="globalDict">{JSON.stringify(globalDict)}</div>;
    };

    render(
      <SConfigProvider uploadUrl="https://example.com/upload">
        <TestComponent />
      </SConfigProvider>,
    );

    const globalDictElement = screen.getByTestId('globalDict');
    expect(globalDictElement).toHaveTextContent('{}');
  });
});
