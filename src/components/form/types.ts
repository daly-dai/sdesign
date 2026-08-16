import {
  Checkbox,
  ColProps,
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
} from 'antd';
import { NamePath } from 'antd/es/form/interface';
import React, { ComponentProps, ReactNode } from 'react';

import SCascader from '../cascader';
import SCheckGroup from '../check-group';
import SDatePicker from '../date-picker';
import SDatePickerRange from '../date-picker-range';
import SInput from '../input';
import SRadioGroup from '../radio-group';
import SSelect from '../select';

import { RegKeyType } from '@dalydb/sdesign/types/reg';
import { SButtonsItem } from '../button/types';

/**
 * 自定义渲染函数：接收当前表单值与表单实例
 */
export type RenderChildren<Values = Record<string, unknown>> = (
  values: Values,
  form: import('antd').FormInstance<Values>,
) => React.ReactNode;

/**
 * 表单控件类型映射表
 *
 * 定义了 SForm items 中 `type` 字段所有规范可选值及其对应组件。
 * 使用时，`fieldProps` 的类型会根据 `type` 自动推导。
 *
 * @example
 * ```tsx
 * const items: SFormItems[] = [
 *   { label: '姓名', name: 'name', type: 'input' },
 *   { label: '年龄', name: 'age', type: 'inputNumber' },
 *   { label: '性别', name: 'gender', type: 'select', fieldProps: { options: [...] } },
 *   { label: '日期', name: 'date', type: 'datePicker' },
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
  /** 增强日期选择器 (SDatePicker)，onChange 直接返回字符串 */
  datePicker: typeof SDatePicker;
  /** 增强日期范围选择器 (SDatePickerRange)，支持 rangeKeys 拆分 */
  datePickerRange: typeof SDatePickerRange;
  /** 时间选择器 */
  timePicker: typeof TimePicker;
  /** 时间范围选择器 */
  timePickerRange: typeof TimePicker.RangePicker;
  /** 复选框 */
  checkbox: typeof Checkbox;
  /** 复选框组 (SCheckGroup) */
  checkGroup: typeof SCheckGroup;
  /** 增强级联选择器 (SCascader) */
  cascader: typeof SCascader;
  /** 嵌套表格 */
  table: typeof Table;
};

/**
 * 表单控件类型（规范组件，不含废弃别名）
 */
export type FormComType = keyof FormFieldMapType;

/**
 * 已废弃的组件别名（仅用于运行时向后兼容，不参与 FormComType 联合，
 * 避免扩大 fieldProps 的类型联合、触发 TS2590）
 */
export type DeprecatedComType =
  | 'SDatePicker'
  | 'SDatePickerRange'
  | 'SCascader';

/**
 * 表单项 type 的完整取值：规范组件类型 + 废弃别名 + 占位符
 */
export type FormItemType = FormComType | DeprecatedComType | 'placeholder';

/**
 * 所有表单项共享的公共字段（type 与 fieldProps 除外）
 */
type CommonItemProps = Omit<
  FormItemProps,
  'label' | 'name' | 'required' | 'children'
> & {
  /** 表单项标签 */
  label?: ReactNode;
  /** 表单项字段名，支持嵌套路径如 ['user', 'name'] */
  name?: NamePath;
  style?: React.CSSProperties;
  /** 内置校验规则 key，如 'phone'、'percentage' 等 */
  regKey?: RegKeyType;
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
  /** 自定义组件，替代 type 内置组件 */
  customCom?: ReactNode | RenderChildren<Record<string, unknown>>;
  /** 栅格布局配置，控制单个表单项占据的列宽 */
  colProps?: ColProps;
  /** 是否隐藏该表单项（隐藏后仍参与表单提交） */
  hidden?: boolean;
  /** CSS Grid 列跨度（1~columns），仅 SForm.Search 组件生效 */
  gridColumn?: number;
};

/**
 * 规范组件的 type 与 fieldProps 强关联（判别式）
 */
type FieldItemByType<K extends FormComType> = {
  type: K;
  fieldProps?: ComponentProps<FormFieldMapType[K]>;
};

type FormComFieldItem = {
  [K in FormComType]: FieldItemByType<K>;
}[FormComType];

/**
 * 无强类型 fieldProps 的 type：placeholder / 废弃别名 / type 缺省（默认 input）
 */
type NonFieldItem = {
  type?: 'placeholder' | DeprecatedComType;
};

/**
 * SForm 表单项配置
 *
 * 判别式联合：`type` 决定渲染哪种控件，`fieldProps` 类型根据 `type` 自动推导。
 *
 * @example
 * ```tsx
 * const items: SFormItems[] = [
 *   { label: '姓名', name: 'name', type: 'input', required: true },
 *   { label: '部门', name: 'dept', type: 'select', fieldProps: { options } },
 * ];
 * ```
 */
export type SFormItems = (FormComFieldItem | NonFieldItem) & CommonItemProps;

/**
 * ItemRender 内部使用的单项配置（fieldProps 宽松，避免在联合类型上解构）
 */
export type ItemsProps = CommonItemProps & {
  type?: FormItemType;
  fieldProps?: Record<string, any>;
};

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
export interface SFormProps<Values = any> extends FormProps<Values> {
  /** 行布局配置 */
  rowProps?: RowProps;
  children?: ReactNode;
  /** 表单项配置数组，核心属性 */
  items?: Array<SFormItems>;
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
  onFinish?: (values: Values) => void;
  /** 表单重置回调 */
  onReset?: (e?: any) => void;
  /** 只读模式 */
  readonly?: boolean;
  /** 嵌套表单的字段前缀 */
  formName?: string;
  /**
   * 统一 label 宽度，解决 label 长短不一导致控件错位的问题
   * - number: px 值（如 100 → 100px）
   * - string: 直接作为 CSS 值（如 '6em'、'120px'）
   * @example labelWidth={100}
   */
  labelWidth?: number | string;
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
  items?: Array<SFormItems>;
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
export interface SFormGroupProps<Values = any> extends FormProps<Values> {
  /** 分组配置数组 */
  groupItems?: GroupItemsType[];
  onFinish?: (values: Values) => void;
  onReset?: (e?: any) => void;
  /** 自定义容器组件 */
  container?: React.ComponentType<any>;
  /** 嵌套表单的字段前缀 */
  formName?: string;
  children?: ReactNode;
  /** 只读模式 */
  readonly?: boolean;
  /**
   * 统一 label 宽度
   * @example labelWidth={100}
   */
  labelWidth?: number | string;
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
export interface SearchProps<Values = any> extends SFormProps<Values> {
  /**
   * 是否默认展开所有搜索项
   * @default false
   */
  defaultExpand?: boolean;
  /** 是否显示展开/收起按钮 */
  showExpand?: boolean;
  /** 展开/收起回调 */
  onExpand?: (expand: boolean) => void;
  /**
   * 收起时最大显示行数
   * @default 1
   */
  maxRows?: number;
  /** 搜索栏右侧自定义操作节点 */
  actionNode?: ReactNode;
  /** 自定义组件容器 */
  container?: React.ComponentType<any>;
  /** 是否包裹在卡片中 */
  isCard?: boolean;
  /**
   * 行列间距，number 统一间距，[rowGap, columnGap] 分别设置
   * @default [16, 24]
   */
  gap?: number | [number, number];
  /** 额外操作按钮，渲染在查询/重置旁 */
  extraButtons?: SButtonsItem[];
  /** 自定义操作区域样式 */
  actionStyleRender?: (props: {
    expanded: boolean;
    actionSpan: number;
  }) => React.CSSProperties;
  /**
   * 统一 label 宽度，解决 label 长短不一导致控件错位的问题
   * @example labelWidth={80}
   */
  labelWidth?: number | string;
}
