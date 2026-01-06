import { Col, Form, Row } from 'antd';
import { Gutter } from 'antd/es/grid/row';
import React, { FC, useMemo } from 'react';

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
  ...formProps
}) => {
  const prefixCls = getPrefixCls('form');

  const formTypeConfig = useMemo(() => {
    if (!readonly) return {};

    if (readonly)
      return {
        disabled: true,
      };
  }, [readonly]);

  /**
   * @description 动态的占比
   */
  const dynamicSpan = useMemo(() => {
    return 24 / columns;
  }, [columns]);

  const handleFinish = (values: any) => {
    onFinish?.(values);
  };

  const handleReset = (e: any) => {
    onReset?.(e);
  };

  const gutter = useMemo<[Gutter, Gutter]>(() => {
    if (layout === 'vertical') return [24, 0];

    return [24, 16];
  }, [layout]);

  const formStyle = useMemo(() => {
    if (layout === 'inline') {
      return {
        marginBottom: 16,
        ...style,
      };
    }

    return style;
  }, [layout, style]);

  return (
    <Form
      colon={false}
      layout={layout}
      style={formStyle}
      {...formProps}
      {...formTypeConfig}
      onFinish={handleFinish}
      onReset={handleReset}
      className={prefixCls}
    >
      <Row gutter={gutter} {...rowProps}>
        {((items ?? []).filter((item) => !item.hidden) || []).map(
          (item, index) => {
            return (
              <Col
                key={item.name ?? index}
                span={dynamicSpan}
                {...item?.colProps}
              >
                <ItemRender readonly={readonly} formName={formName} {...item} />
              </Col>
            );
          },
        )}
      </Row>

      {children}
    </Form>
  );
};

export default InstanceForm;
