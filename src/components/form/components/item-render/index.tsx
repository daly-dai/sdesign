import { Form } from 'antd';
import React, { FC, memo, useMemo } from 'react';

import { ItemsProps } from '../../types';
import FormField from '../form-field';

import { genRequiredRule, getDefaultConfig, getRegData } from './constant';

import SErrorBoundary from '@dalydb/sdesign/components/error-boundary';
import { RegKeyType } from '@dalydb/sdesign/types/reg';

const ItemRender: FC<ItemsProps> = ({
  type,
  label,
  name,
  fieldProps,
  style,
  customCom,
  regKey,
  required,
  readonly,
  formName,
  children,
  disabled,
  ...restProps
}) => {
  // 缓存默认配置
  const defaultConfig = useMemo(() => {
    return getDefaultConfig(type, readonly);
  }, [type, readonly]);

  // 缓存表单校验规则
  const itemRules = useMemo(() => {
    const defaultRules = restProps?.rules ?? [];
    const curReg = getRegData(regKey as RegKeyType) ?? [];
    const requiredRule = genRequiredRule(required) ?? [];

    return [...defaultRules, ...requiredRule, ...curReg];
  }, [restProps?.rules, regKey, required]);

  // 计算FormItem的name
  const itemName = !formName || !name ? name : [formName, name];

  // 获取当前表单实例和值，供 customCom 使用
  const formInstance = Form.useFormInstance();
  const formValues = Form.useWatch([], formInstance) ?? {};

  const customComNode = useMemo(() => {
    if (!customCom) return null;
    if (typeof customCom === 'function') {
      return customCom(formValues, formInstance);
    }
    return customCom;
  }, [customCom, formValues, formInstance]);

  const styleData = { marginBottom: 0, ...style };

  if (children) {
    return (
      <Form.Item
        style={styleData}
        label={label}
        name={itemName}
        rules={itemRules}
        {...restProps}
      >
        {children}
      </Form.Item>
    );
  }

  if (type === 'placeholder') {
    return <div style={styleData}>{label}</div>;
  }

  return (
    <SErrorBoundary>
      <Form.Item
        style={styleData}
        label={label}
        name={itemName}
        {...restProps}
        rules={itemRules}
      >
        {customCom ? (
          customComNode
        ) : (
          <FormField
            type={type as any}
            {...defaultConfig}
            disabled={disabled}
            {...fieldProps}
          />
        )}
      </Form.Item>
    </SErrorBoundary>
  );
};

export default memo(ItemRender);
