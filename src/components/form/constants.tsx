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
  Upload,
} from 'antd';

import 'dayjs';
import SCascader from '../cascader';
import SCheckGroup from '../check-group';
import SDatePicker from '../date-picker';
import SDatePickerRange from '../date-picker-range';
import SInput from '../input';
import SRadioGroup from '../radio-group';
import SSelect from '../select';

import { FormFieldMapType } from './types';

// 完整的组件映射（保持向后兼容）
export const FORM_ITEM_COM_MAP: FormFieldMapType = {
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
  upload: Upload,
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

// Bundle 优化配置 - 标记重型组件
export const HEAVY_COMPONENTS = [
  'cascader',
  'table',
  'upload',
  'treeSelect',
  'SCascader',
] as const;

// 轻量级组件
export const LIGHT_COMPONENTS = Object.keys(FORM_ITEM_COM_MAP).filter(
  (key) => !HEAVY_COMPONENTS.includes(key as any),
);

// 优化组件查找性能
export const FORM_ITEM_COM_MAP_BY_KEY: Map<string, any> = new Map(
  Object.entries(FORM_ITEM_COM_MAP),
);
