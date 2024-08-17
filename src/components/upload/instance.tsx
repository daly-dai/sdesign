import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import React, { FC } from 'react';

import UploadItem from './components/render-item';
import useBeforeUpload from './hooks/useBeforeUpload';
import useUpload from './hooks/useUpload';
import { SUploadProps } from './types';

const InternalUpload: FC<SUploadProps> = ({
  limit,
  limitSizeType,
  value,
  onChange,
  onItemClick,
  accept,
  listType,
  nameLimit,
  single,
  ...props
}) => {
  const {
    handleUpload,
    uploadMaxCount,
    handleUploadChange,
    deleteUploaded,
    fileList,
  } = useUpload({
    value,
    onChange,
    reflect: props.reflect,
    listType,
    uploadUrl: props.uploadUrl,
    imageUrlPrefix: props.imageUrlPrefix,
    single,
    maxCount: props.maxCount,
  });

  const { beforeUpload } = useBeforeUpload({
    maxCount: uploadMaxCount,
    accept,
    fileList,
    limit,
    limitSizeType,
    uploadUrl: props.uploadUrl,
  });

  return (
    <Upload
      {...props}
      fileList={fileList as any}
      beforeUpload={beforeUpload}
      customRequest={handleUpload}
      onChange={handleUploadChange}
      maxCount={uploadMaxCount}
      accept={accept}
      listType={listType}
      itemRender={(originNode, file: any) => {
        return (
          <UploadItem
            reflect={props.reflect}
            onClick={onItemClick}
            dataSource={file}
            status={file.status}
            onDelete={deleteUploaded}
            nameLimit={nameLimit}
          ></UploadItem>
        );
      }}
    >
      {props?.children ?? <Button icon={<UploadOutlined />}>上传文件</Button>}
    </Upload>
  );
};

export default InternalUpload;
