import { Table } from 'antd';
import dayjs from 'dayjs';
import React, { forwardRef, memo, useContext, useMemo } from 'react';

import { ConfigContext } from '../config-provider';

import { convertToText } from './constant';
import { STableProps } from './types';

const renderTime = (
  time: string | number | Date | null | undefined,
  format = 'YYYY-MM-DD HH:mm:ss',
): string => {
  // 空值显式返回空串，避免 dayjs(undefined) 解析成「当前时间」
  if (time === null || time === undefined || time === '') return '';
  // 13 位数字字符串时间戳（后端常见）需先转 number，
  // 否则 dayjs 走 REGEX_PARSE 会误解析成 1681 年
  const normalized =
    typeof time === 'string' && /^\d{13}$/.test(time) ? Number(time) : time;
  const parsedTime = dayjs(normalized);
  if (!parsedTime.isValid()) {
    return typeof time === 'string' ? time : '';
  }
  return parsedTime.format(format);
};

type RenderFn = (t: any, col: any, index: number) => any;

const STRING_RENDER_MAP: Record<string, (col: any) => RenderFn> = {
  datetime: () => (t: any) => renderTime(t, 'YYYY-MM-DD HH:mm:ss'),
  date: () => (t: any) => renderTime(t, 'YYYY-MM-DD'),
  index: () => (_: any, __: any, index: number) => index + 1,
};

function STableInner<RecordType = Record<string, unknown>>(
  { pagination, columns, ...props }: STableProps<RecordType>,
  ref: React.ForwardedRef<React.ComponentRef<typeof Table>>,
) {
  const { globalDict } = useContext(ConfigContext);

  const columnsCell = useMemo(() => {
    if (!columns) return [];
    const processed = columns.map((col: any) => {
      const newCol = { ...col };

      // 字符串 render 快捷类型
      if (typeof newCol.render === 'string') {
        // ellipsis 快捷类型：迁移到 antd 原生列 ellipsis（自带 tooltip + 标准省略号）
        if (newCol.render === 'ellipsis') {
          newCol.ellipsis = true;
          delete newCol.render;
        } else {
          const factory = STRING_RENDER_MAP[newCol.render];
          if (factory) {
            const baseRender = factory(newCol);
            // 同时配置 dictKey 时，先查字典再交给快捷渲染
            if (newCol.dictKey) {
              newCol.render = (t: any, col: any, index: number) => {
                let text = convertToText(t);
                const dictData = globalDict?.[newCol.dictKey];
                if (dictData) text = dictData[text] ?? text;
                return baseRender(text, col, index);
              };
            } else {
              newCol.render = baseRender;
            }
            return newCol;
          }
          // 未知字符串 render 类型：清除 render，走后续默认文本渲染
          delete newCol.render;
        }
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
            text = dictData?.[text] ?? text;
          }
          return <>{text}</>;
        },
      };
    });

    return processed;
  }, [columns, globalDict]);

  return (
    <Table
      ref={ref}
      size="small"
      {...props}
      pagination={pagination}
      columns={columnsCell || []}
    />
  );
}

const STable = memo(forwardRef(STableInner)) as typeof STableInner;

export default STable;
