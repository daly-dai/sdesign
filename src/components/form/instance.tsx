import { Col, Form, Row } from 'antd';
import React, { memo, useMemo } from 'react';

import ItemRender from './components/item-render';
import { SFormProps } from './types';
import { namePathToKey, resolveLabelCol, useFormBehavior } from './utils';

import { getPrefixCls } from '@dalydb/sdesign/utils';

function InstanceForm<Values = any>({
  rowProps,
  columns = 1,
  items,
  onFinish,
  onReset,
  readonly = false,
  children,
  formName,
  layout = 'vertical',
  style,
  labelWidth,
  ...formProps
}: SFormProps<Values>) {
  const { labelCol: consumerLabelCol, ...restFormProps } = formProps;
  const prefixCls = getPrefixCls('form');

  const { handleFinish, handleReset } = useFormBehavior<Values>({
    onFinish,
    onReset,
  });

  const formTypeConfig = readonly ? { disabled: true } : {};

  const dynamicSpan = 24 / columns;

  // 统一给表单容器一个默认底部间距，避免最后一行紧贴下方内容；
  // 用户仍可通过 style 覆盖（展开在默认值之后）
  const formStyle = { marginBottom: 16, ...style };

  // 过滤隐藏项
  const visibleItems = useMemo(() => {
    return (items ?? []).filter((item) => !item.hidden);
  }, [items]);

  // Antd Form 的 labelCol 不支持直接设置宽度，需将 labelWidth 转为 flex 值。
  const labelCol = useMemo(
    () => resolveLabelCol(labelWidth, consumerLabelCol),
    [labelWidth, consumerLabelCol],
  );

  return (
    <Form
      colon={false}
      layout={layout}
      style={formStyle}
      labelCol={labelCol}
      {...restFormProps}
      {...formTypeConfig}
      onFinish={handleFinish}
      onReset={handleReset}
      className={prefixCls}
    >
      <Row gutter={[24, 16]} {...rowProps}>
        {visibleItems.map((item, index) => {
          const itemKey = namePathToKey(item.name, index);

          return (
            <Col key={itemKey} span={dynamicSpan} {...item?.colProps}>
              <ItemRender
                readonly={readonly}
                formName={formName}
                {...item}
                style={{ marginBottom: 0, ...item.style }}
              />
            </Col>
          );
        })}
      </Row>
      {children}
    </Form>
  );
}

const InstanceFormMemo = memo(InstanceForm) as typeof InstanceForm;

export default InstanceFormMemo;
