import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload, UploadFile } from 'antd';
import { RcFile } from 'antd/es/upload';
import React, { FC, useMemo, useState } from 'react';

import useBeforeUpload from '../../hooks/useBeforeUpload';
import useUpload from '../../hooks/useUpload';
import { SPictureProps } from '../../types';

import { getBase64 } from '@dalydb/sdesign/utils/common';

const Picture: FC<SPictureProps> = ({
  limit,
  limitSizeType,
  accept,
  listType = 'picture-card',
  value,
  onChange,
  children,
  width,
  height,
  maxCount,
  reflect,
  hideOnLimit,
  single,
  ...props
}) => {
  const {
    handleUpload,
    handleUploadChange,
    uploadMaxCount,
    fileList,
    deleteUploaded,
  } = useUpload({
    value,
    onChange,
    listType,
    reflect,
    uploadUrl: props.uploadUrl,
    imageUrlPrefix: props.imageUrlPrefix,
    single,
    maxCount,
  });

  const { beforeUpload } = useBeforeUpload({
    maxCount: uploadMaxCount,
    accept,
    fileList,
    limit,
    limitSizeType,
    checkPicSize: true,
    width,
    height,
    uploadUrl: props.uploadUrl,
  });

  const [previewImage, setPreviewImage] = useState('');

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewTitle, setPreviewTitle] = useState('');

  const hideUploadBtn = useMemo(() => {
    // 默认不隐藏
    if (!hideOnLimit) return false;
    // 如果没有限制，则不隐藏
    if (!limit) return false;

    if (limit === fileList?.length) return true;

    return false;
  }, [hideOnLimit, limit, fileList]);

  /**
   * 隐藏弹窗
   */
  const handleCancel = () => {
    setPreviewImage('');

    setPreviewOpen(false);
  };

  /**
   * 图片预览
   * @param file
   */
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1),
    );
  };

  const renderContent = useMemo(() => {
    if (children) return children;

    return <PlusOutlined />;
  }, [children]);

  return (
    <>
      <Upload
        {...props}
        maxCount={uploadMaxCount}
        listType={listType}
        accept={accept}
        fileList={fileList as any}
        beforeUpload={beforeUpload}
        customRequest={handleUpload}
        onChange={handleUploadChange}
        onPreview={handlePreview}
        onRemove={(file: UploadFile<any>) =>
          deleteUploaded((file as any)?.irsId)
        }
      >
        {!hideUploadBtn ? renderContent : <></>}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default Picture;
