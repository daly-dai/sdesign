import { STextEllipsis } from '@dalydb/sdesign';
import React from 'react';

const longText =
  '这是一段很长的文本内容，当文本超出容器宽度时，会自动显示省略号并支持悬浮查看完整内容';

export default () => (
  <div style={{ width: 300 }}>
    <STextEllipsis>{longText}</STextEllipsis>
  </div>
);
