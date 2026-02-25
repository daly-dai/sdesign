import { useSearchTableOptions } from '@dalydb/sdesign/hooks/useSearchTable/types';
import { SearchProps } from '../form/types';
import { STableProps } from '../table/types';
import { STitleProps } from '../title/types';

export interface SearchTableProps {
  /**
   * 页面标题配置
   */
  headTitle?: STitleProps;
  /**
   * 表格区域标题配置
   */
  tableTitle?: STitleProps;
  /**
   * 请求函数，用于获取表格数据
   */
  requestFn: (data?: any) => Promise<any>;
  /**
   * useSearchTable 的配置选项
   */
  options?: useSearchTableOptions;
  /**
   * 表格组件的 props，会合并到 useSearchTable 返回的 tableProps 中
   */
  tableProps?: STableProps<any>;
  /**
   * 搜索表单组件的 props
   */
  formProps?: SearchProps;
}
