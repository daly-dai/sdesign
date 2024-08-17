/**
 * title: 级联回显
 */
import { Button, Cascader } from 'antd';
import React, { useState } from 'react';

import { MockTree } from './constant';

import { SCascader } from '@daly/sdesign';

const { SHOW_CHILD } = Cascader;

const defaultValue = 'rootValue/child1Value/grandchild1Value/greatgrandchild1Value';
const defaultValue2 = 'rootValue/child1Value/grandchild1Value';
const defaultValue3 =
  'rootValue/child1Value/grandchild1Value/greatgrandchild1Value,rootValue/child1Value/grandchild1Value/greatgrandchild2Value';

export default () => {
  const [value, setValue] = useState<string | null>('');
  const [value2, setValue2] = useState<string | null>('');
  const [value3, setValue3] = useState<string | null>('');

  return (
    <>
      <Button type="primary" onClick={() => setValue(defaultValue)}>
        设置单选框的值
      </Button>
      <br />
      <br />
      <SCascader value={value} options={MockTree} />
      <br />
      <br />
      <br />
      <Button type="primary" onClick={() => setValue2(defaultValue2)}>
        设置多选框的值
      </Button>
      <br />
      <br />
      <SCascader disabled value={value2} options={MockTree} multiple />
      <br />
      <br />
      <Button type="primary" onClick={() => setValue3(defaultValue3)}>
        设置子集全选多选框的值
      </Button>
      <br />
      <br />
      <SCascader
        maxTagCount={1}
        showCheckedStrategy={SHOW_CHILD}
        value={value3}
        options={MockTree}
        multiple
        disabled
      />
    </>
  );
};
