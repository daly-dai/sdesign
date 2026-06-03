import { Form } from 'antd';
import React, { FC, memo, useCallback, useMemo } from 'react';

import { ItemsProps } from '../../types';
import FormField from '../form-field';

import { genRequiredRule, getDefaultConfig, getRegData } from './constant';

import SErrorBoundary from '@dalydb/sdesign/components/error-boundary';
import { RegKeyType } from '@dalydb/sdesign/types/reg';

const EMPTY_OBJECT = {};
const EMPTY_FORM_INSTANCE = {} as any;

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
  const itemName = useMemo(() => {
    if (!formName || !name) return name;

    return [formName, name];
  }, [name, formName]);

  // 优化自定义组件渲染
  const renderCustomCom = useCallback(() => {
    if (!customCom) return null;

    if (typeof customCom === 'function') {
      return customCom(EMPTY_OBJECT, EMPTY_FORM_INSTANCE);
    }

    return customCom;
  }, [customCom]);

  const styleData = useMemo(() => {
    return {
      marginBottom: 0,
      ...style,
    };
  }, [style]);

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
          renderCustomCom()
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
