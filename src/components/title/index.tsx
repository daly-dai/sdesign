import { Flex } from 'antd';
import React, { memo, useMemo } from 'react';

import { BASE_FONTSIZE_MAP } from './constant';
import useStyles from './index.style';
import { STitleProps } from './types';

import { SLucideIcon } from '@dalydb/sdesign';
import { useComStyle } from '@dalydb/sdesign/hooks';

const STitle: React.FC<STitleProps> = (props) => {
  const { styles, cx, prefixCls, token } = useComStyle({
    prefixCls: 'title',
    useStylesHook: useStyles,
  });

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
    return String(hasBottomMargin);
  }, [hasBottomMargin]);

  const titleStyle = useMemo(
    () => ({ marginBottom, ...(style ?? {}) }),
    [marginBottom, style],
  );

  const renderFormIcon = useMemo(() => {
    if (type !== 'form') return null;
    return (
      <SLucideIcon
        name="AlignLeft"
        className={styles[`${prefixCls}-left-form-icon`]}
      />
    );
  }, [type, styles, prefixCls]);

  const titleFontSize = useMemo(() => {
    if (fontSize) return { fontSize };
    const adjustedFontSize = token.fontSize + (BASE_FONTSIZE_MAP?.[type] ?? 0);
    return { fontSize: `${adjustedFontSize}px` };
  }, [fontSize, type, token.fontSize]);

  return (
    <Flex
      justify="space-between"
      align="center"
      className={cx(styles[prefixCls], styles[`${prefixCls}-${type}`])}
      style={titleStyle}
      {...restProps}
    >
      <Flex align="center" gap={gap}>
        {renderFormIcon}
        {prefix}
        <div
          style={titleFontSize}
          className={styles[`${prefixCls}-left-title`]}
        >
          {children}
        </div>
        {desc && desc}
      </Flex>
      <div className={styles[`${prefixCls}-right`]}>{actionNode}</div>
    </Flex>
  );
};

export default memo(STitle);
