import keys from 'lodash/keys';
import React, { FC, useEffect, useState } from 'react';

import { ConfigContext, defaultGetPrefixCls } from './contexts';
import { SConfigProviderType } from './types';

// 全局配置
const SConfigProvider: FC<SConfigProviderType> = ({
  globalDict,
  uploadUrl,
  children,
}) => {
  const [dictData, setDictData] = useState<Record<string, string>>({});

  // 获取全局字典值
  const getGlobalDict = async () => {
    if (!globalDict) return;

    if (keys(globalDict)?.length) {
      setDictData(globalDict);
      return;
    }

    setDictData({});
  };

  useEffect(() => {
    getGlobalDict();
  }, [globalDict]);

  return (
    <ConfigContext.Provider
      value={{
        getPrefixCls: defaultGetPrefixCls,
        globalDict: dictData,
        uploadUrl,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export { ConfigContext };

export default SConfigProvider;
