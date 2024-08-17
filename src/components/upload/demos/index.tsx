/**
 * title: 文件上传
 * description: 初始状态
 */
import { VerticalAlignTopOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import React from 'react';

import { SConfigProvider, SUpload } from '@daly/sdesign';

const DragUpload = () => {
  return (
    <SConfigProvider uploadUrl="/gateway/program/attachment/upload">
      <Space direction="vertical">
        <h3>基础使用</h3>
        <SUpload
          limit={5}
          limitSizeType="M"
          accept=".pdf ,.xls ,.xlsx, .doc, .docx, .ppt, .pptx, .png, .jpg"
        ></SUpload>

        <h3>自定义渲染内容</h3>
        <SUpload
          limit={5}
          limitSizeType="M"
          maxCount={5}
          accept=".pdf ,.xls ,.xlsx, .doc, .docx, .ppt, .pptx, .png, .jpg"
        >
          <Button icon={<VerticalAlignTopOutlined />}>上传文件</Button>
        </SUpload>
        <h3>限制上传大小为15M</h3>
        <SUpload limit={15} limitSizeType="M" multiple maxCount={5}>
          <Button type="primary">批量上传</Button>
        </SUpload>
      </Space>
    </SConfigProvider>
  );
};

export default DragUpload;
