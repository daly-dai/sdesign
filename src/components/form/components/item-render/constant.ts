import { Variant } from 'antd/es/config-provider';
import { Rule } from 'antd/es/form';
import isBoolean from 'lodash/isBoolean';

import { FormItemType } from '@dalydb/sdesign';
import { RegKeyType } from '@dalydb/sdesign/types/reg';
import { REG_KEY_MAP } from '@dalydb/sdesign/utils';

const InputPlaceholder = '请输入';
const selectPlaceholder = '请选择';

type Config = {
  default: {
    placeholder?: string | string[];
    allowClear?: boolean;
  };
  detail: {
    disabled?: boolean;
    variant?: Variant;
  };
};

// 用于生成默认配置的函数
function generateDefaultConfig(
  placeholder?: string | string[],
  isAllowClear?: boolean,
): Config['default'] {
  const config: Config['default'] = {
    ...(placeholder && { placeholder }),
    ...(isAllowClear && { allowClear: true }),
  };

  return config;
}

function generateDetailConfig(
  variant?: Variant,
  disabled?: boolean,
): Config['detail'] {
  const config: Config['detail'] = {
    ...(variant && { variant }),
    ...(disabled && { disabled: true }),
  };

  return config;
}

export const DEFAULT_CONFIG_MAP: Record<
  Partial<FormItemType>,
  Config | undefined
> = {
  input: {
    default: generateDefaultConfig(InputPlaceholder, true),
    detail: generateDetailConfig('borderless', true),
  },
  inputNumber: {
    default: generateDefaultConfig(InputPlaceholder, true),
    detail: generateDetailConfig('borderless', true),
  },
  password: {
    default: generateDefaultConfig(InputPlaceholder, true),
    detail: generateDetailConfig('borderless', true),
  },
  textarea: {
    default: generateDefaultConfig(InputPlaceholder, true),
    detail: generateDetailConfig('borderless', true),
  },
  select: {
    default: generateDefaultConfig(selectPlaceholder, true),
    detail: generateDetailConfig('borderless', true),
  },
  datePicker: {
    default: generateDefaultConfig('', true),
    detail: generateDetailConfig('borderless', true),
  },
  datePickerRange: {
    default: generateDefaultConfig('', true),
    detail: generateDetailConfig('borderless', true),
  },
  SDatePicker: {
    default: generateDefaultConfig(selectPlaceholder, true),
    detail: generateDetailConfig('borderless', true),
  },
  SDatePickerRange: {
    default: generateDefaultConfig(selectPlaceholder, true),
    detail: generateDetailConfig('borderless', true),
  },
  treeSelect: {
    default: generateDefaultConfig(selectPlaceholder, true),
    detail: generateDetailConfig('borderless', true),
  },
  timePicker: {
    default: generateDefaultConfig('', true),
    detail: generateDetailConfig('borderless', true),
  },
  timePickerRange: {
    default: generateDefaultConfig('', true),
    detail: generateDetailConfig('borderless', true),
  },
  cascader: {
    default: generateDefaultConfig(selectPlaceholder, true),
    detail: generateDetailConfig('borderless', true),
  },
  SCascader: {
    default: generateDefaultConfig(selectPlaceholder, true),
    detail: generateDetailConfig('borderless', true),
  },
  radioGroup: undefined,
  slider: undefined,
  radio: undefined,
  switch: undefined,
  upload: undefined,
  SUpload: undefined,
  SUploadDragger: undefined,
  SUploadPicture: undefined,
  checkbox: undefined,
  checkGroup: undefined,
  table: undefined,
  dependency: undefined,
  placeholder: undefined,
};

export function getDefaultConfig(
  type: FormItemType = 'input',
  readonly?: boolean,
) {
  if (!type) return {};

  if (!DEFAULT_CONFIG_MAP?.[type]) return {};

  if (!readonly) return DEFAULT_CONFIG_MAP?.[type]?.default ?? {};

  return DEFAULT_CONFIG_MAP[type]?.detail ?? {};
}

/**
 * 根据规则键获取规则数据
 * @param regKey 规则键
 * @returns 规则数据数组或null
 */
export const getRegData = (regKey: RegKeyType): Rule[] | null => {
  const curReg = REG_KEY_MAP?.[regKey];

  if (!curReg) return null;

  return [
    { pattern: curReg.pattern, message: `请输入正确的${curReg.message}` },
  ];
};

/**
 * 生成必填规则
 * @param required 可选参数，表示必填字段
 * @returns 返回必填规则数组或null
 */
export const genRequiredRule = (
  required?: string | boolean | undefined,
): Rule[] | null => {
  if (!required) return null;

  if (isBoolean(required)) return [{ required: true }];

  return [{ required: true, message: required }];
};
