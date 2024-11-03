import { message } from 'antd';
import { AxiosProgressEvent } from 'axios';
import { assign, filter, get, isArray, isObject } from 'lodash';
import { useContext, useEffect, useMemo, useState } from 'react';

// import { SUploadReq } from '@dalydb/S-pc/service/upload';
// import { createCode } from '@dalydb/S-pc/utils/common';
import { ConfigContext } from '../../config-provider';
import { uploadFileType, UploadHookType } from '../types';

import { FileDataType } from '@dalydb/sdesign/components/file/types';
import { SUploadReq } from '@dalydb/sdesign/service/upload';
import { createCode } from '@dalydb/sdesign/utils';

const useUpload = ({
  value,
  onChange,
  reflect,
  listType,
  uploadUrl,
  imageUrlPrefix,
  single,
  maxCount,
}: UploadHookType) => {
  const [fileList, setFileList] = useState<uploadFileType[]>([]);
  const [fileDataList, setFileDataList] = useState<uploadFileType[]>([]);
  const { uploadUrl: globalUploadUrl } = useContext(ConfigContext);

  const uploadMaxCount = useMemo(() => {
    if (single) return 1;

    return maxCount;
  }, [single, maxCount]);

  // 映射的字段
  const fieldValue = useMemo<FileDataType>(() => {
    const { fileName, fileUrl } = reflect ?? {};

    return {
      fileName: fileName ?? 'fileName',
      fileUrl: fileUrl ?? 'fileUrl',
    };
  }, [reflect]);

  /**
   * 获取图片前缀地址
   * @returns
   */
  const getImgPreUrl = (imgUrl: string) => {
    const url = window.location.hostname;

    if (url.includes('localhost') || url.includes('127.0')) {
      return `${imageUrlPrefix ?? ''}${imgUrl}`;
    }

    return imgUrl;
  };

  // 前置数据处理
  const preprocessData = (
    data: null | undefined | Record<string, string> | Record<string, string>[],
  ) => {
    // 如果沒有值直接返回null
    if (!data) return null;

    // 如果是单选，則放入數組中
    if (isObject(data) && !isArray(data) && single) {
      return [data];
    }

    if (isArray(data)) {
      return data;
    }

    return null;
  };

  /**
   * 初始化fileData并对数据进行标注
   * @param data
   */
  const initFileData = (data: any) => {
    const result: uploadFileType[] = [];

    (data || [])?.forEach((item: any) => {
      if (!item || !isObject(item)) return;

      result.push({
        ...item,
        irsId: `upload-echo-${createCode(12)}`,
        isEcho: true,
      } as uploadFileType);
    });

    return result;
  };

  /**
   * 初始化图片相关数据
   * @param data
   * @returns
   */
  const initPictureFileData = (data: any) => {
    const result: uploadFileType[] = [];

    if (!isArray(data)) return result;

    (data || [])?.forEach((item: Record<string, string> | string | null) => {
      if (!item || !isObject(item)) return;

      const fileName = item?.[fieldValue.fileName];

      const fileNameList = fileName?.split('.');
      const fileType = fileNameList?.[fileNameList.length - 1] || 'png';

      const fileItem = {
        ...item,
        irsId: `upload-echo-${createCode(12)}`,
        isEcho: true,
        type: `image/${fileType}`,
        url: getImgPreUrl(
          reflect ? item?.[reflect?.['fileUrl']] : item?.['fileUrl'],
        ),
      };

      result.push(fileItem as unknown as uploadFileType);
    });

    return result;
  };

  useEffect(() => {
    const preData = preprocessData(value);

    const initFun = listType?.includes('picture')
      ? initPictureFileData
      : initFileData;

    const initialData = initFun(preData);

    setFileList(initialData);
    setFileDataList(initialData);
  }, [value]);

  /**
   * 处理映射的相关数据
   * @param data
   * @returns
   */
  const dispatchReflectData = (data: any[]) => {
    if (!reflect) return data;

    if (!data?.length) return [];

    return (data || [])?.map((item) => {
      return {
        fileName: item?.[reflect?.fileName] || '',
        fileUrl: item?.[reflect?.fileUrl] || '',
      };
    });
  };

  /**
   * 自定义上传请求
   * @param options
   */
  const handleUpload = async (options: any) => {
    let result: any;

    const onUploadProgress = (progressEvent: AxiosProgressEvent) => {
      const progress = progressEvent?.progress ?? 0;

      options.onProgress({ percent: progress * 100 });
    };

    if (!uploadUrl && !globalUploadUrl) return;

    const reqUrl = uploadUrl ?? globalUploadUrl;

    try {
      result = await SUploadReq({
        url: reqUrl,
        data: { file: options.file },
        config: { onUploadProgress, skipErrorHandler: '1' },
      });
    } catch (error) {
      options.onError(error);
      return;
    }

    if (!result) return;

    const uid = get(options, 'file.uid');

    const uploadedFileData = filter(fileList, (node) => node.uid === uid)[0];

    result = assign({ irsId: get(uploadedFileData, 'irsId') }, result);

    setFileDataList((pre) => {
      const stashData = [...pre, result];

      const changeData = dispatchReflectData(stashData);

      if (single) {
        onChange?.(changeData?.[0]);
      } else {
        onChange?.(changeData);
      }

      return stashData;
    });

    options.onSuccess(result);
  };

  /**
   * 处理上传之后的数据
   * @param data
   */
  const dispatchUploadData = (data: any[]) => {
    const uploadFileList = (data || []).map((item: any) => {
      const fileData = filter(fileList, (node) => node.uid === item.uid);

      if (!fileData?.length) {
        return {
          ...item,
          irsId: `upload-echo-${createCode(12)}`,
        };
      }

      return { ...item, irsId: fileData[0]?.irsId };
    });

    // 如果single模式下，则只保留一个文件

    setFileList(uploadFileList);
  };

  /**
   * 文件上传状态处理
   * @param info
   */
  const handleUploadChange = (info: any) => {
    const status = get(info, 'file.status');

    dispatchUploadData(info?.fileList || []);

    if (status === 'uploading') {
      return;
    }

    if (status === 'error') {
      message.error(`${info.file.name} 上传失败`);
      return;
    }

    if (info?.file?.status === 'done') {
      message.success(`${info.file.name} 上传成功`);
    }
  };

  /**
   * 删除已上传的文件
   * @param id
   */
  const deleteUploaded = (id: string) => {
    setFileList((pre) =>
      pre.filter((item) => {
        return item.irsId !== id;
      }),
    );

    const filteredFileData = fileDataList.filter((item) => {
      return item.irsId !== id;
    });

    setFileDataList(filteredFileData);

    onChange?.(dispatchReflectData(filteredFileData));
  };

  return {
    handleUpload,
    handleUploadChange,
    deleteUploaded,
    fileList,
    uploadMaxCount,
  };
};

export default useUpload;
