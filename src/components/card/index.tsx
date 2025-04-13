import { Card } from 'antd';
import React from 'react';

import SErrorBoundary from '../error-boundary';

import { SCardProps } from './types';

const CARD_STYLE: React.CSSProperties = {
  padding: '16px 24px',
  borderRadius: '8px',
};

function SCard({
  children,
  hasBottomPadding = false,
  style,
  ...props
}: SCardProps) {
  const mergedStyle = {
    ...(hasBottomPadding && { marginBottom: '16px' }),
    ...CARD_STYLE,
    ...style,
  };

  return (
    <SErrorBoundary>
      <Card style={mergedStyle} styles={{ body: { padding: '0' } }} {...props}>
        {children}
      </Card>
    </SErrorBoundary>
  );
}

export default SCard;
