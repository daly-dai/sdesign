import { Col, Form, Row } from 'antd';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import React, { FC, ReactNode, memo, useMemo } from 'react';

import { GroupItemsType, SFormGroupProps } from '../../types';
import ItemRender from '../item-render';

import DynamicContainer from '@dalydb/sdesign/components/dynamic-container';
import STitle from '@dalydb/sdesign/components/title';
import { createCode } from '@dalydb/sdesign/utils';

function getItemFormName(
  itemName?: string,
  groupItemName?: string,
  formName?: string,
) {
  if (itemName) return itemName;
  if (groupItemName) return groupItemName;
  if (formName) return formName;

  return;
}

const Group: FC<SFormGroupProps> = ({
  onFinish,
  onReset,
  groupItems,
  container,
  formName,
  children,
  readonly = false,
  ...formProps
}) => {
  const formTypeConfig = useMemo(() => {
    if (!readonly) return {};

    if (readonly)
      return {
        disabled: true,
      };
  }, [readonly]);

  const handleFinish = (values: any) => {
    onFinish?.(values);
  };

  const handleReset = (e: any) => {
    onReset?.(e);
  };

  // 获取占比
  const getDynamicSpan = (column: number = 1) => {
    return 24 / column;
  };

  const renderTitle = (title: ReactNode) => {
    if (!title) return <></>;

    if (isString(title)) return <STitle type="form">{title}</STitle>;

    return <>{title}</>;
  };

  const renderItem = (groupItem: GroupItemsType) => {
    const dynamicSpan = getDynamicSpan(groupItem?.columns);
    const itemContainer = groupItem?.container ?? container;

    return (
      <DynamicContainer key={createCode(6)} CustomContainer={itemContainer}>
        {renderTitle(groupItem?.title)}
        <Row gutter={[24, 16]} {...groupItem?.rowProps}>
          {(groupItem?.items || []).map((item) => {
            if (item?.hidden) return <></>;

            const itemFormName = getItemFormName(
              item?.formName,
              groupItem?.formName,
              formName,
            );

            return (
              <Col key={createCode()} span={dynamicSpan} {...item?.colProps}>
                <ItemRender
                  readonly={readonly}
                  key={createCode(6)}
                  formName={itemFormName}
                  {...item}
                />
              </Col>
            );
          })}
        </Row>
      </DynamicContainer>
    );
  };

  const renderGroupItems = useMemo(() => {
    if (!isArray(groupItems)) return <></>;

    return groupItems?.map((groupItem) => renderItem(groupItem));
  }, [groupItems]);

  return (
    <Form
      {...formTypeConfig}
      colon={false}
      layout="vertical"
      {...formProps}
      onFinish={handleFinish}
      onReset={handleReset}
    >
      {renderGroupItems}
      {children}
    </Form>
  );
};

export default memo(Group);
