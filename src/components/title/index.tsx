import { Flex } from 'antd';
import React, { memo, useMemo } from 'react';

import { BASE_FONTSIZE_MAP } from './constant';
import './index.css';
import { STitleProps } from './types';

import { SLucideIcon } from '@dalydb/sdesign';

const STitle: React.FC<STitleProps> = (props) => {
  const {
    desc,
    actionNode,
    style,
    type = 'page',
    hasBottomMargin = true,
    fontSize,
    children,
    prefix,
    gap = '12px',
    ...restProps
  } = props;

  // 底部间距：false / 0 → '0'，true / undefined → '12px'，string/number 透传
  const marginBottom = useMemo(() => {
    if (hasBottomMargin === false || hasBottomMargin === 0) return '0';
    if (hasBottomMargin === true || hasBottomMargin === undefined)
      return '12px';
    return typeof hasBottomMargin === 'number'
      ? `${hasBottomMargin}px`
      : hasBottomMargin;
  }, [hasBottomMargin]);

  const titleStyle = useMemo(
    () => ({ marginBottom, ...(style ?? {}) }),
    [marginBottom, style],
  );

  const renderFormIcon = useMemo(() => {
    if (type !== 'form') return null;
    return (
      <SLucideIcon name="AlignLeft" className="sdesign-title-left-form-icon" />
    );
  }, [type]);

  const titleFontSize = useMemo(() => {
    if (fontSize) return { fontSize };
    const adjustedFontSize = 14 + (BASE_FONTSIZE_MAP?.[type] ?? 0);
    return { fontSize: `${adjustedFontSize}px` };
  }, [fontSize, type]);

  return (
    <Flex
      justify="space-between"
      align="center"
      className={`sdesign-title sdesign-title-${type}`}
      style={titleStyle}
      {...restProps}
    >
      <Flex align="center" gap={gap}>
        {renderFormIcon}
        {prefix}
        <div style={titleFontSize} className="sdesign-title-left-title">
          {children}
        </div>
        {desc && desc}
      </Flex>
      <div className="sdesign-title-right">{actionNode}</div>
    </Flex>
  );
};

export default memo(STitle);
