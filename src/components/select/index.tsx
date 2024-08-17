import { Select } from 'antd';
import React, { FC } from 'react';

import { SSelectProps } from './types';

import useDispatchDict from '@daly/sdesign/hooks/useDispatchDict';
import useGetDict from '@daly/sdesign/hooks/useGetDictData';

const SSelect: FC<SSelectProps> = ({
  dict,
  disableKeys,
  dictKey,
  options,
  allowClear = true,
  placeholder = '请选择',
  ...props
}) => {
  const { dictData } = useGetDict({ dict, dictKey });

  const { dOptions } = useDispatchDict({
    dict: dictData,
    disableKeys,
    options,
  });

  return (
    <Select
      allowClear={allowClear}
      placeholder={placeholder}
      options={dOptions}
      {...props}
    ></Select>
  );
};

export default SSelect;
