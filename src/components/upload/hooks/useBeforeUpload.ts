import { message, Upload } from 'antd';
import { RcFile } from 'antd/es/upload';
import { useContext } from 'react';

import { ConfigContext } from '../../config-provider';
import { fileSizeType, UseBeforeUploadType } from '../types';

const useBeforeUpload = ({
  maxCount,
  accept,
  fileList,
  limit,
  limitSizeType,
  checkPicSize,
  width,
  height,
  uploadUrl,
}: UseBeforeUploadType) => {
  const { uploadUrl: globalUploadUrl } = useContext(ConfigContext);

  /**
   * 判断图片尺寸
   * @param file
   * @param width
   * @param height
   * @returns
   */
  const judgePictureSize = (
    file: File,
    width: number | undefined,
    height: number | undefined,
  ) => {
    const Compare = (data: number, compareData: number | undefined) => {
      if (!compareData) return true;

      return data < compareData;
    };

    return new Promise<boolean>((resolve, reject) => {
      const _URL = window.URL || window.webkitURL;
      const img = new Image();
      img.onload = () => {
        _URL.revokeObjectURL(img.src);
        const valid = Compare(img.width, width) && Compare(img.height, height);

        if (valid) return resolve(true);

        return reject(false);
      };

      img.src = _URL.createObjectURL(file);
    })
      .then(() => {
        return file;
      })
      .catch(() => {
        const widthTip = width ? `宽度小于等于${width}` : '';
        const heightTip = height ? `宽度小于等于${height}` : '';

        message.error(
          `请上传${widthTip}${
            widthTip && heightTip ? '&' : ''
          }${heightTip}的图片！`,
        );
        return false; // 必须要返回 promiseRusule 为'Upload.LIST_IGNORE' 阻止列表展现
      });
  };

  /**
   * 判断文件类型是否满足
   * @param fileType
   * @returns
   */
  const judgeAccept = (file: RcFile) => {
    if (!accept) return true;

    let fileNameList = file?.name.split('.');
    let fileType = fileNameList?.[fileNameList.length - 1];

    if (accept.includes(fileType)) return true;

    message.error('请上传符合类型的文件！');
    return false;
  };

  /**
   * 校验上传个数
   */
  const judgeMaxCount = (uploadFileList: any[]) => {
    if (!maxCount) return true;

    const fileCount = (fileList?.length ?? 0) + (uploadFileList?.length ?? 0);

    if (fileCount > maxCount) {
      message.error(`文件上传数量不能超过${maxCount}个`);
      return false;
    }

    return true;
  };

  /**
   * 判断文件大小是否超过限制
   * @param param0
   * @returns
   */
  const checkFileSize = ({
    file,
    limit,
    type = 'M',
  }: {
    file: any;
    limit: number | undefined;
    type?: fileSizeType;
  }) => {
    if (!limit) return true;

    const limitSize = type === 'K' ? limit : limit * 1024;

    const fileSizeStatus = file / 1024 < limitSize;

    if (!fileSizeStatus) {
      message.error(`文件大小超出限制${limit}${limitSizeType}，请重新上传！`);
      return false;
    }

    return true;
  };

  /**
   * 上传前置拦截
   * @param file
   * @returns
   */
  const beforeUpload = async (file: RcFile, fileList: RcFile[]) => {
    // 如果没有uploadUrl或者globalUploadUrl 则无法上传
    if (!uploadUrl && !globalUploadUrl) {
      message.warning('未配置uploadUrl或者globalUploadUrl');
      return Upload.LIST_IGNORE;
    }

    // 是否超过指定数量
    if (!judgeMaxCount(fileList)) return Upload.LIST_IGNORE;

    // 判断是否超过指定大小
    if (
      !checkFileSize({
        file: file.size,
        limit,
        type: limitSizeType,
      })
    ) {
      return Upload.LIST_IGNORE;
    }

    // 图片是否超过指定尺寸
    if (checkPicSize) {
      const isSize = await judgePictureSize(file, width, height);

      if (!isSize) return Upload.LIST_IGNORE;
    }

    // 是否传输了限定以外的文件类型
    if (!judgeAccept(file)) {
      return Upload.LIST_IGNORE;
    }

    return true;
  };

  return {
    beforeUpload,
  };
};

export default useBeforeUpload;
