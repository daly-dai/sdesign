import { Tag, Typography } from 'antd';
import isNil from 'lodash/isNil';
import React, { FC, ReactNode, memo, useContext, useMemo } from 'react';
import { DetailItemType, DictReflect, ItemType } from '../../types';

import { ConfigContext } from '@dalydb/sdesign/components/config-provider/contexts';
import SFile from '@dalydb/sdesign/components/file';
import {
  dispatchCheckboxDictData,
  dispatchDictData,
  getDictMap,
} from '@dalydb/sdesign/utils';

// 渲染器参数类型
interface RendererProps extends DetailItemType {
  globalDict?: Record<string, any>;
  emptyText?: ReactNode;
  copyable?: boolean;
  ellipsis?: boolean | { rows: number };
}

const DEFAULT_EMPTY = '-';

/** 默认字典映射关系，提升到模块级避免每次渲染创建新对象 */
const DEFAULT_DICT_REFLECT: DictReflect = { label: 'label', name: 'name' };

// 根据 copyable / ellipsis 包裹内容
const wrapTypography = (
  content: ReactNode,
  copyable?: boolean,
  ellipsis?: boolean | { rows: number },
): ReactNode => {
  if (!copyable && !ellipsis) return content;

  if (ellipsis) {
    const rows = typeof ellipsis === 'object' ? ellipsis.rows : 1;
    return (
      <Typography.Paragraph
        ellipsis={{ rows, expandable: true, symbol: '展开' }}
        copyable={copyable || undefined}
        style={{ marginBottom: 0 }}
      >
        {content}
      </Typography.Paragraph>
    );
  }

  return <Typography.Text copyable>{content}</Typography.Text>;
};

// 在模块级别定义类型渲染器，避免每次渲染重新创建
const TYPE_RENDERERS: Record<ItemType, (props: RendererProps) => ReactNode> = {
  text: ({ value, emptyText, copyable, ellipsis }) =>
    isNil(value) || value === '' || value === false
      ? emptyText ?? DEFAULT_EMPTY
      : wrapTypography(value, copyable, ellipsis),
  empty: ({ emptyText }) => emptyText ?? DEFAULT_EMPTY,
  placeholder: () => '',
  dict: ({
    value,
    dictMap,
    dictKey,
    dictReflect,
    globalDict,
    emptyText,
    copyable,
  }) => {
    const localDictMap = getDictMap({ dictMap, globalDict, dictKey });
    const result = dispatchDictData(
      localDictMap,
      value,
      dictReflect ?? DEFAULT_DICT_REFLECT,
    );
    if (isNil(result) || result === '') return emptyText ?? DEFAULT_EMPTY;
    return copyable ? wrapTypography(result, true) : result;
  },
  file: ({ value, fileProps, emptyText }) => {
    if (isNil(value)) return emptyText ?? DEFAULT_EMPTY;
    if (Array.isArray(value) && value.length === 0)
      return emptyText ?? DEFAULT_EMPTY;
    if (!Array.isArray(value)) {
      return (
        <SFile {...fileProps} style={{ color: '#1677ff' }} fileData={value} />
      );
    }
    return <SFile.List {...fileProps} fileList={value} />;
  },
  rangeTime: ({ value, emptyText }) => {
    if (!Array.isArray(value) || value.length !== 2)
      return emptyText ?? DEFAULT_EMPTY;
    return `${value[0] ?? ''} - ${value[1] ?? ''}`;
  },
  checkbox: ({
    value,
    dictMap,
    dictKey,
    dictReflect,
    globalDict,
    emptyText,
  }) => {
    const localDictMap = getDictMap({ dictMap, globalDict, dictKey });
    const result = dispatchCheckboxDictData(
      localDictMap,
      value,
      dictReflect ?? DEFAULT_DICT_REFLECT,
    );
    return isNil(result) || result === '' ? emptyText ?? DEFAULT_EMPTY : result;
  },
  tag: ({ value, dictMap, dictKey, tagColorMap, globalDict, emptyText }) => {
    if (isNil(value) || value === '') return emptyText ?? DEFAULT_EMPTY;
    const localDictMap = getDictMap({ dictMap, globalDict, dictKey });
    // 如果是一组值（逗号分隔或数组），渲染多个 Tag
    const values: string[] = Array.isArray(value)
      ? value.map((v: any) => String(v))
      : String(value)
          .split(',')
          .map((v) => v.trim());
    return (
      <>
        {values.map((v, i) => {
          // 从 dictMap 中取 label（支持 Record<string, string> | any[]）
          let displayLabel: ReactNode = v;
          if (localDictMap) {
            const mapped = (localDictMap as any)[v];
            if (typeof mapped === 'string') {
              displayLabel = mapped;
            } else if (typeof mapped === 'object' && mapped?.label) {
              displayLabel = mapped.label;
            }
          }
          const color = tagColorMap?.[v];
          return (
            <Tag key={i} color={color}>
              {displayLabel}
            </Tag>
          );
        })}
      </>
    );
  },
};

const DetailItem: FC<
  DetailItemType & {
    emptyText?: ReactNode;
    copyable?: boolean;
    ellipsis?: boolean | { rows: number };
  }
> = ({
  render,
  type: rawType,
  value,
  dictMap,
  fileProps,
  dictKey,
  tagColorMap,
  dataSource,
  emptyText,
  copyable,
  ellipsis,
  dictReflect = DEFAULT_DICT_REFLECT,
}) => {
  const { globalDict } = useContext(ConfigContext);

  // 未显式指定 type 但提供了 dictKey / dictMap，自动按 dict 渲染
  const type = rawType ?? (dictKey || dictMap ? 'dict' : 'text');

  const renderValue = useMemo<ReactNode>(() => {
    if (render) {
      return render(value, dataSource);
    }
    const renderer = TYPE_RENDERERS[type];
    if (!renderer) {
      // 运行时防御：type 为动态数据（后端返回 / as any 绕过）时可能不在 ItemType 联合内
      if (process.env.NODE_ENV === 'development') {
        console.warn(
          `[SDetail] 未找到 type "${String(
            type,
          )}" 的渲染器，已回退为空值占位。`,
        );
      }
      return emptyText ?? DEFAULT_EMPTY;
    }
    return renderer({
      type,
      value,
      dictMap,
      dictKey,
      tagColorMap,
      dataSource,
      dictReflect,
      globalDict,
      fileProps,
      emptyText,
      copyable,
      ellipsis,
    });
  }, [
    render,
    type,
    value,
    dictMap,
    dictKey,
    tagColorMap,
    dataSource,
    dictReflect,
    globalDict,
    fileProps,
    emptyText,
    copyable,
    ellipsis,
  ]);

  return <div className="sdesign-detail-value">{renderValue}</div>;
};

export default memo(DetailItem);
