import { Options } from 'ahooks/lib/useRequest/src/types';
import { FormInstance, TablePaginationConfig } from 'antd';

export interface useSearchTableProps {
  requestFn: (data?: any) => Promise<any>;
  form: FormInstance<any>;
  extraParams?: Record<string, any>;
  manual?: boolean;
  dispatchParams?: (params?: any) => any;
  serviceProps?: Options<any, any>;
}

export interface useSearchTableReturnType {
  getPageData: (params?: any) => void;
  handleReset: () => void;
  dataSource: any[];
  pagination?: false | TablePaginationConfig;
  loading?: boolean;
}
