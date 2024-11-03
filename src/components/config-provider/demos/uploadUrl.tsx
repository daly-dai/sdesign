/**
 * title: 全局配置uploadUrl
 * description: 地址仅为示例，无实际用途
 */
import React from 'react';

import { SConfigProvider, SUpload } from '@dalydb/sdesign';

export default () => {
  return (
    <SConfigProvider globalDict={{}} uploadUrl="/api/upload">
      <SUpload></SUpload>
    </SConfigProvider>
  );
};
