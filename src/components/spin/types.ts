import { SpinProps } from 'antd';

import { LoadingSizeType } from '@dalydb/sdesign';

export type LoadingProps = {
  loadingSize?: LoadingSizeType;
} & SpinProps;
