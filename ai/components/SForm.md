# SForm — 配置化表单，items 数组声明 18 种控件、联动、分组、搜索

## 子组件与静态方法

- SForm.Search
- SForm.Group
- SForm.Item
- SForm.FormItem
- SForm.useForm
- SForm.useWatch
- SForm.useFormInstance
- SForm.ErrorList
- SForm.List

## 使用边界

**适用场景:**

- 需要配置化表单，通过 items 数组声明表单控件
- 表单字段 >= 3 个，需要统一布局和校验
- 需要分组（Group）、搜索（Search）等能力
  **不适用:**
- 登录、注册等极简表单（1-2 个字段 + 提交按钮），直接用 antd Form
- 纯展示场景，应使用 SDetail
- 需要完全自定义布局，items 配置无法表达的复杂交互
  **优先使用:**
- SSearchTable → 列表页搜索 + 表格一体化场景，不要单独组合 SForm.Search + STable
- SForm.Group → 表单需要分组展示时，不要手动拼多个 SForm

## 类型定义

**SFormProps** extends FormProps<Values> — SForm 表单组件 Props 继承 antd Form 全部属性，扩展了配置化表单能力。 通过 `items` 数组声明式定义表单，无需手动写 Form.Item。 `tsx <SForm columns={2} items={[ { label: '姓名', name: 'name', type: 'input', required: true }, { label: '部门', name: 'dept', type: 'select', fieldProps: { options } }, ]} onFinish={(values) => console.log(values)} /> `

- rowProps?: RowProps — 行布局配置
- children?: ReactNode
- items?: Array<SFormItems> — 表单项配置数组，核心属性
- columns?: number — 列数，表单项自动等分排列
- required?: string | boolean — 全局必填设置 - true: 所有项必填 - string: 所有项必填且使用该提示
- onFinish?: (values: Values) => void — 表单提交回调
- onReset?: (e?: any) => void — 表单重置回调
- readonly?: boolean — 只读模式
- formName?: string — 嵌套表单的字段前缀
- labelWidth?: number | string — 统一 label 宽度，解决 label 长短不一导致控件错位的问题 - number: px 值（如 100 → 100px） - string: 直接作为 CSS 值（如 '6em'、'120px'）

**SFormGroupProps** extends FormProps<Values> — SForm.Group 分组表单 Props 将表单分为多个带标题的分组区块展示。 `tsx <SForm.Group groupItems={[ { title: '基本信息', items: [...], columns: 2 }, { title: '详细信息', items: [...], columns: 3 }, ]} onFinish={handleSubmit} /> `

- groupItems?: GroupItemsType[] — 分组配置数组
- onFinish?: (values: Values) => void
- onReset?: (e?: any) => void
- container?: React.ComponentType<any> — 自定义容器组件
- formName?: string — 嵌套表单的字段前缀
- children?: ReactNode
- readonly?: boolean — 只读模式
- labelWidth?: number | string — 统一 label 宽度

**SearchProps** extends SFormProps<Values> — SForm.Search 搜索表单 Props 继承 SFormProps，增加了展开/收起、操作按钮等搜索场景功能。 通常与 STable/useSearchTable 配合使用。 `tsx <SForm.Search form={form} items={searchItems} columns={3} showExpand {...formConfig} /> `

- defaultExpand?: boolean — 是否默认展开所有搜索项
- showExpand?: boolean — 是否显示展开/收起按钮
- onExpand?: (expand: boolean) => void — 展开/收起回调
- maxRows?: number — 收起时最大显示行数
- actionNode?: ReactNode — 搜索栏右侧自定义操作节点
- container?: React.ComponentType<any> — 自定义组件容器
- isCard?: boolean — 是否包裹在卡片中
- gap?: number | [number, number] — 行列间距，number 统一间距，[rowGap, columnGap] 分别设置
- extraButtons?: SButtonsItem[] — 额外操作按钮，渲染在查询/重置旁
- actionStyleRender?: (props: { expanded: boolean; actionSpan: number; }) => React.CSSProperties — 自定义操作区域样式
- labelWidth?: number | string — 统一 label 宽度，解决 label 长短不一导致控件错位的问题

**FormFieldMapType** — 表单控件类型映射表 定义了 SForm items 中 `type` 字段所有规范可选值及其对应组件。 使用时，`fieldProps` 的类型会根据 `type` 自动推导。 `tsx const items: SFormItems[] = [ { label: '姓名', name: 'name', type: 'input' }, { label: '年龄', name: 'age', type: 'inputNumber' }, { label: '性别', name: 'gender', type: 'select', fieldProps: { options: [...] } }, { label: '日期', name: 'date', type: 'datePicker' }, ]; `

- input: typeof SInput — 文本输入框 (SInput 增强版，支持 trim/onEnter)
- inputNumber: typeof InputNumber — 数字输入框
- password: typeof Input.Password — 密码输入框
- textarea: typeof Input.TextArea — 多行文本输入
- select: typeof SSelect — 下拉选择器 (SSelect 增强版)
- slider: typeof Slider — 滑动输入条
- radio: typeof Radio — 单选按钮
- radioGroup: typeof SRadioGroup — 单选按钮组 (SRadioGroup)
- switch: typeof Switch — 开关
- treeSelect: typeof TreeSelect — 树选择
- datePicker: typeof SDatePicker — 增强日期选择器 (SDatePicker)，onChange 直接返回字符串
- datePickerRange: typeof SDatePickerRange — 增强日期范围选择器 (SDatePickerRange)，支持 rangeKeys 拆分
- timePicker: typeof TimePicker — 时间选择器
- timePickerRange: typeof TimePicker.RangePicker — 时间范围选择器
- checkbox: typeof Checkbox — 复选框
- checkGroup: typeof SCheckGroup — 复选框组 (SCheckGroup)
- cascader: typeof SCascader — 增强级联选择器 (SCascader)
- table: typeof Table — 嵌套表格

**FormComType** — 表单控件类型（规范组件，不含废弃别名）: `keyof FormFieldMapType`

**DeprecatedComType** — 已废弃的组件别名（仅用于运行时向后兼容，不参与 FormComType 联合， 避免扩大 fieldProps 的类型联合、触发 TS2590）: `| 'SDatePicker'`

**FormItemType** — 表单项 type 的完整取值：规范组件类型 + 废弃别名 + 占位符: `FormComType | DeprecatedComType | 'placeholder'`

**SFormItems** — SForm 表单项配置 判别式联合：`type` 决定渲染哪种控件，`fieldProps` 类型根据 `type` 自动推导。 `tsx const items: SFormItems[] = [ { label: '姓名', name: 'name', type: 'input', required: true }, { label: '部门', name: 'dept', type: 'select', fieldProps: { options } }, ]; `: `(FormComFieldItem | NonFieldItem) & CommonItemProps`

**ItemsProps** — ItemRender 内部使用的单项配置（fieldProps 宽松，避免在联合类型上解构）: `CommonItemProps & { type?: FormItemType; fieldProps?: Record<string, any>; }`

**GroupItemsType** — 分组表单项配置 用于 SForm.Group 的 groupItems，将表单分成多个带标题的区块。

- container?: React.ComponentType<any> — 自定义分组容器组件
- columns?: number — 该分组的列数
- title?: ReactNode — 分组标题
- items?: Array<SFormItems> — 该分组的表单项
- rowProps?: RowProps
- formName?: string — 嵌套表单的字段前缀

## 使用示例

```tsx
import type { SFormItems } from '@dalydb/sdesign';
import { SForm } from '@dalydb/sdesign';
import { message } from 'antd';
import React from 'react';

const items: SFormItems[] = [
  { label: '姓名', name: 'name', type: 'input', required: true },
  {
    label: '性别',
    name: 'gender',
    type: 'select',
    fieldProps: {
      options: [
        { value: 'male', label: '男' },
        { value: 'female', label: '女' },
      ],
    },
  },
  { label: '年龄', name: 'age', type: 'inputNumber' },
  { label: '日期', name: 'date', type: 'datePicker' },
  { label: '备注', name: 'remark', type: 'textarea' },
];

export default () => (
  <SForm
    columns={2}
    items={items}
    onFinish={(v) => message.success(JSON.stringify(v))}
  />
);
```
