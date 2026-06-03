import React, { forwardRef, memo, useImperativeHandle } from 'react';

import { SForm, STable, STitle } from '@dalydb/sdesign';
import useProTable from '@dalydb/sdesign/hooks/useProTable';

import type { SProTableProps, SProTableRef } from './types';

function SProTableInner<RecordType = Record<string, unknown>>(
  {
    request,
    searchItems,
    columns,
    rowKey,
    title,
    tableTitle,
    searchActions,
    searchColumns = 3,
    form: externalForm,
    rowSelection,
    style,
    className,
  }: SProTableProps<RecordType>,
  ref: React.ForwardedRef<SProTableRef>,
) {
  const { tableProps, form, search, reset } = useProTable(request.service, {
    ...request.options,
    form: externalForm,
  });

  useImperativeHandle(ref, () => ({
    refresh: () => search(),
    reset: () => reset(),
  }));

  const titleProps =
    typeof title === 'object' && title !== null && !('$$typeof' in title)
      ? (title as { children?: React.ReactNode; actionNode?: React.ReactNode })
      : { children: title as React.ReactNode };

  return (
    <div style={style} className={className}>
      {title && <STitle type="page" {...titleProps} />}

      <SForm.Search
        form={form}
        onFinish={search}
        onReset={reset}
        items={searchItems}
        columns={searchColumns}
        actionNode={searchActions}
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
          {...tableProps}
          columns={columns}
          rowKey={rowKey}
          rowSelection={rowSelection}
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
