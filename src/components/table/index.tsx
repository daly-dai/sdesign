import { Table } from 'antd';
import dayjs from 'dayjs';
import React, { memo, useContext, useMemo } from 'react';

import { ConfigContext } from '../config-provider';
import STextEllipsis from '../text-ellipsis';

import { convertToText } from './constant';
import { STableProps } from './types';

const renderTime = (
  time: string | number | Date,
  format = 'YYYY-MM-DD HH:mm:ss',
) => {
  const parsedTime = dayjs(time);
  if (!parsedTime.isValid()) {
    return time ?? '';
  }
  return parsedTime.format(format);
};

type RenderFn = (t: any, col: any, index: number) => any;

const STRING_RENDER_MAP: Record<string, (col: any) => RenderFn> = {
  datetime: () => (t: any) => renderTime(t, 'YYYY-MM-DD HH:mm:ss'),
  date: () => (t: any) => renderTime(t, 'YYYY-MM-DD'),
  ellipsis: (col: any) =>
    col.width
      ? (t: string) => <STextEllipsis width={col.width}>{t}</STextEllipsis>
      : (t: any) => convertToText(t),
  index: () => (_: any, __: any, index: number) => index + 1,
};

function STableInner<RecordType = Record<string, unknown>>({
  isSeq = false,
  pagination,
  columns,
  ...props
}: STableProps<RecordType>) {
  const { globalDict } = useContext(ConfigContext);

  const seqColumn = useMemo(() => {
    if (!isSeq) return null;
    return {
      title: '序号',
      dataIndex: '',
      width: 80,
      render: (_: any, __: any, index: number) => {
        const cur = pagination?.current;
        const ps = pagination?.pageSize;
        return (
          <div style={{ minWidth: '60px' }}>
            {cur && ps ? (cur - 1) * ps + (index + 1) : index + 1}
          </div>
        );
      },
    };
  }, [isSeq, pagination?.current, pagination?.pageSize]);

  const columnsCell = useMemo(() => {
    if (!columns) return [];
    const processed = columns.map((col: any) => {
      const newCol = { ...col };

      // 字符串 render 快捷类型
      if (typeof newCol.render === 'string') {
        const factory = STRING_RENDER_MAP[newCol.render];
        if (factory) {
          newCol.render = factory(newCol);
        }
        return newCol;
      }

      // 已有自定义 render
      if (newCol.render) return newCol;

      // 默认：文本 + 字典映射
      return {
        ...newCol,
        render: (t: any) => {
          let text = convertToText(t);
          if (newCol.dictKey) {
            const dictData = globalDict?.[newCol.dictKey];
            text = dictData?.[text] || text;
          }
          return <>{text}</>;
        },
      };
    });

    return seqColumn ? [seqColumn, ...processed] : processed;
  }, [columns, seqColumn, globalDict]);

  return (
    <Table
      size="small"
      {...props}
      pagination={pagination}
      columns={columnsCell || []}
    />
  );
}

const STable = memo(STableInner) as typeof STableInner;

export default STable;
