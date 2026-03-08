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
import SInput from '../input';
import SRadioGroup from '../radio-group';
import SSelect from '../select';

import { RegKeyType } from '@dalydb/sdesign/types/reg';

/**
 * 表单控件类型映射表
 *
 * 定义了 SForm items 中 `type` 字段所有可选值及其对应组件。
 * 使用时，`fieldProps` 的类型会根据 `type` 自动推导。
 *
 * @example
 * ```tsx
 * const items: SFormItems[] = [
 *   { label: '姓名', name: 'name', type: 'input' },
 *   { label: '年龄', name: 'age', type: 'inputNumber' },
 *   { label: '性别', name: 'gender', type: 'select', fieldProps: { options: [...] } },
 *   { label: '日期', name: 'date', type: 'SDatePicker' },
 * ];
 * ```
 */
export type FormFieldMapType = {
  /** 文本输入框 (SInput 增强版，支持 trim/onEnter) */
  input: typeof SInput;
  /** 数字输入框 */
  inputNumber: typeof InputNumber;
  /** 密码输入框 */
  password: typeof Input.Password;
  /** 多行文本输入 */
  textarea: typeof Input.TextArea;
  /** 下拉选择器 (SSelect 增强版) */
  select: typeof SSelect;
  /** 滑动输入条 */
  slider: typeof Slider;
  /** 单选按钮 */
  radio: typeof Radio;
  /** 单选按钮组 (SRadioGroup) */
  radioGroup: typeof SRadioGroup;
  /** 开关 */
  switch: typeof Switch;
  /** 树选择 */
  treeSelect: typeof TreeSelect;
  /** 文件上传 */
  upload: typeof Upload;
  /** antd 日期选择器 */
  datePicker: typeof DatePicker;
  /** 增强日期选择器，onChange 直接返回字符串 */
  SDatePicker: typeof SDatePicker;
  /** antd 日期范围选择器 */
  datePickerRange: typeof DatePicker.RangePicker;
  /** 增强日期范围选择器，支持 rangeKeys 拆分 */
  SDatePickerRange: typeof SDatePickerRange;
  /** 时间选择器 */
  timePicker: typeof TimePicker;
  /** 时间范围选择器 */
  timePickerRange: typeof TimePicker.RangePicker;
  /** 复选框 */
  checkbox: typeof Checkbox;
  /** 复选框组 (SCheckGroup) */
  checkGroup: typeof SCheckGroup;
  /** antd 级联选择器 */
  cascader: typeof Cascader;
  /** 增强级联选择器 */
  SCascader: typeof SCascader;
  /** 嵌套表格 */
  table: typeof Table;
  /** 字段依赖联动 */
  dependency: typeof SDependency;
};

/**
 * 表单控件类型
 *
 * 可选值: `'input'` | `'inputNumber'` | `'password'` | `'textarea'` | `'select'` | `'slider'` |
 * `'radio'` | `'radioGroup'` | `'switch'` | `'treeSelect'` | `'upload'` | `'datePicker'` |
 * `'SDatePicker'` | `'datePickerRange'` | `'SDatePickerRange'` | `'timePicker'` |
 * `'timePickerRange'` | `'checkbox'` | `'checkGroup'` | `'cascader'` | `'SCascader'` |
 * `'table'` | `'dependency'`
 */
export type FormComType = keyof FormFieldMapType;

export type FormComPropsType = HTMLAttributes<object> &
  ComponentProps<FormFieldMapType[FormComType]>;

export type FormItemType = FormComType | 'placeholder';

/**
 * 表单项配置
 *
 * 用于 SForm 的 `items` 数组中，每一项描述一个表单控件。
 * `type` 决定渲染哪种控件，`fieldProps` 类型会根据 `type` 自动推导。
 *
 * @example
 * ```tsx
 * const item: ItemsProps = {
 *   label: '用户名',
 *   name: 'username',
 *   type: 'input',
 *   required: '请输入用户名',
 *   fieldProps: { placeholder: '请输入' },
 * };
 * ```
 */
export interface ItemsProps<T extends FormItemType = FormItemType>
  extends Omit<FormItemProps, 'label | name' | 'required'> {
  /** 表单项标签 */
  label?: ReactNode;
  /** 表单项字段名，支持嵌套路径如 ['user', 'name'] */
  name?: NamePath;
  style?: React.CSSProperties;
  /**
   * 控件类型，决定渲染哪种表单组件
   * @default 'input'
   */
  type?: T;
  /** 依赖的字段名数组，仅在 type='dependency' 时生效 */
  depNames?: string[];
  /**
   * 控件属性，类型根据 type 自动推导
   *
   * 例如 type='select' 时，fieldProps 支持 options/mode 等 Select 属性
   */
  fieldProps?: T extends keyof FormFieldMapType
    ? HTMLAttributes<object> & ComponentProps<FormFieldMapType[T]>
    : undefined;
  /** 自定义组件，替代 type 内置组件 */
  customCom?: ReactNode | RenderChildren<any>;
  /** 内置校验规则 key，如 'phone'、'percentage' 等 */
  regKey?: RegKeyType;
  /** 自定义渲染函数 */
  render?: RenderChildren<any>;
  /**
   * 是否必填
   * - true: 使用默认提示
   * - string: 使用自定义提示文字
   */
  required?: string | boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 只读模式，展示文本而非控件 */
  readonly?: boolean;
  /** 嵌套表单的字段前缀，用于数据结构嵌套 */
  formName?: string;
  children?: ReactNode;
}

/**
 * SForm 表单项配置（带布局）
 *
 * 在 ItemsProps 基础上增加了栅格布局和显隐控制。
 */
export interface SFormItems<T extends FormItemType = FormItemType>
  extends ItemsProps<T> {
  /** 栅格布局配置，控制单个表单项占据的列宽 */
  colProps?: ColProps;
  /** 是否隐藏该表单项（隐藏后仍参与表单提交） */
  hidden?: boolean;
}

/**
 * SForm 表单组件 Props
 *
 * 继承 antd Form 全部属性，扩展了配置化表单能力。
 * 通过 `items` 数组声明式定义表单，无需手动写 Form.Item。
 *
 * @example
 * ```tsx
 * <SForm
 *   columns={2}
 *   items={[
 *     { label: '姓名', name: 'name', type: 'input', required: true },
 *     { label: '部门', name: 'dept', type: 'select', fieldProps: { options } },
 *   ]}
 *   onFinish={(values) => console.log(values)}
 * />
 * ```
 */
export interface SFormProps extends FormProps {
  /** 行布局配置 */
  rowProps?: RowProps;
  children?: ReactNode;
  /** 表单项配置数组，核心属性 */
  items?: Array<SFormItems<FormItemType>>;
  /**
   * 列数，表单项自动等分排列
   * @default 1
   */
  columns?: number;
  /**
   * 全局必填设置
   * - true: 所有项必填
   * - string: 所有项必填且使用该提示
   */
  required?: string | boolean;
  /** 表单提交回调 */
  onFinish?: (e?: any) => void;
  /** 表单重置回调 */
  onReset?: (e?: any) => void;
  /** 只读模式 */
  readonly?: boolean;
  /** 嵌套表单的字段前缀 */
  formName?: string;
}

/**
 * 分组表单项配置
 *
 * 用于 SForm.Group 的 groupItems，将表单分成多个带标题的区块。
 */
export type GroupItemsType = {
  /** 自定义分组容器组件 */
  container?: React.ComponentType<any>;
  /** 该分组的列数 */
  columns?: number;
  /** 分组标题 */
  title?: ReactNode;
  /** 该分组的表单项 */
  items?: Array<SFormItems<FormItemType>>;
  rowProps?: RowProps;
  /** 嵌套表单的字段前缀 */
  formName?: string;
};

/**
 * SForm.Group 分组表单 Props
 *
 * 将表单分为多个带标题的分组区块展示。
 *
 * @example
 * ```tsx
 * <SForm.Group
 *   groupItems={[
 *     { title: '基本信息', items: [...], columns: 2 },
 *     { title: '详细信息', items: [...], columns: 3 },
 *   ]}
 *   onFinish={handleSubmit}
 * />
 * ```
 */
export interface SFormGroupProps extends FormProps {
  /** 分组配置数组 */
  groupItems?: GroupItemsType[];
  onFinish?: (e: any) => void;
  onReset?: (e: any) => void;
  /** 自定义容器组件 */
  container?: React.ComponentType<any>;
  /** 嵌套表单的字段前缀 */
  formName?: string;
  children?: ReactNode;
  /** 只读模式 */
  readonly?: boolean;
}

/**
 * SForm.Search 搜索表单 Props
 *
 * 继承 SFormProps，增加了展开/收起、操作按钮等搜索场景功能。
 * 通常与 STable/useSearchTable 配合使用。
 *
 * @example
 * ```tsx
 * <SForm.Search
 *   form={form}
 *   items={searchItems}
 *   columns={3}
 *   showExpand
 *   {...formConfig}
 * />
 * ```
 */
export interface SearchProps extends SFormProps {
  /**
   * 是否默认展开所有搜索项
   * @default false
   */
  defaultExpand?: boolean;
  /** 是否显示展开/收起按钮 */
  showExpand?: boolean;
  /** 展开/收起回调 */
  onExpand?: (expand: boolean) => void;
  /** 收起时显示的行数 */
  expandLine?: number;
  /** 搜索栏右侧自定义操作节点 */
  actionNode?: ReactNode;
  /** 自定义组件容器 */
  container?: React.ComponentType<any>;
  /** 是否包裹在卡片中 */
  isCard?: boolean;
}
