import { FormInstance } from 'antd';
import React, { FC } from 'react';

import { SForm, SFormItems } from '@dalydb/sdesign';

const formItems: SFormItems[] = [
  {
    type: 'input',
    label: '用户名称',
    name: 'userName',
    required: '请输入用户名称',
  },
  {
    label: '组件库时间选择',
    type: 'SDatePicker',
    name: 'SDatePicker',
  },
];

interface StepFormProps {
  form: FormInstance<any>;
  formName?: string;
}

export const Form1: FC<StepFormProps> = ({ form, formName }) => {
  // 该表单所有的值都存放在 formName
  return <SForm form={form} formName={formName} items={formItems}></SForm>;
};

export const Form2: FC<StepFormProps> = ({ form }) => {
  return <SForm form={form} items={formItems}></SForm>;
};
