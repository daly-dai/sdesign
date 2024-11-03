/**
 * title: 字段关联功能
 * description: depNames 设置关联字段，render为自定义渲染，当type为dependency时，render必须要传
 */

import { Form, Input } from 'antd';
import React from 'react';

import { SForm, SFormItems } from '@dalydb/sdesign';

const dictData = {
  L1: '不敏感',
  L4: '敏感',
};

export default () => {
  const [form] = Form.useForm();

  const items: SFormItems[] = [
    {
      type: 'select',
      label: '数据状态',
      name: 'key1',
      fieldProps: {
        dict: dictData,
        allowClear: true,
      },
    },
    {
      type: 'dependency',
      depNames: ['key1'],
      render: (values) => {
        if (values.key1 === 'L4') {
          return (
            <Form.Item name="test" label="敏感信息">
              <Input />
            </Form.Item>
          );
        }

        return (
          <Form.Item name="test1" label="其他信息">
            <Input />
          </Form.Item>
        );
      },
    },
  ];

  return (
    <>
      <h3>字段关联，当数据状态为敏感时，显示敏感信息，否则显示其他信息</h3>
      <SForm name="dependencyForm" form={form} items={items}></SForm>
    </>
  );
};
