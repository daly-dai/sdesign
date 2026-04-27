import { SErrorBoundary } from '@dalydb/sdesign';
import { Button } from 'antd';
import React from 'react';

const BuggyComponent = () => {
  throw new Error('渲染异常');
};

export default () => (
  <SErrorBoundary
    fallbackRender={({ error, resetErrorBoundary }) => (
      <div>
        <p>出错了: {error.message}</p>
        <Button onClick={resetErrorBoundary}>重试</Button>
      </div>
    )}
  >
    <BuggyComponent />
  </SErrorBoundary>
);
