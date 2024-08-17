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

    // 处理一行一个占比为1/3的情况
    if (itemListLen === 1 && columns === 4) {
      return 8;
    }

    const len = Math.ceil(itemListLen % columns);

    const offset = columns - 1 - len;

    return offset * dynamicSpan;
  }, [items, columns, dynamicSpan]);

  const actionAlign = useMemo(() => {
    return styles
      ? styles[`${prefixCls}-action-right`]
      : `${prefixCls}-action-right`;
  }, [dynamicOffset, items]);

  return {
    actionAlign,
    dynamicOffset,
    dynamicSpan,
  };
};

export default useSearchLayout;
