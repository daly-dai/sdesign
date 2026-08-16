import {
  Checkbox,
  Input,
  InputNumber,
  Radio,
  Slider,
  Switch,
  Table,
  TimePicker,
  TreeSelect,
} from 'antd';

import SCascader from '../cascader';
import SCheckGroup from '../check-group';
import SDatePicker from '../date-picker';
import SDatePickerRange from '../date-picker-range';
import SInput from '../input';
import SRadioGroup from '../radio-group';
import SSelect from '../select';

import type { ComponentType } from 'react';

import { DeprecatedComType, FormFieldMapType } from './types';

// 完整的组件映射（保持向后兼容，含废弃别名）
export const FORM_ITEM_COM_MAP: FormFieldMapType &
  Record<DeprecatedComType, ComponentType<any>> = {
  input: SInput,
  inputNumber: InputNumber,
  select: SSelect,
  textarea: Input.TextArea,
  password: Input.Password,
  slider: Slider,
  radio: Radio,
  radioGroup: SRadioGroup,
  switch: Switch,
  treeSelect: TreeSelect,
  datePicker: SDatePicker,
  SDatePicker: SDatePicker,
  datePickerRange: SDatePickerRange,
  timePicker: TimePicker,
  timePickerRange: TimePicker.RangePicker,
  checkbox: Checkbox,
  checkGroup: SCheckGroup,
  cascader: SCascader,
  SCascader: SCascader,
  table: Table,
  SDatePickerRange: SDatePickerRange,
};
