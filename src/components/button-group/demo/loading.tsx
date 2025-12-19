import React from 'react';

import { SButtonGroup } from '@dalydb/sdesign';

// 加载状态
export default () => {
  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <strong>加载状态 - 基础类型：</strong>
        <SButtonGroup
          loading
          items={[
            { children: '按钮1', type: 'primary' },
            { children: '按钮2' },
            { children: '按钮3' },
          ]}
        />
      </div>
      <div>
        <strong>加载状态 - 扩展类型：</strong>
        <SButtonGroup
          loading
          items={[
            { type: 'save' },
            { type: 'cancel' },
            { type: 'reset' },
            { type: 'upload' },
          ]}
        />
      </div>
    </div>
  );
};
