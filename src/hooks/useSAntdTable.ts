import {
  AntdTableOptions,
  AntdTableResult,
  Service,
  useAntdTable,
} from 'ahooks';
import { Data, Params } from 'ahooks/lib/useAntdTable';

// 定义分页参数格式化函数类型
type PaginationFormatter = (pagination: {
  current: number;
  pageSize: number;
}) => Record<string, any>;

// 扩展原有选项，增加分页格式化配置
interface SAntdTableOptions<TData extends Data, TParams extends Params>
  extends AntdTableOptions<TData, TParams> {
  paginationFormatter?: PaginationFormatter;
}

/**
 * 基于ahooks的useAntdTable封装，支持自定义分页参数格式
 * @param service - 数据请求服务
 * @param options - 配置选项，包含自定义分页格式化函数
 * @returns 与useAntdTable相同的返回值
 */
function useSAntdTable<TData extends Data, TParams extends Params>(
  service: Service<TData, TParams>,
  options?: SAntdTableOptions<TData, TParams>,
): AntdTableResult<TData, TParams> {
  const { paginationFormatter, ...restOptions } = options || {};

  // 默认分页格式化：current -> current, pageSize -> pageSize
  const defaultFormatter: PaginationFormatter = ({ current, pageSize }) => ({
    current,
    pageSize,
  });

  // 使用自定义格式化函数或默认函数
  const formatPagination = paginationFormatter || defaultFormatter;

  // 包装service，转换分页参数格式
  const wrappedService: Service<TData, TParams> = async (params) => {
    // 提取并转换分页参数
    if (params && 'current' in params && 'pageSize' in params) {
      const paginationParams = formatPagination({
        current: params.current as number,
        pageSize: params.pageSize as number,
      });

      // 合并转换后的分页参数与其他参数
      const newParams = {
        ...params,
        ...paginationParams,
      };

      // 删除原始分页参数（如果存在）
      delete newParams.current;
      delete newParams.pageSize;

      return service(newParams as TParams);
    }

    return service(params);
  };

  // 调用原始useAntdTable
  return useAntdTable(wrappedService, restOptions);
}

export default useSAntdTable;
