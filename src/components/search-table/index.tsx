import React, { forwardRef, useImperativeHandle } from 'react';

import { SCard, SForm, STable, STitle } from '@dalydb/sdesign';
import useSearchTable from '@dalydb/sdesign/hooks/useSearchTable';
import { SearchTableProps, SSearchTableRef } from './types';

const SSearchTable = forwardRef<SSearchTableRef, SearchTableProps>(
  (
    {
      headTitle,
      tableTitle,
      requestFn,
      options = {},
      tableProps: externalTableProps,
      formProps,
      tableCardProps,
    },
    ref,
  ) => {
    const {
      tableProps,
      pagination,
      form,
      formConfig,
      getPageData,
      handleReset,
    } = useSearchTable(requestFn, {
      ...options,
      form: formProps?.form,
    });

    useImperativeHandle(
      ref,
      () => ({
        refresh: (params?: any) => {
          getPageData(params);
        },
        reset: () => {
          handleReset();
        },
        getForm: () => form,
        submit: () => {
          getPageData();
        },
      }),
      [getPageData, handleReset, form],
    );

    return (
      <>
        {headTitle && <STitle type="page" {...headTitle} />}

        <SForm.Search form={form} {...formConfig} {...formProps} />

        <SCard {...tableCardProps}>
          {tableTitle && <STitle type="table" {...tableTitle} />}

          <STable
            size="small"
            {...tableProps}
            {...externalTableProps}
            pagination={{ ...pagination, ...externalTableProps?.pagination }}
          />
        </SCard>
      </>
    );
  },
);

SSearchTable.displayName = 'SSearchTable';

export default SSearchTable;
