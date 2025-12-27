import { Typography } from 'antd';
import React, { FC, useMemo } from 'react';

import { TextEllipsisProps, TypographyText } from './types';

const { Text } = Typography;

// 统一的文字省略组件
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
