import { Typography } from 'antd';
import React, { FC, useMemo } from 'react';

import { TextEllipsisProps, TypographyText } from './types';

const { Text } = Typography;

// 统一的文字省略组件
/**
 * @deprecated 已废弃：请使用 antd 原生能力（Table 列 `ellipsis` 或 `Typography.Text ellipsis`）。
 * 保留仅用于向后兼容，不再维护。
 */
const STextEllipsis: FC<TextEllipsisProps> = ({
  width,
  style = {},
  rows,
  children,
  tooltip,
  ...rest
}) => {
  const textStyle = useMemo(() => {
    return {
      ...style,
      width,
    };
  }, [width, style]);

  const ellipsisConfig = useMemo<TypographyText['ellipsis']>(() => {
    if (!width && !rows) {
      return false;
    }

    return {
      rows: width ?? 1,
      expandable: true,
      symbol: 'more',
      tooltip: { title: children, ...tooltip },
    };
  }, [rows, tooltip, width]);

  return (
    <Text ellipsis={ellipsisConfig} style={textStyle} {...rest}>
      {children}
    </Text>
  );
};

export default STextEllipsis;
