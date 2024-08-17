import { Card } from 'antd';
import assign from 'lodash/assign';
import React, { useMemo } from 'react';

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
  const cardStyle = useMemo(() => {
    if (!hasBottomPadding) return CARD_STYLE;

    return assign({ marginBottom: '16px' }, CARD_STYLE);
  }, [hasBottomPadding]);

  return (
    <SErrorBoundary>
      <Card
        style={{ ...cardStyle, ...(style ?? {}) }}
        styles={{ body: { padding: '0' } }}
        {...props}
      >
        {children}
      </Card>
    </SErrorBoundary>
  );
}

export default SCard;
