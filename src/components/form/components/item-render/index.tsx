import { Form } from 'antd';
import React, { FC, ReactNode, memo, useMemo } from 'react';

import { ItemsProps, RenderChildren } from '../../types';
import { resolveNamePath } from '../../utils';
import FormField from '../form-field';

import { genRequiredRule, getDefaultConfig, getRegData } from './constant';

import SErrorBoundary from '@dalydb/sdesign/components/error-boundary';
import { RegKeyType } from '@dalydb/sdesign/types/reg';

/**
 * 计算 Form.Item 的公共配置（label/name/rules/style/restProps 等）。
 * 注意：colProps/hidden/gridColumn 由父级布局消费，这里显式丢弃，不透传到 Form.Item。
 */
function useItemConfig({
  type,
  label,
  name,
  fieldProps,
  style,
  regKey,
  required,
  readonly,
  formName,
  disabled,
  children: _children,
  customCom: _customCom,
  colProps: _colProps,
  hidden: _hidden,
  gridColumn: _gridColumn,
  ...restProps
}: ItemsProps) {
  const defaultConfig = useMemo(
    () => getDefaultConfig(type, readonly),
    [type, readonly],
  );

  const itemRules = useMemo(() => {
    const defaultRules = restProps?.rules ?? [];
    const curReg = getRegData(regKey as RegKeyType) ?? [];
    const requiredRule = genRequiredRule(required) ?? [];

    return [...defaultRules, ...requiredRule, ...curReg];
  }, [restProps?.rules, regKey, required]);

  const itemName = resolveNamePath(name, formName);
  // 单独使用 SForm.Item 时保留 antd 默认下边距；items 数组路径由父级
  // 显式传入 marginBottom:0（配合 Row 的垂直 gutter），避免双重间距
  const styleData = style;

  // readonly 时强制禁用：defaultConfig 里的 disabled:true 会被 props.disabled(undefined) 覆盖，
  // 单独使用 SForm.Item 时不经过 Form 容器的 disabled 传递，必须在此兜底
  const resolvedDisabled = readonly ? true : disabled;

  return {
    type,
    label,
    fieldProps,
    disabled: resolvedDisabled,
    defaultConfig,
    itemRules,
    itemName,
    styleData,
    restProps,
  };
}

/**
 * 函数型 customCom：需要订阅表单值。
 * 结果作为 Form.Item 的直接子节点，保留 antd 的 value/onChange 注入能力。
 */
const CustomComItem: FC<
  ItemsProps & { customCom: RenderChildren<Record<string, unknown>> }
> = memo(({ customCom, ...props }) => {
  const { label, itemRules, itemName, styleData, restProps } =
    useItemConfig(props);

  const formInstance = Form.useFormInstance();
  const formValues = Form.useWatch([], formInstance) ?? {};

  return (
    <SErrorBoundary>
      <Form.Item
        style={styleData}
        label={label}
        name={itemName}
        {...restProps}
        rules={itemRules}
      >
        {customCom(formValues, formInstance)}
      </Form.Item>
    </SErrorBoundary>
  );
});

/**
 * 静态 / ReactNode 型 customCom：不订阅表单值，避免全表单重渲染。
 */
type StaticItemProps = Omit<ItemsProps, 'customCom'> & {
  customCom?: ReactNode;
};

const StaticItem: FC<StaticItemProps> = memo((props) => {
  const { children, customCom, type } = props;
  const {
    label,
    fieldProps,
    disabled,
    defaultConfig,
    itemRules,
    itemName,
    styleData,
    restProps,
  } = useItemConfig(props);

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
          customCom
        ) : (
          <FormField
            type={type}
            {...defaultConfig}
            disabled={disabled}
            {...fieldProps}
          />
        )}
      </Form.Item>
    </SErrorBoundary>
  );
});

/**
 * 表单项渲染入口：按 customCom 是否为函数分流。
 */
const ItemRender: FC<ItemsProps> = (props) => {
  const { customCom } = props;

  if (typeof customCom === 'function') {
    return (
      <CustomComItem
        {...props}
        customCom={customCom as RenderChildren<Record<string, unknown>>}
      />
    );
  }
  return <StaticItem {...props} customCom={customCom} />;
};

export default memo(ItemRender);
