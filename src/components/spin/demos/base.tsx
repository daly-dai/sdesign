/**
 * title: 基本使用
 * description: 标题与返回功能
 */
import React, { useState } from 'react';

import { SRadioGroup, SSpin } from '@dalydb/sdesign';

const SizeType = {
  large: 'large',
  default: 'default',
  small: 'small',
};

export default () => {
  const [value, setValue] = useState<string>('large');

  const onChange = (data?: string) => {
    setValue(data as string);
  };

  return (
    <>
      <SRadioGroup
        dict={SizeType}
        onChange={onChange as any}
        value={value}
        optionType="button"
      />
      <br />
      <SSpin size={value as any} />
    </>
  );
};
