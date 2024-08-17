import React, { FC, useMemo, useRef } from 'react';

import useStyles from './index.style';
import { FrameAnimationProps } from './types';

import { useComStyle } from '@daly/sdesign/hooks';
import useFrameAnimation from '@daly/sdesign/hooks/useFrameAnimation';
import { getStyle } from '@daly/sdesign/utils';

const SFrameAnimation: FC<FrameAnimationProps> = ({
  imgNumber = 24,
  frameNumber,
  icon,
  width,
  height,
  direction,
  style = {},
}) => {
  const { styles, prefixCls } = useComStyle({
    prefixCls: 'frame-animation',
    useStylesHook: useStyles,
  });

  const animationEl = useRef<HTMLDivElement | null>(null);
  const setAnimationType = useFrameAnimation({
    ref: animationEl,
    direction,
    imgNumber,
    frameNumber,
  });

  const computedStyle = useMemo(() => {
    const widthStyle = getStyle('width', width);
    const heightStyle = getStyle('height', height);
    const bgUrl = icon ? getStyle('backgroundImage', `url(${icon})`) : {};

    return {
      ...widthStyle,
      ...heightStyle,
      ...bgUrl,
    };
  }, [icon, width, height]);

  const handleMouseEnter = () => {
    setAnimationType('in');
  };

  const handleMouseLeave = () => {
    setAnimationType('out');
  };

  return (
    <div
      className={styles[prefixCls]}
      style={{ ...style, ...computedStyle }}
      ref={animationEl}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    ></div>
  );
};

export default SFrameAnimation;
