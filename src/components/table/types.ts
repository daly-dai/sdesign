import { TableProps } from 'antd';
import { ColumnGroupType, ColumnType } from 'antd/es/table';
import React from 'react';

import { tuple } from '@dalydb/sdesign/utils';
export interface DataType {
  dataIndex: React.Key;
  title: string;
  width: number;
  dictKey?: string | undefined;
  render: () => void;
}

const RenderTypes = tuple('datetime', 'date', 'ellipsis');
export type RenderType = (typeof RenderTypes)[number];

type SColumn<RecordType = any> = (
  | ColumnGroupType<RecordType>
  | Omit<ColumnType<RecordType>, 'render'>
) & {
  dictKey?: string | undefined;

  render?: ColumnType<RecordType>['render'] | RenderType;
};
export type SColumnsType<RecordType> = SColumn<RecordType>[];

export interface STableProps<RecordType = any>
  extends Omit<TableProps<RecordType>, 'columns'> {
  columns?: SColumnsType<RecordType>;
  isSeq?: boolean;
  current?: number;
  pageSize?: number;
}
