import {
  Cascader,
  Checkbox,
  ColProps,
  DatePicker,
  FormItemProps,
  FormProps,
  Input,
  InputNumber,
  Radio,
  RowProps,
  Slider,
  Switch,
  Table,
  TimePicker,
  TreeSelect,
  Upload,
} from 'antd';
import { NamePath } from 'antd/es/form/interface';
import React, { ComponentProps, HTMLAttributes, ReactNode } from 'react';

import SCascader from '../cascader';
import SCheckGroup from '../check-group';
import SDatePicker from '../date-picker';
import SDatePickerRange from '../date-picker-range';
import SDependency from '../dependency';
import { RenderChildren } from '../dependency/types';
import SRadioGroup from '../radio-group';
import SSelect from '../select';
import SUpload from '../upload';
import InternalUpload from '../upload/instance';

import { RegKeyType } from '@dalydb/sdesign/types/reg';

export type FormFieldMapType = {
  input: typeof Input;
  inputNumber: typeof InputNumber;
  password: typeof Input.Password;
  textarea: typeof Input.TextArea;
  select: typeof SSelect;
  slider: typeof Slider;
  radio: typeof Radio;
  radioGroup: typeof SRadioGroup;
  switch: typeof Switch;
  treeSelect: typeof TreeSelect;
  upload: typeof Upload;
  SUpload: typeof InternalUpload;
  SUploadDragger: typeof SUpload.Dragger;
  SUploadPicture: typeof SUpload.Picture;
  datePicker: typeof DatePicker;
  SDatePicker: typeof SDatePicker;
  datePickerRange: typeof DatePicker.RangePicker;
  SDatePickerRange: typeof SDatePickerRange;
  timePicker: typeof TimePicker;
  timePickerRange: typeof TimePicker.RangePicker;
  checkbox: typeof Checkbox;
  checkGroup: typeof SCheckGroup;
  cascader: typeof Cascader;
  SCascader: typeof SCascader;
  table: typeof Table;
  dependency: typeof SDependency;
};

export type FormComType = keyof FormFieldMapType;

export type FormComPropsType = HTMLAttributes<object> &
  ComponentProps<FormFieldMapType[FormComType]>;

export type FormItemType = FormComType | 'placeholder';
export interface ItemsProps
  extends Omit<FormItemProps, 'label | name' | 'required'> {
  label?: ReactNode;
  name?: NamePath;
  style?: React.CSSProperties;
  // 组件的类型
  type?: FormItemType;
  // 依赖的字段，只在type为dependency时生效
  depNames?: string[];
  // 组件的配置项
  fieldProps?: FormComPropsType;
  // 自定义组件
  customCom?: ReactNode | RenderChildren<any>;
  // 校验规则
  regKey?: RegKeyType;
  // 自定义渲染
  render?: RenderChildren<any>;
  // 是否为必填
  required?: string | boolean;
  // 只读模式
  readonly?: boolean;
  // 嵌套的数据结构
  formName?: string;
  children?: ReactNode;
}

export interface SFormItems extends ItemsProps {
  colProps?: ColProps;
  hidden?: boolean;
}

export interface SFormProps extends FormProps {
  rowProps?: RowProps;
  children?: ReactNode;
  items?: SFormItems[];
  columns?: number;
  // 是否为必填,提示文字
  required?: string | boolean;
  onFinish?: (e: any) => void;
  onReset?: (e: any) => void;
  // 只读模式
  readonly?: boolean;
  // 嵌套的数据结构
  formName?: string;
}

export type GroupItemsType = {
  container?: React.ComponentType<any>;
  columns?: number;
  title?: ReactNode;
  items?: SFormItems[];
  rowProps?: RowProps;
  // 嵌套的数据结构
  formName?: string;
};

// 分组表单
export interface SFormGroupProps extends FormProps {
  groupItems?: GroupItemsType[];
  onFinish?: (e: any) => void;
  onReset?: (e: any) => void;
  container?: React.ComponentType<any>;
  // 嵌套的数据结构
  formName?: string;
  children?: ReactNode;
  /** @description  只读模式 */
  readonly?: boolean;
}

export interface SearchProps extends SFormProps {
  // 默认是否展开
  defaultExpand?: boolean;
  showExpand?: boolean;
  // 展开收起的回调函数
  onExpand?: (expand: boolean) => void;
  // 展开的行数
  expandLine?: number;
  actionNode?: ReactNode;
  /** @description 自定义组件容器 */
  container?: React.ComponentType<any>;
  isCard?: boolean;
}
