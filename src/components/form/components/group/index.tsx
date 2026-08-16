import { Col, Form, Row } from 'antd';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import React, { ReactNode, memo, useMemo } from 'react';

import { GroupItemsType, SFormGroupProps } from '../../types';
import { namePathToKey, resolveLabelCol, useFormBehavior } from '../../utils';
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

function Group<Values = any>({
  onFinish,
  onReset,
  groupItems,
  container,
  formName,
  children,
  readonly = false,
  labelWidth,
  ...formProps
}: SFormGroupProps<Values>) {
  const formTypeConfig = readonly ? { disabled: true } : {};

  const { handleFinish, handleReset } = useFormBehavior<Values>({
    onFinish,
    onReset,
  });

  const { labelCol: consumerLabelCol, style, ...restFormProps } = formProps;
  const labelCol = useMemo(
    () => resolveLabelCol(labelWidth, consumerLabelCol),
    [labelWidth, consumerLabelCol],
  );

  // 与 SForm 保持一致：容器底部默认留 16px，避免紧贴下方内容
  const formStyle = { marginBottom: 16, ...style };

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
          {(groupItem.items ?? [])
            .filter((item) => !item.hidden)
            .map((item, itemIndex) => {
              const itemFormName = getItemFormName(
                item?.formName,
                groupItem?.formName,
                formName,
              );

              // 生成稳定的 key：优先使用 name（转字符串），否则使用 index
              const itemKey = namePathToKey(item.name, itemIndex);

              return (
                <Col key={itemKey} span={dynamicSpan} {...item?.colProps}>
                  <ItemRender
                    readonly={readonly}
                    formName={itemFormName}
                    {...item}
                    style={{ marginBottom: 0, ...item.style }}
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

    return groupItems?.map((groupItem, index) => renderItem(groupItem, index));
  }, [groupItems, readonly, container, formName]);

  return (
    <Form
      {...formTypeConfig}
      colon={false}
      layout="vertical"
      style={formStyle}
      labelCol={labelCol}
      {...restFormProps}
      onFinish={handleFinish}
      onReset={handleReset}
    >
      {renderGroupItems}
      {children}
    </Form>
  );
}

const GroupMemo = memo(Group) as typeof Group;

export default GroupMemo;
