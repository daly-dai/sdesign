import { render } from '@testing-library/react';
import set from 'lodash/set';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import SSearchTable from '../index';

import { waitFakeTimer } from '@daly/sdesign/tests/utils';

let mockParams: null = null;

const mockRequest = async (params: any) => {
  mockParams = params;

  return {
    dataList: [
      {
        id: 1,
        name: 'John Brown',
        age: 32,
      },
      {
        id: 2,
        name: 'Jim Green',
        age: 42,
      },
    ],
    pageNum: 1,
    pageSize: 10,
    total: 2,
  };
};

describe('SSearchTable', () => {
  it('should support columns props', () => {
    const { getByText } = render(
      <Router>
        <SSearchTable columns={[{ title: '标题1' }, { title: '标题2' }]} />,
      </Router>,
    );

    waitFakeTimer();

    const columnTitle = getByText('标题1');

    expect(columnTitle).toBeInTheDocument();
  });

  it('should support formItems', () => {
    const { getByText } = render(
      <Router>
        <SSearchTable
          searchItems={[
            {
              label: '标题1',
              name: 'title1',
            },
            {
              label: '标题2',
              name: 'title2',
            },
          ]}
        />
        ,
      </Router>,
    );

    waitFakeTimer();

    const columnTitle = getByText('标题1');
    const columnTitle2 = getByText('标题2');

    expect(columnTitle).toBeInTheDocument();
    expect(columnTitle2).toBeInTheDocument();
  });

  it('should support  render title related props', () => {
    const { getByText } = render(
      <Router>
        <SSearchTable
          title={<div>自定义标题</div>}
          titleProps={{
            titleDesc: '自定义标题描述',
          }}
          titleAction={<div>自定义标题操作</div>}
        />
        ,
      </Router>,
    );

    waitFakeTimer();

    const columnTitle = getByText('自定义标题');
    const columnTitleAction = getByText('自定义标题操作');
    const columnTitleDesc = getByText('自定义标题描述');

    expect(columnTitleAction).toBeInTheDocument();
    expect(columnTitleDesc).toBeInTheDocument();
    expect(columnTitle).toBeInTheDocument();
  });

  it('should support service related props', async () => {
    mockParams = null;

    const Search = () => {
      return (
        <Router>
          <SSearchTable
            service={mockRequest}
            extraParams={{
              total: 1,
            }}
            dispatchParams={(params: any) => {
              params.name = '123';
              params.age = '123';
              return params;
            }}
            handleDataSource={(data: any) => {
              set(data[0], 'name', '333');

              return data;
            }}
            columns={[
              {
                title: '姓名',
                dataIndex: 'name',
              },
              {
                title: '年龄',
                dataIndex: 'age',
              },
            ]}
            searchItems={[
              {
                label: '姓名',
                name: 'name',
              },
              {
                label: '年龄',
                name: 'age',
              },
            ]}
          />
        </Router>
      );
    };

    const { container } = render(<Search />);

    waitFakeTimer(3000);

    expect(container).toMatchSnapshot();

    expect(mockParams).toEqual({
      name: '123',
      age: '123',
      pageNum: 1,
      pageSize: 10,
      total: 1,
    });
  });
});
