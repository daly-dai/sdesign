import { Button, Form } from 'antd';
import React, {
  CSSProperties,
  FC,
  Fragment,
  memo,
  useCallback,
  useMemo,
} from 'react';

import { SearchProps } from '../../types';
import ItemRender from '../item-render';

import './index.css';

import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import SButtonGroup from '@dalydb/sdesign/components/button/Buttons';
import SCollapse from '@dalydb/sdesign/components/collapse';
import DynamicContainer from '@dalydb/sdesign/components/dynamic-container';
import useExpand from '@dalydb/sdesign/hooks/useExpand';

const Search: FC<SearchProps> = memo(
  ({
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
    ...props
  }) => {
    const base = 'sdesign-form-search';

    const { showCollapse, expandNum, expanded, setExpanded } = useExpand({
      columns,
      items,
      showExpand,
      defaultExpand,
      maxRows,
    });

    // 计算 gap
    const [rowGap, columnGap] = useMemo<[number, number]>(() => {
      if (Array.isArray(gap)) return gap;
      if (typeof gap === 'number') return [gap, gap];
      return [16, 24];
    }, [gap]);

    const formTypeConfig = readonly ? { disabled: true } : {};

    const handleFinish = useCallback(
      (values: any) => {
        props?.onFinish?.(values);
      },
      [props?.onFinish],
    );

    const handleReset = useCallback(
      (e: any) => {
        props?.onReset?.(e);
      },
      [props?.onReset],
    );

    // 可见的表单项（过滤 hidden，截取到 expandNum）
    const visibleSlicedItems = useMemo(() => {
      if (!items?.length) return [];
      return items.filter((item) => !item.hidden).slice(0, expandNum);
    }, [items, expandNum]);

    // 预计算每个 item 的逻辑列位置
    const itemLayoutInfo = useMemo(() => {
      let currentCol = 0;
      return visibleSlicedItems.map((item) => {
        const span = typeof item.gridColumn === 'number' ? item.gridColumn : 1;
        const isFirstCol = currentCol === 0;

        currentCol = (currentCol + span) % columns;

        return { isFirstCol, span };
      });
    }, [visibleSlicedItems, columns]);

    // 操作区 grid track 跨度计算（每个逻辑列 = 2 个 grid track）
    const actionTrackSpan = useMemo(() => {
      let currentCol = 0;

      visibleSlicedItems.forEach((item) => {
        const span = typeof item.gridColumn === 'number' ? item.gridColumn : 1;
        currentCol = (currentCol + span) % columns;
      });

      const remainingCols = currentCol === 0 ? columns : columns - currentCol;

      return remainingCols * 2;
    }, [visibleSlicedItems, columns]);

    // 操作区样式
    const actionStyle = useMemo<CSSProperties>(() => {
      if (actionStyleRender) {
        return actionStyleRender({
          expanded,
          actionSpan: actionTrackSpan / 2,
        });
      }
      return { gridColumn: `span ${actionTrackSpan}` };
    }, [actionStyleRender, expanded, actionTrackSpan]);

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
      if (isCard) return props.style;
      return { marginBottom: 16, ...props.style };
    }, [props.style, isCard]);

    return (
      <DynamicContainer isCard={isCard} CustomContainer={container}>
        <Form
          {...formTypeConfig}
          colon={false}
          style={formStyle}
          {...props}
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
              const { isFirstCol, span } = itemLayoutInfo[index];
              const controlTrackSpan = span * 2 - 1;

              return (
                <Fragment key={item.name?.toString() || index}>
                  {item.label ? (
                    <label
                      className={`${base}-label`}
                      style={
                        !isFirstCol ? { marginLeft: columnGap } : undefined
                      }
                    >
                      {item.required && (
                        <span className={`${base}-required`}>*</span>
                      )}
                      {item.label}
                    </label>
                  ) : (
                    <span />
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
                      style={{ marginBottom: 0 }}
                      {...item}
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
                      onExpand={props?.onExpand}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </Form>
      </DynamicContainer>
    );
  },
);

export default Search;
