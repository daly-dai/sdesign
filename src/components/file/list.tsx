import React, { FC, useMemo } from 'react';

import FileItem from './instance';
import useStyles from './styles/list.style';
import { FileListProps } from './types';

import { useComStyle } from '@dalydb/sdesign/hooks';
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
  const { styles, cx, prefixCls } = useComStyle({
    prefixCls: 'file-list',
    useStylesHook: useStyles,
  });

  // 设置单独文件的class
  const fileItemCls = useMemo(() => {
    if (fileList?.length > 1 || !fileList?.length) return '';

    return styles[`${prefixCls}-sole`];
  }, [fileList]);

  const fileDirection = useMemo(() => {
    if (direction === 'line') return styles[`${prefixCls}-line-item`];

    return styles[`${prefixCls}-item`];
  }, [direction]);

  return (
    <div
      className={styles[prefixCls]}
      style={{ ...style, display: label ? 'flex' : 'block' }}
    >
      {label ? (
        <div className={styles[`${prefixCls}-label`]}>{label}</div>
      ) : (
        <></>
      )}

      <div
        className={cx(
          styles[`${prefixCls}`],
          styles[` ${prefixCls}-${direction}`],
        )}
      >
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
              className={cx(`${fileItemCls}`, `${fileDirection}`)}
              {...props}
            ></FileItem>
          );
        })}
      </div>
    </div>
  );
};

export default SFileList;
