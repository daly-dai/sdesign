/**
 * title: 支持children
 */
import { Typography } from 'antd';
import React, { useState } from 'react';

import SCheckGroup from '..';

export default () => {
  const [checkVal, setCheckVal] = useState<any>([]);

  return (
    <>
      <SCheckGroup
        value={checkVal}
        onChange={(val) => {
          setCheckVal(val);
        }}
        dict={{
          L1: '不敏感',
          L2: '低敏感',
          L3: '较敏感',
          L4: '敏感',
          L5: '极敏感',
        }}
      ></SCheckGroup>
      <Typography>
        <p>
          值使用<code>逗号</code>进行分割：
        </p>
        <pre>{JSON.stringify(checkVal, null, 2)}</pre>
      </Typography>
    </>
  );
};
