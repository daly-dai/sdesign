/**
 * title: 时间选择器设置默认值
 */
import { Button, Form } from 'antd';
import React from 'react';

import { SForm, SFormItems } from '@daly/sdesign';

export default () => {
  const [form] = Form.useForm();

  const formItem: SFormItems[] = [
    {
      label: '时间值一',
      name: 'time1',
      type: 'SDatePickerRange',
    },
    {
      label: '时间值二',
      name: 'time2',
      type: 'SDatePickerRange',
    },
  ];

  const handleSetData = () => {
    form.setFieldsValue({
      time1: ['2021-01-01', '2022-01-01'],
      time2: ['2019-01-02', '2021-01-02'],
    });
  };

  return (
    <>
      <SForm form={form} items={formItem}></SForm>
      <Button type="primary" onClick={handleSetData}>
        设置默认值
      </Button>
    </>
  );
};
