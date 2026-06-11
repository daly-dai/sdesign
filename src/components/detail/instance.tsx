import { Skeleton, Tooltip } from 'antd';
import get from 'lodash/get';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import React, { CSSProperties, memo, useId, useMemo } from 'react';

import DynamicContainer from '../dynamic-container';
import STitle from '../title';

import DetailItem from './components/item-render';
import { DETAIL_LABEL_STYLE } from './constant';
import './index.css';
import { SDetailItem, SDetailProps } from './types';

const getDetailVal = (
  name: string | string[],
  dataSource: Record<string, any>,
): any => {
  if (isString(name)) return dataSource[name];
  return name.map((key) => dataSource[key]);
};

/**
 * 将 column/columns 解析为 CSS grid-template-columns 值
 *
 * subgrid 模式下每「显示列」拆分为 max-content(label) + 1fr(content) 两条轨道，
 * 同一列位置的 label 通过 subgrid 自动对齐。
 */
const resolveGridColumns = (
  columns?: number | string,
  column?: number,
): string => {
  const resolved = columns ?? column;
  if (typeof resolved === 'number') {
    return `repeat(${resolved}, max-content 1fr)`;
  }
  if (typeof resolved === 'string') {
    // string 模式也按空格拆开，每组加 max-content 前缀
    const parts = resolved.split(/\s+/).filter(Boolean);
    return parts.map((p) => `max-content ${p}`).join(' ');
  }
  return 'repeat(3, max-content 1fr)';
};

/**
 * 获取纯数字列数（用于 loading 骨架屏和 span 计算）
 */
const getColumnCount = (columns?: number | string, column?: number): number => {
  const resolved = columns ?? column;
  if (typeof resolved === 'number') return resolved;
  if (typeof resolved === 'string')
    return resolved.split(/\s+/).filter(Boolean).length;
  return 3;
};

const DetailInstance: React.FC<SDetailProps> = ({
  items = [],
  dataSource: rawDataSource = {},
  labelStyle,
  contentStyle,
  columns,
  column,
  gap = 16,
  labelWidth,
  title,
  style,
  className,
  colon = true,
  desc,
  titleAction,
  hasCardBg = false,
  layout = 'horizontal',
  detailName,
  emptyText,
  loading,
  ...restProps
}) => {
  const componentId = useId();

  // 使用 useMemo 来记忆化 dataSource
  const dataSource = useMemo(() => {
    if (!detailName) return rawDataSource;
    // 支持嵌套路径，如 detailName="user.profile"
    return get(rawDataSource, detailName) ?? {};
  }, [rawDataSource, detailName]);

  // 解析 grid-template-columns
  const gridColumns = useMemo(
    () => resolveGridColumns(columns, column),
    [columns, column],
  );

  // 合并 label 样式
  const mergedLabelStyle = useMemo<CSSProperties>(
    () => ({
      ...DETAIL_LABEL_STYLE,
      ...(labelWidth
        ? {
            width:
              typeof labelWidth === 'number' ? `${labelWidth}px` : labelWidth,
          }
        : {}),
      ...labelStyle,
    }),
    [labelStyle, labelWidth],
  );

  // 渲染标题
  const detailTitle = useMemo(() => {
    if (!title) return undefined;
    if (!isString(title)) return title;
    return (
      <STitle
        style={{ marginBottom: 0 }}
        type="form"
        desc={desc}
        actionNode={titleAction}
      >
        {title}
      </STitle>
    );
  }, [title, desc, titleAction]);

  // 过滤 + 构建 Grid items
  const visibleItems = useMemo<SDetailItem[]>(() => {
    if (!isArray(items) || items.length === 0) return [];
    return items.filter((item) => !item.hidden);
  }, [items]);

  // Grid 容器样式
  const gridStyle = useMemo<CSSProperties>(() => {
    const base: CSSProperties = {
      display: 'grid',
      gridTemplateColumns: gridColumns,
      gap: typeof gap === 'number' ? `${gap}px` : gap,
    };
    return base;
  }, [gridColumns, gap]);

  // 列数（纯数字，用于 skeleton 和 span）
  const colCount = useMemo(
    () => getColumnCount(columns, column),
    [columns, column],
  );

  // 渲染单个 item 的 label + content
  const renderGridItem = (item: SDetailItem, index: number) => {
    const {
      prefixCls,
      className: itemClassName,
      style: itemStyle,
      label,
      labelStyle: itemLabelStyle,
      contentStyle: itemContentStyle,
      span,
      name,
      copyable,
      ellipsis,
      tooltip,
      ...detailConfig
    } = item;

    // subgrid 模式：1 显示列 = 2 条轨道（label + content），span 需 ×2
    const gridSpan = span ? Math.max(1, span) * 2 : 2;

    // 合并后的 label 样式（item 级别覆盖全局）
    const finalLabelStyle: CSSProperties = {
      ...mergedLabelStyle,
      ...itemLabelStyle,
    };

    // 合并后的 content 样式
    // subgrid 模式下 content 从轨道 2 延伸到末尾，
    // 保证 span>1 时 content（如 Table）填满所有剩余空间
    const finalContentStyle: CSSProperties = {
      ...contentStyle,
      ...itemContentStyle,
      ...(layout !== 'vertical' ? { gridColumn: '2 / -1' } : {}),
    };

    const prefixClsClass = prefixCls ? `${prefixCls}-item` : '';

    // 公共样式
    const itemBaseStyle: CSSProperties = {
      ...itemStyle,
      gridColumn: `span ${gridSpan}`,
    };

    const layoutClass =
      layout === 'vertical'
        ? 'sdetail-item-vertical'
        : 'sdetail-item-horizontal';

    const labelNode =
      label !== null ? (
        <div className="sdetail-label" style={finalLabelStyle}>
          {label}
          {colon && typeof label === 'string' && <span>:</span>}
        </div>
      ) : null;

    return (
      <div
        key={`${componentId}-item-${index}`}
        className={`sdetail-item ${layoutClass} ${prefixClsClass} ${
          itemClassName ?? ''
        }`.trim()}
        style={itemBaseStyle}
      >
        {tooltip ? <Tooltip title={tooltip}>{labelNode}</Tooltip> : labelNode}
        <div className="sdetail-content" style={finalContentStyle}>
          <DetailItem
            dataSource={dataSource}
            value={name ? getDetailVal(name, dataSource) : undefined}
            emptyText={emptyText}
            copyable={copyable}
            ellipsis={ellipsis}
            {...detailConfig}
          />
        </div>
      </div>
    );
  };

  return (
    <DynamicContainer
      id={componentId}
      style={style}
      className={className}
      isCard={hasCardBg}
      CustomContainer={restProps.container as React.ComponentType<any>}
    >
      {detailTitle}
      {detailTitle && <div style={{ height: gap }} />}
      {loading ? (
        <div className="sdetail-grid" style={gridStyle}>
          {Array.from({ length: visibleItems.length || colCount * 2 }).map(
            (_, i) => (
              <div
                key={`skeleton-${i}`}
                className="sdetail-item sdetail-item-horizontal"
                style={{ gridColumn: 'span 2', alignItems: 'center' }}
              >
                <Skeleton.Input active size="small" />
                <Skeleton.Input
                  active
                  size="small"
                  style={{ gridColumn: '2 / -1' }}
                />
              </div>
            ),
          )}
        </div>
      ) : (
        <div className="sdetail-grid" style={gridStyle}>
          {visibleItems.map((item, index) => renderGridItem(item, index))}
        </div>
      )}
    </DynamicContainer>
  );
};

export default memo(DetailInstance);
