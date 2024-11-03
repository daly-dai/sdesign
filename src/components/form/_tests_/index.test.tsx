import { fireEvent, render } from '@testing-library/react';
import { Button, Form, FormInstance } from 'antd';
import React, { useEffect } from 'react';
import { describe, expect, it } from 'vitest';

import { default as SForm, default as SFrom } from '../index';
import { SFormItems } from '../types';

import mountTest from '@dalydb/sdesign/tests/mountTest';
import rtlTest from '@dalydb/sdesign/tests/rtlTest';
import { waitFakeTimer } from '@dalydb/sdesign/tests/utils';

describe('SFrom', () => {
  mountTest(SFrom);
  mountTest(SFrom.Item);
  mountTest(SFrom.Group);
  mountTest(SFrom.Search);

  rtlTest(SFrom);
  rtlTest(SFrom.Item);
  rtlTest(SFrom.Group);
  rtlTest(SFrom.Search);

  // formName 嵌套数据类型,items表单配置,columns列数,readonly只读

  const items: SFormItems[] = [
    {
      label: '姓名',
      name: 'name',
    },
    {
      label: '年龄',
      name: 'age',
    },
  ];

  it('should support Items config', () => {
    const { container } = render(<SForm items={items}></SForm>);

    expect(container).toMatchSnapshot();
  });

  it('should support formName', () => {
    let formData = {};

    const Demo = () => {
      const [form] = Form.useForm();

      const handleClick = () => {
        const data = form.getFieldsValue();
        formData = data;
      };
      return (
        <>
          <SForm formName="test" items={items} form={form} />
          <Button type="primary" id="formSubmit" onClick={handleClick}>
            确 认
          </Button>
        </>
      );
    };

    const { getByText } = render(<Demo />);

    waitFakeTimer(300);

    const submit = getByText('确 认');
    fireEvent.click(submit);

    expect(formData).toEqual({
      test: {
        name: undefined,
        age: undefined,
      },
    });
  });

  it('should support setDefaultData by formName', () => {
    let formData = {};
    let formInstance: FormInstance<any> | null = null;

    const Demo = () => {
      const [form] = Form.useForm();

      useEffect(() => {
        formInstance = form;
      }, []);

      const handleClick = () => {
        const data = form.getFieldsValue();
        formData = data;
      };
      return (
        <>
          <SForm formName="test" items={items} form={form} />
          <Button type="primary" id="formSubmit" onClick={handleClick}>
            确 认
          </Button>
        </>
      );
    };

    const { getByText } = render(<Demo />);

    waitFakeTimer(300);

    // @ts-ignore
    formInstance?.setFieldsValue?.({
      test: {
        name: 'test',
        age: 18,
      },
    });

    const submit = getByText('确 认');
    fireEvent.click(submit);

    expect(formData).toEqual({
      test: {
        name: 'test',
        age: 18,
      },
    });
  });

  it('should support columns default 1', () => {
    const { container } = render(<SForm items={items} />);
    const columnsItems = container.querySelectorAll('.ant-col-24');

    expect(columnsItems.length).toBe(2);
  });

  it('should support custom columns', () => {
    const { container } = render(<SForm columns={2} items={items} />);
    const columnsItems = container.querySelectorAll('.ant-col-12');

    expect(columnsItems.length).toBe(2);
  });

  it('should support children', () => {
    const { container } = render(
      <SForm>
        <SForm.Item label="姓名" name="name">
          <input />
        </SForm.Item>
      </SForm>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should support readonly', () => {
    const { container } = render(
      <SForm readonly>
        <SForm.Item label="姓名" name="name">
          <input />
        </SForm.Item>
      </SForm>,
    );

    expect(container).toMatchSnapshot();
  });

  it('readonly width disabled', () => {
    const { container } = render(<SForm readonly items={items}></SForm>);

    const columnsItems = container.querySelectorAll('.ant-input-disabled');

    expect(columnsItems.length).toBe(2);
  });
});
