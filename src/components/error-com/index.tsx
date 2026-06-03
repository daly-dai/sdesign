import React, { FC } from 'react';

import './index.css';
import { SErrorComProps } from './types';

import { LoadErrorIcon } from '@dalydb/sdesign/icons';

const SErrorCom: FC<SErrorComProps> = ({
  text,
  style = {},
  iconStyle = {},
}) => {
  return (
    <div style={{ ...style }} className="sdesign-error-com">
      <LoadErrorIcon
        style={{ ...iconStyle }}
        className="sdesign-error-com-img"
      />

      <p className="sdesign-error-com-desc">{text || '加载异常，请稍后重试'}</p>
    </div>
  );
};

export default SErrorCom;
