import React, { FC, useMemo, useRef, useState } from 'react';

import useStyles from '../../index.style';
import { ThumbProps } from '../../types';

import { BAR_MAP, renderThumbStyle } from './constant';

import { useComStyle } from '@daly/sdesign/hooks';

const Thumb: FC<ThumbProps> = ({ always, vertical, ...restProps }) => {
  const { styles, cx, prefixCls } = useComStyle({
    prefixCls: 'scrollbar',
    useStylesHook: useStyles,
  });

  const thumbState = useRef<Partial<Record<'X' | 'Y', number>>>({});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const cursorDown = useRef(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [visible, setVisible] = useState(false);
  const instanceRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const barConfig = useMemo(() => {
    return BAR_MAP[vertical ? 'vertical' : 'horizontal'];
  }, [vertical]);

  const thumbStyle = useMemo(
    () =>
      renderThumbStyle({
        size: restProps.size,
        move: restProps.move,
        bar: barConfig,
      }),
    [barConfig, restProps.move, restProps.size],
  );

  // const mouseMoveDocumentHandler = (e: MouseEvent) => {
  //   if (!instanceRef.current || !thumbRef.current) return
  //   if (cursorDown.current === false) return

  //   const prevPage = thumbState.current[barConfig.axis]
  //   if (!prevPage) return

  //   const offset =
  //     (instanceRef.current.getBoundingClientRect()[barConfig.direction] -
  //       e[barConfig.client]) *
  //     -1
  //   const thumbClickPosition = thumbRef.current[barConfig.offset] - prevPage
  //   const thumbPositionPercentage =
  //     ((offset - thumbClickPosition) * 100 * offsetRatio) /
  //     instanceRef.current[barConfig.offset]
  //   scrollbar.wrapElement[barConfig.scroll] =
  //     (thumbPositionPercentage * scrollbar.wrapElement[barConfig.scrollSize]) /
  //     100
  // }

  // const startDrag = (e: MouseEvent) => {
  //   e.stopImmediatePropagation()
  //   cursorDown.current = true
  //   document.addEventListener('mousemove', mouseMoveDocumentHandler)
  //   document.addEventListener('mouseup', mouseUpDocumentHandler)
  //   originalOnSelectStart = document.onselectstart
  //   document.onselectstart = () => false
  // }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const clickThumbHandler = (e: MouseEvent) => {
    // prevent click event of middle and right button
    e.stopPropagation();
    if (e.ctrlKey || [1, 2].includes(e.button)) return;

    window.getSelection()?.removeAllRanges();
    // startDrag(e)

    const el = e.currentTarget as HTMLDivElement;
    if (!el) return;
    thumbState.current[barConfig.axis] =
      el[barConfig.offset] -
      (e[barConfig.client] - el.getBoundingClientRect()[barConfig.direction]);
  };

  if (!visible && !always) return <></>;

  return (
    <div
      ref={instanceRef}
      className={cx(
        styles[`${prefixCls}-bar`],
        styles[`${prefixCls}-bar-${barConfig.key}`],
      )}
    >
      <div
        ref={thumbRef}
        style={thumbStyle}
        // onMouseDown={clickThumbHandler}
        className={cx(
          styles[`${prefixCls}-thumb`],
          styles[`${prefixCls}-thumb-${barConfig.key}`],
        )}
      ></div>
    </div>
  );
};

export default Thumb;
