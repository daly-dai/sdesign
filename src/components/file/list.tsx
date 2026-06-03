import React, { FC, useMemo } from 'react';

import FileItem from './instance';
import './styles/list.css';
import { FileListProps } from './types';

import { createCode } from '@dalydb/sdesign/utils/common';

const SFileList: FC<FileListProps> = ({
  fileList,
  label,
  onFileHandle,
  style = {},
  direction = 'column',
  nameLimit = 8,
  reflect,
  itemRender,
  ...props
}) => {
  const base = 'sdesign-file-list';

  // 设置单独文件的class
  const fileItemCls = useMemo(() => {
    if (fileList?.length > 1 || !fileList?.length) return '';
    return `${base}-sole`;
  }, [fileList, base]);

  const fileDirection = useMemo(() => {
    if (direction === 'line') return `${base}-line-item`;
    return `${base}-item`;
  }, [direction, base]);

  return (
    <div
      className={base}
      style={{ ...style, display: label ? 'flex' : 'block' }}
    >
      {label ? <div className={`${base}-label`}>{label}</div> : <></>}

      <div className={`${base} ${base}-${direction}`}>
        {fileList.map((item) => {
          if (!item) return <></>;

          if (itemRender) {
            return itemRender(item);
          }

          return (
            <FileItem
              key={createCode()}
              nameLimit={nameLimit}
              reflect={reflect}
              onFileHandle={onFileHandle}
              fileData={item}
              className={[fileItemCls, fileDirection].filter(Boolean).join(' ')}
              {...props}
            ></FileItem>
          );
        })}
      </div>
    </div>
  );
};

export default SFileList;
