import React, {
  forwardRef,
  isValidElement,
  memo,
  useImperativeHandle,
  useMemo,
} from 'react';

import { SForm, STable, STitle } from '@dalydb/sdesign';
import useProTable from '@dalydb/sdesign/hooks/useProTable';

import type { SProTableProps, SProTableRef } from './types';

// Hoist static constants outside component to avoid re-creation each render
const DEFAULT_MARGIN_STYLE: React.CSSProperties = { margin: 16 };
const TABLE_WRAPPER_STYLE: React.CSSProperties = { marginTop: 12 };

/** Narrow a value to a plain title config object (excludes React elements). */
const isTitleConfig = (
  v: unknown,
): v is { children?: React.ReactNode; actionNode?: React.ReactNode } =>
  // React 元素的 $$typeof 是 Symbol（Symbol.for('react.element')），
  // 不能用字符串 '$$typeof' in v 检测；必须用 isValidElement
  typeof v === 'object' && v !== null && !isValidElement(v);

function SProTableInner<RecordType = Record<string, unknown>>(
  {
    request,
    searchProps,
    tableProps: consumerTableProps,
    title,
    tableTitle,
    style,
    className,
    margin,
  }: SProTableProps<RecordType>,
  ref: React.ForwardedRef<SProTableRef>,
) {
  const {
    tableProps: hookTableProps,
    form,
    search,
    reset,
    mutate,
  } = useProTable(request.service, {
    ...request.options,
    form: searchProps?.form,
  });

  useImperativeHandle(
    ref,
    () => ({
      refresh: () => search(),
      reset: () => reset(),
      getForm: () => form,
      clearData: () => mutate(undefined),
    }),
    [search, reset, form, mutate],
  );

  // title 可能是 ReactNode 或配置对象，统一转为 STitle 的 props。
  // useMemo 避免每次渲染创建新的引用对象，保证 STitle 的 memo 生效。
  const titleProps = useMemo(() => {
    if (title === null || title === undefined) return undefined;
    return isTitleConfig(title)
      ? title
      : { children: title as React.ReactNode };
  }, [title]);

  // 提取 pagination 做 deep-merge，其余属性透传
  const { pagination: consumerPagination, ...restConsumerTableProps } =
    consumerTableProps ?? {};

  // pagination 合并策略：
  // - 用户显式传 false → 关闭分页（不能回退到 hook 的分页对象，否则 false 被吞）
  // - 用户传对象 → 与 hook 分页 deep-merge
  // - 用户未传 → 使用 hook 内置分页
  const mergedPagination = useMemo(() => {
    if (consumerPagination === false) return false;
    if (consumerPagination === undefined) return hookTableProps.pagination;
    return { ...hookTableProps.pagination, ...consumerPagination };
  }, [consumerPagination, hookTableProps.pagination]);

  // margin 解析为 CSS style 对象，useMemo 缓存避免每次渲染生成新引用。
  // marginStyle + style 合并也同样缓存，减少外层 div 的无效 diff。
  const marginStyle = useMemo<React.CSSProperties | undefined>(() => {
    if (margin === undefined || margin === null) return undefined;
    if (margin === true) return DEFAULT_MARGIN_STYLE;
    if (typeof margin === 'number' || typeof margin === 'string')
      return { margin };
    return undefined;
  }, [margin]);

  const divStyle = useMemo<React.CSSProperties | undefined>(() => {
    if (!marginStyle && !style) return undefined;
    return { ...marginStyle, ...style };
  }, [marginStyle, style]);

  return (
    <div style={divStyle} className={className}>
      {title && titleProps && <STitle type="page" {...titleProps} />}

      <SForm.Search
        isCard={false}
        defaultExpand
        {...searchProps}
        form={form}
        onFinish={searchProps?.onFinish ?? search}
        onReset={searchProps?.onReset ?? reset}
      />

      <div style={TABLE_WRAPPER_STYLE}>
        {tableTitle && (
          <STitle type="table" hasBottomMargin={12} {...tableTitle} />
        )}

        <STable
          size="small"
          bordered
          {...hookTableProps}
          {...restConsumerTableProps}
          pagination={mergedPagination}
        />
      </div>
    </div>
  );
}

const SProTable = memo(forwardRef(SProTableInner)) as <
  RecordType = Record<string, unknown>,
  TParams = any,
>(
  props: SProTableProps<RecordType, TParams> & {
    ref?: React.Ref<SProTableRef>;
  },
) => React.ReactElement;

export default SProTable;
