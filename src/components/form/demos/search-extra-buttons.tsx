/**
 * title: 额外操作按钮
 * description: 通过 extraButtons 在查询/重置旁添加额外按钮，如导出、新增等。配置项与 SButton.Group 的 items 一致。
 */

import { Form, message } from 'antd';
import React from 'react';

import { SForm, SFormItems } from '@dalydb/sdesign';

export default () => {
  const [form] = Form.useForm();

  const items: SFormItems[] = [
    { type: 'input', label: '用户名', name: 'username' },
    { type: 'input', label: '手机号', name: 'phone' },
    {
      type: 'select',
      label: '角色',
      name: 'role',
      fieldProps: {
        dict: { admin: '管理员', user: '普通用户', guest: '访客' },
        allowClear: true,
      },
    },
  ];

  return (
    <SForm.Search
      form={form}
      columns={4}
      items={items}
      extraButtons={[
        {
          actionType: 'export',
          onClick: () => message.info('导出数据'),
        },
        {
          actionType: 'create',
          type: 'primary',
          onClick: () => message.info('新增用户'),
        },
      ]}
      onFinish={(values) => message.success('查询: ' + JSON.stringify(values))}
    />
  );
};
