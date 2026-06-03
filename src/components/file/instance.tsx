import { Flex } from 'antd';
import React, { FC, memo, useMemo } from 'react';

import { FILE_NAME_FIELD, FILE_URL_FIELD, fileTypeToIcon } from './constant';
import './styles/file.css';

import {
  FileDataType,
  FileIconMapFieldType,
  FileItemType,
  ReflectFile,
} from '@dalydb/sdesign';
import { createCode, dispatchFileName } from '@dalydb/sdesign/utils/common';

const SFileInstance: FC<FileItemType> = memo(
  ({
    fileData,
    reflect,
    onFileHandle,
    nameLimit = 8,
    style,
    className,
    children,
    canClickName = true,
    fileIconMapField = 'fileName',
  }) => {
    // 确保nameLimit是正整数
    const effectiveNameLimit = useMemo(
      () => Math.max(0, Number(nameLimit)),
      [nameLimit],
    );

    const base = 'sdesign-file';

    const fileConfig: FileDataType = useMemo<ReflectFile>(() => {
      return {
        [FILE_NAME_FIELD]: reflect?.[FILE_NAME_FIELD] || FILE_NAME_FIELD,
        [FILE_URL_FIELD]: reflect?.[FILE_URL_FIELD] || FILE_URL_FIELD,
      };
    }, [reflect]);

    /**
     * 点击文件标题
     * @param file
     */
    const handleFileClick = (file: FileDataType) => {
      if (!canClickName) return;

      const fileUrl = file[fileConfig.fileUrl as 'fileUrl'];
      if (!fileUrl) return;

      if (onFileHandle) {
        onFileHandle(file);
        return;
      }

      window.open(fileUrl);
    };

    // 获取对应的SLucideIcon图标名称
    const fileIcon = useMemo(() => {
      const fileType =
        fileData?.[fileConfig[fileIconMapField] as FileIconMapFieldType]
          ?.split('.')
          .at(-1) || '';
      const type = fileType.toUpperCase();
      return fileTypeToIcon?.[type] || fileTypeToIcon['TXT'];
    }, [fileData, fileConfig, fileIconMapField]);

    const fileName = useMemo(() => {
      if (!fileData) return '';

      return dispatchFileName(
        fileData[fileConfig.fileName as 'fileName'],
        effectiveNameLimit,
      );
    }, [effectiveNameLimit, fileData, fileConfig]);

    // 直接在使用处内联fontSize样式

    if (!fileData) return <></>;

    const fileNameCls = canClickName
      ? `${base}-left-fileName ${base}-left-canClick`
      : `${base}-left-fileName`;

    return (
      <Flex
        align="center"
        justify="space-between"
        style={{ ...style }}
        className={[base, className].filter(Boolean).join(' ')}
        onClick={() => handleFileClick(fileData)}
        key={createCode()}
      >
        <Flex gap={12} className={`${base}-left`}>
          {fileIcon}

          <div
            title={fileData[fileConfig.fileName as 'fileName']}
            className={fileNameCls}
          >
            {fileName}
          </div>
        </Flex>

        {children && <div className={`${base}-action`}>{children}</div>}
      </Flex>
    );
  },
);

export default SFileInstance;
