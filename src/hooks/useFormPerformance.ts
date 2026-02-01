import { useEffect, useRef } from 'react';

export const useFormPerformance = (formName?: string) => {
  const renderStart = useRef<number>(0);

  useEffect(() => {
    // 记录渲染开始时间
    renderStart.current = performance.now();

    return () => {
      // 在组件卸载时记录渲染时间
      const renderTime = performance.now() - renderStart.current;
      if (renderTime > 16) {
        // 超过一帧的时间
        console.warn(
          `SForm ${formName || 'unnamed'} rendering took ${renderTime}ms`,
        );
      }
    };
  }, [formName]);

  // 记录表单项数量
  const logItemCount = (count: number) => {
    if (count > 50) {
      console.info(
        `SForm ${
          formName || 'unnamed'
        } has ${count} items, consider virtualization`,
      );
    }
  };

  return { logItemCount };
};
