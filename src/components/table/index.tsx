import { Table } from 'antd';
import dayjs from 'dayjs';
import { isString } from 'lodash';
import React, { FC, memo, useCallback, useContext, useMemo } from 'react';

import { ConfigContext } from '../config-provider';
import STextEllipsis from '../text-ellipsis';

import { convertToText } from './constant';
import { SColumnsType, STableProps } from './types';

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

const STable: FC<STableProps> = ({
  isSeq = false,
  pagination,
  columns,
  ...props
}) => {
  const { globalDict } = useContext(ConfigContext);

  const getDictDataByKey = useCallback(
    (dictKey?: string | number) => {
      if (!dictKey) return null;
      return globalDict?.[dictKey];
    },
    [globalDict],
  );

  const getColumnsSeq = useCallback(
    (isSeq?: boolean) => {
      if (!isSeq) return null;
      return [
        {
          title: '序号',
          dataIndex: '',
          width: 80,
          render: (_: any, __: any, index: number) => {
            if (pagination && !!pagination?.current && !!pagination?.pageSize) {
              return (
                <div style={{ minWidth: '60px' }}>
                  {(pagination?.current - 1) * pagination?.pageSize +
                    (index + 1)}
                </div>
              );
            }
            return <div style={{ minWidth: '60px' }}>{index + 1}</div>;
          },
        },
      ];
    },
    [pagination],
  );

  const getColumnsNew = useCallback(
    (columns: SColumnsType<any>) => {
      return (columns || []).map((col: any) => {
        const newCol = { ...col };
        if (isString(newCol.render)) {
          if (newCol.render === 'datetime') {
            newCol.render = (t: any) => renderTime(t, 'YYYY-MM-DD HH:mm:ss');
          }
          if (newCol.render === 'date') {
            newCol.render = (t: any) => renderTime(t, 'YYYY-MM-DD');
          }
          if (newCol.render === 'ellipsis' && newCol?.width) {
            newCol.render = (t: string) => (
              <STextEllipsis width={newCol?.width}>{t}</STextEllipsis>
            );
          }
          return newCol;
        }
        if (!!newCol?.render) return newCol;
        return {
          ...newCol,
          render: (t: any) => {
            let text = convertToText(t);
            if (newCol?.dictKey) {
              const dictData = getDictDataByKey(newCol?.dictKey);
              text = dictData?.[text] || text;
            }
            return <>{text}</>;
          },
        };
      });
    },
    [getDictDataByKey],
  );

  const columnsCell = useMemo(() => {
    if (!columns) return [];
    const columnsSeq = getColumnsSeq(isSeq);
    const columnsNew = getColumnsNew(columns);
    return !!columnsSeq ? columnsSeq.concat(columnsNew) : columnsNew;
  }, [columns, isSeq, pagination, getColumnsSeq, getColumnsNew]);

  return (
    <Table
      size="small"
      {...props}
      pagination={pagination}
      columns={columnsCell || []}
    />
  );
};

export default memo(STable);
