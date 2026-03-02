import { Col, Form, Row } from 'antd';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import React, { FC, ReactNode, memo, useCallback, useMemo } from 'react';

import { GroupItemsType, SFormGroupProps } from '../../types';
import ItemRender from '../item-render';

import DynamicContainer from '@dalydb/sdesign/components/dynamic-container';
import STitle from '@dalydb/sdesign/components/title';

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

  // 获取占比
  const getDynamicSpan = (column: number = 1) => {
    return 24 / column;
  };

  const renderTitle = (title: ReactNode) => {
    if (!title) return <></>;

    if (isString(title)) return <STitle type="form">{title}</STitle>;

    return <>{title}</>;
  };

  const renderItem = (groupItem: GroupItemsType, groupIndex: number) => {
    const dynamicSpan = getDynamicSpan(groupItem?.columns);
    const itemContainer = groupItem?.container ?? container;

    return (
      <DynamicContainer
        key={groupItem.formName || groupIndex}
        CustomContainer={itemContainer}
      >
        {renderTitle(groupItem?.title)}
        <Row gutter={[24, 16]} {...groupItem?.rowProps}>
          {((groupItem.items ?? []).filter((item) => !item.hidden) || []).map(
            (item, itemIndex) => {
              const itemFormName = getItemFormName(
                item?.formName,
                groupItem?.formName,
                formName,
              );

              // 生成稳定的 key：优先使用 name（转字符串），否则使用 index
              const itemKey =
                item.name !== null && item.name !== undefined
                  ? Array.isArray(item.name)
                    ? item.name.join('.')
                    : String(item.name)
                  : itemIndex;

              return (
                <Col key={itemKey} span={dynamicSpan} {...item?.colProps}>
                  <ItemRender
                    readonly={readonly}
                    formName={itemFormName}
                    {...item}
                  />
                </Col>
              );
            },
          )}
        </Row>
      </DynamicContainer>
    );
  };

  const renderGroupItems = useMemo(() => {
    if (!isArray(groupItems)) return <></>;

    return groupItems?.map((groupItem, index) => renderItem(groupItem, index));
  }, [groupItems, readonly, container, formName]);

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
