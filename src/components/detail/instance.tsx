import { Descriptions } from 'antd';
import { DescriptionsItemType } from 'antd/es/descriptions';
import cloneDeep from 'lodash/cloneDeep';
import has from 'lodash/has';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import omit from 'lodash/omit';
import React, { CSSProperties, memo, useMemo } from 'react';

import DynamicContainer from '../dynamic-container';
import STitle from '../title';

import DetailItem from './components/item-render';
import { DETAIL_ITEM_KEY, DETAIL_LABEL_STYLE } from './constant';
import useDetail from './hook';
import { ItemType, SDetailItem, SDetailProps } from './types';

import { createCode } from '@dalydb/sdesign/utils/common';

const getItemLabelStyle = (
  type?: ItemType,
  labelStyle?: CSSProperties,
): CSSProperties => {
  const defaultStyle = {
    width: type === 'placeholder' ? '100%' : ``,
    ...(labelStyle ?? {}),
  };

  return defaultStyle;
};

const getDetailVal = (
  name?: string | string[],
  dataSource?: Record<string, any>,
) => {
  if (!dataSource) return null;

  if (!name) return null;

  if (isString(name)) return dataSource?.[name];

  if (isArray(name)) return name.map((item: string) => dataSource?.[item]);
};

const DetailInstance: React.FC<SDetailProps> = ({
  items = [],
  dataSource = {},
  labelStyle = {},
  column = 3,
  title = '',
  style = {},
  className,
  colon = false,
  titleDesc,
  titleAction,
  hasCardBg = false,
  layout = 'horizontal',
  detailName,
  ...props
}) => {
  // 使用 useMemo 来记忆化 dataSource，避免在每次渲染中重新创建
  const memoizedDataSource = useMemo(() => {
    if (!detailName) return dataSource;

    return dataSource?.[detailName] ?? {};
  }, [dataSource, detailName]);

  const { CriterionLabelStyle, componentId } = useDetail({
    column,
  });

  // label宽度样式
  const labelWidthStyle = useMemo<CSSProperties>(() => {
    if (layout === 'vertical') {
      return {
        width: '100%',
      };
    }

    if (column === 1) {
      return {
        width: '40%',
      };
    }

    return CriterionLabelStyle;
  }, [CriterionLabelStyle, column]);

  // 渲染标题
  const detailTitle = useMemo(() => {
    if (!title) return '';

    if (isString(title)) {
      return (
        <STitle
          style={{ marginBottom: '0' }}
          type="form"
          titleDesc={titleDesc}
          actionNode={titleAction}
        >
          {title}
        </STitle>
      );
    }

    return title;
  }, []);

  /**
   * 处理传入的配置项
   * @param config
   * @returns
   */
  const dispatchItemConfig = (
    config: SDetailItem,
    dataSource: Record<string, any>,
  ) => {
    const localConfig = cloneDeep(config);

    const valName = config?.name;

    const itemConfig: Record<string, any> = {
      key: createCode(6),
      labelStyle: { ...getItemLabelStyle(config?.type) },
    };

    DETAIL_ITEM_KEY.forEach((key: any) => {
      if (has(localConfig, key)) {
        itemConfig[key] = localConfig[key];
        delete localConfig[key];
      }
    });

    const detailConfig = {
      ...localConfig,
      value: getDetailVal(valName, dataSource),
    };

    return {
      itemConfig,
      detailConfig,
    };
  };

  const detailItems = useMemo<DescriptionsItemType[]>(() => {
    const result: DescriptionsItemType[] = [];

    if (!isArray(items) || items?.length === 0) return result;

    (items ?? [])?.forEach((item) => {
      if (!item || item.hidden) return;

      const { itemConfig, detailConfig } = dispatchItemConfig(
        item,
        memoizedDataSource,
      );

      result.push({
        ...itemConfig,
        children: (
          <DetailItem
            key={createCode(6)}
            dataSource={memoizedDataSource}
            {...omit(detailConfig, ['key'])}
          />
        ),
      });
    });

    return result;
  }, [items]);

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
        labelStyle={{
          ...DETAIL_LABEL_STYLE,
          ...labelWidthStyle,
          ...labelStyle,
        }}
        {...props}
      />
    </DynamicContainer>
  );
};

export default memo(DetailInstance);
