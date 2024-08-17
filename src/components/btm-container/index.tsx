import { Space } from 'antd';
import React, { CSSProperties, FC, useMemo } from 'react';

import { BottomContainerProps } from './types';

const containerStyle: CSSProperties = {
  position: 'fixed',
  bottom: 16,
  background: '#fff',
  padding: '16px 24px',
  boxShadow: '0px -9px 7px 0px rgba(0,0,0,0.04)',
  display: 'flex',
  justifyContent: 'flex-end',
  zIndex: 1000,
  borderRadius: '8px',
};

const SBtmContainer: FC<BottomContainerProps> = ({
  children,
  full = false,
  style,
  spaceProps,
  ...props
}) => {
  const widthStyle = useMemo(() => {
    if (full) return { width: 'calc(100% - 32px)' };

    return { width: 'calc(100vw - 264px)' };
  }, [full]);

  return (
    <div style={{ ...containerStyle, ...widthStyle, ...style }} {...props}>
      <Space {...spaceProps}>{children}</Space>
    </div>
  );
};

export default SBtmContainer;
