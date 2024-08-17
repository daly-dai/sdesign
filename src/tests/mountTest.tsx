import { render } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';

/**
 * 该函数用于挂载并测试React组件的挂载和卸载过程。
 * 它主要验证组件在更新和卸载时不会抛出错误。
 * @param Component 要测试的React组件类型。
 */
// eslint-disable-next-line jest/no-export
function mountTest(Component: React.ComponentType) {
  describe(`mount and unmount`, () => {
    // 测试组件能否在更新和卸载时无错误
    // https://github.com/ant-design/ant-design/pull/18441
    it(`component could be updated and unmounted without errors`, () => {
      // 渲染组件，并获取卸载和重新渲染的函数
      const { unmount, rerender } = render(<Component />);
      // 验证组件在重新渲染和卸载过程中是否不会抛出错误
      expect(() => {
        rerender(<Component />);
        unmount();
      }).not.toThrow();
    });
  });
}

export default mountTest;
