/**
 * title: 分布式表单开发模板
 * background: rgba(42, 46, 54, 0.04)
 */
import { Button, Form, Space, Steps, message } from 'antd';
import { history } from 'dumi';
import cloneDeep from 'lodash/cloneDeep';
import React, { useEffect } from 'react';

import { Form1, Form2 } from './stepForm';

import {
  SCard,
  SConfirm,
  SErrorBoundary,
  SNoData,
  useStepForm,
} from '@daly/sdesign';

const stepsItems = [
  {
    title: '分布表单一',
    key: 0,
  },
  {
    title: '分布表单二',
    key: 8,
  },
];

const StepForm = () => {
  // 项目基本情况
  const [step1Form] = Form.useForm();
  const [step2Form] = Form.useForm();

  const formInstanceList = [step1Form, step2Form];

  // formData 表单填写的数据
  const { formData, current, handleNext, handlePrevious } = useStepForm({
    formInstanceList,
  });

  // 处理接口传参
  const dispatchParams = () => {
    let params = cloneDeep(formData);

    // 获取当前步骤的表单值
    const currentFormInstance = formInstanceList?.[current];
    const formStepData = currentFormInstance?.getFieldsValue() ?? {};

    // 合并表单数据
    params = { ...params, ...formStepData };

    // ...数据处理

    return params;
  };

  // 提交数据
  const handleSubmit = async (type: 'save' | 'submit') => {
    // 如果是提交，则需要校验最后一步表单
    if (type === 'submit') {
      const currentFormInstance = formInstanceList?.[current];
      await currentFormInstance?.validateFields();
    }

    const params = dispatchParams();

    const res = await fetch('/api/stepForm', params);

    if (!res) return;

    if (type === 'submit') {
      message.success('提交成功');
      // 跳转路由
      return;
    }

    message.success('保存成功');
  };

  // 获取表单详情数据
  const getFormDetailData = async () => {
    // 获取详情数据
    const detailData = await (async () => ({}));

    if (!detailData) return;

    // 设置表单数据
    formInstanceList.forEach((formInstance) => {
      formInstance.setFieldsValue(detailData);
    });
  };

  useEffect(() => {
    getFormDetailData();
  }, []);

  const formStepMap: Record<number, any> = {
    0: <Form1 formName="cover" form={step1Form} />,
    1: <Form2 form={step2Form} />,
  };

  const RenderButtons = () => {
    return (
      <Space>
        <Button onClick={() => history.back()}>取消</Button>
        <Button
          onClick={() => {
            handleSubmit('save');
          }}
        >
          保存草稿
        </Button>

        {current !== 0 && <Button onClick={handlePrevious}>上一页</Button>}
        {current !== formInstanceList?.length - 1 && (
          <Button type="primary" onClick={() => handleNext()}>
            下一步
          </Button>
        )}

        {current === formInstanceList?.length - 1 && (
          <SConfirm
            title="提交"
            description="是否确认提交"
            onConfirm={() => {
              handleSubmit('submit');
            }}
          >
            <Button type="primary">提交</Button>
          </SConfirm>
        )}
      </Space>
    );
  };

  return (
    <>
      <SCard hasBottomPadding style={{ overflow: 'auto' }}>
        <Steps current={current} items={stepsItems} />
      </SCard>

      <SCard hasBottomPadding>
        <SErrorBoundary>{formStepMap?.[current] ?? <SNoData />}</SErrorBoundary>
      </SCard>

      <SCard>{RenderButtons()}</SCard>
    </>
  );
};

export default StepForm;
