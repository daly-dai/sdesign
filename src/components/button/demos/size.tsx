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
          items={[
            { actionType: 'save' },
            { actionType: 'cancel' },
            { actionType: 'reset' },
          ]}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <strong>中尺寸</strong>
        <SButton.Group
          size="middle"
          items={[
            { actionType: 'upload' },
            { actionType: 'download' },
            { actionType: 'export' },
          ]}
        />
      </div>

      <div>
        <strong>小尺寸</strong>
        <SButton.Group
          size="small"
          items={[
            { actionType: 'import' },
            { actionType: 'delete' },
            { actionType: 'view' },
          ]}
        />
      </div>
    </div>
  );
};
