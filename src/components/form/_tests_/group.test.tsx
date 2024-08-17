import { render } from '@testing-library/react';
import { Form, FormInstance } from 'antd';
import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import SForm from '../index';
import { GroupItemsType } from '../types';

import { waitFakeTimer } from '@daly/sdesign/tests/utils';

const dataSource = {
  userName: '张三',
  userPhone: '123456789',
  userMsg11: '张三',
  address: '北京市朝阳区',
  currentAddress: '北京市朝阳区',
};

const groupItems: GroupItemsType[] = [
  {
    title: '基础信息',
    columns: 2,
    items: [
      {
        type: 'input',
        label: '用户名称',
        name: 'userName',
        required: true,
      },
      {
        type: 'input',
        label: '用户电话',
        name: 'userPhone',
        required: '请输入用户电话',
      },
      {
        type: 'input',
        label: '用户信息',
        name: 'userMsg11',
        required: '请输入用户信息',
      },
    ],
  },
  {
    title: '详细信息',
    items: [
      {
        type: 'textarea',
        label: '户籍地址',
        name: 'address',
      },
      {
        type: 'textarea',
        label: '现居地址',
        name: 'currentAddress',
      },
    ],
  },
];

describe('SForm.Group', () => {
  /**
   * 支持groupItems,
   * 支持formName，
   * 支持dynamicContainer,
   * 支持children
   */
  it('should render correctly', () => {
    const { container } = render(<SForm.Group></SForm.Group>);

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with groupItems', () => {
    const { container, getByText } = render(
      <Router>
        <SForm.Group groupItems={groupItems}></SForm.Group>,
      </Router>,
    );
    expect(container).toMatchSnapshot();
    const groupTitle = getByText('基础信息');
    expect(groupTitle).toBeInTheDocument();
  });

  it('should support formName', () => {
    let formInstance: FormInstance<any> | null = null;

    const Group = () => {
      const [form] = Form.useForm();

      useEffect(() => {
        formInstance = form;
      }, []);

      return (
        <SForm.Group
          formName="baseInfo"
          groupItems={groupItems}
          form={form}
        ></SForm.Group>
      );
    };

    render(
      <Router>
        <Group></Group>,
      </Router>,
    );

    waitFakeTimer(1000);
    // @ts-ignore
    formInstance?.setFieldsValue({ baseInfo: dataSource });

    waitFakeTimer(1000);

    // @ts-ignore
    const data = formInstance?.getFieldsValue();

    expect(data).toEqual({ baseInfo: dataSource });
  });

  it('should support  children', async () => {
    const { container } = render(
      <Router>
        <SForm.Group>submit</SForm.Group>
      </Router>,
    );

    waitFakeTimer(1000);

    expect(container).toMatchSnapshot();
  });
});
