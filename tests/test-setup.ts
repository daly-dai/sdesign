import '@testing-library/jest-dom';
import { vi } from 'vitest';

const origError = console.error;

console.error = function (...msg) {
  const filterText = ['<TestComponent>', 'WrapperError'];
  if (filterText.some((keyword) => msg.join('').includes(keyword))) return;

  return origError.apply(this, msg);
};

if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // deprecated
      removeListener: vi.fn(), // deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}
