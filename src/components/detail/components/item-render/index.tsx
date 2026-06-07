import isNil from 'lodash/isNil';
import React, { FC, ReactNode, memo, useContext, useMemo } from 'react';
import '../../index.css';
import { DetailItemType, ItemType } from '../../types';

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
}

// 在模块级别定义类型渲染器，避免每次渲染重新创建
const TYPE_RENDERERS: Record<ItemType, (props: RendererProps) => ReactNode> = {
  text: ({ value }) => (isNil(value) ? '-' : value),
  empty: () => '-',
  placeholder: () => '',
  dict: ({ value, dictMap, dictKey, dictReflect, globalDict }) => {
    const localDictMap = getDictMap({ dictMap, globalDict, dictKey });
    return dispatchDictData(
      localDictMap,
      value,
      dictReflect ?? { label: 'label', name: 'name' },
    );
  },
  file: ({ value, fileProps }) => {
    if (isNil(value)) return '-';
    if (!Array.isArray(value)) {
      return (
        <SFile {...fileProps} style={{ color: '#1677ff' }} fileData={value} />
      );
    }
    return <SFile.List {...fileProps} fileList={value} />;
  },
  rangeTime: ({ value }) => {
    if (!Array.isArray(value) || value.length !== 2) return '-';
    return `${value[0] ?? ''} - ${value[1] ?? ''}`;
  },
  checkbox: ({ value, dictMap, dictKey, dictReflect, globalDict }) => {
    const localDictMap = getDictMap({ dictMap, globalDict, dictKey });
    return dispatchCheckboxDictData(
      localDictMap,
      value,
      dictReflect ?? { label: 'label', name: 'name' },
    );
  },
};

const DetailItem: FC<DetailItemType> = ({
  render,
  type = 'text',
  value,
  dictMap,
  fileProps,
  dictKey,
  dataSource,
  dictReflect = { label: 'label', name: 'name' },
}) => {
  const { globalDict } = useContext(ConfigContext);

  const renderValue = useMemo<ReactNode>(() => {
    if (render) {
      return render(value, dataSource);
    }
    return TYPE_RENDERERS[type]({
      type,
      value,
      dictMap,
      dictKey,
      dataSource,
      dictReflect,
      globalDict,
      fileProps,
    });
  }, [
    render,
    type,
    value,
    dictMap,
    dictKey,
    dataSource,
    dictReflect,
    globalDict,
    fileProps,
  ]);

  return <div className="sdesign-detail-value">{renderValue}</div>;
};

export default memo(DetailItem);
