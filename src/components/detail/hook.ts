import { useEffect, useMemo, useState } from 'react';

import { MIN_LABEL_WIDTH } from './constant';
import { SDetailProps } from './types';

import { createCode } from '@daly/sdesign/utils';

const useDetail = ({ column }: Partial<SDetailProps>) => {
  const [containerWidth, setContainerWidth] = useState<number | null>(null);

  const [componentId] = useState(`irsDetail-${createCode(5)}`);

  // label宽度
  const CriterionLabelStyle = useMemo<React.CSSProperties>(() => {
    if (!containerWidth)
      return {
        width: `${MIN_LABEL_WIDTH}px`,
      };

    let labelWidth =
      ((containerWidth / Number(column) - 24) * Number(column)) / 10;

    labelWidth = labelWidth > MIN_LABEL_WIDTH ? labelWidth : MIN_LABEL_WIDTH;

    return {
      width: `${labelWidth}px`,
    };
  }, [containerWidth]);

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
    CriterionLabelStyle,
    containerWidth,
    componentId,
  };
};

export default useDetail;
