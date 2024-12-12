import { Checkbox, Typography } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import React, { useState } from 'react';

import SInput from '..';

import HighlightSpaces from './higntLightSpace';

const BaseDemo = () => {
  const [value, setValue] = useState('');
  const [trim, setTrim] = useState(false);
  const [enterShow, setEnterShow] = useState('');

  const handleTrimCheck = (e: CheckboxChangeEvent) => {
    setTrim(e.target.checked);
  };

  const handleChange = (data: string) => {
    setValue(data);
  };
  const handleEnter = (data?: string) => {
    setEnterShow(`Enter 触发了回调 输入框值为：${data}`);

    setTimeout(() => {
      setEnterShow('');
    }, 2000);
  };

  return (
    <div>
      <Checkbox checked={trim} onChange={handleTrimCheck}>
        trim：过滤空格
      </Checkbox>
      <br />
      <br />
      <SInput
        value={value}
        onChange={handleChange}
        onEnter={handleEnter}
        trim={trim}
      />

      <Typography>
        <p>input输入值为：</p>

        <pre>
          <HighlightSpaces text={value}></HighlightSpaces>
        </pre>
      </Typography>

      {enterShow && (
        <Typography>
          <p>enter触发enter事件回调</p>
          <pre>{enterShow}</pre>
        </Typography>
      )}
    </div>
  );
};

export default BaseDemo;
