---
toc: content
group:
  title: 基础组件
  order: 2
---

# SForm 表单组件

## 搜索组件

### SForm

<code src="./demos/form.tsx"></code>

### 占位类型

<code src="./demos/placeholder.tsx"></code>

### 嵌套的数据结构

<code src="./demos/form-name.tsx"></code>

<code src="./demos/form-group-name.tsx"></code>

### 表单项依赖

<code src="./demos/dependency.tsx"></code>

### 预置正则校验

<code src="./demos/reg.tsx"></code>

### 表单项隐藏模式

<code src="./demos/form-hidden.tsx"></code>

### 只读模式

<code src="./demos/form-readonly.tsx"></code>

<code src="./demos/formItem.tsx"></code>

### SForm.Group

<code src="./demos/group.tsx"></code>

<code src="./demos/customGroupContainer.tsx"></code>

### SForm.Search

<code src="./demos/search.tsx"></code>

## SForm

| 属性名     | 描述                                   | 类型                                                               | 默认值    |
| ---------- | -------------------------------------- | ------------------------------------------------------------------ | --------- |
| rowProps   | 栅格 Row 属性                          | [rowProps](https://ant-design.antgroup.com/components/grid-cn#row) |           |
| items      | 表单配置项                             | [items](/components/S-form#S.Item-表单项配置)                      |           |
| columns    | 表单列数                               | number                                                             | 1         |
| required   | 是否为必填，可以传入 string 为提示文案 | boolean、string                                                    |           |
| actionNode | 自定义操作列                           | ReactNode                                                          | undefined |
| onFinish   | 查询功能                               | (values:any) => void                                               | undefined |
| onReset    | 重置触发                               | ()=> void                                                          | undefined |
| readonly   | 是否为只读模式                         | boolean                                                            | false     |
| formName   | 传入后表单的数据为嵌套的数据格式       | string                                                             |           |

[其他属性请参考 form](https://ant-design.antgroup.com/components/form-cn#api)

## SForm.Group

| 属性名     | 描述                             | 类型                                                  | 默认值    |
| ---------- | -------------------------------- | ----------------------------------------------------- | --------- |
| groupItems | 表单配置项                       | [GroupItemsType[]](/components/S-form#groupitemstype) |           |
| onFinish   | 查询功能                         | (values:any) => void                                  | undefined |
| onReset    | 重置触发                         | ()=> void                                             | undefined |
| readonly   | 是否为只读模式                   | boolean                                               | false     |
| formName   | 传入后表单的数据为嵌套的数据格式 | string                                                |           |
| container  | 外部容器                         | ReactNode                                             | SCard     |

## SForm.Search

| 属性名        | 描述                      | 类型                     | 默认值 |
| ------------- | ------------------------- | ------------------------ | ------ |
| showExpand    | 开启展开收起功能          | boolean                  | true   |
| defaultExpand | 默认收起                  | boolean                  | true   |
| onExpand      | 展开收起时触发的事件      | (expand:boolean) => void | true   |
| hasCardBg     | 是否展示白色卡片背景      | boolean                  | false  |
| columns       | 表单列数,不传时会动态计算 | number                   |        |

## GroupItemsType

| 属性名    | 描述                             | 类型                                                               | 默认值 |
| --------- | -------------------------------- | ------------------------------------------------------------------ | ------ |
| container | 外部容器                         | ReactNode                                                          | SCard  |
| columns   | 表单列数                         | number                                                             | 1      |
| title     | 标题                             | ReactNode                                                          |        |
| rowProps  | 栅格 Row 属性                    | [rowProps](https://ant-design.antgroup.com/components/grid-cn#row) |        |
| items     | 表单配置项                       | [items](/components/form#items-表单项配置)                         |        |
| formName  | 传入后表单的数据为嵌套的数据格式 | string                                                             |        |

更多 SForm.Item 的配置请参考 [formItem](https://ant-design.antgroup.com/components/form-cn#formitem)

## SForm.Item 表单项配置

| 属性名     | 描述                                       | 类型                                                                    | 默认值 |
| ---------- | ------------------------------------------ | ----------------------------------------------------------------------- | ------ |
| type       | 组件类型                                   | [form type 类型](/components/form#type-类型及其相关配置)                | input  |
| label      | label 标签的文本                           | ReactNode                                                               |        |
| name       | 字段名，支持数组                           | [namepath](https://ant-design.antgroup.com/components/form-cn#namepath) |        |
| colProps   | Col 组件相关配置项                         | [colProps](https://ant-design.antgroup.com/components/grid-cn#col)      |        |
| depNames   | 依赖的字段,只在 type 为 dependency 时生效  | string[]                                                                |        |
| fieldProps | 组件的配置项 例如 Input,Select 等组件      | any                                                                     |        |
| customCom  | 组件复杂时，可自定义组件                   | ReactNode                                                               |        |
| regKey     | 内置了校验规则                             |                                                                         |        |
| hidden     | 是否隐藏                                   | boolean                                                                 | false  |
| render     | 自定义渲染，只有 type 为 dependency 时生效 | ReactNode                                                               |        |
| readonly   | 是否为只读模式                             | boolean                                                                 | false  |
| formName   | 传入后表单的数据为嵌套的数据格式           | string                                                                  |        |

## type 类型及其相关配置

| 组件类型名称     | 组件类型相关配置                                                                         |
| ---------------- | ---------------------------------------------------------------------------------------- |
| input            | [input](https://ant-design.antgroup.com/components/input-cn#input)                       |
| inputNumber      | [inputNumber](https://ant-design.antgroup.com/components/input-number-cn#api)            |
| select           | [Select](/components/select#api)                                                         |
| textarea         | [textarea](https://ant-design.antgroup.com/components/input-cn#inputtextarea)            |
| slider           | [SSelect](https://ant-design.antgroup.com/components/slider-cn#api)                      |
| radio            | [radio](https://ant-design.antgroup.com/components/radio-cn#api)                         |
| radioGroup       | [radioGroup](/components/radio-group#api)                                                |
| switch           | [SSelect](https://ant-design.antgroup.com/components/switch-cn#api)                      |
| treeSelect       | [treeSelect](https://ant-design.antgroup.com/components/tree-select-cn#api)              |
| upload           | [antd upload](/components/select#api)                                                    |
| SUpload          | [SUpload](/components/upload#api)                                                        |
| SUploadDragger   | [SUploadDragger](/components/upload#api)                                                 |
| SUploadPicture   | [SUploadDragger](/components/upload#api)                                                 |
| datePicker       | [datePicker](https://ant-design.antgroup.com/components/date-picker-cn#datepicker)       |
| SDatePicker      | [datePicker](/components/date-picker#api)                                                |
| datePickerRange  | [datePickerRange](https://ant-design.antgroup.com/components/date-picker-cn#rangepicker) |
| SDatePickerRange | [datePicker](/components/date-picker-range#api)                                          |
| timePicker       | [timePicker](https://ant-design.antgroup.com/components/time-picker-cn#api)              |
| timePickerRange  | [timePickerRange](https://ant-design.antgroup.com/components/time-picker-cn#rangepicker) |
| checkbox         | [checkbox](https://ant-design.antgroup.com/components/checkbox-cn#api)                   |
| checkGroup       | [SCheckGroup](/components/check-group#api)                                               |
| cascader         | [cascader](https://ant-design.antgroup.com/components/cascader-cn#api)                   |
| SCascader        | [SCascader](/components/cascader#api)                                                    |
| table            | [table](https://ant-design.antgroup.com/components/table-cn#api)                         |
| dependency       | 字段关联，依赖其他字段，当依赖字段发生变化时，当前字段也会发生变化                       |
| placeholder      | 占位使用暂无实际意义                                                                     |
