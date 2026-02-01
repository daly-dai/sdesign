import { Input } from 'antd';
import { trim as lodashTrim } from 'lodash';
import React, { FC, useCallback } from 'react';

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
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let inputValue = e.target.value;

      if (trim) {
        inputValue = lodashTrim(inputValue);
      }

      onChange?.(inputValue);
    },
    [onChange, trim],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && onEnter) {
        onEnter?.(value || '');
        return;
      }

      onKeyDown?.(e);
    },
    [onEnter, onKeyDown, value],
  );

  // 在需要时进行trim操作，但不改变原值
  const displayValue = trim && value ? lodashTrim(value) : value;

  return (
    <Input
      {...otherProps}
      allowClear={allowClear}
      value={displayValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
};

export default SInput;
