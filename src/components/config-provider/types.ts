import { ReactNode } from 'react';

export type SConfigProviderType = {
  // 全部的字典
  globalDict?: Record<string, any>;
  // 上传组件接口地址地址
  uploadUrl?: string;
  children?: ReactNode;
  prefixCls?: string;
};

export interface ConfigContextProps {
  globalDict?: Record<string, Record<string, any> | any>;
  uploadUrl?: string;
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
}
