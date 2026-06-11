/**
 * title: 详情页回显,可手动控制展示与隐藏
 * description: 支持 自定义、字典、文件、时间范围、多选框组等回显渲染情况
 */

import { Button, ConfigProvider, Space, Tag } from 'antd';
import React, { useState } from 'react';

import { SCard, SDetail, SDetailItem } from '@dalydb/sdesign';

const numberMap = {
  0: '有用',
  1: '无用',
};

const dictMap = {
  1: 'Value 1',
  2: 'Value 2',
  3: 'Value 3',
};

const detailData = {
  workAddress: '测试的地址',
  accessPointDevices: '常见的信息',
  accessServerCount: '0',
  startTime: '2020-01-01',
  endTime: '2020-02-21',
  checkboxGroup: '1,2,3',
  fileDTOList: [
    {
      fileName: '测试文件',
      fileUrl: 'https://oss/data.png',
    },
    {
      fileName: '测试文件2',
      fileUrl: 'https://oss/data.pdf',
    },
  ],
  fileDTO: {
    fileName: '测试文件2',
    fileUrl: 'https://oss/data.pdf',
  },
};

const FileList = () => {
  const [hidden, setHidden] = useState(false);

  const businessItems: SDetailItem[] = [
    {
      label: '普通渲染',
      name: 'workAddress',
    },
    {
      label: '自定义渲染',
      name: 'accessPointDevices',
      render: (data: string | undefined) => {
        if (!data) return '-';

        return <div>测试数据{data}</div>;
      },
    },
    {
      label: '字典值渲染',
      name: 'accessServerCount',
      type: 'dict',
      dictMap: numberMap,
    },
    {
      label: '动态控制',
      labelStyle: {
        color: 'blue',
      },
      hidden,
      name: 'workAddress',
    },
    {
      label: '时间范围',
      type: 'rangeTime',
      name: ['startTime', 'endTime'],
    },
    {
      label: '多选框回显',
      name: 'checkboxGroup',
      type: 'checkbox',
      dictMap: dictMap,
    },
    {
      label: '占位符渲染',
      type: 'placeholder',
    },
    {
      label: '文件渲染',
      type: 'file',
      name: 'fileDTOList',
    },
    {
      label: '单项文件渲染',
      type: 'file',
      name: 'fileDTO',
    },
  ];

  const [fontSize, setFontSize] = useState(14);

  const renderConfigButton = () => {
    return (
      <Space style={{ marginBottom: '16px' }}>
        <Button onClick={() => setFontSize(14)}>14px</Button>
        <Button onClick={() => setFontSize(16)}>16px</Button>
        <Button onClick={() => setFontSize(18)}>18px</Button>
      </Space>
    );
  };

  return (
    <>
      <h2>动态设置token字体大小</h2>
      {renderConfigButton()}
      <ConfigProvider theme={{ token: { fontSize } }}>
        <SCard>
          <Button
            style={{ marginBottom: '16px' }}
            type="primary"
            onClick={() => setHidden(!hidden)}
          >
            {hidden ? '显示' : '隐藏'}属性
          </Button>
          <SDetail
            title="详情页回显示例"
            desc={<Tag color="blue">测试标签</Tag>}
            titleAction={<Button type="primary">测试按钮</Button>}
            dataSource={detailData}
            items={businessItems}
            column={2}
          />
          <h3>其他布局</h3>
          <SDetail
            title="vertical布局回显"
            dataSource={detailData}
            items={businessItems.slice(0, 5)}
            layout="vertical"
            column={2}
          />
        </SCard>
      </ConfigProvider>
    </>
  );
};

export default FileList;
