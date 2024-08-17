import { TableProps } from 'antd';
import { ColumnGroupType, ColumnType } from 'antd/es/table';
import React from 'react';
export interface DataType {
  dataIndex: React.Key;
  title: string;
  width: number;
  dictKey?: string | undefined;
  render: () => void;
}

type SColumn<RecordType = any> = (
  | ColumnGroupType<RecordType>
  | ColumnType<RecordType>
) & {
  dictKey?: string | undefined;
};
export type SColumnsType<RecordType> = SColumn<RecordType>[];

export interface STableProps<RecordType = any>
  extends Omit<TableProps<RecordType>, 'columns'> {
  columns?: SColumnsType<RecordType>;
  isSeq?: boolean;
  current?: number;
  pageSize?: number;
}
