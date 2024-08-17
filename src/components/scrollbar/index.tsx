import React, { CSSProperties, FC, useMemo, useRef } from 'react';

import Bar from './components/bar';
import useStyles from './index.style';
import { ScrollbarProps } from './types';

import { useComStyle } from '@daly/sdesign/hooks';
import { addUnit } from '@daly/sdesign/utils/style';

const SScrollbar: FC<ScrollbarProps> = ({
  children,
  wrapClass,
  className,
  ...restProps
}) => {
  const { styles, cx, prefixCls } = useComStyle({
    prefixCls: 'scrollbar',
    useStylesHook: useStyles,
  });

  const barRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const wrapStyle = useMemo<CSSProperties>(() => {
    const style: CSSProperties = {};

    if (restProps.height) style.height = addUnit(restProps.height);

    if (restProps.maxHeight) style.maxHeight = addUnit(restProps.maxHeight);

    return { ...restProps.wrapStyle, ...style };
  }, [restProps.height, restProps.maxHeight, restProps.wrapStyle]);

  const wrapCls = useMemo<string>(() => {
    return cx(
      styles[`${prefixCls}-wrap`],
      !restProps.native ? styles[`${prefixCls}-hidden-default`] : '',
      wrapClass,
    );
  }, [prefixCls, className, wrapStyle, restProps.native]);

  const handleScroll = () => {
    if (wrapRef?.current) {
      restProps?.onScrollLeft?.(wrapRef?.current?.scrollLeft);
      restProps?.onScrollTop?.(wrapRef?.current?.scrollTop);
    }
  };

  return (
    <div className={cx(styles[prefixCls], className)}>
      <div
        onScroll={handleScroll}
        ref={wrapRef}
        className={wrapCls}
        style={wrapStyle}
      >
        {children}
      </div>
      {!restProps?.native && <Bar ref={barRef}></Bar>}
    </div>
  );
};

export default SScrollbar;
