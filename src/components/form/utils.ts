import type { ColProps } from 'antd';
import type { NamePath } from 'antd/es/form/interface';
import type { Key } from 'react';
import { useCallback } from 'react';

/**
 * 拼接嵌套字段路径：存在 formName 前缀时返回 [formName, name]
 */
export function resolveNamePath(
  name: NamePath | undefined,
  formName?: string,
): NamePath | undefined {
  if (!formName || !name) return name;
  return [formName, name];
}

/**
 * 将字段名 name 转为稳定的 React key
 */
export function namePathToKey(name: NamePath | undefined, index: number): Key {
  if (name === null || name === undefined) return index;
  if (Array.isArray(name)) return name.join('.');
  return String(name);
}

/**
 * 共享的表单事件处理：onFinish / onReset 的 useCallback 包装
 */
export function useFormBehavior<Values>({
  onFinish,
  onReset,
}: {
  onFinish?: (values: Values) => void;
  onReset?: (e?: any) => void;
}) {
  const handleFinish = useCallback(
    (values: Values) => {
      onFinish?.(values);
    },
    [onFinish],
  );

  const handleReset = useCallback(
    (e: any) => {
      onReset?.(e);
    },
    [onReset],
  );

  return { handleFinish, handleReset };
}

/**
 * 将 labelWidth 转换为 antd Form 的 labelCol flex 配置
 */
export function resolveLabelCol(
  labelWidth: number | string | undefined,
  consumerLabelCol?: ColProps,
): ColProps | { flex: string } | undefined {
  if (labelWidth === undefined) return consumerLabelCol;

  const width = typeof labelWidth === 'number' ? `${labelWidth}px` : labelWidth;
  const flex = `0 0 ${width}`;

  if (consumerLabelCol) {
    return { ...consumerLabelCol, flex };
  }
  return { flex };
}
