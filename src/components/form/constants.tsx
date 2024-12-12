import {
  Cascader,
  Checkbox,
  DatePicker,
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
import SDependency from '../dependency';
import SInput from '../input';
import SRadioGroup from '../radio-group';
import SSelect from '../select';
import SUpload from '../upload';
import InternalUpload from '../upload/instance';

import { FormFieldMapType } from './types';

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
  datePicker: DatePicker,
  SDatePicker: SDatePicker,
  datePickerRange: DatePicker.RangePicker,
  timePicker: TimePicker,
  timePickerRange: TimePicker.RangePicker,
  checkbox: Checkbox,
  checkGroup: SCheckGroup,
  cascader: Cascader,
  SCascader: SCascader,
  table: Table,
  dependency: SDependency,
  SUpload: InternalUpload,
  SUploadDragger: SUpload.Dragger,
  SUploadPicture: SUpload.Picture,
  SDatePickerRange: SDatePickerRange,
};
