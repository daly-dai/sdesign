import { useEffect, useState } from 'react';

import { createCode } from '@dalydb/sdesign/utils';

const useDetail = () => {
  const [containerWidth, setContainerWidth] = useState<number | null>(null);

  const [componentId] = useState(`irsDetail-${createCode(5)}`);

  /**
   * 获取Detail容器宽度
   * @param domId
   */
  const getContainerWidth = () => {
    const container = document.getElementById(componentId);

    if (!container) {
      setContainerWidth(null);
      return;
    }

    const result = container.clientWidth;

    setContainerWidth(result);
  };

  useEffect(() => {
    getContainerWidth();

    window.addEventListener('resize', getContainerWidth);

    return () => {
      window.removeEventListener('resize', getContainerWidth);
    };
  }, []);

  return {
    containerWidth,
    componentId,
  };
};

export default useDetail;
