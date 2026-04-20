/**
 * title: 自定义操作区域样式
 * description: 通过 actionStyleRender 回调自定义操作区域的布局位置，可以实现操作按钮左对齐、居中等效果。
 */

import { Form, message } from 'antd';
import React from 'react';

import { SForm, SFormItems } from '@dalydb/sdesign';

export default () => {
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();

  const items: SFormItems[] = [
    { type: 'input', label: '关键词', name: 'keyword' },
    {
      type: 'select',
      label: '类型',
      name: 'type',
      fieldProps: { dict: { 1: '类型A', 2: '类型B' }, allowClear: true },
    },
  ];

  const handleFinish = (values: any) => {
    message.success('查询: ' + JSON.stringify(values));
  };

  return (
    <>
      <h4>操作按钮左对齐</h4>
      <SForm.Search
        form={form1}
        columns={4}
        items={items}
        actionStyleRender={({ actionSpan }) => ({
          gridColumn: `span ${actionSpan}`,
          justifyContent: 'flex-start',
          display: 'flex',
          gap: '12px',
        })}
        onFinish={handleFinish}
      />

      <h4>操作按钮占满整行居中</h4>
      <SForm.Search
        form={form2}
        columns={4}
        items={[
          ...items,
          { type: 'input', label: '编码', name: 'code' },
          { type: 'input', label: '名称', name: 'name' },
        ]}
        actionStyleRender={() => ({
          gridColumn: '1 / -1',
          justifyContent: 'center',
          display: 'flex',
          gap: '12px',
        })}
        showExpand={false}
        onFinish={handleFinish}
      />
    </>
  );
};
