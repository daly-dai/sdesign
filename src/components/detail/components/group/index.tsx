import isString from 'lodash/isString';
import React, { FC, ReactNode, memo, useId } from 'react';

import DetailInstance from '../../instance';
import { SDetailGroupProps, SDetailProps } from '../../types';

import DynamicContainer from '@dalydb/sdesign/components/dynamic-container';
import STitle from '@dalydb/sdesign/components/title';
import { STitleProps } from '@dalydb/sdesign/components/title/types';

// 渲染标题
const renderTitle = (
  title: string | ReactNode,
  titleProps?: Omit<STitleProps, 'title'>,
) => {
  if (!title) return null;
  if (!isString(title)) return title;
  return <STitle {...titleProps}>{title}</STitle>;
};

// 渲染详情实例
const renderGroupDetail = (
  props: SDetailProps | undefined,
  fallbackDataSource: Record<string, any> | undefined,
  key: string,
) => {
  if (!props?.items?.length) return null;

  return (
    <DetailInstance
      key={key}
      {...props}
      hasCardBg
      dataSource={props.dataSource ?? fallbackDataSource ?? {}}
    />
  );
};

const DetailGroup: FC<SDetailGroupProps> = ({ dataSource, items }) => {
  const groupId = useId();

  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <>
      {items.map((item, index) => {
        const {
          groupTitleProps,
          groupTitle,
          groupContainer,
          groupItems,
          items: detailItems,
          dataSource: itemDataSource,
          itemProps,
          hidden,
        } = item;

        if (hidden) return null;

        const containerKey = `${groupId}-group-${index}`;

        return (
          <DynamicContainer key={containerKey} CustomContainer={groupContainer}>
            {renderTitle(groupTitle, groupTitleProps)}
            {renderGroupDetail(
              { items: detailItems, dataSource: itemDataSource, ...itemProps },
              dataSource,
              `${containerKey}-detail`,
            )}
            {(groupItems ?? []).map((detailItem, idx) =>
              renderGroupDetail(
                detailItem,
                dataSource,
                `${containerKey}-sub-${idx}`,
              ),
            )}
          </DynamicContainer>
        );
      })}
    </>
  );
};

export default memo(DetailGroup);
