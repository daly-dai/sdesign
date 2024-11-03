import { Form, FormInstance } from 'antd';
import get from 'lodash/get';
import isBoolean from 'lodash/isBoolean';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import set from 'lodash/set';
import React, { useMemo } from 'react';

import { SDependencyProps } from './types';

import { isDeepEqualReact } from '@daly/sdesign/utils/object';

const SDependency = <T,>({
  depNames,
  children,
  ...rest
}: SDependencyProps<T>) => {
  const flattenNames = useMemo(() => {
    const result: string[] = [];

    depNames?.forEach((name) => {
      if (!isString(name)) return;

      result.push(name);
    });

    return result;
  }, []);

  /**
   * 更新判断
   * @param prevValues
   * @param nextValues
   * @param info
   * @returns
   */
  const handleUpdate = (prevValues: T, nextValues: T, info: any) => {
    if (isBoolean(rest.shouldUpdate)) {
      return rest.shouldUpdate;
    }

    if (isFunction(rest.shouldUpdate)) {
      return rest.shouldUpdate?.(prevValues, nextValues, info);
    }

    if (!flattenNames?.length) return false;

    return flattenNames?.some((name) => {
      return !isDeepEqualReact(get(prevValues, name), get(nextValues, name));
    });
  };

  /**
   * 获取当前依赖的相关数据
   * @param form
   */
  const getDependencyValues = (form: FormInstance<T>) => {
    let values: Record<string, any> = {} as Record<string, any>;

    for (let i = 0; i < depNames.length; i++) {
      const itemName = flattenNames[i];

      const value = form.getFieldValue?.(itemName);

      if (typeof value !== 'undefined') {
        values = set(values, itemName, value);
      }
    }

    return values;
  };

  return (
    <Form.Item noStyle shouldUpdate={handleUpdate}>
      {(form) => {
        const values = getDependencyValues(form);

        return children?.(values, { ...form });
      }}
    </Form.Item>
  );
};

export default SDependency;
