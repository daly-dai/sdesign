import React, { FC } from 'react';

import { SCard, SForm, STable, STitle } from '@dalydb/sdesign';
import useSearchTable from '@dalydb/sdesign/hooks/useSearchTable';
import { SearchTableProps } from './types';

const SSearchTable: FC<SearchTableProps> = ({
  headTitle,
  tableTitle,
  requestFn,
  options = {},
  tableProps: externalTableProps,
  formProps,
}) => {
  const { tableProps, form, formConfig } = useSearchTable(requestFn, options);

  return (
    <>
      {headTitle && <STitle type="page" {...headTitle} />}

      <SForm.Search form={form} {...formConfig} {...formProps} />

      <SCard>
        {tableTitle && <STitle type="table" {...tableTitle} />}

        <STable {...tableProps} {...externalTableProps} />
      </SCard>
    </>
  );
};

export default SSearchTable;
