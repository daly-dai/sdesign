import { describe, expect, it, vi } from 'vitest';

import { downloadBlob } from '../download';

describe('downloadBlob function', () => {
  // 创建一个mock的response对象
  const mockResponse = {
    data: 'Hello, World! This is a test blob.',
  };

  // 由于我们不能直接测试文件下载（这是由浏览器处理的），
  // 我们将验证是否调用了必要的DOM操作。
  it('should create a blob, create an anchor element, set its attributes, and click it', () => {
    // 创建一个mock的URL.createObjectURL函数
    const createObjectURL = vi.fn(() => 'blob:mockurl');
    window.URL.createObjectURL = createObjectURL; // 覆盖全局的URL.createObjectURL

    // 创建一个mock的click事件
    const mockClickEvent = vi.fn();
    // 创建一个模拟的anchor元素，并添加click事件的mock实现
    const mockAnchor = {
      setAttribute: vi.fn(),
      click: mockClickEvent,
    };

    // 覆盖document.createElement以返回我们的mockAnchor
    // @ts-ignore
    document.createElement = vi.fn(() => mockAnchor);

    // 调用函数进行测试
    downloadBlob(mockResponse, 'test.txt');

    // 验证是否创建了Blob对象（在jsdom中可能无法直接验证，但我们可以信任Browser API）
    // 验证是否调用了createObjectURL
    expect(createObjectURL).toHaveBeenCalledWith(new Blob([mockResponse.data]));

    // 验证是否设置了正确的href和download属性
    expect(mockAnchor.setAttribute).toHaveBeenCalledWith(
      'href',
      'blob:mockurl',
    );
    expect(mockAnchor.setAttribute).toHaveBeenCalledWith(
      'download',
      'test.txt',
    );

    // 验证是否点击了anchor元素
    expect(mockClickEvent).toHaveBeenCalled();
  });
});
