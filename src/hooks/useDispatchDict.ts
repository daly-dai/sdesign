// 处理字典值

import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import keys from 'lodash/keys';
import { useMemo } from 'react';

type useDispatchDictType = {
  dict: Record<string, string> | undefined;
  disableKeys?: string | string[];
  options: any[] | undefined;
};

export default function useDispatchDict({
  dict,
  disableKeys,
  options,
}: useDispatchDictType) {
  /**
   * 处理数组的字典数据
   * @returns
   */
  const dispatchArrDict = () => {
    return [];
  };

  /**
   * 获取列表中被禁用的key
   * @param key
   * @returns
   */
  const getDisableByKey = (key: string) => {
    if (!disableKeys) return false;

    if (isString(disableKeys) && key === disableKeys) {
      return true;
    }

    if (isArray(disableKeys) && disableKeys.includes(key)) {
      return true;
    }
  };

  /**
   * 处理对象的字典值
   * @returns
   */
  const dispatchObjDict = () => {
    if (!dict) return [];

    const result = keys(dict).map((key) => {
      const disabled = getDisableByKey(key);

      const optionsItem = {
        label: dict[key],
        value: key,
        disabled: false,
      };

      if (disabled) {
        optionsItem.disabled = true;
      }

      return optionsItem;
    });

    return result;
  };

  /**
   * 整合字典数据
   * @returns
   */
  const getDictOptions = () => {
    if (!dict) return [];

    if (isArray(dict)) {
      const result = dispatchArrDict();
      return result;
    }

    const result = dispatchObjDict();

    return result;
  };

  const dOptions = useMemo(() => {
    if (options) return options;

    const result = getDictOptions();

    return result;
  }, [dict, options, disableKeys]);

  return {
    dOptions,
  };
}
