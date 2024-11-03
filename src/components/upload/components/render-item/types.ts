import { uploadStatusType } from '../../types';

import { FileItemType, ReflectFile } from '@dalydb/sdesign';

export type UploadItemProps = {
  dataSource: {
    uid?: string;
    name?: string;
    percent?: number;
    response?: any | undefined;
  };
  nameLimit?: number;
  reflect?: ReflectFile;
  onClick?: (data: any) => void;
  status?: uploadStatusType;
  onDelete?: (id: string) => void;
  fileIconMapField?: FileItemType['fileIconMapField'];
};
