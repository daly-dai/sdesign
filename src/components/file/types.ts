import { ReactNode } from 'react';

import { tuple } from '@dalydb/sdesign/utils/types';

export type FileDataType = {
  id?: string;
  /** 文件名称 */
  fileName: string;

  /** 文件地址 */
  fileUrl: string;
};

const DirectionTypes = tuple('line', 'column');

export type directionType = (typeof DirectionTypes)[number];

const FileIconMapFieldTypes = tuple('fileUrl', 'fileName');

export type FileIconMapFieldType = (typeof FileIconMapFieldTypes)[number];

export interface ReflectFile {
  fileName: string;
  fileUrl: string;
}

export type FileItemType = {
  fileData?: FileDataType;
  style?: React.CSSProperties;
  onFileHandle?: (file: FileDataType) => void;
  reflect?: ReflectFile;
  nameLimit?: number;
  className?: string;
  children?: ReactNode;
  canClickName?: boolean;
  onClick?: (data: any) => void;
  fileIconMapField?: FileIconMapFieldType;
};

export type FileListProps = Omit<FileItemType, 'fileData'> & {
  label?: string;
  fileList: any[];
  style?: React.CSSProperties;
  direction?: directionType;
  itemRender?: (data: FileDataType[]) => ReactNode | null;
};
