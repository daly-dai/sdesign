import { Form } from 'antd';
import React, { FC, memo, useCallback, useMemo } from 'react';

import { ItemsProps } from '../../types';
import FormField from '../form-field';

import { genRequiredRule, getDefaultConfig, getRegData } from './constant';

import SDependency from '@dalydb/sdesign/components/dependency';
import SErrorBoundary from '@dalydb/sdesign/components/error-boundary';
import { RegKeyType } from '@dalydb/sdesign/types/reg';

const ItemRender: FC<ItemsProps> = ({
  type,
  label,
  name,
  fieldProps,
  style,
  customCom,
  depNames,
  render,
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

  // 缓存事件处理器
  const handleDependencies = useMemo(() => {
    return restProps?.dependencies;
  }, [restProps?.dependencies]);

  // 优化自定义组件渲染
  const renderCustomCom = useCallback(() => {
    if (!customCom) return null;

    if (typeof customCom === 'function') {
      return customCom({}, {} as any);
    }

    return customCom;
  }, [customCom]);

  if (children) {
    return (
      <Form.Item
        style={style}
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
    return <div style={style}>{label}</div>;
  }

  if (type === 'dependency') {
    return (
      <SDependency depNames={depNames ?? []} {...restProps}>
        {(values, form) => {
          return render ? render(values, form) : null;
        }}
      </SDependency>
    );
  }

  return (
    <SErrorBoundary>
      <Form.Item
        style={style}
        label={label}
        name={itemName}
        {...restProps}
        rules={itemRules}
        dependencies={handleDependencies}
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
