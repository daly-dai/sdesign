import { ReactNode, useMemo } from 'react';

const useSearchLayout = ({
  columns,
  items,
  prefixCls,
  styles,
}: {
  columns: number;
  items: ReactNode[] | any[];
  prefixCls: string;
  styles?: Record<string, string>;
}) => {
  /**
   * @description 动态的占比
   */
  const dynamicSpan = useMemo(() => {
    return 24 / columns;
  }, [columns]);

  /**
   * 计算的操作按钮的偏移量
   */
  const dynamicOffset = useMemo(() => {
    const itemListLen = items?.length || 0;

    // 计算当前行已占用的列数
    const usedInCurrentRow = itemListLen % columns;

    // offset 列数 = 当前行剩余空间 - 操作按钮自身占的1列
    const offsetColumns = columns - usedInCurrentRow - 1;

    return offsetColumns * dynamicSpan;
  }, [items, columns, dynamicSpan]);

  const actionAlign = useMemo(() => {
    return styles
      ? styles[`${prefixCls}-action-right`]
      : `${prefixCls}-action-right`;
  }, [styles, prefixCls]);

  return {
    actionAlign,
    dynamicOffset,
    dynamicSpan,
  };
};

export default useSearchLayout;
