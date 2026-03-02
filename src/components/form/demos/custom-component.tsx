/**
 * title: 自定义组件
 * description: 使用 customCom 属性自定义表单项组件，支持函数或 ReactNode 两种形式
 */
import { Button, Form, Input, Rate, Space, Tag } from 'antd';
import React from 'react';

import { SForm, SFormItems } from '@dalydb/sdesign';

// 自定义标签选择组件
const TagSelect = ({ value, onChange }: any) => {
  const tags = ['前端', '后端', '设计', '产品', '测试'];
  const selectedTags = value || [];

  const handleClick = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t: string) => t !== tag)
      : [...selectedTags, tag];
    onChange?.(newTags);
  };

  return (
    <Space wrap>
      {tags.map((tag) => (
        <Tag.CheckableTag
          key={tag}
          checked={selectedTags.includes(tag)}
          onChange={() => handleClick(tag)}
        >
          {tag}
        </Tag.CheckableTag>
      ))}
    </Space>
  );
};

export default () => {
  const [form] = Form.useForm();

  const items: SFormItems[] = [
    {
      type: 'input',
      label: '项目名称',
      name: 'projectName',
      required: '请输入项目名称',
    },
    {
      label: '评分',
      name: 'rating',
      // 使用 customCom 传入自定义组件
      customCom: <Rate allowHalf />,
    },
    {
      label: '技能标签',
      name: 'skills',
      // 使用 customCom 传入自定义组件
      customCom: <TagSelect />,
    },
    {
      label: '描述',
      name: 'description',
      // customCom 也支持函数形式
      customCom: () => (
        <Input.TextArea
          placeholder="请输入项目描述"
          autoSize={{ minRows: 3, maxRows: 6 }}
        />
      ),
    },
  ];

  const handleSubmit = async () => {
    const values = await form.validateFields();
    console.log('表单数据:', values);
  };

  return (
    <>
      <SForm name="customComForm" items={items} columns={2} form={form} />
      <Space>
        <Button onClick={() => form.resetFields()}>重置</Button>
        <Button type="primary" onClick={handleSubmit}>
          提交
        </Button>
      </Space>
    </>
  );
};
