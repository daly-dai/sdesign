import { Input } from 'antd';
import { trim as lodashTrim } from 'lodash';
import React, { FC, useEffect, useState } from 'react';

import { SInputProps } from './types';

const SInput: FC<SInputProps> = ({
  value,
  onChange,
  trim = false,
  onEnter,
  allowClear = true,
  onKeyDown,
  ...otherProps
}) => {
  const [data, setData] = useState('');

  useEffect(() => {
    setData(value || '');
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    if (trim) {
      inputValue = lodashTrim(inputValue);
    }

    setData(inputValue);

    onChange?.(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onEnter) {
      onEnter?.(data);
      return;
    }

    onKeyDown?.(e);
  };

  return (
    <Input
      {...otherProps}
      allowClear={allowClear}
      value={data}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
};

export default SInput;
