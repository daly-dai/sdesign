// 由于我们需要模拟DOM环境，我们可以使用jsdom
// Jest默认已经集成了jsdom，所以通常不需要额外配置

import { afterAll, describe, expect, it, vi } from 'vitest';

import { downloadLink } from '../download';

// 我们可以使用jest.mock来模拟console.assert，因为console.assert在测试失败时会抛出错误
vi.mock('console', () => ({
  assert: vi.fn((condition, message, ...args) => {
    if (!condition) {
      throw new Error([message, ...args].join(' '));
    }
  }),
}));

// 使用jest.spyOn来模拟document.createElement和Element.click
const mockCreateElement = vi
  .spyOn(document, 'createElement')
  // @ts-ignore
  .mockImplementation(() => ({
    setAttribute: vi.fn(),
    click: vi.fn(),
  }));

describe('downloadLink function', () => {
  it('should set the href and download attributes correctly when title is provided', () => {
    const href = 'https://example.com/file.pdf';
    const title = 'MyFile';

    const a = {
      setAttribute: vi.fn(),
      click: vi.fn(),
    };
    // @ts-ignore
    mockCreateElement.mockReturnValue(a);

    downloadLink(href, title);

    expect(a.setAttribute).toHaveBeenCalledWith('href', href);
    expect(a.setAttribute).toHaveBeenCalledWith('download', title);
    expect(a.click).toHaveBeenCalled();
  });

  it('should set the href and download attributes correctly when title is not provided', () => {
    const href = 'https://example.com/some/path/file.pdf';

    const a = {
      setAttribute: vi.fn(),
      click: vi.fn(),
    };
    // @ts-ignore
    mockCreateElement.mockReturnValue(a);

    downloadLink(href);

    expect(a.setAttribute).toHaveBeenCalledWith('href', href);
    expect(a.setAttribute).toHaveBeenCalledWith('download', 'file.pdf'); // Extracted from href
    expect(a.click).toHaveBeenCalled();
  });
});

// 在测试完成后，确保清理模拟
afterAll(() => {
  mockCreateElement.mockRestore();
});
