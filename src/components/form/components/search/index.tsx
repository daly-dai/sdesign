import { Button, Col, Flex, Form, Row } from 'antd';
import React, { FC, memo, useCallback, useMemo } from 'react';

import { SearchProps, SFormItems } from '../../types';
import ItemRender from '../item-render';

import useStyles from './index.style';

import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import SCollapse from '@dalydb/sdesign/components/collapse';
import DynamicContainer from '@dalydb/sdesign/components/dynamic-container';
import { useComStyle } from '@dalydb/sdesign/hooks';
import useExpand from '@dalydb/sdesign/hooks/useExpand';
import useSearchLayout from '@dalydb/sdesign/hooks/useSearchLayout';
import { genArrFromNum } from '@dalydb/sdesign/utils';

const Search: FC<SearchProps> = memo(
  ({
    rowProps,
    columns = 4,
    items,
    actionNode,
    showExpand = true,
    defaultExpand,
    readonly = false,
    container,
    isCard = false,
    ...props
  }) => {
    const { styles, prefixCls } = useComStyle({
      prefixCls: 'form-search',
      useStylesHook: useStyles,
    });

    const { showCollapse, expandNum, collapse, setCollapse } = useExpand({
      columns,
      items,
      showExpand,
      defaultExpand,
    });

    const { actionAlign, dynamicOffset, dynamicSpan } = useSearchLayout({
      columns,
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

    const handleFinish = useCallback(
      (values: any) => {
        props?.onFinish?.(values);
      },
      [props?.onFinish],
    );

    const handleReset = useCallback(
      (e: any) => {
        props?.onReset?.(e);
      },
      [props?.onReset],
    );

    const renderItemFields = (items: SFormItems[] | undefined) => {
      if (!expandNum || !items?.length) return <></>;

      return items.slice(0, expandNum).map((item, index) => {
        if (item?.hidden) return null;
        return (
          <Col key={item.name || index} span={dynamicSpan} {...item?.colProps}>
            <ItemRender
              readonly={readonly}
              style={{ marginBottom: '0' }}
              key={item.name || index}
              {...item}
            />
          </Col>
        );
      });
    };

    const itemFields = useMemo(() => {
      return renderItemFields(items);
    }, [expandNum, columns, items, dynamicSpan, readonly]);

    const renderCollapse = useMemo(() => {
      if (!showCollapse) return <></>;

      return (
        <SCollapse
          collapse={collapse}
          setCollapse={setCollapse}
          onExpand={props?.onExpand}
        />
      );
    }, [showCollapse, collapse, columns]);

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
                    <Flex gap={12}>
                      <Button
                        icon={<SearchOutlined />}
                        type="primary"
                        htmlType="submit"
                      >
                        查询
                      </Button>
                      <Button icon={<ReloadOutlined />} htmlType="reset">
                        重置
                      </Button>
                      {renderCollapse}
                    </Flex>
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
