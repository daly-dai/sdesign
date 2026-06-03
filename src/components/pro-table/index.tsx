import React, { forwardRef, memo, useImperativeHandle } from 'react';

import { SForm, STable, STitle } from '@dalydb/sdesign';
import useProTable from '@dalydb/sdesign/hooks/useProTable';

import type { SProTableProps, SProTableRef } from './types';

function SProTableInner<RecordType = Record<string, unknown>>(
  {
    request,
    searchProps,
    tableProps: consumerTableProps,
    title,
    tableTitle,
    style,
    className,
  }: SProTableProps<RecordType>,
  ref: React.ForwardedRef<SProTableRef>,
) {
  const {
    tableProps: hookTableProps,
    form,
    search,
    reset,
    mutate,
  } = useProTable(request.service, {
    ...request.options,
    form: searchProps?.form,
  });

  useImperativeHandle(ref, () => ({
    refresh: () => search(),
    reset: () => reset(),
    getForm: () => form,
    clearData: () => mutate(undefined),
  }));

  const titleProps =
    typeof title === 'object' && title !== null && !('$$typeof' in title)
      ? (title as { children?: React.ReactNode; actionNode?: React.ReactNode })
      : { children: title as React.ReactNode };

  // 提取 pagination 做 deep-merge，其余属性透传
  const { pagination: consumerPagination, ...restConsumerTableProps } =
    consumerTableProps ?? {};

  const mergedPagination =
    hookTableProps.pagination && consumerPagination
      ? { ...hookTableProps.pagination, ...consumerPagination }
      : hookTableProps.pagination;

  return (
    <div style={style} className={className}>
      {title && <STitle type="page" {...titleProps} />}

      <SForm.Search
        {...searchProps}
        form={form}
        onFinish={searchProps?.onFinish ?? search}
        onReset={searchProps?.onReset ?? reset}
      />

      <div
        style={{
          marginTop: 12,
          background: '#fff',
          borderRadius: 8,
          padding: tableTitle ? '12px 16px 16px' : '16px',
        }}
      >
        {tableTitle && (
          <STitle type="table" hasBottomMargin={8} {...tableTitle} />
        )}

        <STable
          size="small"
          {...hookTableProps}
          {...restConsumerTableProps}
          pagination={mergedPagination}
        />
      </div>
    </div>
  );
}

const SProTable = memo(forwardRef(SProTableInner)) as <
  RecordType = Record<string, unknown>,
>(
  props: SProTableProps<RecordType> & { ref?: React.Ref<SProTableRef> },
) => React.ReactElement;

export default SProTable;
