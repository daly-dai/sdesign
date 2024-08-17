import React, { FC } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import SErrorCom from '../error-com';

import { SErrorBoundaryTypes } from './types';

const SErrorBoundary: FC<SErrorBoundaryTypes> = ({
  children,
  fallbackRender,
}) => {
  const renderFallbackRender = () => {
    return <SErrorCom />;
  };
  return (
    <ErrorBoundary fallbackRender={fallbackRender ?? renderFallbackRender}>
      {children}
    </ErrorBoundary>
  );
};

export default SErrorBoundary;
