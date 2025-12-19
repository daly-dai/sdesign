import React from 'react';

import { SButtonGroup } from '@dalydb/sdesign';

// 不同尺寸
export default () => {
  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <strong>大尺寸 - 基础类型：</strong>
        <SButtonGroup
          size="large"
          items={[
            { children: '按钮1', type: 'primary' },
            { children: '按钮2' },
            { children: '按钮3' },
          ]}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <strong>大尺寸 - 扩展类型：</strong>
        <SButtonGroup
          size="large"
          items={[{ type: 'save' }, { type: 'cancel' }, { type: 'reset' }]}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <strong>中尺寸 - 基础类型：</strong>
        <SButtonGroup
          size="middle"
          items={[
            { children: '按钮1', type: 'primary' },
            { children: '按钮2' },
            { children: '按钮3' },
          ]}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <strong>中尺寸 - 扩展类型：</strong>
        <SButtonGroup
          size="middle"
          items={[{ type: 'upload' }, { type: 'download' }, { type: 'export' }]}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <strong>小尺寸 - 基础类型：</strong>
        <SButtonGroup
          size="small"
          items={[
            { children: '按钮1', type: 'primary' },
            { children: '按钮2' },
            { children: '按钮3' },
          ]}
        />
      </div>
      <div>
        <strong>小尺寸 - 扩展类型：</strong>
        <SButtonGroup
          size="small"
          items={[{ type: 'import' }, { type: 'delete' }, { type: 'view' }]}
        />
      </div>
    </div>
  );
};
