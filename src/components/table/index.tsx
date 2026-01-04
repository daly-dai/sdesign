import { Table } from 'antd';
import dayjs from 'dayjs';
import { isString } from 'lodash';
import React, { FC, useContext, useMemo } from 'react';

import { ConfigContext } from '../config-provider';
import STextEllipsis from '../text-ellipsis';

import { convertToText } from './constant';
import { SColumnsType, STableProps } from './types';

const renderTime = (
  time: string | number | Date,
  format = 'YYYY-MM-DD HH:mm:ss',
) => {
  // 通过dayjs 校验时间是否合法
  if (!dayjs(time).isValid()) {
    return time ?? '';
  }

  // 格式化时间
  return dayjs(time).format(format);
};

const STable: FC<STableProps> = ({ isSeq, pagination, columns, ...props }) => {
  const { globalDict } = useContext(ConfigContext);

  const getDictDataByKey = useMemo(
    () => (dictKey?: string | number) => {
      if (!dictKey) return null;

      return globalDict?.[dictKey];
    },
    [globalDict],
  );

  // 获取序号
  const getColumnsSeq = (isSeq?: boolean) => {
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
                {(pagination?.current - 1) * pagination?.pageSize + (index + 1)}
              </div>
            );
          }

          return <div style={{ minWidth: '60px' }}>{index + 1}</div>;
        },
      },
    ];
  };

  // 默认添加table cell单行展示
  const getColumnsNew = (columns: SColumnsType<any>) => {
    return (columns || []).map((col: any) => {
      if (isString(col.render)) {
        if (col.render === 'datetime') {
          col.render = (t: any) => {
            return renderTime(t, 'YYYY-MM-DD HH:mm:ss');
          };
        }

        if (col.render === 'date') {
          col.render = (t: any) => {
            return renderTime(t, 'YYYY-MM-DD');
          };
        }

        if (col.render === 'ellipsis' && col?.width) {
          col.render = (t: string) => {
            return <STextEllipsis width={col?.width}>{t}</STextEllipsis>;
          };
        }

        return col;
      }

      // biome-ignore lint/complexity/noExtraBooleanCast: <explanation>
      if (!!col?.render) return col;

      return {
        ...col,
        render: (t: any) => {
          let text = convertToText(t);

          // 存在全局字典映射
          if (col?.dictKey) {
            const dictData = getDictDataByKey(col?.dictKey);

            text = dictData?.[text] || text;
          }

          return <>{text}</>;
        },
      };
    });
  };

  const columnsCell = useMemo(() => {
    if (!columns) return [];

    // 获取序号
    const columnsSeq = getColumnsSeq(isSeq);
    // 默认添加table cell单行展示
    const columnsNew = getColumnsNew(columns);

    // biome-ignore lint/complexity/noExtraBooleanCast: <explanation>
    return !!columnsSeq ? columnsSeq.concat(columnsNew) : columnsNew;
  }, [columns, globalDict]);

  return (
    <Table
      size="small"
      {...props}
      pagination={pagination}
      columns={columnsCell || []}
    />
  );
};

export default STable;
