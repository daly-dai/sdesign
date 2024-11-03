import { Tooltip } from 'antd';
import React, { FC, useRef } from 'react';

import useTextEllipsis from '../../hook';
import useStyles from '../../styles/single.style';
import { SingleEllipsisProps } from '../../types';

import { useComStyle } from '@dalydb/sdesign/hooks';

const Single: FC<SingleEllipsisProps> = ({
  maxChars,
  width,
  style = {},
  text,
  fontSize = '14px',
  tooltipProps = {},
  className,
  showTooltip,
}) => {
  const { styles, cx, prefixCls } = useComStyle({
    prefixCls: 'ellipsis-single',
    useStylesHook: useStyles,
  });
  const singleRef = useRef<HTMLDivElement>(null);

  const { displayedText, needTooltip, dispatchStyle } = useTextEllipsis({
    text,
    maxChars,
    fontSize,
    width,
    ref: singleRef,
    showTooltip,
  });

  return (
    <div
      ref={singleRef}
      style={{
        ...style,
        ...dispatchStyle('fontSize', fontSize),
        ...dispatchStyle('width', width),
      }}
      className={cx(styles[prefixCls], className)}
    >
      {needTooltip && (
        <Tooltip placement="top" title={text} {...tooltipProps} style={{}}>
          <div
            className={styles[`${prefixCls}-tooltip`]}
            style={{
              ...dispatchStyle('fontSize', fontSize),
              ...dispatchStyle('width', width),
            }}
          >
            {displayedText}
          </div>
        </Tooltip>
      )}

      {displayedText}
    </div>
  );
};

export default Single;
