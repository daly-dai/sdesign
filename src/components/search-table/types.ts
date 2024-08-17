import { Options } from 'ahooks/lib/useRequest/src/types';
import { FormInstance } from 'antd';
import { ReactNode } from 'react';

import { SearchProps, SFormItems } from '../form/types';
import { SColumnsType, STableProps } from '../table/types';
import { PageTitleProps } from '../title/types';

export interface SearchTableProps {
  /** @description 表格配置 */
  columns?: SColumnsType<any>;
  /** @description 搜索表单配置 */
  searchItems?: SFormItems[];
  /** @description 请求 */
  service?: (data?: any) => Promise<any>;
  /** @description useRequest传递的属性 */
  serviceProps?: Options<any, any>;
  /** @description 额外的传参 */
  extraParams?: Record<string, any>;
  /** @description form实例 */
  form?: FormInstance<any>;
  /** @description 表格配置 */
  tableProps?: STableProps<any>;
  /** @description 标题 */
  title?: ReactNode;
  /** @description 标题右侧操作 */
  titleAction?: ReactNode;
  /** @description 标题配置 */
  titleProps?: Omit<PageTitleProps, 'children' | 'type'>;
  /** @description 处理查询传参 */
  dispatchParams?: (params?: any) => Record<string, any>;
  /** @description 处理返回数据 */
  handleDataSource?: (data?: any[]) => any[];
  /** @description 表单相关属性 */
  formProps?: Omit<SearchProps, 'form'>;
}
