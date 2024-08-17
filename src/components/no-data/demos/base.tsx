/**
 * title: 设置类型
 * description: 可设置为 large  default small
 */
import React, { useState } from 'react';

import { SNoData, SRadioGroup, sizeType } from '@daly/sdesign';

const SizeType = {
  large: 'large',
  middle: 'middle',
  small: 'small',
};

export default () => {
  const [value, setValue] = useState<sizeType>('large');

  const onChange = (data?: string) => {
    setValue(data as sizeType);
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
      <SNoData type={value} />
    </>
  );
};
