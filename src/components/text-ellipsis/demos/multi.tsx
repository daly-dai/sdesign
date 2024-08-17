/**
 * title: 多行文本使用
 * description: 可设置 width，lines
 */
import React from 'react';

import { STextEllipsis } from '@daly/sdesign';

const MultiDemo = () => {
  const demoText =
    'Multi，这是测试的数据，这是测试的数据，这是测试的数据，这是测试的数据，这是测试的数据，这是测试的数据';

  return (
    <>
      <h3>默认两行截断</h3>
      <STextEllipsis.Multi text={demoText}></STextEllipsis.Multi>
      <h3>限制宽度</h3>
      <STextEllipsis.Multi text={demoText} width="160px"></STextEllipsis.Multi>
    </>
  );
};

export default MultiDemo;
