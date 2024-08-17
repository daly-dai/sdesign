import { createContext } from 'react';

import { ConfigContextProps } from './types';

export const defaultIconPrefixCls = 'irsicon';

export const defaultGetPrefixCls = (
  suffixCls?: string,
  customizePrefixCls?: string,
) => {
  if (customizePrefixCls) {
    return customizePrefixCls;
  }
  return suffixCls ? `sd-${suffixCls}` : 'sd';
};

export const ConfigContext = createContext<ConfigContextProps>({
  getPrefixCls: defaultGetPrefixCls,
});
