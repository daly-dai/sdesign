import { Checkbox } from 'antd';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import React, { FC, useMemo, useState } from 'react';

import { CheckboxValueType, SCheckGroupProps } from './types';

import useDispatchDict from '@dalydb/sdesign/hooks/useDispatchDict';
import useGetDict from '@dalydb/sdesign/hooks/useGetDictData';

// 将外部 value（string 或 array）归一化为 Checkbox.Group 需要的数组（纯函数）
function normalizeCheckValue(data: unknown): CheckboxValueType[] | undefined {
  if (!data) return undefined;

  if (isArray(data)) return data;

  if (isString(data)) return data.split(',');

  return undefined;
}

// 将 Checkbox.Group 的数组值序列化为逗号分隔字符串
function serializeCheckValue(data?: CheckboxValueType[]) {
  if (!data) return data;

  if (isArray(data)) return data.join(',');

  return data;
}

const SCheckGroup: FC<SCheckGroupProps> = ({
  dict,
  options,
  dictKey,
  disableKeys,
  children,
  ...props
}) => {
  const { value, onChange, ...restProps } = props;

  // 半受控：有 value 时派生，无 value 时使用内部状态
  const isControlled = value !== undefined;
  const [innerValue, setInnerValue] = useState<
    CheckboxValueType[] | undefined
  >();

  const { dictData } = useGetDict({ dict, dictKey });
  const { dOptions } = useDispatchDict({
    dict: dictData,
    disableKeys,
    options,
  });

  const checkVal = useMemo(
    () => (isControlled ? normalizeCheckValue(value) : innerValue),
    [isControlled, value, innerValue],
  );

  const handleChange = (val: CheckboxValueType[]) => {
    if (!isControlled) setInnerValue(val);

    onChange?.(serializeCheckValue(val));
  };

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
