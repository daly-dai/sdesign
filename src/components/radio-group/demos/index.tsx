import React from 'react';

import { SRadioGroup } from '@dalydb/sdesign';

const dictData = {
  L1: '不敏感',
  L2: '低敏感',
  L3: '较敏感',
  L4: '敏感',
  L5: '极敏感',
};

export default () => {
  return (
    <div>
      <h3>默认使用</h3>
      <SRadioGroup dict={dictData}></SRadioGroup>
    </div>
  );
};
