import { Cascader } from 'antd';
import isArray from 'lodash/isArray';
import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';
import React, { FC, useEffect, useMemo, useState } from 'react';

import { SCascaderProps } from './types';

import { dispatchCascader, echoCascader } from '@daly/sdesign/utils';

const SCascader: FC<SCascaderProps> = (props) => {
  const [cascaderValue, setCascaderValue] = useState<any>();

  const { multiple, value, onChange, allowClear = true, defaultValue, ...restProps } = props;

  const initValue = (value: any) => {
    if (!value) {
      return undefined;
    }

    if (isNumber(value)) {
      const data = [value];

      return data;
    }

    if (isString(value)) {
      const data = echoCascader(value, multiple);

      return data;
    }

    if (isArray(value)) {
      return value;
    }
  };

  const defaultData = useMemo(() => {
    const data = initValue(defaultValue);
    return data as any[] | undefined;
  }, [defaultValue]);

  const handleChange = (value: any[], selectedOptions: any[]) => {
    const data = dispatchCascader(value, multiple);

    setCascaderValue(value);

    onChange?.(data as string, selectedOptions);
  };

  useEffect(() => {
    const data = initValue(value);

    setCascaderValue(data);
  }, [value]);

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
