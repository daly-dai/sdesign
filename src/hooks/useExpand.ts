import { useMemo, useState } from 'react';

import { SFormItems } from '../components/form/types';

interface useExpandProps {
  columns: number;
  items: SFormItems[] | undefined;
  showExpand?: boolean;
  defaultExpand?: boolean;
  maxRows?: number;
}

/**
 * 控制展示收起相关配置的hook
 */
export default function useExpand({
  columns,
  items,
  showExpand,
  defaultExpand = false,
  maxRows = 1,
}: useExpandProps) {
  const [expanded, setExpanded] = useState(defaultExpand);

  const visibleItems = useMemo(
    () => items?.filter((item) => !item.hidden) ?? [],
    [items],
  );

  // 展示收起的功能开关
  const showCollapse = useMemo(() => {
    if (!showExpand) return false;
    // 可见表单项数量不超过收起时可展示的数量，不展示展开收起按钮
    return visibleItems.length > maxRows * columns - 1;
  }, [showExpand, visibleItems.length, maxRows, columns]);

  const expandNum = useMemo(() => {
    if (!visibleItems.length) return 0;
    if (!showCollapse) return visibleItems.length;
    return expanded ? visibleItems.length : maxRows * columns - 1;
  }, [visibleItems.length, showCollapse, expanded, maxRows, columns]);

  return {
    showCollapse,
    expandNum,
    expanded,
    setExpanded,
  };
}
