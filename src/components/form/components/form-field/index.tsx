import React, { memo } from 'react';

import { FORM_ITEM_COM_MAP } from '../../constants';
import type { DeprecatedComType, FormComType } from '../../types';

// 控件工厂：根据 type 分发到具体组件。
// restProps 保持宽松（动态透传 fieldProps），fieldProps 的精确类型约束
// 由公开类型 SFormItems 的判别式联合在配置层提供。
type FormFieldProps = {
  type?: FormComType | DeprecatedComType;
  [propName: string]: unknown;
};

function FormField({ type, ...restProps }: FormFieldProps) {
  const resolvedType = (type ?? 'input') as FormComType | DeprecatedComType;

  const Component = FORM_ITEM_COM_MAP[resolvedType] as
    | React.ComponentType<any>
    | undefined;

  if (!Component) {
    if (process.env.NODE_ENV === 'development') {
      console.error(
        `Component for type ${type} not found in FORM_ITEM_COM_MAP.`,
      );
    }
    return <div>未知组件类型: {type}</div>;
  }

  return <Component {...restProps} />;
}

export default memo(FormField);
