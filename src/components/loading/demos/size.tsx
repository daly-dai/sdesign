/**
 * title: 设置size
 * description: 设置 size large middle small  默认为large
 */

import React, { useState } from 'react';

import { LoadingSizeType, SLoading, SRadioGroup } from '@daly/sdesign';

const SizeType = {
  large: 'large',
  middle: 'middle',
  small: 'small',
};

export default () => {
  const [value, setValue] = useState<LoadingSizeType>('large');

  const onChange = (data?: string) => {
    setValue(data as LoadingSizeType);
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
      <SLoading size={value} />
    </>
  );
};
