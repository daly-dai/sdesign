import React from 'react';

import { SCard } from '@dalydb/sdesign';

export default () => {
  return (
    <div
      style={{
        background: '#f4f5f7',
        padding: '10px',
      }}
    >
      <SCard hasBottomPadding>卡片容器拥有底部边距</SCard>
      <SCard>卡片容器的基本使用</SCard>
    </div>
  );
};
