import { Col, Form, Row } from 'antd';
import { Gutter } from 'antd/es/grid/row';
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
  ...formProps
}) => {
  const prefixCls = getPrefixCls('form');

  // 性能监控
  // const { logItemCount } = useFormPerformance(formName);

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

  // 优化配置计算
  const formTypeConfig = useMemo(() => {
    if (!readonly) return {};

    return {
      disabled: true,
    };
  }, [readonly]);

  // 动态占比计算
  const dynamicSpan = useMemo(() => {
    return 24 / columns;
  }, [columns]);

  // 间距配置
  const gutter = useMemo<[Gutter, Gutter]>(() => {
    return layout === 'vertical' ? [24, 0] : [24, 16];
  }, [layout]);

  // 样式配置
  const formStyle = useMemo(() => {
    if (layout === 'inline') {
      return {
        marginBottom: 16,
        ...style,
      };
    }
    return style;
  }, [layout, style]);

  // 过滤隐藏项
  const visibleItems = useMemo(() => {
    return (items ?? []).filter((item) => !item.hidden);
  }, [items]);

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
