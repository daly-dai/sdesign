---
toc: content
group:
  title: 基础组件
  order: 2
---

# SForm 表单组件

## 基础使用

<code src="./demos/form.tsx"></code>

## layout vertical 布局

<code src="./demos/form-vertical.tsx"></code>

## layout inline 布局

<code src="./demos/form-inline.tsx"></code>

## 占位类型

<code src="./demos/placeholder.tsx"></code>

## 嵌套的数据结构

<code src="./demos/form-name.tsx"></code>

<code src="./demos/form-group-name.tsx"></code>

## 表单项依赖

<code src="./demos/dependency.tsx"></code>

## 预置正则校验

<code src="./demos/reg.tsx"></code>

## 表单项隐藏模式

<code src="./demos/form-hidden.tsx"></code>

## 只读模式

<code src="./demos/form-readonly.tsx"></code>

<code src="./demos/formItem.tsx"></code>

## SForm.Group

<code src="./demos/group.tsx"></code>

<code src="./demos/customGroupContainer.tsx"></code>

## SForm.Search

<code src="./demos/search.tsx"></code>

<code src="./demos/search-expand.tsx"></code>

<code src="./demos/search-extra-buttons.tsx"></code>

<code src="./demos/search-gap-gridcolumn.tsx"></code>

<code src="./demos/search-action-style.tsx"></code>

<code src="./demos/search-business.tsx"></code>

## 自定义组件

<code src="./demos/custom-component.tsx"></code>

## 表单校验

<code src="./demos/validation.tsx"></code>

## 动态表单

<code src="./demos/dynamic-form.tsx"></code>

## 表单联动 (useWatch)

<code src="./demos/use-watch.tsx"></code>

## 完整示例

<code src="./demos/full-example.tsx"></code>

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

## SForm 静态方法与组件

### Hook 方法

| 方法名                  | 描述           | 用法                                          |
| ----------------------- | -------------- | --------------------------------------------- |
| `SForm.useForm`         | 创建表单实例   | `const [form] = SForm.useForm()`              |
| `SForm.useWatch`        | 监听字段值变化 | `const value = SForm.useWatch('field', form)` |
| `SForm.useFormInstance` | 获取表单实例   | `const form = SForm.useFormInstance()`        |

### 静态组件

| 组件名            | 描述                      | 用法                                                             |
| ----------------- | ------------------------- | ---------------------------------------------------------------- |
| `SForm.FormItem`  | Ant Design 原生 Form.Item | `<SForm.FormItem label="字段" name="field">...</SForm.FormItem>` |
| `SForm.ErrorList` | 错误列表组件              | `<SForm.ErrorList errors={errors} />`                            |
| `SForm.List`      | 动态表单列表组件          | `<SForm.List name="users">...</SForm.List>`                      |

### 使用示例

#### 使用 Hook 方法

```tsx
import { SForm } from '@dalydb/sdesign';

export default () => {
  // 创建表单实例
  const [form] = SForm.useForm();

  // 监听字段值变化
  const username = SForm.useWatch('username', form);

  // 获取表单实例（在子组件中使用）
  // const form = SForm.useFormInstance();

  return (
    <SForm form={form} onFinish={(values) => console.log(values)}>
      <SForm.Item label="用户名" name="username" required>
        <input />
      </SForm.Item>
      <SForm.Item label="密码" name="password" required>
        <input type="password" />
      </SForm.Item>
    </SForm>
  );
};
```

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

| 属性名            | 描述                                         | 类型                                                                | 默认值   |
| ----------------- | -------------------------------------------- | ------------------------------------------------------------------- | -------- |
| columns           | 表单列数                                     | number                                                              | 4        |
| showExpand        | 开启展开收起功能                             | boolean                                                             | true     |
| defaultExpand     | 是否默认展开                                 | boolean                                                             | false    |
| maxRows           | 收起时最大显示行数                           | number                                                              | 1        |
| gap               | 行列间距，number 或 [rowGap, columnGap]      | number \| [number, number]                                          | [16, 24] |
| extraButtons      | 额外操作按钮                                 | SButtonsItem[]                                                      |          |
| actionStyleRender | 自定义操作区域样式                           | (props: { expanded: boolean; actionSpan: number }) => CSSProperties |          |
| actionNode        | 自定义操作节点（完全替换操作区）             | ReactNode                                                           |          |
| onExpand          | 展开收起时触发的事件                         | (expand: boolean) => void                                           |          |
| isCard            | 是否包裹在卡片中                             | boolean                                                             | true     |
| container         | 自定义组件容器                               | React.ComponentType                                                 |          |
| labelWidth        | 统一 label 宽度，解决 label 长短不一对齐问题 | number \| string                                                    |          |

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
| disabled   | 是否禁用                                   | boolean                                                                 | false  |
| gridColumn | CSS Grid 列跨度，仅 SForm.Search 生效      | number \| string                                                        |        |

## type 类型及其相关配置

| 组件类型名称     | 组件类型相关配置                                                                         |
| ---------------- | ---------------------------------------------------------------------------------------- | --- |
| input            | [input](https://ant-design.antgroup.com/components/input-cn#input)                       |
| inputNumber      | [inputNumber](https://ant-design.antgroup.com/components/input-number-cn#api)            |
| select           | [Select](/components/select#api)                                                         |
| textarea         | [textarea](https://ant-design.antgroup.com/components/input-cn#inputtextarea)            |
| slider           | [SSelect](https://ant-design.antgroup.com/components/slider-cn#api)                      |
| radio            | [radio](https://ant-design.antgroup.com/components/radio-cn#api)                         |
| radioGroup       | [radioGroup](/components/radio-group#api)                                                |
| switch           | [SSelect](https://ant-design.antgroup.com/components/switch-cn#api)                      |
| treeSelect       | [treeSelect](https://ant-design.antgroup.com/components/tree-select-cn#api)              |
| upload           | [antd upload](/components/select#api)                                                    |     |
| datePicker       | [SDatePicker](/components/date-picker#api)                                               |
| SDatePicker      | (已废弃，请使用 datePicker) [SDatePicker](/components/date-picker#api)                   |
| datePickerRange  | [SDatePickerRange](/components/date-picker-range#api)                                    |
| SDatePickerRange | (已废弃，请使用 datePickerRange) [SDatePickerRange](/components/date-picker-range#api)   |
| timePicker       | [timePicker](https://ant-design.antgroup.com/components/time-picker-cn#api)              |
| timePickerRange  | [timePickerRange](https://ant-design.antgroup.com/components/time-picker-cn#rangepicker) |
| checkbox         | [checkbox](https://ant-design.antgroup.com/components/checkbox-cn#api)                   |
| checkGroup       | [SCheckGroup](/components/check-group#api)                                               |
| cascader         | [SCascader](/components/cascader#api)                                                    |
| SCascader        | (已废弃，请使用 cascader) [SCascader](/components/cascader#api)                          |
| table            | [table](https://ant-design.antgroup.com/components/table-cn#api)                         |
| dependency       | 字段关联，依赖其他字段，当依赖字段发生变化时，当前字段也会发生变化                       |
| placeholder      | 占位使用暂无实际意义                                                                     |
