import { CSSProperties } from 'react';

import { ThumbProps } from '../../types';

export const BAR_MAP = {
  vertical: {
    offset: 'offsetHeight',
    scroll: 'scrollTop',
    scrollSize: 'scrollHeight',
    size: 'height',
    key: 'vertical',
    axis: 'Y',
    client: 'clientY',
    direction: 'top',
  },
  horizontal: {
    offset: 'offsetWidth',
    scroll: 'scrollLeft',
    scrollSize: 'scrollWidth',
    size: 'width',
    key: 'horizontal',
    axis: 'X',
    client: 'clientX',
    direction: 'left',
  },
} as const;

export const renderThumbStyle = ({
  move,
  size,
  bar,
}: Pick<ThumbProps, 'move' | 'size'> & {
  bar: (typeof BAR_MAP)[keyof typeof BAR_MAP];
}): CSSProperties => ({
  [bar.size]: size,
  transform: `translate${bar.axis}(${move}%)`,
});
