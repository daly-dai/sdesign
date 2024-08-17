import React, { FC, memo, useMemo } from 'react';

import { FILE_NAME_FIELD, FILE_URL_FIELD } from './constant';
import useStyles from './styles/file.style';

import {
  FileDataType,
  FileIconMapFieldType,
  FileItemType,
  ReflectFile,
  useComStyle,
} from '@daly/sdesign';
import { createCode, dispatchFileName } from '@daly/sdesign/utils/common';
import { convertFileDataTypeToImg } from '@daly/sdesign/utils/fileList';

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
    const { styles, cx, prefixCls, token } = useComStyle({
      prefixCls: 'file',
      useStylesHook: useStyles,
    });

    // 确保nameLimit是正整数
    const effectiveNameLimit = useMemo(() => Math.max(0, Number(nameLimit)), [nameLimit]);

    // 可以点击的class名称
    const canClickNameCls = canClickName ? styles[`${prefixCls}-left-canClick`] : '';

    const fileConfig: FileDataType = useMemo<ReflectFile>(() => {
      return {
        [FILE_NAME_FIELD]: reflect ? reflect?.[FILE_NAME_FIELD] : FILE_NAME_FIELD,
        [FILE_URL_FIELD]: reflect ? reflect?.[FILE_URL_FIELD] : FILE_URL_FIELD,
      };
    }, [reflect]);

    /**
     * 点击文件标题
     * @param file
     * @returns
     */
    const handleFileClick = (file: FileDataType) => {
      if (!canClickName) return;

      const fileUrl = file[fileConfig.fileUrl as 'fileUrl'];

      if (!fileUrl) return;

      if (onFileHandle) {
        onFileHandle(file);
        return;
      }

      window.open(file[fileConfig.fileUrl as 'fileUrl']);
    };

    const getFileType = () => {
      return (
        fileData?.[fileConfig[fileIconMapField] as FileIconMapFieldType]?.split('.').at(-1) ?? ''
      );
    };
    const fileName = useMemo(() => {
      if (!fileData) return '';

      return dispatchFileName(fileData[fileConfig.fileName as 'fileName'], effectiveNameLimit);
    }, [effectiveNameLimit, fileData]);

    const fontSizeStyle = useMemo(() => {
      return {
        fontSize: token.fontSize,
      };
    }, [token.fontSize]);

    if (!fileData) return <></>;

    return (
      <div
        style={{ ...style }}
        className={cx(prefixCls, className)}
        onClick={() => handleFileClick(fileData)}
        key={createCode()}
      >
        <div className={styles[`${prefixCls}-left`]}>
          {convertFileDataTypeToImg(getFileType())({
            className: styles[`${prefixCls}-left-icon`],
          })}

          <div
            title={fileData[fileConfig.fileName as 'fileName']}
            style={fontSizeStyle}
            className={cx(styles[`${prefixCls}-left-fileName`], canClickNameCls)}
          >
            {fileName}
          </div>
        </div>

        {children && <div className={styles[`${prefixCls}-action`]}>{children}</div>}
      </div>
    );
  },
);

export default SFileInstance;
