import { Tooltip } from 'antd';
import React, { FC, useRef } from 'react';

import useTextEllipsis from '../../hook';
import useStyles from '../../styles/multi.style';
import { MultiEllipsisProps } from '../../types';

import { useComStyle } from '@dalydb/sdesign/hooks';

const Multi: FC<MultiEllipsisProps> = ({
  maxChars,
  width,
  style = {},
  text,
  line = 2,
  fontSize = '14px',
  tooltipProps = {},
  className,
  showTooltip,
}) => {
  const { styles, cx, prefixCls } = useComStyle({
    prefixCls: 'ellipsis-multi',
    useStylesHook: useStyles,
  });

  const multiRef = useRef<HTMLDivElement>(null);

  const { displayedText, needTooltip, dispatchStyle } = useTextEllipsis({
    text,
    maxChars,
    fontSize,
    width,
    ref: multiRef,
    showTooltip,
    line,
  });

  return (
    <div
      ref={multiRef}
      className={cx(styles[prefixCls], className)}
      style={{
        ...style,
        ...dispatchStyle('WebkitLineClamp', line),
        ...dispatchStyle('fontSize', fontSize),
        ...dispatchStyle('width', width),
      }}
    >
      {needTooltip && (
        <Tooltip placement="top" title={text} {...tooltipProps} style={{}}>
          <div
            className={styles[`${prefixCls}-tooltip`]}
            style={{
              ...dispatchStyle('WebkitLineClamp', line),
              ...dispatchStyle('width', width),
              ...dispatchStyle('fontSize', fontSize),
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

export default Multi;
