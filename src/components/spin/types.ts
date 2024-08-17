import { SpinProps } from 'antd';

import { LoadingSizeType } from '@daly/sdesign';

export type LoadingProps = {
  loadingSize?: LoadingSizeType;
} & SpinProps;
