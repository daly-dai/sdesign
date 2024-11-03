import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import React, { FC, ReactNode, memo, useMemo } from 'react';

import DetailInstance from '../../instance';
import { SDetailGroupProps, SDetailProps } from '../../types';

import DynamicContainer from '@dalydb/sdesign/components/dynamic-container';
import STitle from '@dalydb/sdesign/components/title';
import { PageTitleProps } from '@dalydb/sdesign/components/title/types';
import { createCode } from '@dalydb/sdesign/utils';

const DetailGroup: FC<SDetailGroupProps> = ({ dataSource, items }) => {
  const memoizedDataSource = useMemo(() => dataSource, [dataSource]);

  // 渲染标题
  const renderTitle = (
    title: string | ReactNode,
    titleProps?: Omit<PageTitleProps, 'title'>,
  ) => {
    if (!title) return '';

    if (isString(title)) {
      return <STitle {...titleProps}>{title}</STitle>;
    }

    return title;
  };

  // 渲染详情实例
  const renderGroupDetail = (props: SDetailProps | undefined) => {
    if (!props) return <></>;

    if (!isArray(props?.items) || !props?.items?.length) return <></>;

    const data = props?.dataSource ?? memoizedDataSource;

    return (
      <DetailInstance
        key={createCode(6)}
        {...props}
        hasCardBg={true}
        dataSource={data ?? {}}
      ></DetailInstance>
    );
  };

  const renderGroup = useMemo(() => {
    if (!items || !Array(items)) return <></>;

    return items.map((item) => {
      const {
        groupTitleProps,
        groupTitle,
        groupContainer,
        groupItems,
        items,
        dataSource,
        itemProps,
        hidden,
      } = item;

      if (hidden) return <></>;

      return (
        <DynamicContainer key={createCode(6)} CustomContainer={groupContainer}>
          {renderTitle(groupTitle, groupTitleProps)}

          {renderGroupDetail({ items, dataSource, ...itemProps })}

          {(groupItems ?? []).map((detailItem) =>
            renderGroupDetail(detailItem),
          )}
        </DynamicContainer>
      );
    });
  }, [items, dataSource]);

  return <>{renderGroup}</>;
};

export default memo(DetailGroup);
