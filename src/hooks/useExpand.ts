import { useMemo, useState } from 'react';

import { SFormItems } from '../components/form/types';

interface useExpandProps {
  columns: number;
  items: SFormItems[] | undefined;
  showExpand?: boolean;
  defaultExpand?: boolean;
}
/**
 * 控制展示收起相关配置的hook
 * @param param0
 * @returns
 */
export default function useExpand({
  columns,
  items,
  showExpand,
  defaultExpand = true,
}: useExpandProps) {
  const [collapse, setCollapse] = useState(defaultExpand);

  // 展示收起的功能开关
  const showCollapse = useMemo(() => {
    if (!showExpand) return false;
    // 当表单的个数小于列数的话 不展示展开收起按钮
    if ((items?.length ?? 0) < columns) return false;
    // 外部控制是否展示展示展开收起按钮，默认为true
    return true;
  }, [showExpand, columns]);

  const expandNum = useMemo(() => {
    if (!items?.length) return 0;
    if (!showCollapse) return items.length;
    return collapse ? Math.min(columns - 1, items.length) : items.length;
  }, [columns, showCollapse, collapse, items]);

  return {
    showCollapse,
    expandNum,
    collapse,
    setCollapse,
  };
}
