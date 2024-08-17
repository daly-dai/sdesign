import { Form } from 'antd';
import React, { FC, memo, ReactNode, useMemo } from 'react';

import { ItemsProps } from '../../types';
import DynamicItem from '../dynamic-item';

import { genRequiredRule, getDefaultConfig, getRegData } from './constant';

import SDependency from '@daly/sdesign/components/dependency';
import SErrorBoundary from '@daly/sdesign/components/error-boundary';
import { RegKeyType } from '@daly/sdesign/types/reg';

const ItemRender: FC<ItemsProps> = memo(
  ({
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
    ...restProps
  }) => {
    // 获取默认的配置
    const defaultConfig = useMemo(() => {
      return getDefaultConfig(type, readonly);
    }, [type, readonly]);

    // 合并之后的属性
    const formItemProps = useMemo(() => {
      return {
        ...restProps,
      };
    }, [restProps]);

    // 生成表单校验规则
    const itemRules = useMemo(() => {
      const defaultRules = formItemProps?.rules ?? [];

      const curReg = getRegData(regKey as RegKeyType) ?? [];

      const requiredRule = genRequiredRule(required) ?? [];

      return [...defaultRules, ...requiredRule, ...curReg];
    }, [formItemProps?.rules, regKey, required]);

    // FormItem的name
    const itemName = useMemo(() => {
      if (!formName) return name;

      if (!name) return name;

      return [formName, name];
    }, [name, formName]);

    if (children) {
      return (
        <Form.Item
          style={style}
          label={label}
          name={itemName}
          rules={itemRules}
          {...formItemProps}
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
        <SDependency depNames={depNames ?? []} {...formItemProps}>
          {(values, form) => {
            return render?.(values, form);
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
          {...formItemProps}
          rules={itemRules}
          dependencies={formItemProps?.dependencies}
        >
          {customCom ? (
            (customCom as ReactNode)
          ) : (
            <DynamicItem
              type={type as any}
              {...defaultConfig}
              {...fieldProps}
            />
          )}
        </Form.Item>
      </SErrorBoundary>
    );
  },
);

export default memo(ItemRender);
