import { requestUpload } from '@daly/sdesign/plugins/request';
import { RequestType } from '@daly/sdesign/plugins/request/types';

interface SUploadReqProps {
  url?: string;
  data?: any;
  config?: RequestType;
}

/**
 * 上传文件
 */
export const SUploadReq = ({ url, data, config }: SUploadReqProps) => {
  return requestUpload(
    url ?? '/gateway/program/attachment/upload',
    data,
    config,
  );
};
