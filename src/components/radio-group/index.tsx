import { Radio } from 'antd';
import React, { FC } from 'react';

import { SRadioGroupProps } from './types';

import useDispatchDict from '@daly/sdesign/hooks/useDispatchDict';
import useGetDict from '@daly/sdesign/hooks/useGetDictData';

const SRadioGroup: FC<SRadioGroupProps> = ({
  dict,
  disableKeys,
  dictKey,
  options,
  onChange,
  ...props
}) => {
  const { dictData } = useGetDict({ dict, dictKey });

  const { dOptions } = useDispatchDict({
    dict: dictData,
    disableKeys,
    options,
  });

  const handleChange = (e: any) => {
    onChange?.(e.target.value);
  };

  return (
    <Radio.Group
      onChange={handleChange}
      options={dOptions}
      {...props}
    ></Radio.Group>
  );
};

export default SRadioGroup;
