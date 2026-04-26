/**
 * title: 自定义间距与表单项跨列
 * description: gap 控制行列间距（支持 number 或 [rowGap, columnGap]），gridColumn 让单个表单项跨多列。
 */

import { Form, message } from 'antd';
import React from 'react';

import { SForm, SFormItems } from '@dalydb/sdesign';

export default () => {
  const [form] = Form.useForm();

  const items: SFormItems[] = [
    { type: 'input', label: '项目名称', name: 'projectName' },
    {
      type: 'select',
      label: '项目类型',
      name: 'type',
      fieldProps: {
        dict: { web: 'Web应用', app: 'App应用', mini: '小程序' },
        allowClear: true,
      },
    },
    { type: 'input', label: '负责人', name: 'owner' },
    {
      type: 'textarea',
      label: '备注说明',
      name: 'remark',
      gridColumn: 2,
      fieldProps: { rows: 1 },
    },
    { type: 'datePicker', label: '开始日期', name: 'startDate' },
  ];

  return (
    <>
      <h4>默认间距 [16, 24]</h4>
      <SForm.Search
        form={form}
        columns={3}
        items={items}
        showExpand={false}
        onFinish={(values) => message.success(JSON.stringify(values))}
      />

      <h4>紧凑间距 gap={8}</h4>
      <SForm.Search
        form={form}
        columns={3}
        items={items}
        gap={8}
        showExpand={false}
        onFinish={(values) => message.success(JSON.stringify(values))}
      />

      <h4>宽松间距 gap={[24, 48]}</h4>
      <SForm.Search
        form={form}
        columns={3}
        items={items}
        gap={[24, 48]}
        showExpand={false}
        onFinish={(values) => message.success(JSON.stringify(values))}
      />
    </>
  );
};
