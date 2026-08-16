import { Button, Form } from 'antd';
import React, { CSSProperties, Fragment, memo, useMemo } from 'react';

import { SearchProps } from '../../types';
import { namePathToKey, useFormBehavior } from '../../utils';
import ItemRender from '../item-render';

import './index.css';

import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import SButtonGroup from '@dalydb/sdesign/components/button/Buttons';
import SCollapse from '@dalydb/sdesign/components/collapse';
import DynamicContainer from '@dalydb/sdesign/components/dynamic-container';
import useExpand from '@dalydb/sdesign/hooks/useExpand';

function Search<Values = any>({
  columns = 4,
  items,
  actionNode,
  showExpand = true,
  defaultExpand,
  maxRows = 1,
  readonly = false,
  container,
  isCard = true,
  gap,
  extraButtons,
  actionStyleRender,
  labelWidth,
  onFinish,
  onReset,
  onExpand,
  style,
  ...props
}: SearchProps<Values>) {
  const base = 'sdesign-form-search';

  const { showCollapse, expandNum, expanded, setExpanded } = useExpand({
    columns,
    items,
    showExpand,
    defaultExpand,
    maxRows,
  });

  const { handleFinish, handleReset } = useFormBehavior<Values>({
    onFinish,
    onReset,
  });

  // 计算 gap
  const [rowGap, columnGap] = useMemo<[number, number]>(() => {
    if (Array.isArray(gap)) return gap;
    if (typeof gap === 'number') return [gap, gap];
    return [16, 24];
  }, [gap]);

  const formTypeConfig = readonly ? { disabled: true } : {};

  // 可见的表单项（过滤 hidden，截取到 expandNum）
  const visibleSlicedItems = useMemo(() => {
    if (!items?.length) return [];
    return items.filter((item) => !item.hidden).slice(0, expandNum);
  }, [items, expandNum]);

  // 归一化每个可见项的逻辑列跨度（clamp 到 [1, columns]）
  const itemSpans = useMemo(
    () =>
      visibleSlicedItems.map((item) =>
        Math.min(Math.max(item.gridColumn ?? 1, 1), columns),
      ),
    [visibleSlicedItems, columns],
  );

  // 一次遍历同时算出：每个 item 是否行首（列间距用）+ 操作区剩余跨度
  const layout = useMemo(() => {
    let currentCol = 0;
    const itemLayout = itemSpans.map((span) => {
      const isFirstCol = currentCol === 0;
      currentCol = (currentCol + span) % columns;
      return { isFirstCol, span };
    });

    const remainingCols = currentCol === 0 ? columns : columns - currentCol;
    // 每个逻辑列 = label track + control track，共 2 个 grid track
    const actionTrackSpan = remainingCols * 2;

    return { itemLayout, actionTrackSpan };
  }, [itemSpans, columns]);

  // 操作区样式
  const actionStyle = useMemo<CSSProperties>(() => {
    if (actionStyleRender) {
      return actionStyleRender({
        expanded,
        actionSpan: layout.actionTrackSpan / 2,
      });
    }
    return { gridColumn: `span ${layout.actionTrackSpan}` };
  }, [actionStyleRender, expanded, layout.actionTrackSpan]);

  // grid 列模板：每个逻辑列 = label track(auto) + control track(1fr)
  const gridTemplateColumns = useMemo(() => {
    const labelTrack = labelWidth
      ? typeof labelWidth === 'number'
        ? `${labelWidth}px`
        : labelWidth
      : 'auto';
    return `repeat(${columns}, ${labelTrack} 1fr)`;
  }, [columns, labelWidth]);

  const formStyle = useMemo(() => {
    if (isCard) return style;
    return { marginBottom: 16, ...style };
  }, [style, isCard]);

  return (
    <DynamicContainer isCard={isCard} CustomContainer={container}>
      <Form
        {...formTypeConfig}
        colon={false}
        {...props}
        style={formStyle}
        onFinish={handleFinish}
        onReset={handleReset}
      >
        <div
          className={`${base}-grid`}
          style={{
            gridTemplateColumns,
            rowGap,
          }}
        >
          {visibleSlicedItems.map((item, index) => {
            const { isFirstCol, span } = layout.itemLayout[index];
            const controlTrackSpan = span * 2 - 1;
            // 列间距：给非首列的 label（或空占位）加 marginLeft。
            // 不能用 grid 的 column-gap，否则「label↔control」之间也会产生间距
            const gapStyle = !isFirstCol
              ? { marginLeft: columnGap }
              : undefined;

            return (
              <Fragment key={namePathToKey(item.name, index)}>
                {item.label ? (
                  <label className={`${base}-label`} style={gapStyle}>
                    {item.required && (
                      <span className={`${base}-required`}>*</span>
                    )}
                    {item.label}
                  </label>
                ) : (
                  <span style={gapStyle} />
                )}
                <div
                  style={
                    controlTrackSpan > 1
                      ? { gridColumn: `span ${controlTrackSpan}` }
                      : undefined
                  }
                >
                  <ItemRender
                    readonly={readonly}
                    {...item}
                    style={{ marginBottom: 0, ...item.style }}
                    label={undefined}
                  />
                </div>
              </Fragment>
            );
          })}

          <div className={`${base}-action`} style={actionStyle}>
            {actionNode ?? (
              <>
                <Button
                  icon={<SearchOutlined />}
                  type="primary"
                  htmlType="submit"
                >
                  查询
                </Button>
                <Button icon={<ReloadOutlined />} htmlType="reset">
                  重置
                </Button>
                {extraButtons?.length ? (
                  <SButtonGroup items={extraButtons} />
                ) : null}
                {showCollapse && (
                  <SCollapse
                    collapse={!expanded}
                    setCollapse={(val: boolean) => setExpanded(!val)}
                    onExpand={onExpand}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </Form>
    </DynamicContainer>
  );
}

const SearchMemo = memo(Search) as typeof Search;

export default SearchMemo;
