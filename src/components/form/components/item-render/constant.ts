import { Variant } from 'antd/es/config-provider';
import { Rule } from 'antd/es/form';
import isBoolean from 'lodash/isBoolean';

import { FormItemType } from '@dalydb/sdesign';
import { RegKeyType } from '@dalydb/sdesign/types/reg';
import { REG_KEY_MAP } from '@dalydb/sdesign/utils';

const InputPlaceholder = '请输入';
const SelectPlaceholder = '请选择';

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

// 只读态的通用配置
const readonlyDetail: Config['detail'] = {
  variant: 'borderless',
  disabled: true,
};

// 输入类默认配置
const inputConfig: Config = {
  default: { placeholder: InputPlaceholder, allowClear: true },
  detail: readonlyDetail,
};

// 选择类默认配置
const selectConfig: Config = {
  default: { placeholder: SelectPlaceholder, allowClear: true },
  detail: readonlyDetail,
};

// 时间类默认配置（无 placeholder）
const timeConfig: Config = {
  default: { allowClear: true },
  detail: readonlyDetail,
};

export const DEFAULT_CONFIG_MAP: Record<
  Partial<FormItemType>,
  Config | undefined
> = {
  input: inputConfig,
  inputNumber: inputConfig,
  password: inputConfig,
  textarea: inputConfig,
  select: selectConfig,
  datePicker: selectConfig,
  datePickerRange: selectConfig,
  SDatePicker: selectConfig,
  SDatePickerRange: selectConfig,
  treeSelect: selectConfig,
  cascader: selectConfig,
  SCascader: selectConfig,
  timePicker: timeConfig,
  timePickerRange: timeConfig,
  radioGroup: undefined,
  slider: undefined,
  radio: undefined,
  switch: undefined,
  checkbox: undefined,
  checkGroup: undefined,
  table: undefined,
  placeholder: undefined,
};

export function getDefaultConfig(
  type: FormItemType = 'input',
  readonly?: boolean,
) {
  if (!type || !DEFAULT_CONFIG_MAP?.[type]) return {};

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
