import { SCollapse } from '@dalydb/sdesign';
import React, { useState } from 'react';

export default () => {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <div>
      <SCollapse collapse={collapsed} setCollapse={setCollapsed} />
      {!collapsed && (
        <div style={{ padding: 16, background: '#f5f5f5' }}>折叠内容</div>
      )}
    </div>
  );
};
