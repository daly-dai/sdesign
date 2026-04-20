# SForm — 配置化表单，items 数组声明 22 种控件、联动、分组、搜索

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
- 需要表单联动（dependency）、分组（Group）、搜索（Search）等能力
  **不适用:**
- 登录、注册等极简表单（1-2 个字段 + 提交按钮），直接用 antd Form
- 纯展示场景，应使用 SDetail
- 需要完全自定义布局，items 配置无法表达的复杂交互
  **优先使用:**
- SSearchTable → 列表页搜索 + 表格一体化场景，不要单独组合 SForm.Search + STable
- SForm.Group → 表单需要分组展示时，不要手动拼多个 SForm

## 类型定义

**SFormProps** extends FormProps — SForm 表单组件 Props 继承 antd Form 全部属性，扩展了配置化表单能力。 通过 `items` 数组声明式定义表单，无需手动写 Form.Item。 `tsx <SForm columns={2} items={[ { label: '姓名', name: 'name', type: 'input', required: true }, { label: '部门', name: 'dept', type: 'select', fieldProps: { options } }, ]} onFinish={(values) => console.log(values)} /> `

- rowProps?: RowProps — 行布局配置
- children?: ReactNode
- items?: Array<SFormItems<FormItemType>> — 表单项配置数组，核心属性
- columns?: number — 列数，表单项自动等分排列
- required?: string | boolean — 全局必填设置 - true: 所有项必填 - string: 所有项必填且使用该提示
- onFinish?: (e?: any) => void — 表单提交回调
- onReset?: (e?: any) => void — 表单重置回调
- readonly?: boolean — 只读模式
- formName?: string — 嵌套表单的字段前缀

**ItemsProps** extends Omit<FormItemProps, 'label | name' | 'required'> — 表单项配置 用于 SForm 的 `items` 数组中，每一项描述一个表单控件。 `type` 决定渲染哪种控件，`fieldProps` 类型会根据 `type` 自动推导。 `tsx const item: ItemsProps = { label: '用户名', name: 'username', type: 'input', required: '请输入用户名', fieldProps: { placeholder: '请输入' }, }; `

- label?: ReactNode — 表单项标签
- name?: NamePath — 表单项字段名，支持嵌套路径如 ['user', 'name']
- style?: React.CSSProperties
- type?: T — 控件类型，决定渲染哪种表单组件
- depNames?: string[] — 依赖的字段名数组，仅在 type='dependency' 时生效
- fieldProps?: T extends keyof FormFieldMapType — 控件属性，类型根据 type 自动推导 例如 type='select' 时，fieldProps 支持 options/mode 等 Select 属性
- customCom?: ReactNode | RenderChildren<any> — 自定义组件，替代 type 内置组件
- regKey?: RegKeyType — 内置校验规则 key，如 'phone'、'percentage' 等
- render?: RenderChildren<any> — 自定义渲染函数
- required?: string | boolean — 是否必填 - true: 使用默认提示 - string: 使用自定义提示文字
- disabled?: boolean — 是否禁用
- readonly?: boolean — 只读模式，展示文本而非控件
- formName?: string — 嵌套表单的字段前缀，用于数据结构嵌套
- children?: ReactNode

**SFormItems** extends ItemsProps<T> — SForm 表单项配置（带布局） 在 ItemsProps 基础上增加了栅格布局和显隐控制。

- colProps?: ColProps — 栅格布局配置，控制单个表单项占据的列宽
- hidden?: boolean — 是否隐藏该表单项（隐藏后仍参与表单提交）
- gridColumn?: number | string — CSS Grid 列跨度，仅 SForm.Search 组件生效

**SFormGroupProps** extends FormProps — SForm.Group 分组表单 Props 将表单分为多个带标题的分组区块展示。 `tsx <SForm.Group groupItems={[ { title: '基本信息', items: [...], columns: 2 }, { title: '详细信息', items: [...], columns: 3 }, ]} onFinish={handleSubmit} /> `

- groupItems?: GroupItemsType[] — 分组配置数组
- onFinish?: (e: any) => void
- onReset?: (e: any) => void
- container?: React.ComponentType<any> — 自定义容器组件
- formName?: string — 嵌套表单的字段前缀
- children?: ReactNode
- readonly?: boolean — 只读模式

**SearchProps** extends SFormProps — SForm.Search 搜索表单 Props 继承 SFormProps，增加了展开/收起、操作按钮等搜索场景功能。 通常与 STable/useSearchTable 配合使用。 `tsx <SForm.Search form={form} items={searchItems} columns={3} showExpand {...formConfig} /> `

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

**FormFieldMapType** — 表单控件类型映射表 定义了 SForm items 中 `type` 字段所有可选值及其对应组件。 使用时，`fieldProps` 的类型会根据 `type` 自动推导。 `tsx const items: SFormItems[] = [ { label: '姓名', name: 'name', type: 'input' }, { label: '年龄', name: 'age', type: 'inputNumber' }, { label: '性别', name: 'gender', type: 'select', fieldProps: { options: [...] } }, { label: '日期', name: 'date', type: 'SDatePicker' }, ]; `

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
- upload: typeof Upload — 文件上传
- datePicker: typeof DatePicker — antd 日期选择器
- SDatePicker: typeof SDatePicker — 增强日期选择器，onChange 直接返回字符串
- datePickerRange: typeof DatePicker.RangePicker — antd 日期范围选择器
- SDatePickerRange: typeof SDatePickerRange — 增强日期范围选择器，支持 rangeKeys 拆分
- timePicker: typeof TimePicker — 时间选择器
- timePickerRange: typeof TimePicker.RangePicker — 时间范围选择器
- checkbox: typeof Checkbox — 复选框
- checkGroup: typeof SCheckGroup — 复选框组 (SCheckGroup)
- cascader: typeof Cascader — antd 级联选择器
- SCascader: typeof SCascader — 增强级联选择器
- table: typeof Table — 嵌套表格
- dependency: typeof SDependency — 字段依赖联动

**FormComType** — 表单控件类型 可选值: `'input'` | `'inputNumber'` | `'password'` | `'textarea'` | `'select'` | `'slider'` | `'radio'` | `'radioGroup'` | `'switch'` | `'treeSelect'` | `'upload'` | `'datePicker'` | `'SDatePicker'` | `'datePickerRange'` | `'SDatePickerRange'` | `'timePicker'` | `'timePickerRange'` | `'checkbox'` | `'checkGroup'` | `'cascader'` | `'SCascader'` | `'table'` | `'dependency'`: `keyof FormFieldMapType`

**FormComPropsType**: `HTMLAttributes<object> &`

**FormItemType**: `FormComType | 'placeholder'`

**GroupItemsType** — 分组表单项配置 用于 SForm.Group 的 groupItems，将表单分成多个带标题的区块。

- container?: React.ComponentType<any> — 自定义分组容器组件
- columns?: number — 该分组的列数
- title?: ReactNode — 分组标题
- items?: Array<SFormItems<FormItemType>> — 该分组的表单项
- rowProps?: RowProps
- formName?: string — 嵌套表单的字段前缀
