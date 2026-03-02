/**
 * title: 动态表单
 * description: 使用 SForm.List 实现动态增减表单项
 */
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';
import React from 'react';

import { SForm, SSelect } from '@dalydb/sdesign';

const roleOptions = {
  admin: '管理员',
  editor: '编辑',
  viewer: '访客',
};

export default () => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log('表单数据:', values);
    } catch (error) {
      console.log('校验失败:', error);
    }
  };

  return (
    <SForm form={form} layout="vertical">
      <Form.Item
        label="团队名称"
        name="teamName"
        rules={[{ required: true, message: '请输入团队名称' }]}
      >
        <Input placeholder="请输入团队名称" />
      </Form.Item>

      <Form.Item label="团队成员">
        <SForm.List name="members">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: 'flex', marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, 'name']}
                    rules={[{ required: true, message: '请输入成员姓名' }]}
                  >
                    <Input placeholder="成员姓名" style={{ width: 150 }} />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'email']}
                    rules={[
                      { required: true, message: '请输入邮箱' },
                      { type: 'email', message: '邮箱格式不正确' },
                    ]}
                  >
                    <Input placeholder="邮箱" style={{ width: 200 }} />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'role']}
                    rules={[{ required: true, message: '请选择角色' }]}
                  >
                    <SSelect
                      placeholder="选择角色"
                      dict={roleOptions}
                      style={{ width: 120 }}
                    />
                  </Form.Item>
                  <MinusCircleOutlined
                    onClick={() => remove(name)}
                    style={{ color: '#ff4d4f' }}
                  />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  添加成员
                </Button>
              </Form.Item>
            </>
          )}
        </SForm.List>
      </Form.Item>

      <Space>
        <Button onClick={() => form.resetFields()}>重置</Button>
        <Button type="primary" onClick={handleSubmit}>
          提交
        </Button>
      </Space>
    </SForm>
  );
};
