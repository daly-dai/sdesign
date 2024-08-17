import { Table, Tooltip } from 'antd';
import React, { FC, useContext, useMemo } from 'react';

import { ConfigContext } from '../config-provider';
import STextEllipsis from '../text-ellipsis';

import { cellStyle, convertToText } from './constant';
import { SColumnsType, STableProps } from './types';

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
    // 是否存在固定列
    const isFixed = columns?.some((item: any) => item.fixed) && props?.scroll;
    return (columns || []).map((col: any) => {
      // biome-ignore lint/complexity/noExtraBooleanCast: <explanation>
      if (!!col?.render) return { ...col };

      // 控制Tooltip显隐
      function showToolTip(e: any) {
        if (e.target.clientWidth >= e.target.scrollWidth) {
          e.target.style.pointerEvents = 'none'; // 阻止鼠标事件
        }
      }

      return {
        ...col,
        render: (t: any) => {
          let text = convertToText(t);

          // 存在全局字典映射
          if (col?.dictKey) {
            const dictData = getDictDataByKey(col?.dictKey);

            text = dictData?.[text] || text;
          }

          // @ts-ignore
          // biome-ignore lint/complexity/noExtraBooleanCast: <explanation>
          if (!!col?.maxChars) {
            return (
              <STextEllipsis.Single
                maxChars={col?.maxChars || 12}
                text={`${text}`} // fix: 数字0
              />
            );
          }

          return (
            <Tooltip
              title={`${text}`}
              // @ts-ignore
              onMouseEnter={showToolTip}
            >
              <span
                style={
                  col?.width
                    ? { ...cellStyle, width: !isFixed ? col?.width : '' }
                    : { width: !isFixed ? col?.width : '' }
                }
              >
                {text}
              </span>
            </Tooltip>
          );
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

  return <Table {...props} pagination={pagination} columns={columnsCell || []} />;
};

export default STable;
