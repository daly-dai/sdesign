import { message } from 'antd';
import copy from 'copy-to-clipboard';
import keys from 'lodash/keys';
import React from 'react';

import * as SIcons from '@dalydb/sdesign/icons';

import './styles/index.less';

const Icons = () => {
  const selectIcons = (name: string) => {
    const copyText = `<${name} />`;

    copy(copyText, {
      debug: true,
      message: 'Press #{key} to copy',
    });

    message.success(`Press ${copyText} to copy`);
  };

  return (
    <div className="icon">
      {keys(SIcons)?.map((key: any) => {
        return (
          <div className="icon-item" key={key} onClick={() => selectIcons(key)}>
            {(SIcons as any)[key]({
              style: {
                fontSize: '70px',
              },
            })}

            <div className="icon-item-name">{key}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Icons;
