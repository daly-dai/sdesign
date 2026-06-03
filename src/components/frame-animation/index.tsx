import React, { FC, useMemo, useRef } from 'react';

import './index.css';
import { FrameAnimationProps } from './types';

import useFrameAnimation from '@dalydb/sdesign/hooks/useFrameAnimation';
import { getStyle } from '@dalydb/sdesign/utils';

const SFrameAnimation: FC<FrameAnimationProps> = ({
  imgNumber = 24,
  frameNumber,
  icon,
  width,
  height,
  direction,
  style = {},
}) => {
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
      className="sdesign-frame-animation"
      style={{ ...style, ...computedStyle }}
      ref={animationEl}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    ></div>
  );
};

export default SFrameAnimation;
