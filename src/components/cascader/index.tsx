import { Cascader } from 'antd';
import isArray from 'lodash/isArray';
import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';
import React, { FC, useMemo, useState } from 'react';

import { SCascaderProps } from './types';

import { dispatchCascader, echoCascader } from '@dalydb/sdesign/utils';

// 将外部 value 归一化为 Cascader 需要的数组值（纯函数）
function normalizeCascaderValue(value: unknown, multiple?: boolean) {
  if (!value) return undefined;

  if (isNumber(value)) return [value];

  if (isString(value)) return echoCascader(value, multiple);

  if (isArray(value)) return value;

  return undefined;
}

const SCascader: FC<SCascaderProps> = (props) => {
  const {
    multiple,
    value,
    onChange,
    allowClear = true,
    defaultValue,
    ...restProps
  } = props;

  // 半受控：有 value 时派生，无 value 时使用内部状态
  const isControlled = value !== undefined;
  const [innerValue, setInnerValue] = useState<any>();

  const defaultData = useMemo(
    () => normalizeCascaderValue(defaultValue, multiple) as any[] | undefined,
    [defaultValue, multiple],
  );

  const cascaderValue = useMemo(
    () => (isControlled ? normalizeCascaderValue(value, multiple) : innerValue),
    [isControlled, value, multiple, innerValue],
  );

  const handleChange = (value: any[], selectedOptions: any[]) => {
    const data = dispatchCascader(value, multiple);

    if (!isControlled) setInnerValue(value);

    onChange?.(data as string, selectedOptions);
  };

  return (
    <Cascader
      defaultValue={defaultData}
      multiple={multiple}
      value={cascaderValue}
      onChange={handleChange}
      allowClear={allowClear}
      {...restProps}
    />
  );
};

export default SCascader;
