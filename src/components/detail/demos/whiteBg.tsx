/**
 * title: 新增白色背景样式,默认为透明
 * description: 通过hasCardBg属性设置白色背景样式
 * background: rgba(42, 46, 54, 0.04)
 */

import { Button, Tag } from 'antd';
import React from 'react';

import { SDetail, SDetailItem } from '@daly/sdesign';

const detailData = {
  workAddress: '测试的地址',
  accessPointDevices: '常见的信息',
  inner: '内链',
};

const FileList = () => {
  const businessItems: SDetailItem[] = [
    {
      label: '普通渲染',
      name: 'workAddress',
    },
    {
      label: '自定义渲染渲染渲染',
      name: 'accessPointDevices',
      render: (data: string | undefined) => {
        if (!data) return '-';

        return <div>测试数据{data}</div>;
      },
    },
    {
      label: '字典值回显',
      name: 'inner',
    },
  ];

  return (
    <SDetail
      hasCardBg
      title="详情页回显示例"
      titleDesc={<Tag color="blue">测试标签</Tag>}
      titleAction={<Button type="primary">测试按钮</Button>}
      dataSource={detailData}
      items={businessItems}
      column={2}
    ></SDetail>
  );
};

export default FileList;
