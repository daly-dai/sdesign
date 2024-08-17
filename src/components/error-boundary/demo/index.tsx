/**
 * title: 基本使用
 */

import React from 'react';

import { SErrorBoundary } from '@daly/sdesign';

const ErrorBoundaryPage = () => {
  const renderSuccessCom = () => {
    return <>错误组件</>;
  };

  return (
    <div>
      <SErrorBoundary>{renderSuccessCom()}</SErrorBoundary>
    </div>
  );
};

export default ErrorBoundaryPage;
