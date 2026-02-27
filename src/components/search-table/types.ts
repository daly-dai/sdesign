import { useSearchTableOptions } from '@dalydb/sdesign/hooks/useSearchTable/types';
import { SearchProps } from '../form/types';
import { STableProps } from '../table/types';
import { STitleProps } from '../title/types';

export interface SearchTableRef {
  /**
   * 手动刷新表格数据
   * @param params - 可选的额外参数
   */
  refresh: (params?: any) => void;
  /**
   * 重置搜索条件并刷新
   */
  reset: () => void;
  /**
   * 获取表单实例
   */
  getForm: () => any;
}

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
  options?: Omit<useSearchTableOptions, 'form'>;
  /**
   * 表格组件的 props，会合并到 useSearchTable 返回的 tableProps 中
   */
  tableProps?: STableProps<any>;
  /**
   * 搜索表单组件的 props
   */
  formProps?: SearchProps;
}
