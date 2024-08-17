import { UploadProps } from 'antd';
import { UploadListType } from 'antd/es/upload/interface';

import { FileDataType, FileItemType, ReflectFile } from '@daly/sdesign';
import { tuple } from '@daly/sdesign/utils/types';

const fileSizeTypes = tuple('K', 'M');
export type fileSizeType = (typeof fileSizeTypes)[number];

const uploadStatusTypes = tuple('uploading', 'done', 'error');
export type uploadStatusType = (typeof uploadStatusTypes)[number];

export type uploadFileType = FileDataType & {
  progress?: number;
  status?: uploadStatusType;
  uid: string;
  irsId: string;
  isEcho?: boolean;
};

export type SUploadProps = Omit<UploadProps, 'onChange'> & {
  nameLimit?: number;
  limit?: number;
  limitSizeType?: fileSizeType;
  acceptList?: string[];
  value?: any;
  onChange?: (data: any) => void;
  onItemClick?: (data: any) => void;
  reflect?: ReflectFile;
  fileIconMapField?: FileItemType['fileIconMapField'];
  uploadUrl?: string;
  imageUrlPrefix?: string;
  /** @description 是否只能上传单个文件，设置之后maxCount默认为1 */
  single?: boolean;
};

export type SPictureProps = SUploadProps & {
  width?: number;
  height?: number;
  // 达到上传上限是隐藏上传按钮
  hideOnLimit?: boolean;
};

export type UploadHookType = {
  value?: any;
  onChange?: (data: any) => void;
  reflect?: ReflectFile;
  listType?: UploadListType;
  uploadUrl?: string;
  imageUrlPrefix?: string;
  single?: boolean;
  maxCount?: number;
};

export type UseBeforeUploadType = {
  checkPicSize?: boolean;
  fileList: any[];
  width?: number;
  height?: number;
  maxCount?: number;
  limit?: number;
  limitSizeType?: fileSizeType;
  accept?: string;
  uploadUrl?: string;
};
