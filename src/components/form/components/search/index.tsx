import { Button, Col, Form, Row, Space } from 'antd';
import React, { FC, memo, useMemo } from 'react';

import { SearchProps, SFormItems } from '../../types';
import ItemRender from '../item-render';

import useStyles from './index.style';

import SCollapse from '@dalydb/sdesign/components/collapse';
import DynamicContainer from '@dalydb/sdesign/components/dynamic-container';
import { useComStyle } from '@dalydb/sdesign/hooks';
import useExpand from '@dalydb/sdesign/hooks/useExpand';
import useResize from '@dalydb/sdesign/hooks/useResize';
import useSearchLayout from '@dalydb/sdesign/hooks/useSearchLayout';
import { createCode, genArrFromNum } from '@dalydb/sdesign/utils';

/** 配置表单列变化的容器宽度断点 */
const BREAKPOINTS = {
  default: [
    [513, 1],
    [701, 2],
    [1062, 3],
    [1440, 3],
    [Infinity, 4],
  ],
};

const Search: FC<SearchProps> = memo(
  ({
    rowProps,
    columns,
    items,
    actionNode,
    showExpand = true,
    defaultExpand,
    readonly = false,
    container,
    isCard = true,
    ...props
  }) => {
    const { styles, prefixCls } = useComStyle({
      prefixCls: 'form-search',
      useStylesHook: useStyles,
    });

    // const prefixCls = getPrefixCls('form-search');
    const { width } = useResize();

    /**
     * 动态列数
     */
    const dynamicColumns = useMemo(() => {
      if (columns && typeof columns === 'number') return columns;

      const breakPoint = BREAKPOINTS.default.find(
        (item) => width < (item[0] as number) + 16, // 16 = 2 * (ant-row -8px margin)
      );

      if (!breakPoint) return 4;

      return breakPoint[1] as number;
    }, [columns, width]);

    const { showCollapse, expandNum, collapse, setCollapse } = useExpand({
      columns: dynamicColumns,
      items,
      showExpand,
      defaultExpand,
    });

    const { actionAlign, dynamicOffset, dynamicSpan } = useSearchLayout({
      columns: dynamicColumns,
      items: genArrFromNum(expandNum ?? 0),
      styles,
      prefixCls,
    });

    const formTypeConfig = useMemo(() => {
      if (!readonly) return {};

      if (readonly)
        return {
          disabled: true,
        };
    }, [readonly]);

    const handleFinish = (values: any) => {
      props?.onFinish?.(values);
    };

    const handleReset = (e: any) => {
      props?.onReset?.(e);
    };

    const renderItemFields = (items: SFormItems[] | undefined) => {
      if (!expandNum || !items) {
        return <></>;
      }

      const children = [];

      if (!items?.length) {
        return <></>;
      }

      for (let i = 0; i < expandNum; i++) {
        const item = items[i];

        if (item?.hidden) continue;

        children.push(
          <Col key={createCode()} span={dynamicSpan} {...item?.colProps}>
            <ItemRender
              readonly={readonly}
              style={{ marginBottom: '0' }}
              key={createCode(6)}
              {...item}
            />
          </Col>,
        );
      }

      return children;
    };

    const itemFields = useMemo(() => {
      return renderItemFields(items);
    }, [expandNum, dynamicColumns, items]);

    const renderCollapse = useMemo(() => {
      if (!showCollapse) return <></>;

      return (
        <SCollapse
          collapse={collapse}
          setCollapse={setCollapse}
          onExpand={props?.onExpand}
        ></SCollapse>
      );
    }, [showCollapse, collapse, dynamicColumns]);

    return (
      <DynamicContainer isCard={isCard} CustomContainer={container}>
        <Form
          {...formTypeConfig}
          colon={false}
          {...props}
          onFinish={handleFinish}
          onReset={handleReset}
        >
          <Row gutter={[24, 16]} align="middle" {...rowProps}>
            {itemFields}

            <Col span={dynamicSpan} offset={dynamicOffset}>
              <div>
                {actionNode ?? (
                  <div className={actionAlign}>
                    <Space style={{ columnGap: '12px' }}>
                      {renderCollapse}
                      <Button htmlType="reset">重置</Button>
                      <Button type="primary" htmlType="submit">
                        查询
                      </Button>
                    </Space>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Form>
      </DynamicContainer>
    );
  },
);

export default memo(Search);
