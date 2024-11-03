/**
 * title: 表单详情模式
 * description: readonly为true时，表单为只读模式
 */
import { Form, Switch } from 'antd';
import React, { useEffect, useState } from 'react';

import { SCard, SErrorBoundary, SForm, SFormItems } from '@dalydb/sdesign';

const dataSource = {
  mlName: '张三',
  enName: 'dalydb',
  chName: '张三',
  birthDate: '1990-01-01',
  nationality: '中国',
  passportNumber: '7777777',
  title: '教授',
  age: 18,
  sex: '男',

  email: '1234567890@qq.com',
};

export default () => {
  const [readonly, setReadonly] = useState(false);

  const [form] = Form.useForm();
  const formItems: SFormItems[] = [
    {
      label: 'input输入框',
      name: 'mlName',
    },
    {
      label: '姓名(英文)',
      name: 'enName',
      type: 'input',
      required: true,
    },
    {
      label: '姓名(中文)',
      name: 'chName',
      type: 'input',
      required: true,
    },
    {
      label: '出生日期',
      name: 'birthDate',
      type: 'SDatePicker',
      required: true,
    },
    {
      type: 'select',
      label: '国籍',
      name: 'nationality',
      required: true,
    },
    {
      label: '护照号码',
      name: 'passportNumber',
      type: 'input',
      required: true,
    },
    {
      label: '性别',
      name: 'sex',
      type: 'select',
    },
    {
      label: '职称类型',
      name: 'title',
      type: 'cascader',
      required: true,
    },
    {
      label: '电子邮箱',
      name: 'email',
      regKey: 'email',
      required: true,
      type: 'input',
    },
    {
      label: '附件上传',
      type: 'SUpload',
      name: 'file',
      required: true,
    },
  ];

  const toggleFormType = () => {
    setReadonly(!readonly);
  };

  useEffect(() => {
    form.setFieldsValue(dataSource);
  }, []);

  return (
    <>
      <SCard hasBottomPadding>
        <></>

        <Switch
          value={readonly}
          checkedChildren="只读模式"
          unCheckedChildren="填写模式"
          onChange={toggleFormType}
        ></Switch>
      </SCard>
      <SErrorBoundary>
        <SForm
          name="form-readonly"
          columns={4}
          readonly={readonly}
          items={formItems}
          form={form}
        ></SForm>
      </SErrorBoundary>
    </>
  );
};
