import { ReactNode } from 'react';

/**
 * SConfigProvider 全局配置 Props
 *
 * 为 STable、SDetail 等组件提供全局字典和上传地址配置。
 *
 * @example
 * ```tsx
 * <SConfigProvider
 *   globalDict={{ userStatus: { 1: '启用', 2: '禁用' } }}
 *   uploadUrl="/api/upload"
 * >
 *   <App />
 * </SConfigProvider>
 * ```
 */
export type SConfigProviderType = {
  /** 全局字典数据，STable dictKey / SDetail dictKey 自动读取 */
  globalDict?: Record<string, any>;
  /** 文件上传接口地址 */
  uploadUrl?: string;
  children?: ReactNode;
  /** 样式前缀 */
  prefixCls?: string;
};

export interface ConfigContextProps {
  globalDict?: Record<string, Record<string, any> | any>;
  uploadUrl?: string;
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
}
