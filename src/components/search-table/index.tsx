import React, { forwardRef, useImperativeHandle } from 'react';

import { SCard, SForm, STable, STitle } from '@dalydb/sdesign';
import useSearchTable from '@dalydb/sdesign/hooks/useSearchTable';
import { SearchTableProps, SearchTableRef } from './types';

const SSearchTable = forwardRef<SearchTableRef, SearchTableProps>(
  (
    {
      headTitle,
      tableTitle,
      requestFn,
      options = {},
      tableProps: externalTableProps,
      formProps,
    },
    ref,
  ) => {
    const { tableProps, form, formConfig, getPageData, handleReset } =
      useSearchTable(requestFn, {
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
      }),
      [getPageData, handleReset, form],
    );

    return (
      <>
        {headTitle && <STitle type="page" {...headTitle} />}

        <SForm.Search form={form} {...formConfig} {...formProps} />

        <SCard>
          {tableTitle && <STitle type="table" {...tableTitle} />}

          <STable size="small" {...tableProps} {...externalTableProps} />
        </SCard>
      </>
    );
  },
);

SSearchTable.displayName = 'SSearchTable';

export default SSearchTable;
