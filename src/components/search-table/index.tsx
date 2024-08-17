import { Form } from 'antd';
import React, { FC, useMemo } from 'react';

import SCard from '../card';
import SForm from '../form';
import SSpin from '../spin';
import STable from '../table';
import STitle from '../title';

import { SearchTableProps } from './types';

import useSearchTable from '@daly/sdesign/hooks/useSearchTable';

const mockRequest = async () => {
  return {
    dataList: [],
    pageNum: 1,
    pageSize: 10,
    total: 0,
  };
};

const SSearchTable: FC<SearchTableProps> = ({
  title,
  titleAction,
  titleProps,
  service,
  extraParams,
  form,
  searchItems,
  columns,
  serviceProps,
  tableProps,
  dispatchParams,
  handleDataSource,
  formProps,
}) => {
  const [searchForm] = Form.useForm();

  const formInstance = useMemo(() => {
    return form ?? searchForm;
  }, [searchForm, form]);

  const serviceInstance = useMemo(() => {
    return service ?? mockRequest;
  }, [service]);

  const { getPageData, dataSource, loading, handleReset, pagination } = useSearchTable({
    // 接口地址需自定义
    requestFn: serviceInstance,
    form: formInstance,
    serviceProps,
    extraParams,
    dispatchParams,
  });

  const tableData = useMemo(() => {
    if (!dataSource) return [];

    return handleDataSource ? handleDataSource(dataSource) : dataSource;
  }, [handleDataSource, dataSource]);

  return (
    <>
      <SForm.Search
        items={searchItems}
        form={form}
        onFinish={getPageData}
        onReset={handleReset}
        {...formProps}
      />

      <SCard>
        <STitle type="table" {...titleProps} actionNode={titleAction}>
          {title ?? '查询结果'}
        </STitle>

        <SSpin spinning={loading}>
          <STable
            isSeq
            columns={columns}
            dataSource={tableData}
            pagination={pagination}
            {...tableProps}
          />
        </SSpin>
      </SCard>
    </>
  );
};

export default SSearchTable;
