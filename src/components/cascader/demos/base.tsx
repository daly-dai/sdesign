/**
 * title: 基础使用
 */
import { Cascader, Typography } from 'antd';
import React, { useState } from 'react';

import SCascader from '..';

import { MockTree } from './constant';

const { SHOW_CHILD } = Cascader;

export default () => {
  const [value, setValue] = useState<string | null>('');
  const [value2, setValue2] = useState<string | null>('');
  const [value3, setValue3] = useState<string | null>('');

  const onChange = (value: string | null) => {
    console.log(value);
    setValue(value);
  };

  const onChange2 = (value: string | null) => {
    console.log(value);
    setValue2(value);
  };

  const onChange3 = (value: string | null) => {
    console.log(value);
    setValue3(value);
  };

  return (
    <>
      <h3>单选级联</h3>
      <SCascader value={value} onChange={onChange} options={MockTree} />

      <Typography>
        <p>
          单选级联选择器的值以<code>斜杠</code>进行分割：
        </p>
        <pre>{value}</pre>
      </Typography>
      <h3>多选级联选择器的值</h3>
      <SCascader value={value2} onChange={onChange2} options={MockTree} multiple />

      <Typography>
        <p>
          多选级联选择器的值使用<code>逗号</code>与<code>斜杠</code>进行分割：
        </p>
        <pre>{value2}</pre>
      </Typography>
      <h3>多选子集全选功能</h3>
      <SCascader
        maxTagCount={1}
        showCheckedStrategy={SHOW_CHILD}
        value={value3}
        onChange={onChange3}
        options={MockTree}
        multiple
      />
      <Typography>
        <p>多选级联选择器支持子集全选功能，当父级被选中时，子集也会被选中，反之亦然：</p>
        <pre>{value3}</pre>
      </Typography>
    </>
  );
};
