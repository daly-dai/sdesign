import React, { lazy, memo, Suspense } from 'react';

import { FORM_ITEM_COM_MAP_BY_KEY, HEAVY_COMPONENTS } from '../../constants';
import { FormComType } from '../../types';

// 泛型组件类型，用于约束props的类型
type FormFieldProps<T extends FormComType> = {
  type: T;
  // 使用泛型P来约束传递给子组件的props
  [propName: string]: any; // 或者使用具体的props接口，但这里为了简单起见使用any
};

// 动态导入重型组件
const HeavyComponentMap = {
  cascader: lazy(() => import('../../../cascader')),
  table: lazy(() => import('../../../table')),
  SCascader: lazy(() => import('../../../cascader')),
};

// 泛型动态组件
function FormField<T extends FormComType>({
  type,
  ...restProps
}: FormFieldProps<T>) {
  // 检查是否为重型组件
  const isHeavyComponent = HEAVY_COMPONENTS.includes(type as any);

  // 使用Map优化查找性能
  const Component = isHeavyComponent
    ? HeavyComponentMap[type as keyof typeof HeavyComponentMap]
    : FORM_ITEM_COM_MAP_BY_KEY.get(type ?? 'input');

  // 验证Component是否存在
  if (!Component) {
    console.error(`Component for type ${type} not found in FORM_ITEM_COM_MAP.`);
    return <div>未知组件类型: {type}</div>; // 修改：返回有意义的错误信息而不是null
  }

  // 渲染组件并传递props
  if (isHeavyComponent) {
    return (
      <Suspense fallback={<div>加载中...</div>}>
        <Component {...restProps} />
      </Suspense>
    );
  }

  return <Component {...restProps} />;
}

export default memo(FormField);
