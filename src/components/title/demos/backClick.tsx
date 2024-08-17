/**
 * title: 自定义返回点击事件
 * description: 通过**onBackClick**自定义返回点击事件
 */
import React from 'react';

import { STitle } from '@daly/sdesign';

export default () => {
  const routerPage = () => {
    alert('展示标题');
  };

  return (
    <STitle goBack={true} onBackClick={routerPage}>
      页面标题
    </STitle>
  );
};
