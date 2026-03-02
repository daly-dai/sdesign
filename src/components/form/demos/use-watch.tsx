/**
 * title: 表单联动
 * description: 使用 useWatch 监听字段变化，实现复杂的表单联动逻辑
 */
import { Alert, Button, Divider, Form, Space } from 'antd';
import React, { useEffect, useMemo } from 'react';

import { SForm, SFormItems } from '@dalydb/sdesign';

const categoryOptions = {
  electronics: '电子产品',
  clothing: '服装',
  food: '食品',
};

const subcategoryMap: Record<string, Record<string, string>> = {
  electronics: { phone: '手机', laptop: '笔记本', tablet: '平板' },
  clothing: { shirt: '衬衫', pants: '裤子', shoes: '鞋子' },
  food: { fruit: '水果', vegetable: '蔬菜', meat: '肉类' },
};

export default () => {
  const [form] = Form.useForm();

  // 使用 useWatch 监听分类变化
  const category = SForm.useWatch('category', form);
  const quantity = SForm.useWatch('quantity', form);
  const price = SForm.useWatch('price', form);

  // 根据分类动态获取子分类选项
  const subcategoryOptions = useMemo(() => {
    return category ? subcategoryMap[category] : {};
  }, [category]);

  // 当分类变化时，清空子分类
  useEffect(() => {
    if (category) {
      form.setFieldValue('subcategory', undefined);
    }
  }, [category, form]);

  // 计算总价
  const totalPrice = useMemo(() => {
    if (quantity && price) {
      return (Number(quantity) * Number(price)).toFixed(2);
    }
    return '0.00';
  }, [quantity, price]);

  const items: SFormItems[] = [
    {
      type: 'select',
      label: '产品分类',
      name: 'category',
      required: '请选择产品分类',
      fieldProps: {
        dict: categoryOptions,
        allowClear: true,
        placeholder: '请选择分类',
      },
    },
    {
      type: 'select',
      label: '子分类',
      name: 'subcategory',
      required: '请选择子分类',
      disabled: !category,
      fieldProps: {
        dict: subcategoryOptions,
        allowClear: true,
        placeholder: category ? '请选择子分类' : '请先选择分类',
      },
    },
    {
      type: 'inputNumber',
      label: '数量',
      name: 'quantity',
      required: '请输入数量',
      fieldProps: {
        min: 1,
        max: 999,
        style: { width: '100%' },
      },
    },
    {
      type: 'inputNumber',
      label: '单价',
      name: 'price',
      required: '请输入单价',
      fieldProps: {
        min: 0,
        precision: 2,
        prefix: '¥',
        style: { width: '100%' },
      },
    },
  ];

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log('表单数据:', { ...values, totalPrice });
    } catch (error) {
      console.log('校验失败:', error);
    }
  };

  return (
    <>
      <SForm name="watchForm" items={items} columns={2} form={form} />

      <Divider />

      <Alert
        message={`订单总价: ¥${totalPrice}`}
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
      />

      <Space>
        <Button onClick={() => form.resetFields()}>重置</Button>
        <Button type="primary" onClick={handleSubmit}>
          提交订单
        </Button>
      </Space>
    </>
  );
};
