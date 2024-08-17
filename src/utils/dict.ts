import isArray from 'lodash/isArray';
import isNil from 'lodash/isNil';
import isObject from 'lodash/isObject';
import keys from 'lodash/keys';

import { DictReflect } from '../components';

const EMPTY_VALUE = '-';

export type DictMap =
  | Record<string, string | number>
  | Record<string, string | number>[];

const getReflect = (dictReflect?: DictReflect) => {
  const { name, label } = dictReflect ?? {};

  return {
    name: name ?? 'name',
    label: label ?? 'label',
  };
};

/**
 * 处理字典值
 * @param dictMap
 * @param detailValue
 * @param dictReflect
 * @returns
 */
export function dispatchDictData(
  dictMap: DictMap | undefined | null,
  detailValue: any,
  dictReflect?: DictReflect,
) {
  if (isNil(detailValue) || !dictMap) return EMPTY_VALUE;

  if (isArray(dictMap)) {
    const { name, label } = getReflect(dictReflect);
    const result = ((dictMap || []) as any[]).find(
      (item: Record<string, any>) => {
        if (!item?.[name]) return false;

        return item[name] === detailValue;
      },
    );

    if (!result) return EMPTY_VALUE;

    return result[label] || EMPTY_VALUE;
  }

  if (isObject(dictMap)) {
    return dictMap?.[detailValue] ?? EMPTY_VALUE;
  }
}

/**
 * 获取多选框字典映射
 */
export function dispatchCheckboxDictData(
  dictMap: DictMap | undefined | null,
  detailValue: string | null | undefined,
  dictReflect: DictReflect,
) {
  if (isNil(detailValue) || !dictMap) return EMPTY_VALUE;

  if (detailValue?.length === 0) return EMPTY_VALUE;

  const { name, label } = getReflect(dictReflect);

  let processedDictMap: Record<string, string | number>;

  if (Array.isArray(dictMap)) {
    processedDictMap = dictMap.reduce(
      (acc, item) => ({ ...acc, [item[name]]: item[label] }),
      {},
    );
  } else {
    processedDictMap = dictMap;
  }

  try {
    const result = detailValue
      ?.split(',')
      ?.map((key: string) => {
        return processedDictMap?.[key];
      })
      ?.join('/');

    return result ?? EMPTY_VALUE;
  } catch (error) {
    console.error('Error processing dictMap:', error);
    return EMPTY_VALUE;
  }
}

/**
 * 获取字典映射
 * @param {Record<string, string> | any[] | null} dictMap - 字典映射对象或数组或null
 * @param {Record<string, string> | undefined} globalDict - 全局字典对象或undefined
 * @param {string} dictKey - 字典键
 * @returns {Record<string, string> | any[] | {} | null | {} | undefined} - 返回字典映射或者空对象
 */
export function getDictMap({
  dictMap,
  globalDict,
  dictKey,
}: {
  dictKey: string | undefined;
  dictMap?: Record<string, string> | any[] | null;
  globalDict?: Record<string, string> | undefined;
}): Record<string, string> | any[] | undefined | null {
  if (dictMap) return dictMap;

  if (!dictKey) return {};

  if (!keys(globalDict ?? {})?.length) return {};

  return (globalDict?.[dictKey] ?? {}) as Record<string, string>;
}
