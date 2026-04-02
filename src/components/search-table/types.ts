import { useSearchTableOptions } from '@dalydb/sdesign/hooks/useSearchTable/types';
import { SCardProps } from '../card/types';
import { SearchProps } from '../form/types';
import { STableProps } from '../table/types';
import { STitleProps } from '../title/types';

/**
 * SSearchTable 的 ref 方法
 *
 * 通过 ref 可以从外部控制表格刷新、重置等操作。
 *
 * @example
 * ```tsx
 * const tableRef = useRef<SearchTableRef>(null);
 * tableRef.current?.refresh();       // 刷新当前页
 * tableRef.current?.reset();         // 重置搜索并刷新
 * tableRef.current?.getForm();       // 获取表单实例
 * ```
 */
export interface SearchTableRef {
  /** 刷新表格数据，可传入额外参数合并到请求中 */
  refresh: (params?: any) => void;
  /** 重置搜索条件并刷新到第一页 */
  reset: () => void;
  /** 获取内部表单实例，用于外部操作表单 */
  getForm: () => any;
}

/**
 * SSearchTable 搜索表格组件 Props
 *
 * 集成 SForm.Search + STable 的一体化组件，是管理后台列表页的首选方案。
 * 自动处理搜索、分页、数据加载的联动逻辑。
 *
 * @example
 * ```tsx
 * <SSearchTable
 *   headTitle={{ children: '用户管理' }}
 *   requestFn={async (params) => {
 *     const res = await api.getUsers(params);
 *     return { dataList: res.list, totalSize: res.total };
 *   }}
 *   formProps={{
 *     items: [
 *       { label: '姓名', name: 'name', type: 'input' },
 *       { label: '状态', name: 'status', type: 'select', fieldProps: { options } },
 *     ],
 *     columns: 3,
 *   }}
 *   tableProps={{
 *     columns: [
 *       { title: '姓名', dataIndex: 'name' },
 *       { title: '创建时间', dataIndex: 'createTime', render: 'datetime' },
 *     ],
 *     rowKey: 'id',
 *   }}
 * />
 * ```
 */
export interface SearchTableProps {
  /** 页面顶部标题配置 */
  headTitle?: STitleProps;
  /** 表格区域标题配置 */
  tableTitle?: STitleProps;
  /**
   * 数据请求函数
   *
   * 接收搜索参数 + 分页参数，返回包含列表数据和总数的对象。
   * 默认字段映射: `{ dataList, totalSize, pageNum, pageSize }`，
   * 可通过 options.paginationFields 自定义。
   */
  requestFn: (data?: any) => Promise<any>;
  /** useSearchTable 的配置选项 */
  options?: Omit<useSearchTableOptions, 'form'>;
  /** 表格 props，会合并到 useSearchTable 返回的 tableProps 中 */
  tableProps?: STableProps<any>;
  /** 搜索表单 props，透传给 SForm.Search */
  formProps?: SearchProps;
  /** 表格卡片 props，透传给 SCard */
  tableCardProps?: SCardProps;
}
