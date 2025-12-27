import React from 'react';

import { STextEllipsis } from '@dalydb/sdesign';

const shortText = '这是测试的数据测试的文案';
// 500个字的长字段
const longText = `这是测试的数据测试的文案这是测试的数据测试的文案这是测试的
数据测试的文案这是测试的数据测试的文案这是测试的数据测试的文案这是测
试的数据测试的文案这是测试的数据测试的文案这是测试的数据测试的文案这是测试
的数据测试的文案这是测试的数据测试的文案这是测试的数据测试的
文案这是测试的数据测试的文案这是测试的数据测试的文案这是测试的数据测
试的文案这是测试的数据测试的文案这是测试的数据测试的文案这是测试的数
据测试的文案这是测试的数据测试的文案这是测试的数据测试的文案
这是测试的数据测试的文案这是测试的数据测试的文案这是测试的数据测试的文案这
是测试的数据测试的文案这是测试的数据测试的文案这
是测试的数据测试的文案这是测试的数据测试的文案`;

export default () => {
  return (
    <>
      <h3>基本使用(未超过长度)</h3>
      <STextEllipsis rows={1}>{shortText}</STextEllipsis>
      <h3>基本使用(限制宽度200)</h3>
      <STextEllipsis width={200}>{longText}</STextEllipsis>
      <h3>单行限制字数</h3>
      <div style={{ width: 600 }}>
        <STextEllipsis
          rows={3}
          tooltip={{
            placement: 'right',
          }}
        >
          {longText}
        </STextEllipsis>
      </div>
    </>
  );
};
