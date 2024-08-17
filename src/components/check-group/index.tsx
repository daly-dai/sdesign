import { Checkbox } from 'antd';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import React, { FC, useEffect, useState } from 'react';

import { CheckboxValueType, SCheckGroupProps } from './types';

import useDispatchDict from '@daly/sdesign/hooks/useDispatchDict';
import useGetDict from '@daly/sdesign/hooks/useGetDictData';

const initValue = (data: any) => {
  if (!data) return data;

  if (isArray(data)) return data;

  if (isString(data)) return data?.split(',');
};

const disPatchData = (data: CheckboxValueType[] | undefined) => {
  if (!data) return data;

  if (isArray(data)) return data?.join(',');
};

const SCheckGroup: FC<SCheckGroupProps> = ({
  dict,
  options,
  dictKey,
  disableKeys,
  children,
  ...props
}) => {
  const { value, onChange, ...restProps } = props;
  const [checkVal, setCheckVal] = useState<CheckboxValueType[] | undefined>();

  const { dictData } = useGetDict({ dict, dictKey });
  const { dOptions } = useDispatchDict({
    dict: dictData,
    disableKeys,
    options,
  });

  const handleChange = (val: CheckboxValueType[]) => {
    const newVal = disPatchData(val);

    setCheckVal(val);
    onChange?.(newVal);
  };

  useEffect(() => {
    const data = initValue(value);

    setCheckVal(data);
  }, [value]);

  return (
    <Checkbox.Group
      value={checkVal}
      onChange={handleChange}
      options={dOptions}
      {...restProps}
    >
      {children}
    </Checkbox.Group>
  );
};

export default SCheckGroup;
