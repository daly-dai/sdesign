import { Col, Form, Row } from 'antd';
import React, { FC, memo, useCallback, useMemo } from 'react';

import ItemRender from './components/item-render';
import { SFormProps } from './types';

import { getPrefixCls } from '@dalydb/sdesign/utils';

const InstanceForm: FC<SFormProps> = ({
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
}) => {
  const { labelCol: consumerLabelCol, ...restFormProps } = formProps;
  const prefixCls = getPrefixCls('form');

  // 使用useCallback优化事件处理器
  const handleFinish = useCallback(
    (values: any) => {
      onFinish?.(values);
    },
    [onFinish],
  );

  const handleReset = useCallback(
    (e: any) => {
      onReset?.(e);
    },
    [onReset],
  );

  const formTypeConfig = readonly ? { disabled: true } : {};

  const dynamicSpan = 24 / columns;

  const formStyle =
    layout === 'inline' ? { marginBottom: 16, ...style } : style;

  // 过滤隐藏项
  const visibleItems = useMemo(() => {
    return (items ?? []).filter((item) => !item.hidden);
  }, [items]);

  // Antd Form 的 labelCol 不支持直接设置宽度，需将 labelWidth 转为 flex 值。
  // 例如 labelWidth={120} → labelCol={{ flex: '0 0 120px' }}
  // labelWidth="8em"      → labelCol={{ flex: '0 0 8em' }}
  const labelCol = useMemo(() => {
    if (labelWidth === undefined) {
      return consumerLabelCol;
    }

    const width =
      typeof labelWidth === 'number' ? `${labelWidth}px` : labelWidth;
    const flex = `0 0 ${width}`;

    if (consumerLabelCol) {
      return { ...consumerLabelCol, flex };
    }
    return { flex };
  }, [labelWidth, consumerLabelCol]);

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
          const itemKey = item.name
            ? `${formName ? `${formName}.` : ''}${item.name}`
            : `index_${index}`;

          return (
            <Col key={itemKey} span={dynamicSpan} {...item?.colProps}>
              <ItemRender readonly={readonly} formName={formName} {...item} />
            </Col>
          );
        })}
      </Row>
      {children}
    </Form>
  );
};

export default memo(InstanceForm);
