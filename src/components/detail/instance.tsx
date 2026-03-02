import { Descriptions } from 'antd';
import { DescriptionsItemType } from 'antd/es/descriptions';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import React, { CSSProperties, memo, useId, useMemo } from 'react';

import DynamicContainer from '../dynamic-container';
import STitle from '../title';

import DetailItem from './components/item-render';
import { DETAIL_LABEL_STYLE } from './constant';
import { ItemType, SDetailProps } from './types';

const getItemLabelStyle = (type?: ItemType): CSSProperties => ({
  width: type === 'placeholder' ? '100%' : undefined,
});

const getDetailVal = (
  name: string | string[],
  dataSource: Record<string, any>,
): any => {
  if (isString(name)) return dataSource[name];
  return name.map((key) => dataSource[key]);
};

const DetailInstance: React.FC<SDetailProps> = ({
  items = [],
  dataSource: rawDataSource = {},
  labelStyle,
  column = 3,
  title,
  style,
  className,
  colon = false,
  desc,
  titleAction,
  hasCardBg = false,
  layout = 'horizontal',
  detailName,
  ...props
}) => {
  const componentId = useId();

  // 使用 useMemo 来记忆化 dataSource
  const dataSource = useMemo(() => {
    if (!detailName) return rawDataSource;
    return rawDataSource[detailName] ?? {};
  }, [rawDataSource, detailName]);

  // 渲染标题
  const detailTitle = useMemo(() => {
    if (!title) return undefined;
    if (!isString(title)) return title;
    return (
      <STitle
        style={{ marginBottom: 0 }}
        type="form"
        desc={desc}
        actionNode={titleAction}
      >
        {title}
      </STitle>
    );
  }, [title, desc, titleAction]);

  // 提取 Descriptions 需要的 item 配置和 DetailItem 需要的配置
  const detailItems = useMemo<DescriptionsItemType[]>(() => {
    if (!isArray(items) || items.length === 0) return [];

    return items
      .filter((item) => !item.hidden)
      .map((item, index) => {
        const {
          prefixCls,
          className: itemClassName,
          style: itemStyle,
          label,
          labelStyle: itemLabelStyle,
          contentStyle,
          span,
          name,
          ...detailConfig
        } = item;

        return {
          key: `${componentId}-item-${index}`,
          prefixCls,
          className: itemClassName,
          style: itemStyle,
          label,
          labelStyle: { ...getItemLabelStyle(item.type), ...itemLabelStyle },
          contentStyle,
          span,
          children: (
            <DetailItem
              dataSource={dataSource}
              value={name ? getDetailVal(name, dataSource) : undefined}
              {...detailConfig}
            />
          ),
        };
      });
  }, [items, dataSource, componentId]);

  const mergedLabelStyle = useMemo(
    () => ({ ...DETAIL_LABEL_STYLE, ...labelStyle }),
    [labelStyle],
  );

  return (
    <DynamicContainer
      id={componentId}
      style={style}
      className={className}
      isCard={hasCardBg}
      CustomContainer={props.container}
    >
      <Descriptions
        colon={colon}
        column={column}
        title={detailTitle}
        items={detailItems}
        layout={layout}
        labelStyle={mergedLabelStyle}
        {...props}
      />
    </DynamicContainer>
  );
};

export default memo(DetailInstance);
