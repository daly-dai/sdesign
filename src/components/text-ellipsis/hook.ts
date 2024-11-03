import get from 'lodash/get';
import { useEffect, useMemo, useState } from 'react';

import { SingleHookType } from './types';

import { getTextWidthByDom } from '@dalydb/sdesign/utils';

const useTextEllipsis = ({
  maxChars,
  width,
  text,
  fontSize = '14px',
  ref,
  showTooltip,
  line = 1,
}: SingleHookType) => {
  const [domProps, setDomProps] = useState<Partial<HTMLDivElement>>();

  // 渲染的文案
  const displayedText = useMemo(() => {
    if (!text) return '';

    if (!maxChars) return text;

    if (!text) return text;

    return text.slice(0, maxChars) + (text.length > maxChars ? '...' : '');
  }, [maxChars, text]);

  useEffect(() => {
    if (domProps) return;

    if (!ref.current) return;

    setTimeout(() => {
      setDomProps(ref?.current ?? {});
    }, 1000);
  }, [ref]);

  // 判断文案的宽度
  const checkTextWidth = () => {
    const domTextWidth = getTextWidthByDom(text || '', fontSize);

    const clientTotalWidth = get(domProps, 'clientWidth', 0) * line;

    if (domTextWidth > clientTotalWidth) {
      return true;
    }

    return false;
  };

  // 判断是否包含省略号
  const judgeHasEllipsis = () => {
    if (maxChars && displayedText?.includes('...')) {
      return true;
    }

    if (maxChars && !displayedText?.includes('...')) {
      return false;
    }

    return false;
  };

  // 需要展示toolTip
  const needTooltip = useMemo(() => {
    if (showTooltip) return true;

    if (checkTextWidth()) return true;

    return judgeHasEllipsis();
  }, [showTooltip, displayedText, width, domProps]);

  /**
   * 处理单个传入的属性
   * @param styleKey
   * @param prop
   * @returns
   */
  const dispatchStyle = (
    styleKey: string,
    prop: string | number | undefined,
  ) => {
    if (!prop) return {};

    return {
      [styleKey]: prop,
    };
  };

  return {
    displayedText,
    dispatchStyle,
    needTooltip,
  };
};

export default useTextEllipsis;
