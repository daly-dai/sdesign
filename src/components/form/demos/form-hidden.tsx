/**
 * title: 新增hidden属性隐藏表单项
 * background: rgba(42, 46, 54, 0.04)
 */

import { Button } from 'antd';
import React, { useState } from 'react';

import {
  GroupItemsType,
  SCard,
  SForm,
  SFormItems,
  STitle,
} from '@daly/sdesign';

export default () => {
  const [hidden, setHidden] = useState(false);
  const [hidden1, setHidden1] = useState(false);
  const [hidden2, setHidden2] = useState(false);

  const searchItems: SFormItems[] = [
    {
      label: '姓名',
      name: 'name',
      type: 'input',
    },
    {
      label: '动态展示',
      name: 'age',
      type: 'input',
      hidden: hidden,
    },
  ];

  const formItems: SFormItems[] = [
    {
      label: '姓名',
      name: 'name',
      type: 'input',
    },
    {
      label: '动态展示',
      name: 'age',
      type: 'input',
      hidden: hidden1,
    },
  ];

  const groupItems: GroupItemsType[] = [
    {
      title: '分组表单一',
      items: [
        {
          label: '姓名',
          name: 'name',
          type: 'input',
        },
      ],
    },
    {
      title: '分组表单二',
      items: [
        {
          label: '动态配置',
          name: 'name',
          type: 'input',
          hidden: hidden2,
        },
      ],
    },
  ];

  const renderText = (status: boolean) => {
    return status ? '显示' : '隐藏';
  };

  return (
    <>
      <STitle>表单项动态隐藏功能</STitle>
      <SCard hasBottomPadding>
        <STitle
          type="page"
          actionNode={
            <Button type="primary" onClick={() => setHidden(!hidden)}>
              {renderText(hidden)}search表单项
            </Button>
          }
        >
          search
        </STitle>

        <SForm.Search
          name="hiddenSearch"
          title="搜索"
          items={searchItems}
        ></SForm.Search>
      </SCard>

      <SCard hasBottomPadding>
        <STitle
          actionNode={
            <Button type="primary" onClick={() => setHidden1(!hidden1)}>
              {renderText(hidden1)}表单项
            </Button>
          }
        >
          form表单
        </STitle>
        <SForm name="hiddenForm" columns={2} items={formItems}></SForm>
      </SCard>
      <SCard hasBottomPadding>
        <STitle
          actionNode={
            <Button type="primary" onClick={() => setHidden2(!hidden2)}>
              {renderText(hidden2)}分组表单项
            </Button>
          }
        >
          分组表单
        </STitle>
        <SForm.Group name="hiddenGroup" groupItems={groupItems}></SForm.Group>
      </SCard>
    </>
  );
};
