import { STableOptions } from '@dalydb/sdesign/hooks';
import { Service } from 'ahooks/lib/useAntdTable/types';
import { SearchProps } from '../form/types';
import { STableProps } from '../table/types';
import { STitleProps } from '../title/types';

interface ServiceProps {
  service?: Service<any, any>;
  serviceProps?: STableOptions<any, any>;
}

export interface SearchTableProps {
  tableProps?: STableProps<any>;
  formProps?: SearchProps;
  headTitle?: STitleProps;
  tableTitle?: STitleProps;
  serviceProps?: ServiceProps;
}
