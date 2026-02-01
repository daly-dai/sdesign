import React from 'react';

import { SButton } from '@dalydb/sdesign';

// 不同尺寸
export default () => {
  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <strong>大尺寸</strong>
        <SButton.Group
          size="large"
          items={[{ type: 'save' }, { type: 'cancel' }, { type: 'reset' }]}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <strong>中尺寸</strong>
        <SButton.Group
          size="middle"
          items={[{ type: 'upload' }, { type: 'download' }, { type: 'export' }]}
        />
      </div>

      <div>
        <strong>小尺寸</strong>
        <SButton.Group
          size="small"
          items={[{ type: 'import' }, { type: 'delete' }, { type: 'view' }]}
        />
      </div>
    </div>
  );
};
