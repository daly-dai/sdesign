import React, { lazy, memo, Suspense } from 'react';

import { FORM_ITEM_COM_MAP, HEAVY_COMPONENTS } from '../../constants';
import type { FormComType, FormFieldMapType } from '../../types';

// 注意：泛型 T 为 union 时 ComponentProps<FormFieldMapType[T]> 会触发
// TS2590 复杂度限制，因此 restProps 保持宽松类型，fieldProps 的类型约束
// 由 SFormItems 层面的条件类型提供
type FormFieldProps = {
  type: FormComType;
  [propName: string]: unknown;
};

// 动态导入重型组件
const HeavyComponentMap: Record<string, React.ComponentType<any>> = {
  cascader: lazy(() => import('../../../cascader')),
  table: lazy(() => import('../../../table')),
  SCascader: lazy(() => import('../../../cascader')),
};

function FormField({ type, ...restProps }: FormFieldProps) {
  const resolvedType = (type ?? 'input') as FormComType;

  const isHeavyComponent = HEAVY_COMPONENTS.includes(
    type as (typeof HEAVY_COMPONENTS)[number],
  );

  const Component: React.ComponentType<any> = isHeavyComponent
    ? HeavyComponentMap[type as keyof typeof HeavyComponentMap]
    : (FORM_ITEM_COM_MAP[
        resolvedType as keyof FormFieldMapType
      ] as React.ComponentType<any>);

  if (!Component) {
    console.error(`Component for type ${type} not found in FORM_ITEM_COM_MAP.`);
    return <div>未知组件类型: {type}</div>;
  }

  return (
    <Suspense fallback={isHeavyComponent ? <div>加载中...</div> : null}>
      <Component {...restProps} />
    </Suspense>
  );
}

export default memo(FormField);
