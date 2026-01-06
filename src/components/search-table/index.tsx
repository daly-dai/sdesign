import { Form } from 'antd';
import React, { FC } from 'react';

import SCard from '../card';
import SForm from '../form';
import STable from '../table';
import STitle from '../title';

import { useSTable } from '@dalydb/sdesign/hooks';
import { SearchTableProps } from './types';

const mockRequest = async () => {
  return {
    list: [],
    current: 1,
    pageSize: 10,
    total: 0,
  };
};

const SSearchTable: FC<SearchTableProps> = ({
  headTitle,
  tableTitle,
  serviceProps,
  tableProps,
  formProps,
}) => {
  const [searchForm] = Form.useForm();

  const { search, tableProps: tablePropsFromHook } = useSTable(
    serviceProps?.service ?? mockRequest,
    {
      ...serviceProps?.serviceProps,
      form: serviceProps?.serviceProps?.form ?? searchForm,
    },
  );

  console.log(tablePropsFromHook, 'tablePropsFromHook');

  return (
    <>
      <STitle type="page" {...headTitle} />

      <SForm.Search
        onFinish={search.submit}
        onReset={search.reset}
        {...formProps}
      />

      <SCard>
        <STitle type="table" {...tableTitle} />

        <STable
          {...tablePropsFromHook}
          pagination={{
            size: 'small',
            showTotal: (total) => `共 ${total} 条`,
            showSizeChanger: true,
            ...tablePropsFromHook.pagination,
          }}
          {...tableProps}
        />
      </SCard>
    </>
  );
};

export default SSearchTable;
